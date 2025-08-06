document.addEventListener('DOMContentLoaded', () => {
    console.log('ACC Valets & Detailing loaded');
  
    // Smooth scroll for nav
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', e => {
        if (link.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  
    // Booking form submit placeholder
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        alert('Your booking request has been submitted!');
        form.reset();
      });
    }
  });
  