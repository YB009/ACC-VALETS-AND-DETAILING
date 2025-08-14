document.addEventListener('DOMContentLoaded', () => {
    console.log('ACC Valets & Detailing loaded');
  
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
      });
      
      // Close mobile menu when clicking on a link
      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenuBtn.classList.remove('active');
          mobileNav.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
          mobileMenuBtn.classList.remove('active');
          mobileNav.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  
    // Smooth scroll for nav (both desktop and mobile)
    document.querySelectorAll('nav a, .desktop-nav a, .mobile-nav a').forEach(link => {
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

    // Gallery image click to zoom
    const galleryImages = document.querySelectorAll('.gallery img');
    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        createLightbox(img.src, img.alt);
      });
    });

    // Gallery auto-scroll hint
    const gallery = document.querySelector('.gallery');
    if (gallery) {
      let isScrolling = false;
      
      gallery.addEventListener('scroll', () => {
        isScrolling = true;
        clearTimeout(gallery.scrollTimeout);
        gallery.scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 150);
      });

      // Add scroll hint on hover
      gallery.addEventListener('mouseenter', () => {
        if (!isScrolling) {
          gallery.style.cursor = 'grab';
        }
      });
    }

    // Initialize reviews slider
    initializeReviewsSlider();
  });

  // Lightbox functionality
  function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img src="${src}" alt="${alt}">
        <button class="lightbox-close">&times;</button>
      </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Close lightbox
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.className === 'lightbox-close') {
        document.body.removeChild(lightbox);
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.contains(lightbox)) {
        document.body.removeChild(lightbox);
      }
    });
  }

// Reviews slider functionality
let currentReviewIndex = 0;
let totalReviews = 0;

function initializeReviewsSlider() {
  const slider = document.querySelector('.reviews-slider');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (!slider || !dotsContainer) return;
  
  const reviewCards = slider.querySelectorAll('.review-card');
  totalReviews = reviewCards.length;
  
  // Create dots
  for (let i = 0; i < totalReviews; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToReview(i));
    dotsContainer.appendChild(dot);
  }
  
  // Set initial position
  updateSliderPosition();
}

function slideReviews(direction) {
  if (direction === 'next') {
    currentReviewIndex = (currentReviewIndex + 1) % totalReviews;
  } else {
    currentReviewIndex = currentReviewIndex === 0 ? totalReviews - 1 : currentReviewIndex - 1;
  }
  
  updateSliderPosition();
}

function goToReview(index) {
  currentReviewIndex = index;
  updateSliderPosition();
}

function updateSliderPosition() {
  const slider = document.querySelector('.reviews-slider');
  const dots = document.querySelectorAll('.dot');
  const cardWidth = 350 + 32; // card width + gap
  
  if (slider) {
    slider.scrollTo({
      left: currentReviewIndex * cardWidth,
      behavior: 'smooth'
    });
  }
  
  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentReviewIndex);
  });
}
  