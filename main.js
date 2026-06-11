// ===== Typing effect =====
const typedEl = document.getElementById('typed');
const phrases = [
  'Cloud & DevOps enthusiast',
  'Aspiring Data Analyst',
  'AI / ML explorer',
  'Building things that work'
];
let pIdx = 0, cIdx = 0, deleting = false;

function typeLoop(){
  const current = phrases[pIdx];
  if(!deleting){
    cIdx++;
    typedEl.textContent = current.slice(0, cIdx);
    if(cIdx === current.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    cIdx--;
    typedEl.textContent = current.slice(0, cIdx);
    if(cIdx === 0){ deleting = false; pIdx = (pIdx + 1) % phrases.length; }
  }
  setTimeout(typeLoop, deleting ? 40 : 70);
}
if(typedEl) typeLoop();

// ===== Scroll progress bar =====
const progressBar = document.getElementById('progress-bar');
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if(progressBar) progressBar.style.width = (scrollTop / height) * 100 + '%';
  if(backToTop) backToTop.style.display = scrollTop > 400 ? 'flex' : 'none';
});

// ===== Dark / light mode toggle =====
const toggleBtn = document.getElementById('dark-mode-toggle');
if(toggleBtn){
  const icon = toggleBtn.querySelector('i');
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    if(icon) icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
  if(localStorage.getItem('theme') === 'light'){
    document.body.classList.add('light-mode');
    if(icon) icon.className = 'fas fa-moon';
  }
}

// ===== Back to top =====
if(backToTop){
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== Mobile menu =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
if(menuToggle && navLinks){
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ===== Project filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projects .project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const type = btn.dataset.type;
    projectCards.forEach(card => {
      if(type === 'all' || card.classList.contains(type)){
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== Hackathon slider =====
const hackathons = [
  {
    title: '1st Place – Huawei Data Competition (Saudi Arabia)',
    date: '2025 – 2026',
    desc: 'Won first place nationally in Huawei\'s Data Competition, competing against teams across Saudi Arabia.',
    badge: '🏆 1st Place'
  },
  {
    title: 'DATA X App – NASA Space Apps Challenge',
    date: 'October 2024',
    desc: 'Second place winning project that utilizes Earth Observation (EO) data to support smart decision-making aligned with sustainability goals.',
    badge: '🥈 2nd Place'
  }
];

const container = document.getElementById('hackathon-cards-container');
let current = 0;

function update(){
  if(container) container.style.transform = `translateX(-${current * 100}%)`;
}

function renderHackathons(){
  if(!container) return;
  container.style.display = 'flex';
  container.style.transition = 'transform .3s ease';
  container.innerHTML = '';
  hackathons.forEach(h => {
    const card = document.createElement('div');
    card.className = 'hackathon-card';
    card.innerHTML = `
      <h3>${h.title}</h3>
      <p class="date">${h.date}</p>
      <p>${h.desc}</p>
      <span class="badge">${h.badge}</span>
    `;
    container.appendChild(card);
  });
  update();
}

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
if(prevBtn) prevBtn.addEventListener('click', () => {
  current = (current - 1 + hackathons.length) % hackathons.length;
  update();
});
if(nextBtn) nextBtn.addEventListener('click', () => {
  current = (current + 1) % hackathons.length;
  update();
});

renderHackathons();
