// ---------- Sticky nav + active link ----------
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
const sections = document.querySelectorAll('section[id]');

const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Mobile menu ----------
const burger = document.querySelector('.nav__burger');
const links = document.querySelector('.nav__links');
if (burger) {
  burger.addEventListener('click', () => {
    links.classList.toggle('open');
    burger.textContent = links.classList.contains('open') ? '✕' : '☰';
  });

  document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      burger.textContent = '☰';
    });
  });
}

// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---------- 3D Card Flip on Scroll ----------
const flipObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('flipped-in');
      flipObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.project, .service, .testi').forEach(el => flipObserver.observe(el));

// ---------- Parallax tilt on hero images ----------
const heroImages = document.querySelectorAll('.hero__img');
if (heroImages.length && !window.matchMedia('(pointer: coarse)').matches) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    heroImages.forEach((img, i) => {
      const factor = i === 0 ? 1 : -1;
      const rotateX = y * -6 * factor;
      const rotateY = x * 6 * factor;
      img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${i === 0 ? -20 : 20}px)`;
    });
  });
}

// ---------- FAQ accordion ----------
document.querySelectorAll('.faq__item').forEach(item => {
  const q = item.querySelector('.faq__q');
  const a = item.querySelector('.faq__a');

  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq__item').forEach(other => {
      if (other !== item) {
        other.classList.remove('open');
        other.querySelector('.faq__a').style.maxHeight = 0;
      }
    });

    item.classList.toggle('open');
    a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : 0;
  });
});

// ---------- Animated stat counters ----------
const animateCount = (el) => {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const dur = 1600;
  const start = performance.now();

  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(0);

    if (p < 1) {
      el.textContent = val;
      requestAnimationFrame(step);
    } else {
      el.innerHTML = val + '<span class="suffix">' + suffix + '</span>';
    }
  };

  requestAnimationFrame(step);
};

const statIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target);
      statIO.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('[data-count]').forEach(el => statIO.observe(el));

// ---------- Contact form ----------
// const form = document.querySelector('.form');
// if (form) {
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const note = form.querySelector('.form__note');
//     note.textContent = 'Thanks — your message has been received. I will get back to you soon!';
//     note.style.color = 'var(--accent-2)';
//     form.reset();

//     setTimeout(() => {
//       note.textContent = 'This form is front-end only — connect it to your own email service or backend.';
//       note.style.color = 'var(--muted)';
//     }, 4000);
//   });
// }

// ---------- Smooth scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});