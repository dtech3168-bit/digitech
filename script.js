
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});






// TESTIMONIAL
const wrapper = document.querySelector(".testimonials-wrapper");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let currentIndex = 0;
const cards = document.querySelectorAll(".testimonial-card");
const totalCards = cards.length;

function slideTo(index) {
  const cardWidth = wrapper.clientWidth; // full visible width
  wrapper.scrollTo({
    left: cardWidth * index,
    behavior: "smooth"
  });
  currentIndex = index;
}

// Buttons
nextBtn.addEventListener("click", () => {
  if (currentIndex < totalCards - 1) slideTo(currentIndex + 1);
  else slideTo(0);
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) slideTo(currentIndex - 1);
  else slideTo(totalCards - 1);
});

// Auto slide every 4 seconds
setInterval(() => {
  if (currentIndex < totalCards - 1) slideTo(currentIndex + 1);
  else slideTo(0);
}, 4000);

// Adjust on window resize
window.addEventListener("resize", () => {
  slideTo(currentIndex);
}); 

// CONTACT
const contactSection = document.getElementById('contact');
const neonLines = document.querySelector('.neon-lines');
const contactForm = document.querySelector('.contact-form');
const formSuccess = document.getElementById('formSuccess');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      // Activate neon lines collision
      neonLines.classList.add('active');

      // Delay form fade-in after lines collide
      setTimeout(() => {
        contactForm.classList.add('active');
      }, 600); // matches collision duration

      observer.disconnect();
    }
  });
}, { threshold: 0.3 });

observer.observe(contactSection);

// Handle form submission with Web3Forms API
contactForm.addEventListener('submit', function(e){
  e.preventDefault();
  const formData = new FormData(contactForm);

  fetch(contactForm.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => response.json())
  .then(data => {
    if(data.success){
      formSuccess.classList.add('show');
      contactForm.reset();
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    } else {
      alert("There was an error. Please try again.");
    }
  })
  .catch(() => alert("There was an error. Please try again."));
}); 
  //  BLOG
  const blogCards = document.querySelectorAll(".blog-card");

function revealCardsSequentially() {
  let delay = 0;

  blogCards.forEach(card => {
    setTimeout(() => {
      card.classList.add("show");
    }, delay);

    delay += 300; // fade in one after the other
  });
}

const blogObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      revealCardsSequentially();
      blogObserver.disconnect();
    }
  });
}, { threshold: 0.2 });

blogObserver.observe(document.querySelector(".blog-container")); 



// TECH I USE
const techCards = document.querySelectorAll(".tech-card");
const progressBars = document.querySelectorAll(".progress");

function showTechCards() {
  let delay = 0;

  techCards.forEach(card => {
    setTimeout(() => {
      card.classList.add("show");
    }, delay);
    delay += 200;
  });
}

function fillBars() {
  progressBars.forEach(bar => {
    bar.style.width = bar.getAttribute("data-width");
  });
}

const techObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      showTechCards();
      fillBars();
      techObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

techObserver.observe(document.querySelector(".tech-section")); 

// Accordion
document.querySelectorAll(".faq-clean-item").forEach(item => {
  item.addEventListener("click", () => {
      item.classList.toggle("active");
  });
});

// Fade-In On Scroll
const fadeElements = document.querySelectorAll(".fade-in");

function fadeInOnScroll() {
  fadeElements.forEach(el => {
      const position = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight - 100;

      if (position < windowHeight) {
          el.classList.add("show");
      }
  });
}

window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll); 




const resumeSection = document.querySelector(".resume-section");

window.addEventListener("scroll", () => {
    const sectionTop = resumeSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (sectionTop < screenHeight - 100) {
        resumeSection.classList.add("show");
    }
}); 








///

