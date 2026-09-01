/**
 * CRISPYO Digital Restaurant Menu
 * Vanilla JavaScript: Smooth navigation, category active tabs,
 * à la carte toggle, and quick nav menu.
 */

document.addEventListener('DOMContentLoaded', () => {
  const categoryCards = document.querySelectorAll('.category-card');
  const quickNavLinks = document.querySelectorAll('.quick-nav-link');
  const quickNavMenu = document.getElementById('quick-nav-menu');
  const hamburgerBtn = document.getElementById('btn-hamburger');
  const aLaCarteBtn = document.getElementById('btn-a-la-carte');
  const aLaCarteBox = document.getElementById('alacarte-content-box');
  const brandLogo = document.getElementById('brand-logo');

  // 1. Navigation helper
  function navigateToSection(targetId) {
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Update active category
    categoryCards.forEach(card => {
      if (card.dataset.target === targetId) {
        card.classList.add('active-category');
      } else {
        card.classList.remove('active-category');
      }
    });

    // Close mobile dropdown if open
    if (quickNavMenu && quickNavMenu.classList.contains('open')) {
      quickNavMenu.classList.remove('open');
    }
  }

  // 2. Category Card Click Handlers
  categoryCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = card.dataset.target;
      if (targetId) {
        navigateToSection(targetId);
      }
    });
  });

  // 3. Quick Nav Links (inside menu dropdown)
  quickNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.dataset.target;
      if (targetId) {
        navigateToSection(targetId);
      }
    });
  });

  // 4. Hamburger / Menu Toggle
  if (hamburgerBtn && quickNavMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      quickNavMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!quickNavMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        quickNavMenu.classList.remove('open');
      }
    });
  }

  // 5. À la carte Button Interaction
  if (aLaCarteBtn && aLaCarteBox) {
    aLaCarteBtn.addEventListener('click', () => {
      aLaCarteBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // 6. Brand Logo scroll to top
  if (brandLogo) {
    brandLogo.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 7. ScrollSpy to highlight category card as user scrolls
  const sectionIds = ['section-breakfast', 'section-boissons', 'section-lunch', 'section-desserts'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;
          categoryCards.forEach(card => {
            if (card.dataset.target === currentId) {
              card.classList.add('active-category');
            } else {
              card.classList.remove('active-category');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px'
    });

    sections.forEach(sec => observer.observe(sec));
  }
});
