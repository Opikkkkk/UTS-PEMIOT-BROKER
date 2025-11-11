// mqtt-listener.js
import mqtt from "mqtt";
import db from "./db.js";

const broker = "mqtt://broker.hivemq.com";
const topic = "esp32/data"; 

const client = mqtt.connect(broker, {
  clientId: "backend_mqtt_listener",
  clean: true
});

client.on("connect", () => {
  console.log("✅ Connected to MQTT broker");
  client.subscribe(topic, err => {
    if (!err) console.log(`📡 Subscribed to topic: ${topic}`);
  });
});

client.on("message", (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("📥 Received:", data);

    const { suhu, humidity, lux, timestamp } = data;

    const sql = `INSERT INTO data_sensor (suhu, humidity, lux, timestamp) VALUES (?, ?, ?, FROM_UNIXTIME(?))`;
    db.query(sql, [suhu, humidity, lux, timestamp], (err) => {
      if (err) console.error("❌ DB Insert Error:", err);
      else console.log("✅ Data inserted to DB");
    });
  } catch (e) {
    console.error("❌ Error parsing JSON:", e);
  }
});
