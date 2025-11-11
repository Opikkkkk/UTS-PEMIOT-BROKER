// URL backend Node.js kamu
const API_URL = "http://localhost:3000/data_sensor";

// Fungsi untuk ambil data dari backend
async function fetchSensorData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json(); // parsing JSON otomatis

    // Tampilkan summary
    document.getElementById("suhuMax").textContent = data.suhumax;
    document.getElementById("suhuMin").textContent = data.suhumin;
    document.getElementById("suhuRata").textContent = data.suhurata;

    // Tampilkan data sensor ke tabel
    const tbody = document.querySelector("#sensorTable tbody");
    tbody.innerHTML = ""; // reset

    data.nilai_suhu_max_humid_max.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.id}</td>
        <td>${row.suhu}</td>
        <td>${row.humidity}</td>
        <td>${row.lux}</td>
        <td>${row.timestamp}</td>
      `;
      tbody.appendChild(tr);
    });

    console.log("✅ Data berhasil diparsing:", data);

  } catch (error) {
    console.error("❌ Gagal mengambil data:", error);
  }
}

// Jalankan saat halaman dibuka
fetchSensorData();
