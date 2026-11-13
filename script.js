// =========================================================
// 1. EFEITO DE DIGITAÇÃO (TYPEWRITER) NO TÍTULO PRINCIPAL
// =========================================================
const phrases = [
  "2027: Ensino Médio concluído e entrada na faculdade...",
  "Daqui a 5 anos: A conquista do meu carro...",
  "Daqui a 10 anos: Carro, casa própria e minha família!"
];

const typingElement = document.getElementById("typing-text");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 35 : 65;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 2000; // Pausa quando termina de escrever a frase
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

// Inicia o efeito de digitação
typeEffect();


// =========================================================
// 2. ANIMAÇÃO AO ROLAR A PÁGINA (SCROLL REVEAL)
// =========================================================
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => observer.observe(el));


// =========================================================
// 3. BARRA DE PROGRESSO DE ROLAGEM NO TOPO
// =========================================================
const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${scrollPercent}%`;
});


// =========================================================
// 4. EFEITO 3D INTERATIVO NOS CARTÕES AO PASSAR O MOUSE
// =========================================================
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
});


// =========================================================
// 5. FUNDO ANIMADO COM PARTÍCULAS AZUIS CONECTADAS (CANVAS)
// =========================================================
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

let particlesArray = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 1;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.speedY = (Math.random() - 0.5) * 0.8;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = "rgba(56, 189, 248, 0.75)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  const numberOfParticles = Math.min(80, Math.floor(canvas.width / 15));
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 130) {
        const opacity = 1 - distance / 130;
        ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.25})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  connectParticles();
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


// =========================================================
// 6. BOTÃO INTERATIVO DE INSPIRAÇÃO
// =========================================================
const celebrateBtn = document.getElementById("celebrate-btn");
const motivationalMsg = document.getElementById("motivational-msg");

celebrateBtn.addEventListener("click", () => {
  motivationalMsg.classList.add("show");
  celebrateBtn.textContent = "💙 Futuro em Construção!";
  
  // Acelera temporariamente as partículas para dar um efeito especial
  particlesArray.forEach((p) => {
    p.speedX *= 2.5;
    p.speedY *= 2.5;
  });

  setTimeout(() => {
    particlesArray.forEach((p) => {
      p.speedX /= 2.5;
      p.speedY /= 2.5;
    });
  }, 1500);
});