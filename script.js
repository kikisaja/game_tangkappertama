document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const basket = document.getElementById('basket');
    const scoreDisplay = document.getElementById('score');
    const livesDisplay = document.getElementById('lives');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const finalScore = document.getElementById('finalScore');
    const btnRestart = document.getElementById('btnRestart');

    // State Game
    let score = 0;
    let lives = 3;
    let isGameOver = false;
    let basketX = 185; // Posisi awal horizontal keranjang dalam pixel
    const basketSpeed = 25;
    const gemsPool = ['💎', '✨', '⭐', '🔮'];
    
    // Interval Loop ID (untuk membersihkan memori saat game over)
    let spawnIntervalId;
    let gameLoopId;

    // 1. Logika Pergerakan Keranjang (Aman & Responsif)
    document.addEventListener('keydown', (e) => {
        if (isGameOver) return;

        const boardWidth = gameBoard.offsetWidth;
        const basketWidth = basket.offsetWidth;

        if (e.key === 'ArrowLeft' || e.key === 'a') {
            basketX = Math.max(0, basketX - basketSpeed);
        } else if (e.key === 'ArrowRight' || e.key === 'd') {
            basketX = Math.min(boardWidth - basketWidth, basketX + basketSpeed);
        }
        
        // Perbarui posisi elemen visual keranjang
        basket.style.left = `${basketX}px`;
        basket.style.transform = 'none'; // Menghapus reset centering CSS awal
    });

    // 2. Fungsi Membuat Permata Jatuh secara Acak
    function spawnGem() {
        if (isGameOver) return;

        const gem = document.createElement('div');
        gem.classList.add('gem');
        gem.textContent = gemsPool[Math.floor(Math.random() * gemsPool.length)];
        
        // Tentukan posisi awal acak di atas papan game
        const boardWidth = gameBoard.offsetWidth;
        gem.style.left = `${Math.random() * (boardWidth - 30)}px`;
        gem.style.top = '0px';

        gameBoard.appendChild(gem);

        // Logika Fisika Jatuh per Permata
        let gemY = 0;
        const fallSpeed = 3 + Math.random() * 4; // Kecepatan variatif agar menantang

        function fall() {
            if (isGameOver) {
                gem.remove();
                return;
            }

            gemY += fallSpeed;
            gem.style.top = `${gemY}px`;

            // Deteksi Batas Bawah dan Tabrakan
            const boardHeight = gameBoard.offsetHeight;
            const basketTop = basket.offsetTop;
            const gemLeft = gem.offsetLeft;

            // KONDISI 1: Terperangkap oleh basket
            if (gemY >= basketTop - 25 && gemY <= basketTop && 
                gemLeft >= basketX - 15 && gemLeft <= basketX + basket.offsetWidth) {
                
                score += 10;
                scoreDisplay.textContent = score;
                gem.remove(); // Bersihkan DOM segera (Aman dari memory leak)
                return;
            }

            // KONDISI 2: Melewati batas bawah (Lolos)
            if (gemY >= boardHeight) {
                lives--;
                updateLivesDisplay();
                gem.remove(); // Bersihkan DOM segera
                
                if (lives <= 0) {
                    endGame();
                }
                return;
            }

            requestAnimationFrame(fall);
        }

        requestAnimationFrame(fall);
    }

    // 3. Memperbarui Tampilan Nyawa (Hati)
    function updateLivesDisplay() {
        let hearts = '';
        for (let i = 0; i < lives; i++) {
            hearts += '💖';
        }
        livesDisplay.textContent = hearts || '💀';
    }

    // 4. Fungsi Menghentikan Game (Safety Environment)
    function endGame() {
        isGameOver = true;
        clearInterval(spawnIntervalId);
        finalScore.textContent = score;
        gameOverScreen.classList.add('show');
    }

    // 5. Memulai/Mereset Ulang Game
    function startGame() {
        // Reset seluruh status variabel
        score = 0;
        lives = 3;
        isGameOver = false;
        basketX = (gameBoard.offsetWidth / 2) - (basket.offsetWidth / 2);
        
        // Sinkronisasi Tampilan Awal
        scoreDisplay.textContent = score;
        updateLivesDisplay();
        basket.style.left = `${basketX}px`;
        gameOverScreen.classList.remove('show');

        // Bersihkan permata sisa jika ada
        document.querySelectorAll('.gem').forEach(gem => gem.remove());

        // Jalankan interval pembuat permata (Setiap 1 detik)
        spawnIntervalId = setInterval(spawnGem, 1000);
    }

    // Event Listener untuk Tombol Restart
    btnRestart.addEventListener('click', startGame);

    // Jalankan Game Pertama Kali saat Dokumen Siap
    startGame();
});
