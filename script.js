(function () {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const menuBtn = document.getElementById('menuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const sideMenuClose = document.getElementById('sideMenuClose');
  const navbar = document.getElementById('navbar');

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', function () {
      modalOverlay.classList.add('hidden');
    });
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) {
        modalOverlay.classList.add('hidden');
      }
    });
  }

  if (menuBtn && sideMenu) {
    menuBtn.addEventListener('click', function () {
      sideMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (sideMenuClose && sideMenu) {
    sideMenuClose.addEventListener('click', function () {
      sideMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  document.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', function () {
      sideMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const productCards = document.querySelectorAll('.product-card');

  const cardObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = parseInt(card.getAttribute('data-index')) || 1;
          setTimeout(function () {
            card.classList.add('visible');
          }, (index - 1) * 120);
          cardObserver.unobserve(card);
        }
      });
    },
    { threshold: 0.1 }
  );

  productCards.forEach(function (card) {
    cardObserver.observe(card);
  });

  const revealEls = document.querySelectorAll(
    '.intro-heading, .intro-body, .story-title, .story-body, .origins-title, .origins-sub, .ritual-title, .ritual-body, .formats-title, .testimonials-title, .newsletter-title, .newsletter-sub, .origin-item, .format-card, .testimonial-card, .stat'
  );

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    revealObserver.observe(el);
  });

  const newsletterBtn = document.querySelector('.newsletter-btn');
  const newsletterInput = document.querySelector('.newsletter-input');

  if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', function () {
      const val = newsletterInput.value.trim();
      if (val && val.includes('@')) {
        newsletterBtn.textContent = 'Thank You';
        newsletterBtn.style.background = '#6b3f1f';
        newsletterBtn.style.color = '#f5f0e8';
        newsletterInput.value = '';
        setTimeout(function () {
          newsletterBtn.textContent = 'Join Now';
          newsletterBtn.style.background = '';
          newsletterBtn.style.color = '';
        }, 4000);
      } else {
        newsletterInput.style.borderColor = '#c8a96e';
        setTimeout(function () {
          newsletterInput.style.borderColor = '';
        }, 2000);
      }
    });
  }

  const modalBtn = document.querySelector('.modal-btn');
  const modalInput = document.querySelector('.modal-input');

  if (modalBtn && modalInput) {
    modalBtn.addEventListener('click', function () {
      const val = modalInput.value.trim();
      if (val && val.includes('@')) {
        modalBtn.textContent = 'Thank You';
        modalInput.value = '';
        setTimeout(function () {
          modalOverlay.classList.add('hidden');
        }, 1200);
      } else {
        modalInput.style.borderColor = '#c8a96e';
        setTimeout(function () {
          modalInput.style.borderColor = '';
        }, 2000);
      }
    });
  }

  document.querySelectorAll('.product-quick-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const card = btn.closest('.product-card');
      const name = card.querySelector('.product-name');
      if (name) {
        const toast = document.createElement('div');
        toast.style.cssText =
          'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:#1a1410;color:#f5f0e8;padding:14px 32px;font-family:Montserrat,sans-serif;font-size:11px;letter-spacing:2px;z-index:9999;border:1px solid rgba(200,169,110,0.3);transition:opacity 0.4s;';
        toast.textContent = name.textContent.toUpperCase() + ' — QUICK VIEW';
        document.body.appendChild(toast);
        setTimeout(function () {
          toast.style.opacity = '0';
          setTimeout(function () {
            document.body.removeChild(toast);
          }, 400);
        }, 2500);
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
