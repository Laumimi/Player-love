let score = 0;
let gameInterval;
let heartInterval;
let gameActive = false;

function iniciarJogo() {
    score = 0;
    gameActive = true;
    document.getElementById('score').innerText = `Pontos: ${score}`;
    document.getElementById('endMessage').classList.add('hidden');
    document.getElementById('gameArea').innerHTML = ''; // Limpar o jogo

    // Começar o jogo
    gameInterval = setInterval(adicionarCoração, 1000); // Corações aparecem a cada 1 segundo
    heartInterval = setInterval(checkCorações, 100); // Verificar se os corações estão saindo da tela
}

function adicionarCoração() {
    if (!gameActive) return;

    const gameArea = document.getElementById('gameArea');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';

    // Posições aleatórias para o coração
    const randomX = Math.random() * (gameArea.offsetWidth - 40); // Tamanho do coração
    const randomDuration = Math.random() * 3 + 2; // Duração aleatória da animação

    heart.style.left = `${randomX}px`;
    heart.style.animationDuration = `${randomDuration}s`;

    heart.onclick = function() {
        score++;
        document.getElementById('score').innerText = `Pontos: ${score}`;
        heart.remove(); // Remove o coração clicado
    };

    gameArea.appendChild(heart);
}

function checkCorações() {
    const gameArea = document.getElementById('gameArea');
    const hearts = document.querySelectorAll('.heart');
    
    hearts.forEach(heart => {
        if (parseInt(heart.style.top) > gameArea.offsetHeight) {
            heart.remove(); // Remover corações que saem da tela
        }
    });
}

function finalizarJogo() {
    clearInterval(gameInterval);
    clearInterval(heartInterval);
    gameActive = false;

    document.getElementById('finalScore').innerText = score;
    document.getElementById('endMessage').classList.remove('hidden');
}

// Iniciar o jogo ao carregar a página
window.onload = () => {
    setTimeout(finalizarJogo, 20000); // Jogo dura 20 segundos
};
