const nav = document.querySelector("nav");
const h1 = document.querySelector("h1");
const vh = window.innerHeight;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // --- Nav shadow ---
  if (scrollY > 0.2 * vh) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  // --- Header fade ---
  const start = 0.3 * vh;
  const end   = 0.8 * vh;
  let opacity;

  if (scrollY <= start) {
    opacity = 1;
  } else if (scrollY >= end) {
    opacity = 0;
  } else {
    opacity = 1 - (scrollY - start) / (end - start);
  }

  h1.style.opacity = opacity;
});

// --- Card hover mobile ---
const cards = document.querySelectorAll('section.work > div > article');

cards.forEach(card => {
  card.addEventListener('click', e => {
    if (window.matchMedia('(hover: none)').matches) {
      const isHovered = card.classList.contains('hovered');

      if (!isHovered) {
        // First tap → reveal overlay
        e.preventDefault();  // block any link click
        cards.forEach(c => c.classList.remove('hovered'));
        card.classList.add('hovered');
      } else {
        // Already hovered
        const linkClicked = e.target.closest('a');
        if (!linkClicked) {
          // tap outside link → close overlay
          e.preventDefault();
          card.classList.remove('hovered');
        }
        // tap on link → do nothing, allow navigation
      }
    }
  });
});

// Close overlays when clicking outside any card
document.addEventListener('click', e => {
  if (window.matchMedia('(hover: none)').matches) {
    if (!e.target.closest('section.work > div > article')) {
      cards.forEach(c => c.classList.remove('hovered'));
    }
  }
});




// ---POP IN ANIMATION ---
// assign popIn to wrapper children first
document.querySelectorAll('.popInWrapper').forEach(wrapper => {
  wrapper.querySelectorAll(':scope > *').forEach(child => child.classList.add('popIn'));
});

// select all .popIn
const popIn = document.querySelectorAll('.popIn');

const maxDelayItems = 12;      // ---adjust depending on landing page items---
const delayStep = 0.07;        // seconds per stagger

// add delay to landing page
popIn.forEach((el, i) => {
  if (i < maxDelayItems) {
    el.style.transitionDelay = `${i * delayStep}s`;
  } else {
    el.style.transitionDelay = `0s`;
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // stop observing after first trigger
    }
  });
}, { threshold: 0.1 });

popIn.forEach(el => observer.observe(el));