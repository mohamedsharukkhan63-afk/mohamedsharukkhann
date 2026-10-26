const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const parallaxItems = document.querySelectorAll('[data-speed]');
let ticking = false;
function updateParallax() {
  const viewportHeight = window.innerHeight;
  parallaxItems.forEach(el => {
    const rect = el.parentElement.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > viewportHeight) return;
    const speed = Number(el.dataset.speed || 0);
    const offset = (rect.top * -1) * speed;
    el.style.transform = `translate3d(0, ${offset}px, 0)`;
  });
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });
window.addEventListener('resize', updateParallax);
updateParallax();

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav a').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});
const sections = document.querySelectorAll('main section[id]');
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => activeObserver.observe(section));