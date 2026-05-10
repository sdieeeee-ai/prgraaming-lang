
// --- Scroll reveal animation ---
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // animate skill bars when revealed
      e.target.querySelectorAll('.bar > span').forEach((b) => {
        b.style.width = b.dataset.level + '%';
      });
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => io.observe(el));

// --- Project filtering ---
const filterBtns = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project');
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    projectCards.forEach((card, i) => {
      const show = cat === 'all' || card.dataset.category === cat;
      if (show) {
        card.style.display = '';
        card.style.animation = 'none';
        // restart animation
        // eslint-disable-next-line no-unused-expressions
        card.offsetHeight;
        card.style.animation = `fadeUp .5s both ${i * 0.08}s`;
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// --- Contact form validation ---
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    let ok = true;

    const setErr = (id, msg) => {
      document.getElementById(id).textContent = msg;
    };
    setErr('err-name', '');
    setErr('err-email', '');
    setErr('err-message', '');

    if (!name) { setErr('err-name', 'Name is required'); ok = false; }
    if (!email) { setErr('err-email', 'Email is required'); ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr('err-email', 'Invalid email address'); ok = false;
    }
    if (!message) { setErr('err-message', 'Message is required'); ok = false; }
    else if (message.length < 10) { setErr('err-message', 'Message is too short'); ok = false; }

    if (!ok) return;

    const btn = form.querySelector('.btn-submit');
    btn.innerHTML = '✓ Sent successfully';
    form.reset();
    setTimeout(() => {
      btn.innerHTML = '✈ Send message';
    }, 3500);
  });
}

// --- Active nav link based on current page ---
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.menu a').forEach((a) => {
  if (a.getAttribute('href') === path) a.classList.add('active');
});
