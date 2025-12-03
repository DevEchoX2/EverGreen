// EverGreen UI Engine
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".capsule");
  const searchButton = document.querySelector(".search-btn");

  // --- Search logic ---
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      alert(`Searching for: ${query}`);
      // Later: integrate with UV proxy logic
    }
  });

  // --- Particle system ---
  const canvas = document.createElement("canvas");
  canvas.id = "evergreen-particles";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let particles = [];
  const particleCount = 120;

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
      this.radius = Math.random() * 3 + 1;
      this.color = "#00ff66";
      this.speedX = (Math.random() - 0.5) * 1.5;
      this.speedY = (Math.random() - 0.5) * 1.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 20;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(0,255,102,0.2)";
          ctx.lineWidth = 1;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  initParticles();
  animateParticles();

  // --- Icon animations ---
  const icons = document.querySelectorAll(".nav-icon i, .search-btn i");
  icons.forEach(icon => {
    icon.addEventListener("mouseenter", () => {
      icon.style.transition = "transform 0.3s ease, color 0.3s ease";
      icon.style.transform = "scale(1.3) rotate(10deg)";
      icon.style.color = "#00ffcc";
      icon.style.textShadow = "0 0 15px #00ff66";
    });
    icon.addEventListener("mouseleave", () => {
      icon.style.transform = "scale(1) rotate(0deg)";
      icon.style.color = "#00ff66";
      icon.style.textShadow = "none";
    });
  });

  // --- Title pulse ---
  const title = document.querySelector(".neon-text");
  setInterval(() => {
    title.style.textShadow = "0 0 20px #00ffcc, 0 0 40px #00ff66";
    setTimeout(() => {
      title.style.textShadow = "0 0 10px #00ff66, 0 0 20px #00ff66";
    }, 500);
  }, 2000);

  // --- Overlay menus ---
  const gamesIcon = document.getElementById("games-icon");
  const appsIcon = document.getElementById("apps-icon");
  const gamesMenu = document.getElementById("games-menu");
  const appsMenu = document.getElementById("apps-menu");

  // Open overlays
  gamesIcon.addEventListener("click", (e) => {
    e.preventDefault();
    gamesMenu.classList.add("active");
    appsMenu.classList.remove("active");
  });

  appsIcon.addEventListener("click", (e) => {
    e.preventDefault();
    appsMenu.classList.add("active");
    gamesMenu.classList.remove("active");
  });

  // Close buttons with animation
  document.querySelectorAll(".overlay-menu .close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const menu = btn.closest(".overlay-menu");
      menu.style.opacity = "0";
      menu.style.top = "100%";
      setTimeout(() => {
        menu.classList.remove("active");
        menu.style.opacity = "";
        menu.style.top = "";
      }, 600); // match CSS transition
    });
  });
});

// --- Search functions for overlays ---
function searchGames(q) {
  const items = document.querySelectorAll("#games-container .item");
  items.forEach(item => {
    const title = item.innerText.toLowerCase();
    item.style.display = title.includes(q.toLowerCase()) ? "block" : "none";
  });
}

function searchApps(q) {
  const items = document.querySelectorAll("#apps-container .item");
  items.forEach(item => {
    const title = item.innerText.toLowerCase();
    item.style.display = title.includes(q.toLowerCase()) ? "block" : "none";
  });
}
