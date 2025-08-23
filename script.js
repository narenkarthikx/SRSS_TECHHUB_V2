// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("show")

      // Update button icon
      const icon = mobileMenuBtn.querySelector("i")
      if (mobileMenu.classList.contains("show")) {
        icon.className = "fas fa-times"
      } else {
        icon.className = "fas fa-bars"
      }
    })

    const mobileLinks = mobileMenu.querySelectorAll("a")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("show")
        const icon = mobileMenuBtn.querySelector("i")
        icon.className = "fas fa-bars"
      })
    })

    document.addEventListener("click", (e) => {
      if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove("show")
        const icon = mobileMenuBtn.querySelector("i")
        icon.className = "fas fa-bars"
      }
    })
  }

  // Technical Expertise Card Scroll
  const setupTechExpertiseScroll = function() {
    const scrollContainer = document.getElementById('tech-scroll');
    const leftBtn = document.querySelector('.scroll-left');
    const rightBtn = document.querySelector('.scroll-right');
    const scrollIndicatorContainer = document.getElementById('scroll-indicator');
    
    // Exit if elements don't exist
    if (!scrollContainer || !scrollIndicatorContainer) return;
    
    const cards = scrollContainer.querySelectorAll('.tech-expertise-card');
    if (cards.length === 0) return;
    
    // Calculate card width including gap
    const cardWidth = cards[0].offsetWidth;
    const cardGap = 24; // 1.5rem converted to pixels
    const scrollAmount = cardWidth + cardGap;
    
    // Create scroll indicator dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('scroll-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToCard(index));
        scrollIndicatorContainer.appendChild(dot);
    });
    
    // Update active dot based on scroll position
    function updateActiveDot() {
        const scrollLeft = scrollContainer.scrollLeft;
        const containerWidth = scrollContainer.clientWidth;
        const scrollableWidth = scrollContainer.scrollWidth;
        
        // Calculate which card is most visible
        const currentIndex = Math.round(scrollLeft / scrollAmount);
        
        // Update active dot
        document.querySelectorAll('.scroll-dot').forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Hide/show scroll buttons based on position
        if (leftBtn) {
            if (scrollLeft <= 10) {
                leftBtn.style.opacity = '0.5';
            } else {
                leftBtn.style.opacity = '1';
            }
        }
        
        if (rightBtn) {
            if (scrollLeft >= scrollableWidth - containerWidth - 10) {
                rightBtn.style.opacity = '0.5';
            } else {
                rightBtn.style.opacity = '1';
            }
        }
    }
    
    // Scroll to specific card
    function scrollToCard(index) {
        scrollContainer.scrollTo({
            left: index * scrollAmount,
            behavior: 'smooth'
        });
    }
    
    // Scroll buttons
    if (leftBtn) {
        leftBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
    }
    
    if (rightBtn) {
        rightBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
    
    // Update active dot on scroll
    scrollContainer.addEventListener('scroll', updateActiveDot);
    
    // Initial update
    updateActiveDot();

    // Touch swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    scrollContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    scrollContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left, scroll right
            scrollContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right, scroll left
            scrollContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    }
  };

  // Initialize tech expertise scroll
  setupTechExpertiseScroll();

  // Process step interaction
  const processSteps = document.querySelectorAll(".process-step")
  const stepContents = document.querySelectorAll(".step-content")

  processSteps.forEach((step) => {
    step.addEventListener("click", function () {
      const stepNumber = this.getAttribute("data-step")

      // Remove active class from all steps
      processSteps.forEach((s) => {
        s.classList.remove("active")
        s.style.transform = "scale(1)"
      })

      // Add active class to clicked step
      this.classList.add("active")
      this.style.transform = "scale(1.05)"

      // Hide all step contents
      stepContents.forEach((content) => {
        content.classList.remove("active")
        content.style.display = "none"
      })

      // Show selected step content with animation
      const targetContent = document.querySelector(`[data-step="${stepNumber}"].step-content`)
      if (targetContent) {
        targetContent.classList.add("active")
        targetContent.style.display = "block"
        targetContent.style.opacity = "0"
        setTimeout(() => {
          targetContent.style.opacity = "1"
        }, 50)
      }
    })

    step.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.98)"
    })

    step.addEventListener("touchend", function () {
      if (!this.classList.contains("active")) {
        this.style.transform = "scale(1)"
      } else {
        this.style.transform = "scale(1.05)"
      }
    })

    // Add hover effects (desktop only)
    step.addEventListener("mouseenter", function () {
      if (!this.classList.contains("active") && window.innerWidth > 768) {
        this.style.transform = "scale(1.02)"
      }
    })

    step.addEventListener("mouseleave", function () {
      if (!this.classList.contains("active") && window.innerWidth > 768) {
        this.style.transform = "scale(1)"
      }
    })
  })

  // Set first step as active by default
  if (processSteps.length > 0) {
    processSteps[0].classList.add("active")
    processSteps[0].style.transform = "scale(1.05)"

    // Show first step content
    const firstContent = document.querySelector('[data-step="1"].step-content')
    if (firstContent) {
      firstContent.classList.add("active")
      firstContent.style.display = "block"
    }
  }

  // FAQ toggle functionality
  const faqItems = document.querySelectorAll(".faq-item")
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")
    const icon = question.querySelector("i")

    question.addEventListener("click", () => {
      const isOpen = !answer.classList.contains("hidden")

      // Close all other FAQs
      faqItems.forEach((otherItem) => {
        const otherAnswer = otherItem.querySelector(".faq-answer")
        const otherIcon = otherItem.querySelector(".faq-question i")
        otherAnswer.classList.add("hidden")
        otherIcon.style.transform = "rotate(0deg)"
      })

      // Toggle current FAQ
      if (!isOpen) {
        answer.classList.remove("hidden")
        icon.style.transform = "rotate(180deg)"
      }
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  const contactForm = document.getElementById("contact-form")
  const submitBtn = document.getElementById("submit-btn")
  const successMessage = document.getElementById("success-message")

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault()

      // Basic form validation
      const requiredFields = this.querySelectorAll("[required]")
      let isValid = true

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          field.classList.add("border-red-500")
          isValid = false
        } else {
          field.classList.remove("border-red-500")
        }
      })

      if (!isValid) {
        // Show validation error without alert
        requiredFields.forEach((field) => {
          if (!field.value.trim()) {
            field.focus()
            if (window.innerWidth <= 768) {
              field.scrollIntoView({ behavior: "smooth", block: "center" })
            }
            return
          }
        })
        return
      }

      // Show loading state
      submitBtn.disabled = true
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...'

      try {
        // Submit to Formspree
        const formData = new FormData(this)
        const response = await fetch(this.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        })

        if (response.ok) {
          // Show success message on page
          this.style.display = "none"
          successMessage.classList.remove("hidden")

          // Scroll to success message
          successMessage.scrollIntoView({ behavior: "smooth", block: "center" })
        } else {
          throw new Error("Form submission failed")
        }
      } catch (error) {
        // Show error message without alert
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>Error - Try Again'
        submitBtn.classList.add("bg-red-500", "hover:bg-red-600")

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false
          submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Send Message'
          submitBtn.classList.remove("bg-red-500", "hover:bg-red-600")
        }, 3000)
      }
    })
  }
})

// Global functions for button clicks
function startJourney() {
  window.location.href = "contact.html"
}

function exploreServices() {
  window.location.href = "services.html"
}

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
    navbar.classList.add("shadow-xl")
  } else {
    navbar.classList.remove("scrolled")
    navbar.classList.remove("shadow-xl")
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

window.addEventListener("orientationchange", () => {
  // Close mobile menu on orientation change
  const mobileMenu = document.getElementById("mobile-menu")
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")

  if (mobileMenu && mobileMenuBtn) {
    mobileMenu.classList.remove("show")
    const icon = mobileMenuBtn.querySelector("i")
    if (icon) {
      icon.className = "fas fa-bars"
    }
  }
})
