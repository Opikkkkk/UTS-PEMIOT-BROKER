// server.js
import express from "express";
import db from "./db.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/data_sensor', (req, res) => {
  const query = 'SELECT * FROM data_sensor';
  db.query(query, (err, results) => {
    if (err) throw err;

    const suhu = results.map(r => r.suhu);
    const response = {
      suhumax: Math.max(...suhu),
      suhumin: Math.min(...suhu),
      suhurata: (suhu.reduce((a,b)=>a+b,0) / suhu.length).toFixed(2),
      nilai_suhu_max_humid_max: results
    };

    const sqlMonthYear = `
      SELECT DATE_FORMAT(timestamp, '%c-%Y') AS month_year
      FROM data_sensor
      GROUP BY month_year
      ORDER BY MAX(timestamp)
      LIMIT 2
    `;

    db.query(sqlMonthYear, (err2, results2) => {
    if (err2) throw err2;
    response.month_year_max = results2;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response, null, 2));
    });
  });
});


app.listen(3000, () => console.log("🚀 API running at http://localhost:3000"));
