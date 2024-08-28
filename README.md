# Dot Connect Game

## Identitas Pembuat
- **Nama:** Farhan Raditya Aji
- **Nim:** 13522142

## Penjelasan Singkat
Dot Connect Game adalah permainan puzzle di mana pemain harus menghubungkan titik-titik pada sebuah grid. Game ini menyediakan berbagai tingkat kesulitan yang dapat dimainkan agar lebih menantang. Terdapat 2 macam mode di dalam permainan ini , mode manual di mana pemain akan memainkan permainannya sendiri dan mode bot dimana pemain akan dibantu oleh bot untuk menyelesaikan permainannya.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** React.js, Tailwind CSS
- **Database:** MongoDB

## Algoritma yang Digunakan
**Algoritma:** Backtracking

### Penjelasan Algoritma
saya memilih algoritma backtracking karena kemampuannya untuk menjelajahi semua kemungkinan jalur dengan cara yang sistematis dan fleksibel, memastikan bahwa solusi yang valid akan ditemukan jika ada. Algoritma ini lebih efisien dibandingkan dengan brute force, yang akan menguji setiap kemungkinan tanpa optimasi, dan juga lebih cocok daripada algoritma greedy yang tidak selalu menjamin solusi optimal. Meskipun divide and conquer serta decrease and conquer menawarkan pendekatan yang berbeda, mereka mungkin kurang efektif untuk masalah yang memerlukan pengecekan menyeluruh seperti dalam game ini. Sementara BFS dan DFS bisa menjadi kurang efisien atau memerlukan banyak memori untuk grid besar, dan branch and bound memerlukan heuristik yang kompleks, backtracking memberikan keseimbangan yang baik antara kesederhanaan implementasi dan kemampuan untuk menangani masalah pencarian yang kompleks, meskipun dengan kompleksitas waktu O(4^n) dalam skenario terburuk.

### T(n) dan O(n)
- **T(n):** Dalam skenario terburuk, kompleksitas waktu adalah T(n) = O(4^n), di mana n adalah jumlah langkah.
- **O(n):** Kompleksitas ruang adalah O(n) karena menggunakan rekursi untuk menyimpan status sementara.

## Cara Menjalankan Aplikasi

1. **Clone repository ini:**
    ```bash
    git clone https://github.com/sibobbbbbb/Dot-Connect-Game.git
    ```

2. **Masuk ke direktori backend dan jalankan server:**
    ```bash
    cd Dot-Connect-Game/backend
    node server.js
    ```

3. **Jalankan server backend:**
    ```bash
    npm start
    ```

4. **Masuk ke direktori frontend dan instal dependensi:**
    ```bash
    cd ../frontend
    npm install
    ```

5. **Jalankan aplikasi frontend:**
    ```bash
    npm start
    ```

## Bonus yang Diimplementasikan
- **Animasi Jalannya Algoritma**
