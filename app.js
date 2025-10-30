// Navigation
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const navHeight = nav.offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add active class to nav on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  // Update active nav link based on scroll position
  let current = '';
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - nav.offsetHeight - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});



// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all FAQ items
    faqItems.forEach(faqItem => {
      faqItem.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Portfolio Lightbox
const portfolioItems = document.querySelectorAll('.portfolio-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
const images = [];

// Collect all portfolio images
portfolioItems.forEach((item, index) => {
  const img = item.querySelector('img');
  images.push({
    src: img.src,
    alt: img.alt
  });
  
  item.addEventListener('click', () => {
    openLightbox(index);
  });
});

function openLightbox(index) {
  currentImageIndex = index;
  lightboxImage.src = images[index].src;
  lightboxImage.alt = images[index].alt;
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  lightboxImage.src = images[currentImageIndex].src;
  lightboxImage.alt = images[currentImageIndex].alt;
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  lightboxImage.src = images[currentImageIndex].src;
  lightboxImage.alt = images[currentImageIndex].alt;
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    }
  }
});

// Order Form Validation and Submission
const orderForm = document.getElementById('orderForm');
const formSuccess = document.getElementById('formSuccess');

if (orderForm) {
  const formInputs = orderForm.querySelectorAll('.form-control');
  
  // Real-time validation
  formInputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateInput(input);
    });
    
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) {
        validateInput(input);
      }
    });
  });
  
  function validateInput(input) {
    // Only validate if field is required and empty
    if (input.hasAttribute('required')) {
      if (!input.value.trim()) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        return false;
      }
      
      if (input.type === 'tel') {
        const phoneRegex = /^\+?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(input.value)) {
          input.classList.add('invalid');
          input.classList.remove('valid');
          return false;
        }
      }
    }
    
    input.classList.remove('invalid');
    input.classList.add('valid');
    return true;
  }
  
  // Form submission
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all inputs
    let isValid = true;
    formInputs.forEach(input => {
      if (!validateInput(input) && input.hasAttribute('required')) {
        isValid = false;
      }
    });
    
    if (isValid) {
      // Simulate form submission
      orderForm.style.opacity = '0.5';
      orderForm.style.pointerEvents = 'none';
      
      setTimeout(() => {
        orderForm.style.display = 'none';
        formSuccess.classList.remove('hidden');
        
        // Reset form after 5 seconds
        setTimeout(() => {
          orderForm.reset();
          orderForm.style.opacity = '1';
          orderForm.style.pointerEvents = 'auto';
          orderForm.style.display = 'block';
          formSuccess.classList.add('hidden');
          formInputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
          });
        }, 5000);
      }, 1000);
    }
  });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('Спасибо! Ваше сообщение отправлено.');
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1000);
  });
}

// Scroll animations for sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to elements that should animate
const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .process-step');
animatedElements.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Phone number formatting
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
  input.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      if (value[0] === '7' || value[0] === '8') {
        value = '7' + value.substring(1);
      }
      let formatted = '+7';
      if (value.length > 1) {
        formatted += ' (' + value.substring(1, 4);
      }
      if (value.length >= 5) {
        formatted += ') ' + value.substring(4, 7);
      }
      if (value.length >= 8) {
        formatted += '-' + value.substring(7, 9);
      }
      if (value.length >= 10) {
        formatted += '-' + value.substring(9, 11);
      }
      e.target.value = formatted;
    }
  });
});

// Loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

console.log('Швейное Ателье - Website loaded successfully!');