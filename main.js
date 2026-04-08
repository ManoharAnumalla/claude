// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const hamIcon = document.getElementById('ham-icon');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.remove('open');
      mobileMenu.classList.add('hidden');
      if (hamIcon) { hamIcon.className = 'fas fa-bars'; }
    } else {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('open');
      if (hamIcon) { hamIcon.className = 'fas fa-times'; }
    }
  });
}

// ===== NAVBAR SCROLL SHADOW =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 30px rgba(10,36,99,0.15)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(14,40,100,0.10)';
    }
  }

  // Scroll-to-top button
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    if (window.scrollY > 300) scrollBtn.classList.add('show');
    else scrollBtn.classList.remove('show');
  }
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
const animateEls = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animateEls.forEach(el => observer.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

const counters = document.querySelectorAll('.counter');
if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));
}

// ===== CONTACT FORM (basic validation) =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !phone) {
      showAlert('Please fill in all required fields.', 'error');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      showAlert('Please enter a valid 10-digit phone number.', 'error');
      return;
    }

    // Simulate success
    showAlert('✅ Your appointment request has been submitted! We will call you shortly.', 'success');
    contactForm.reset();
  });
}

function showAlert(msg, type) {
  const existing = document.getElementById('formAlert');
  if (existing) existing.remove();

  const div = document.createElement('div');
  div.id = 'formAlert';
  div.className = `fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl text-white font-semibold max-w-sm text-sm transition-all duration-300 ${
    type === 'success' ? 'bg-green-600' : 'bg-red-500'
  }`;
  div.textContent = msg;
  document.body.appendChild(div);

  setTimeout(() => {
    div.style.opacity = '0';
    setTimeout(() => div.remove(), 300);
  }, 4000);
}
