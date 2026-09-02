/* ============================================
   SOL CURA — Main JavaScript
   ============================================ */

'use strict';

/* ── Utility ─────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Nav: scroll state ───────────────────── */
const nav = $('.nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 40);
  checkStickyATC();
}, { passive: true });

/* ── Mobile Nav ──────────────────────────── */
const mobileNav = $('.mobile-nav');
const mobileToggle = $('.nav__mobile-toggle');
const mobileClose = $('.mobile-nav__close-btn');
const mobileOverlay = $('.mobile-nav__overlay');

function openMobileNav() {
  mobileNav?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  mobileNav?.classList.remove('open');
  document.body.style.overflow = '';
}

mobileToggle?.addEventListener('click', openMobileNav);
mobileClose?.addEventListener('click', closeMobileNav);
mobileOverlay?.addEventListener('click', closeMobileNav);

/* ── Scroll Reveal ───────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

$$('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

/* ── FAQ Accordion ───────────────────────── */
$$('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    $$('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── Before/After Slider ─────────────────── */
const baSlider = $('.before-after');
if (baSlider) {
  const after = baSlider.querySelector('.before-after__after');
  const handle = baSlider.querySelector('.before-after__handle');
  let isDragging = false;

  function updateSlider(x) {
    const rect = baSlider.getBoundingClientRect();
    const pct = Math.max(5, Math.min(95, ((x - rect.left) / rect.width) * 100));
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    handle.style.left = `${pct}%`;
  }

  baSlider.addEventListener('mousedown', e => { isDragging = true; updateSlider(e.clientX); });
  baSlider.addEventListener('touchstart', e => { isDragging = true; updateSlider(e.touches[0].clientX); }, { passive: true });
  document.addEventListener('mousemove', e => { if (isDragging) updateSlider(e.clientX); });
  document.addEventListener('touchmove', e => { if (isDragging) updateSlider(e.touches[0].clientX); }, { passive: true });
  document.addEventListener('mouseup', () => isDragging = false);
  document.addEventListener('touchend', () => isDragging = false);
}

/* ── Skin Tone Selector ──────────────────── */
$$('.skin-tone').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.skin-tone').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ── Routine Steps ───────────────────────── */
$$('.routine-step').forEach(step => {
  step.addEventListener('click', () => {
    $$('.routine-step').forEach(s => s.classList.remove('active'));
    step.classList.add('active');
  });
});

/* ── Review Filters ──────────────────────── */
$$('.filter-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    $$('.filter-tag').forEach(t => t.classList.remove('active'));
    tag.classList.add('active');
  });
});

/* ── Subscribe Plan Selector ─────────────── */
$$('.subscribe-plan').forEach(plan => {
  plan.addEventListener('click', () => {
    $$('.subscribe-plan').forEach(p => p.classList.remove('active'));
    plan.classList.add('active');
  });
});

/* ── SPF Quiz ────────────────────────────── */
const quizData = {
  questions: [
    {
      id: 1,
      text: "What's your skin type?",
      options: [
        { icon: '✨', text: 'Normal' },
        { icon: '💧', text: 'Dry' },
        { icon: '🔆', text: 'Oily' },
        { icon: '🌿', text: 'Sensitive' }
      ]
    },
    {
      id: 2,
      text: 'Where do you spend most of your day?',
      options: [
        { icon: '🏢', text: 'Mostly indoors' },
        { icon: '🚶', text: 'In and out' },
        { icon: '☀️', text: 'Mostly outdoors' },
        { icon: '🏖️', text: 'Beach / Active' }
      ]
    },
    {
      id: 3,
      text: 'Do you wear makeup daily?',
      options: [
        { icon: '💄', text: 'Yes, always' },
        { icon: '🎨', text: 'Sometimes' },
        { icon: '🙅', text: 'Rarely' },
        { icon: '✌️', text: 'Never' }
      ]
    },
    {
      id: 4,
      text: 'How active is your lifestyle?',
      options: [
        { icon: '🛋️', text: 'Low key' },
        { icon: '🚴', text: 'Moderate' },
        { icon: '🏃', text: 'Very active' },
        { icon: '🏄', text: 'Athlete' }
      ]
    },
    {
      id: 5,
      text: 'What texture do you prefer?',
      options: [
        { icon: '🧴', text: 'Light lotion' },
        { icon: '🖊️', text: 'Easy stick' },
        { icon: '💨', text: 'Refreshing mist' },
        { icon: '🤷', text: 'No preference' }
      ]
    }
  ],
  results: {
    lotion: {
      name: 'Mineral Sunscreen Lotion SPF 50+',
      reason: 'A lightweight daily lotion that blends seamlessly under makeup and suits all skin types — including oily and sensitive.',
      img: 'images/lotion.jpg'
    },
    stick: {
      name: 'Mineral Sunscreen Stick SPF 50+',
      reason: 'A swipe-and-go stick perfect for an active lifestyle, outdoor adventures, and targeted reapplication on the go.',
      img: 'images/stick.jpg'
    },
    mist: {
      name: 'SPF Mist SPF 50+',
      reason: 'A lightweight mist ideal for reapplication throughout the day without disturbing your makeup or routine.',
      img: 'images/mist.jpg'
    }
  }
};

let currentQ = 0;
const answers = {};