// Automatically fetch and bind screenshots using Microlink Screenshot API
document.addEventListener("DOMContentLoaded", () => {
  // Auto-fetch screenshots and manage loading state
  const cards = document.querySelectorAll(".portfolio-card");
  cards.forEach(card => {
    const url = card.getAttribute("data-url");
    const imgElement = card.querySelector(".project-thumb");
    const container = card.querySelector(".img-container");
        
    if (url && imgElement) {
      const screenshotApiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
            
      imgElement.src = screenshotApiUrl;
            
      // Hide spinner and fade in image once loaded
      imgElement.onload = () => {
        imgElement.classList.add("loaded");
        if (container) container.classList.add("loaded");
      };

      // Fallback in case of network error
      imgElement.onerror = () => {
        if (container) container.classList.add("loaded");
      };
    }
  });

  // Project descriptions data
  const projects = {
    proj1: {
      text: `<h2>BizPilot</h2>
           <p>Full-stack SaaS application built with Laravel/PHP, JavaScript, MySQL and REST APIs, featuring WhatsApp automation, AI integrations, payment processing, CRM, inventory, order management and invoice generation.</p>`
    },
    proj2: {
      text: `<h2>Revelation Vault</h2>
           <p>NFT marketplace built with PHP, MySQL, JavaScript, HTML/CSS, and Solana integration, implementing dynamic NFT listings, asset detail pages, authentication, wallet interactions, and backend marketplace workflows.</p>`
    },
    proj3: {
      text: `<h2>Elite cars</h2>
           <p>Frontend car dealership website built with HTML5, CSS3, and JavaScript, featuring responsive layouts, interactive vehicle listings, animated UI components, inventory browsing, and a modern luxury-focused user interface.</p>`
    },
    proj4: {
      text: `<h2>Greaselogs</h2>
           <p>Social media account marketplace built with PHP, MySQL, JavaScript, HTML/CSS, and AcctShop REST API integration, featuring API-driven inventory, dynamic listings, authentication, order processing, payment workflows, and backend marketplace management.</p>`
    },
    proj5: {
      text: `<h2>Fast Clothing</h2>
           <p>Responsive fashion e-commerce platform built with HTML5, CSS3, JavaScript, PHP, and MySQL, featuring dynamic product listings, shopping workflows, responsive UI components, product browsing, and customer-focused navigation. The project demonstrates frontend development, backend integration, database-driven content, and e-commerce functionality across desktop and mobile devices.</p>`
    },
    proj6: {
      text: `<h2>Smartech</h2>
           <p>Smartech is a full-stack digital services platform built with HTML5, CSS3, JavaScript, PHP, and MySQL, featuring responsive web interfaces, service management, business-focused workflows, contact integrations, and dynamic backend functionality. The project demonstrates end-to-end development, from frontend UI implementation to backend logic and database integration.</p>`
    },
    proj7: {
      text: `<h2>Ptecho</h2>
           <p>A modern web application built with HTML5, CSS3, and JavaScript, featuring responsive design, interactive elements, and a clean user interface.</p>`
    },
    proj8: {
      text: `<h2>Veridian</h2>
           <p>A modern professional cleaning service website built with HTML5, CSS3, and JavaScript.</p>`
    },

proj9: {
  text: `<h2>Carepharm<h2>
      <p> A modern, responsive pharmacy website for browsing and exploring healthcare products, built with React and TypeScript.</p>`
}
    
  };

  const popup = document.getElementById("project-popup");
  const popupText = document.getElementById("popup-text");
  const popupImage = document.getElementById("popup-image");
  const popupVisitBtn = document.getElementById("popup-visit-btn");
  const closePopupBtn = document.querySelector(".close-popup");

  // Open popup on "View Project"
  document.querySelectorAll(".btn-project").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = btn.closest(".portfolio-card");
      const projID = card.getAttribute("data-project");
      const url = card.getAttribute("data-url");
      const thumbSrc = card.querySelector(".project-thumb").src;

      // Populate popup details
      if (projects[projID]) popupText.innerHTML = projects[projID].text;
      popupImage.src = thumbSrc || '';
      popupVisitBtn.href = url || '#';

      // Show popup with scale-up entrance animation
      if (popup) popup.classList.add("active");
    });
  });

  // Close popup handlers
  function closePopup() {
    if (popup) popup.classList.remove("active");
  }

  if (closePopupBtn) closePopupBtn.addEventListener("click", closePopup);
  if (popup) popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup();
    }
  });

  // Scroll fade-in effect for cards
  const portfolioCards = document.querySelectorAll(".fade-in");

  function fadeInPortfolio() {
    portfolioCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;

      if (cardTop < screenHeight - 50) {
        card.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", fadeInPortfolio);
  fadeInPortfolio();
});