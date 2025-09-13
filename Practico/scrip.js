const canvas = document.getElementById("particlesCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const numParticles = 250;
let time = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.getElementById("inicio").offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 3, // tamaño base
      xSpeed: (Math.random() - 0.5) * 1.5,
      ySpeed: (Math.random() - 0.5) * 1.5,
      angle: Math.random() * Math.PI * 2,
      pulse: Math.random() * 0.05 + 0.02 // velocidad de pulsación
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    // Animación de pulso
    p.radius += Math.sin(time + p.angle) * p.pulse;
    if (p.radius < 2) p.radius = 2;
    if (p.radius > 6) p.radius = 6;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fill();
  });

  // Líneas entre partículas cercanas con opacidad variable
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 140){
        ctx.strokeStyle = `rgba(255,255,255,${0.3*(1 - dist/140)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function updateParticles() {
  time += 0.01; // tiempo global para animaciones senoidales

  particles.forEach(p => {
    // Movimiento ondulado
    p.x += p.xSpeed + Math.sin(time + p.angle) * 1;
    p.y += p.ySpeed + Math.cos(time + p.angle) * 1;

    // Rebote en bordes
    if (p.x < 0 || p.x > canvas.width) p.xSpeed *= -1;
    if (p.y < 0 || p.y > canvas.height) p.ySpeed *= -1;
  });
}

function animate() {
  drawParticles();
  updateParticles();
  requestAnimationFrame(animate);
}

createParticles();
animate();
