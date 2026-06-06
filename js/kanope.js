// SEKOYA — interactions
(function () {
  'use strict';

  // Sticky nav
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Burger menu
  const burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('.nav__links a').forEach((a) =>
      a.addEventListener('click', () => nav.classList.remove('open'))
    );
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // Contact form (frontend only — wire up to a backend / Formspree to send real emails)
  const form = document.querySelector('.form form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const card = document.querySelector('.form');
      const success = card.querySelector('.form__success');
      form.style.display = 'none';
      if (success) success.classList.add('show');
    });
  }

  // About photo: click to upload
  const photoSlot = document.querySelector('.about__photo');
  if (photoSlot) {
    const input = photoSlot.querySelector('input[type="file"]');
    const img = photoSlot.querySelector('img');
    photoSlot.addEventListener('click', () => input && input.click());
    if (input) {
      input.addEventListener('change', () => {
        const file = input.files && input.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        img.src = url;
        photoSlot.classList.add('has-image');
      });
    }
  }
})();
