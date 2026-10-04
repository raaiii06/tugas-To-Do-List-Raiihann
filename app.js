// ===============================
// TO DO LIST
// ===============================

const inputTask = document.getElementById("inputTask");
const tombol = document.getElementById("tombol");
const listContainer = document.getElementById("listContainer");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const totalSelesai = document.getElementById("total-selesai");
const totalBelum = document.getElementById("total-belum");
const pesanKosong = document.getElementById("pesan-kosong");

// Menyimpan data tugas
let tasks = [];
let statusTugas = [];


// ===============================
// MENAMBAH TUGAS
// ===============================
function tambahTugas() {
    let namaTugas = inputTask.value.trim();

    if (namaTugas === "") {
        alert("Silakan masukkan tugas terlebih dahulu!");
        return;
    }

    tasks.push(namaTugas);
    statusTugas.push(false);

    inputTask.value = "";

    simpanData();
    tampilkanTugas();
}


// ===============================
// MENAMPILKAN TUGAS
// ===============================
function tampilkanTugas() {
    listContainer.innerHTML = "";

    if (tasks.length === 0) {
        pesanKosong.classList.remove("hidden");
    } else {
        pesanKosong.classList.add("hidden");
    }

    for (let i = 0; i < tasks.length; i++) {

        let li = document.createElement("li");

        li.textContent = tasks[i];

        // Jika tugas selesai
        if (statusTugas[i] === true) {
            li.classList.add("done");
        }

        // Klik tugas untuk selesai/belum selesai
        li.onclick = function () {
            statusTugas[i] = !statusTugas[i];

            simpanData();
            tampilkanTugas();
        };


        // Tombol hapus
        let tombolHapus = document.createElement("span");

        tombolHapus.innerHTML = "×";

        tombolHapus.onclick = function (event) {
            event.stopPropagation();

            tasks.splice(i, 1);
            statusTugas.splice(i, 1);

            simpanData();
            tampilkanTugas();
        };

        li.appendChild(tombolHapus);

        listContainer.appendChild(li);
    }

    updateJumlah();
}


// ===============================
// MENGHITUNG JUMLAH TUGAS
// ===============================
function updateJumlah() {

    let selesai = 0;

    for (let i = 0; i < statusTugas.length; i++) {
        if (statusTugas[i] === true) {
            selesai++;
        }
    }

    let belumSelesai = tasks.length - selesai;

    jumlahCatatan.innerHTML = tasks.length;
    totalSelesai.innerHTML = selesai;
    totalBelum.innerHTML = belumSelesai;
}


// ===============================
// MENYIMPAN DATA TANPA JSON
// ===============================
function simpanData() {

    // Menggabungkan semua tugas menggunakan tanda |
    localStorage.setItem("tasks", tasks.join("|"));

    // Menyimpan status selesai menggunakan 1 dan 0
    let status = "";

    for (let i = 0; i < statusTugas.length; i++) {
        if (statusTugas[i] === true) {
            status += "1";
        } else {
            status += "0";
        }
    }

    localStorage.setItem("statusTugas", status);
}


// ===============================
// MENGAMBIL DATA DARI LOCALSTORAGE
// ===============================
function ambilData() {

    let dataTugas = localStorage.getItem("tasks");
    let dataStatus = localStorage.getItem("statusTugas");

    if (dataTugas !== null && dataTugas !== "") {
        tasks = dataTugas.split("|");
    }

    if (dataStatus !== null) {

        statusTugas = [];

        for (let i = 0; i < dataStatus.length; i++) {
            if (dataStatus[i] === "1") {
                statusTugas.push(true);
            } else {
                statusTugas.push(false);
            }
        }
    }

    // Jika jumlah status tidak sesuai
    while (statusTugas.length < tasks.length) {
        statusTugas.push(false);
    }
}


// ===============================
// TOMBOL TAMBAH
// ===============================
tombol.onclick = function () {
    tambahTugas();
};


// ===============================
// TEKAN ENTER
// ===============================
inputTask.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        tambahTugas();
    }

});


// ===============================
// JALANKAN SAAT HALAMAN DIBUKA
// ===============================
ambilData();
tampilkanTugas();