/**
 * Script para animações na página de login
 */
document.addEventListener('DOMContentLoaded', function() {
  // Criar estrelas na área de ilustração
  const starsContainer = document.querySelector('.stars');
  if (starsContainer) {
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.width = Math.random() * 3 + 'px';
      star.style.height = star.style.width;
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 10 + 's';
      star.style.animationDuration = Math.random() * 20 + 10 + 's';
      starsContainer.appendChild(star);
    }
  }

  // Criar nuvens na área de ilustração
  const cloudsContainer = document.querySelector('.clouds');
  if (cloudsContainer) {
    for (let i = 0; i < 3; i++) {
      const cloud = document.createElement('div');
      cloud.classList.add('cloud');
      cloud.style.left = (i * 30) + '%';
      cloud.style.animationDelay = i * 2 + 's';
      cloudsContainer.appendChild(cloud);
    }
  }

  // Criar meteoros ocasionais
  const illustration = document.querySelector('.auth-illustration');
  if (illustration) {
    setInterval(() => {
      const meteor = document.createElement('div');
      meteor.classList.add('meteor');
      meteor.style.top = Math.random() * 40 + '%';
      meteor.style.left = Math.random() * 100 + '%';
      illustration.appendChild(meteor);
      
      setTimeout(() => {
        meteor.remove();
      }, 1000);
    }, 3000);
  }
});
