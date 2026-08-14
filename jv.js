// 1. CONTADOR DE JUGADORES EN LÍNEA (Simulado)
const playerCounter = document.getElementById('player-counter');
let currentPlayers = 42; // Número inicial

function updatePlayers() {
    // Simula fluctuaciones de jugadores (entre 15 y 85)
    const change = Math.floor(Math.random() * 20) - 10; 
    currentPlayers = Math.min(85, Math.max(15, currentPlayers + change));
    playerCounter.innerText = currentPlayers;
}
// Actualizar cada 5 segundos
setInterval(updatePlayers, 5000);

// 2. GENERADOR DE TABLA TEBEX (Simulado)
const tableBody = document.getElementById('table-body');
const buyers = [
    { name: 'xDarkGhost', rank: 'Rango VIP+', price: '$15.00', date: 'Hace 2 min' },
    { name: 'PvPMaster123', rank: 'Kit Legendario', price: '$8.50', date: 'Hace 15 min' },
    { name: 'Nico_YT', rank: 'Rango Elite', price: '$25.00', date: 'Hace 1 hora' },
    { name: 'Luna_Star', rank: 'Pase de Batalla', price: '$5.00', date: 'Hace 3 horas' },
    { name: 'Zer0X', rank: 'Rango MVP', price: '$20.00', date: 'Hace 5 horas' }
];

buyers.forEach(b => {
    const row = `<tr>
        <td>${b.name}</td>
        <td style="color:var(--violet-main); font-weight:bold;">${b.rank}</td>
        <td style="color:#00ff00;">${b.price}</td>
        <td>${b.date}</td>
    </tr>`;
    tableBody.innerHTML += row;
});

// 3. SISTEMA DE PARTÍCULAS DE FONDO (Efecto Guerra / PVP)
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let width, height, particles;

function initParticles() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 4 + 1,
            color: `rgba(122, 0, 255, ${Math.random() * 0.8 + 0.2})`
        });
    }
    animateParticles();
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
    // Dibuja líneas de conexión entre partículas cercanas
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(122, 0, 255, ${0.3 - distance/500})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
window.addEventListener('resize', initParticles);
initParticles();