function initQuiz() {
  const container = $('.quiz-container');
  if (!container) return;

  // Build progress dots
  const progressEl = container.querySelector('.quiz-progress');
  if (progressEl) {
    progressEl.innerHTML = quizData.questions.map((_, i) =>
      `<div class="quiz-progress__dot" data-dot="${i}"></div>`
    ).join('');
  }

  // Build questions
  const questionsWrap = container.querySelector('.quiz-questions-wrap');
  if (questionsWrap) {
    questionsWrap.innerHTML = quizData.questions.map((q, qi) => `
      <div class="quiz-question ${qi === 0 ? 'active' : ''}" data-question="${qi}">
        <div class="quiz-step-label">Step ${qi + 1} of ${quizData.questions.length}</div>
        <div class="quiz-q-text">${q.text}</div>
        <div class="quiz-options">
          ${q.options.map((opt, oi) => `
            <button class="quiz-option" data-q="${qi}" data-a="${oi}" type="button">
              <span class="quiz-option__icon">${opt.icon}</span>
              <span>${opt.text}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Bind option clicks
    $$('.quiz-option', questionsWrap).forEach(btn => {
      btn.addEventListener('click', () => {
        const qi = parseInt(btn.dataset.q);
        const ai = parseInt(btn.dataset.a);
        answers[qi] = ai;

        $$('.quiz-option', questionsWrap).filter(b => parseInt(b.dataset.q) === qi)
          .forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        setTimeout(() => advanceQuiz(qi), 450);
      });
    });
  }

  updateProgress();
}

function advanceQuiz(qi) {
  const next = qi + 1;
  if (next < quizData.questions.length) {
    currentQ = next;
    $$('.quiz-question').forEach(el => el.classList.remove('active'));
    $(`.quiz-question[data-question="${next}"]`)?.classList.add('active');
    updateProgress();
  } else {
    showQuizResult();
  }
}

function updateProgress() {
  $$('.quiz-progress__dot').forEach((dot, i) => {
    dot.classList.toggle('done', i < currentQ);
    dot.classList.toggle('active', i === currentQ);
  });
}

function showQuizResult() {
  // Determine product recommendation
  const textureAnswer = answers[4];
  let product;
  if (textureAnswer === 1) product = quizData.results.stick;
  else if (textureAnswer === 2) product = quizData.results.mist;
  else product = quizData.results.lotion;

  // Also factor in activity level
  if (answers[3] >= 2 && textureAnswer !== 2) product = quizData.results.stick;

  const resultEl = $('.quiz-result');
  if (resultEl) {
    resultEl.querySelector('.quiz-result__product-img').src = product.img;
    resultEl.querySelector('.quiz-result__product-img').alt = product.name;
    resultEl.querySelector('.quiz-result__name').textContent = product.name;
    resultEl.querySelector('.quiz-result__reason').textContent = product.reason;
    resultEl.classList.add('active');
  }

  $$('.quiz-question').forEach(el => el.classList.remove('active'));
  $('.quiz-progress')?.querySelectorAll('.quiz-progress__dot').forEach(d => d.classList.add('done'));
}

function resetQuiz() {
  currentQ = 0;
  Object.keys(answers).forEach(k => delete answers[k]);
  $$('.quiz-question').forEach((el, i) => el.classList.toggle('active', i === 0));
  $$('.quiz-option').forEach(b => b.classList.remove('selected'));
  $('.quiz-result')?.classList.remove('active');
  updateProgress();
}

// Init quiz
initQuiz();
$('.quiz-restart')?.addEventListener('click', resetQuiz);

/* ── Rating Bar Animation ─────────────────── */
const ratingsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      $$('.rating-bar-fill', e.target).forEach(bar => {
        bar.style.width = bar.dataset.width || '0%';
      });
      ratingsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

$$('.rating-bars').forEach(el => {
  $$('.rating-bar-fill', el).forEach(bar => {
    const w = bar.style.width;
    bar.dataset.width = w;
    bar.style.width = '0%';
  });
  ratingsObserver.observe(el);
});

/* ── Sticky ATC ──────────────────────────── */
const stickyATC = $('.sticky-atc');
const heroSection = $('.hero');
function checkStickyATC() {
  if (!stickyATC || !heroSection) return;
  const rect = heroSection.getBoundingClientRect();
  stickyATC.classList.toggle('visible', rect.bottom < 0);
}

/* ── Toast ───────────────────────────────── */
function showToast(msg) {
  const toast = $('.toast');
  if (!toast) return;
  toast.querySelector('.toast-msg').textContent = msg;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 3000);
}

/* ── Quick Add / Add to Cart ─────────────── */
$$('.btn[data-action="add-to-cart"], .product-card__quick-add, .quiz-result__actions .btn--primary').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const productName = btn.closest('.product-card')?.querySelector('.product-card__name')?.textContent
      || btn.closest('.quiz-result')?.querySelector('.quiz-result__name')?.textContent
      || 'Product';
    showToast(`✓ ${productName} added to cart`);
    const count = $('.nav__cart-count');
    if (count) count.textContent = parseInt(count.textContent || '0') + 1;
  });
});

/* ── Email Form ──────────────────────────── */
$$('form.footer__email-form, form.email-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input?.value) {
      showToast('🌞 Welcome to the Sol Cura community!');
      input.value = '';
    }
  });
});

/* ── Smooth Anchor Links ─────────────────── */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = $(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) + 20;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      closeMobileNav();
    }
  });
});

/* ── Lazy Load Images ────────────────────── */
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  $$('img[data-src]').forEach(img => imgObserver.observe(img));
}

/* ── Init ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial scroll check
  checkStickyATC();
  // Set first routine step active
  $$('.routine-step')[0]?.classList.add('active');
  // Set first subscribe plan active
  $$('.subscribe-plan')[1]?.classList.add('active');
});
