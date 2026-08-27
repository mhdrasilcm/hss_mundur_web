/* =========================================================
   HSS MUNDUR — ADVANCED ANIMATIONS & 3D EFFECTS ENGINE
   Premium Interactive Features
   ========================================================= */

class HSS3DEffects {
  constructor() {
    // Wait for page to load before initializing
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    try {
      this.setupParticles();
      this.setupMouseFollower();
      this.setupScrollAnimations();
      this.setupInteractiveElements();
      this.setupGlitchEffect();
      this.setupLightingEffects();
    } catch (e) {
      console.error('3D Effects initialization error:', e);
    }
  }

  /* ── PARTICLE SYSTEM ── */
  setupParticles() {
    try {
      const canvas = document.createElement('canvas');
      canvas.id = 'particle-canvas';
      canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.35;
      `;
      
      document.body.insertBefore(canvas, document.body.firstChild);
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      const particleCount = 40;

      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.vx = (Math.random() - 0.5) * 0.3;
          this.vy = (Math.random() - 0.5) * 0.3;
          this.radius = Math.random() * 1.5 + 0.5;
          this.opacity = Math.random() * 0.4 + 0.1;
          this.color = ['#1b7a78', '#2aada9', '#c9a84c', '#ff8a3d'][Math.floor(Math.random() * 4)];
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.opacity += (Math.random() - 0.5) * 0.02;
          this.opacity = Math.max(0.1, Math.min(0.5, this.opacity));

          if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
          ctx.fillStyle = this.color;
          ctx.globalAlpha = this.opacity;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      let animationFrameId;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;

        particles.forEach(p => {
          p.update();
          p.draw();
        });

        // Draw connections between nearby particles
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              ctx.strokeStyle = particles[i].color;
              ctx.globalAlpha = (1 - dist / 120) * 0.15;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        ctx.globalAlpha = 1;
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    } catch (e) {
      console.warn('Particle system setup failed:', e);
    }
  }

  /* ── ADVANCED MOUSE FOLLOWER ── */
  setupMouseFollower() {
    try {
      let mouseX = 0;
      let mouseY = 0;

      document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const dot = document.querySelector('.cursor-dot');
        if (dot) {
          dot.style.left = mouseX + 'px';
          dot.style.top = mouseY + 'px';
        }

        // Parallax effect on mouse move
        const orbs = document.querySelectorAll('.hero-orb');
        if (orbs.length > 0) {
          orbs.forEach((orb, idx) => {
            const x = (window.innerWidth / 2 - mouseX) / 100;
            const y = (window.innerHeight / 2 - mouseY) / 100;
            orb.style.transform = `translate3d(${x * (idx + 1) * 10}px, ${y * (idx + 1) * 10}px, -${50 + idx * 50}px)`;
          });
        }
      });
    } catch (e) {
      console.warn('Mouse follower setup failed:', e);
    }
  }

  /* ── SCROLL ANIMATIONS ── */
  setupScrollAnimations() {
    try {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };

      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible', 'in-view');
            }, idx * 50);
            scrollObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document.querySelectorAll('.fade-in, .reveal, .feature-card, .g-item, .timeline-item').forEach(el => {
        scrollObserver.observe(el);
      });

      // Parallax scroll effect
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
          const scrollY = window.scrollY;
          parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
          });
        }, { passive: true });
      }
    } catch (e) {
      console.warn('Scroll animations setup failed:', e);
    }
  }

  /* ── INTERACTIVE ELEMENT ANIMATIONS ── */
  setupInteractiveElements() {
    try {
      // Card tilt on hover
      document.querySelectorAll('.feature-card[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          const rotX = (y / rect.height) * 15 - 7.5;
          const rotY = (x / rect.width) * 15 - 7.5;

          card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1)';
        });
      });

      // Button ripple effect
      document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', e => {
          const ripple = document.createElement('span');
          const rect = btn.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;

          ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
          `;

          btn.appendChild(ripple);
          setTimeout(() => ripple.remove(), 600);
        });
      });

      // Gallery item 3D tilt
      document.querySelectorAll('.g-item').forEach(item => {
        item.addEventListener('mousemove', e => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          const rotX = (y / rect.height) * 12 - 6;
          const rotY = (x / rect.width) * 12 - 6;

          item.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
        });

        item.addEventListener('mouseleave', () => {
          item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
      });
    } catch (e) {
      console.warn('Interactive elements setup failed:', e);
    }
  }

  /* ── GLITCH EFFECT ── */
  setupGlitchEffect() {
    try {
      const glitchHeaders = document.querySelectorAll('h1, h2, h3');
      
      glitchHeaders.forEach(header => {
        header.addEventListener('mouseenter', () => {
          header.style.animation = 'glitch 0.4s ease-in-out';
          setTimeout(() => {
            header.style.animation = 'none';
          }, 400);
        });
      });
    } catch (e) {
      console.warn('Glitch effect setup failed:', e);
    }
  }

  /* ── LIGHTING EFFECTS ── */
  setupLightingEffects() {
    try {
      const createGlowEffect = (element, intensity = 0.3) => {
        element.style.boxShadow = `
          0 0 20px rgba(27, 122, 120, ${intensity}),
          0 0 40px rgba(255, 138, 61, ${intensity * 0.5}),
          inset 0 0 20px rgba(255, 255, 255, ${intensity * 0.2})
        `;
      };

      document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          createGlowEffect(card, 0.4);
        });

        card.addEventListener('mouseleave', () => {
          createGlowEffect(card, 0.15);
        });
      });
    } catch (e) {
      console.warn('Lighting effects setup failed:', e);
    }
  }
}

/* ── INITIALIZE AFTER PAGE LOAD ── */
if (document.readyState === 'complete') {
  new HSS3DEffects();
} else {
  window.addEventListener('load', () => {
    new HSS3DEffects();
  });
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  @keyframes glitch {
    0% {
      text-shadow: 
        2px 0 #ff8a3d,
        -2px 0 #1b7a78;
    }
    50% {
      text-shadow: 
        -2px 0 #ff8a3d,
        2px 0 #1b7a78;
    }
    100% {
      text-shadow: 
        0 0 rgba(0,0,0,0);
    }
  }

  .btn {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(style);
