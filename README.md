# 💎 Neon Gem Catcher Game

Sebuah proyek game berbasis web statis sederhana dengan tema visual *Neon Cyberpunk* yang modern. Proyek ini dirancang khusus sebagai materi pembelajaran interaktif bagi pelajar dan pemula untuk memahami konsep dasar manipulasi DOM, logika matematika koordinat 2D, serta manajemen memori pada JavaScript.

---

## 🎮 Cara Bermain
1. Buka file `index.html` pada peramban (*browser*) pilihan Anda.
2. Gunakan tombol **Panah Kiri (`←`)** / **`A`** dan **Panah Kanan (`→`)** / **`D`** pada papan ketik (*keyboard*) untuk menggerakkan keranjang neon.
3. Tangkap setiap permata (`💎`, `✨`, `⭐`, `🔮`) yang jatuh dari atas untuk mendapatkan **+10 poin**.
4. Jangan biarkan permata lolos ke batas bawah layar! Jika lolos, Anda akan kehilangan **1 Nyawa (💖)**.
5. Game akan berakhir jika 3 Nyawa Anda habis (`💀`). Tekan tombol **Main Lagi 🔄** untuk mengulang skor dari awal.

---

## 🛠️ Arsitektur Teknologi & Fitur Kode
Proyek ini dibangun murni menggunakan teknologi web dasar (*Vanilla Web Development*) dengan pemisahan struktur file yang disiplin:

*   **`index.html` (Struktur Elemen):** Menyusun tata letak papan skor, area permainan, komponen keranjang penangkap, serta layar *Game Over* secara semantik.
*   **`style.css` (Desain & Animasi):** Menggunakan variabel CSS (`:root`), tata letak responsif (*Flexbox*), efek *glassmorphism* transparan, bayangan neon bercahaya (*box-shadow/text-shadow*), serta animasi *bounce* bawaan.
*   **`script.js` (Logika & Interaktivitas):** Mengatur seluruh sistem mekanik game, mulai dari pergerakan objek hingga sistem kalkulasi skor.

---

## 🎓 Poin Pembelajaran (Edukasi Pemrograman)
Bagi pelajar dan pemula, proyek ini menerapkan beberapa konsep penting dalam dunia rekayasa perangkat lunak (*Software Engineering*):

1. **Logika Tabrakan Objek (*Collision Detection*):** Mempelajari cara menghitung persinggungan antara koordinat keranjang (Sumbu X) dan koordinat permata (Sumbu Y) secara *real-time*.
2. **Animasi Berperforma Tinggi (`requestAnimationFrame`):** Menggunakan standar industri peramban untuk menghasilkan gerakan jatuh yang mulus dan stabil sesuai dengan *refresh rate* layar perangkat.
3. **Pencegahan Kebocoran Memori (*Memory Leak Avoidance*):** Menerapkan fungsi `.remove()` untuk langsung memusnahkan elemen HTML permata yang sudah ditangkap atau menyentuh lantai. Hal ini menjaga performa RAM komputer agar tidak membengkak saat game dimainkan lama.
4. **Siklus Hidup Game (*Game Lifecycle Loop*):** Memahami alur kerja *state* program mulai dari inisialisasi (`startGame`), berjalan (`spawnGem`), hingga selesai (`endGame`).

---

## 📂 Struktur Repositori
Pastikan ketiga file berada dalam satu folder utama yang sama agar sistem pemanggilan file (*path*) bekerja dengan benar:
```text
├── index.html      # Tampilan konten dan komponen utama game
├── style.css       # Desain visual neon dan tata letak gaya
└── script.js       # Otak logika permainan dan pergerakan objek
