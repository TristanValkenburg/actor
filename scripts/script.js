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

const cards = document.querySelectorAll('section.work > div > article');
const transitionDuration = 300; // match CSS opacity duration in ms

cards.forEach(card => {
  const link = card.querySelector('a');

  card.addEventListener('click', e => {
    if (window.matchMedia('(hover: none)').matches) {
      const targetLink = e.target.closest('a');

      if (!card.classList.contains('hovered')) {
        // First tap → show overlay
        if (targetLink) e.preventDefault(); // block immediate navigation

        // Close other cards
        cards.forEach(c => {
          if (c !== card) {
            hideCard(c);
            c.classList.remove('hovered');
          }
        });

        showCard(card);
      } else {
        // Already hovered
        if (!targetLink) {
          // Tap outside the link → hide overlay
          hideCard(card);
        }
        // If link → allow navigation
      }
    }
  });
});

// Optional: close all cards when tapping outside
document.addEventListener('click', e => {
  if (window.matchMedia('(hover: none)').matches) {
    if (!e.target.closest('section.work > div > article')) {
      cards.forEach(card => hideCard(card));
    }
  }
});

// --- helper functions ---
function showCard(card) {
  const link = card.querySelector('a');
  card.classList.add('hovered');
  link.style.display = 'flex';
  // small timeout to trigger transition
  setTimeout(() => {
    link.style.opacity = '1';
    link.style.pointerEvents = 'auto';
  }, 10);
}

function hideCard(card) {
  const link = card.querySelector('a');
  card.classList.remove('hovered');
  link.style.opacity = '0';
  link.style.pointerEvents = 'none';
  setTimeout(() => {
    link.style.display = 'none';
  }, transitionDuration);
}




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