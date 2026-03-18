/* app.js — HubStore interactive behaviours */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Product tab filtering ── */
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  /* ── Billing toggle (monthly / yearly) ── */
  const billingToggle = document.getElementById('billing-toggle');
  const amounts       = document.querySelectorAll('.amount');
  const monthlyPrices = ['0', '29', '99'];
  const yearlyPrices  = ['0', '23', '79'];
  const toggleLabels  = document.querySelectorAll('.toggle-label');

  if (billingToggle) {
    billingToggle.addEventListener('change', () => {
      const isYearly = billingToggle.checked;
      const prices   = isYearly ? yearlyPrices : monthlyPrices;
      amounts.forEach((el, i) => {
        el.textContent = prices[i] ?? el.textContent;
      });
      toggleLabels.forEach((lbl, i) => {
        lbl.classList.toggle('active', isYearly ? i === 1 : i === 0);
      });
    });
  }

  /* ── Scroll-based navbar shadow ── */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
      ? '0 1px 30px rgba(0,0,0,0.5)'
      : 'none';
  }, { passive: true });

  /* ── Mobile nav toggle ── */
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const navLinks     = document.querySelector('.nav-links');
  const navActions   = document.querySelector('.nav-actions');
  let mobileNavOpen  = false;

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileNavOpen = !mobileNavOpen;
      if (mobileNavOpen) {
        const NAV_HEIGHT   = 68;
        const LINK_HEIGHT  = 40;
        const LINK_PADDING = 56;
        const linkCount    = navLinks.querySelectorAll('li').length;
        const actionsTop   = NAV_HEIGHT + linkCount * LINK_HEIGHT + LINK_PADDING;
        navLinks.style.cssText = `
          display: flex;
          flex-direction: column;
          position: absolute;
          top: ${NAV_HEIGHT}px; left: 0; right: 0;
          background: rgba(10,10,10,0.97);
          backdrop-filter: blur(20px);
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          gap: 4px;
          z-index: 99;
        `;
        navActions.style.cssText = `
          display: flex;
          flex-direction: column;
          position: absolute;
          top: ${actionsTop}px;
          left: 0; right: 0;
          background: rgba(10,10,10,0.97);
          backdrop-filter: blur(20px);
          padding: 16px 24px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          gap: 8px;
          z-index: 99;
        `;
      } else {
        navLinks.style.cssText  = '';
        navActions.style.cssText = '';
      }
    });
  }

  /* ── Animate sections on scroll ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(
    '.feature-card, .product-card, .pricing-card, .testimonial-card, .step-card'
  ).forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(el);
  });

  /* add .visible handler via stylesheet */
  const style = document.createElement('style');
  style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
