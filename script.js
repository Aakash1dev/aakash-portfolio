
document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-white", "shadow-md");
      navbar.classList.remove("bg-white/80");
    } else {
      navbar.classList.remove("bg-white", "shadow-md");
      navbar.classList.add("bg-white/80");
    }
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const closeMenu = document.getElementById("close-menu");
  const mobileNav = document.getElementById("mobile-nav");
  const navBackdrop = document.getElementById("nav-backdrop");

  menuToggle.addEventListener("click", function () {
    mobileNav.classList.add("open");
    navBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  closeMenu.addEventListener("click", function () {
    mobileNav.classList.remove("open");
    navBackdrop.classList.remove("open");
    document.body.style.overflow = "";
  });

  navBackdrop.addEventListener("click", function () {
    mobileNav.classList.remove("open");
    navBackdrop.classList.remove("open");
    document.body.style.overflow = "";
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = mobileNav.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileNav.classList.remove("open");
      navBackdrop.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Scroll animations
  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeInObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeInObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  fadeElements.forEach((element) => {
    fadeInObserver.observe(element);
  });

  // Active nav highlighting
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  sections.forEach((section) => {
    navObserver.observe(section);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Skill bars animation
  const skillBars = document.querySelectorAll(".skill-progress");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.width = "0";
          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);
          skillObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  skillBars.forEach((bar) => {
    skillObserver.observe(bar);
  });
});


// Contact me message

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const subjectInput = document.getElementById('subject');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formStatus = document.getElementById('form-status');

  function validateName() {
    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Name is required';
      nameInput.classList.add('input-error');
      return false;
    } else {
      nameError.textContent = '';
      nameInput.classList.remove('input-error');
      return true;
    }
  }

  function validateEmail() {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailInput.value.trim() === '') {
      emailError.textContent = 'Email is required';
      emailInput.classList.add('input-error');
      return false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = 'Invalid email format';
      emailInput.classList.add('input-error');
      return false;
    } else {
      emailError.textContent = '';
      emailInput.classList.remove('input-error');
      return true;
    }
  }

  function validateMessage() {
    if (messageInput.value.trim() === '') {
      messageError.textContent = 'Message is required';
      messageInput.classList.add('input-error');
      return false;
    } else {
      messageError.textContent = '';
      messageInput.classList.remove('input-error');
      return true;
    }
  }

  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  messageInput.addEventListener('input', validateMessage);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
      formStatus.textContent = 'Sending...';
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim()
      };

      //  Send data to the server
      fetch('https://my-portfolio-backend-lwp7.onrender.com/send-message', {  //  Ensure this matches your server endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => {
          if (response.ok) {
            formStatus.textContent = 'Message sent successfully!';
            form.reset();
          } else {
            return response.json().then(errorData => {
              throw new Error(errorData.message || 'Failed to send message');
            });
          }
        })
        .catch(error => {
          formStatus.textContent = 'Error: ' + error.message;
        });
    } else {
      formStatus.textContent = 'Please fix the errors above.';
    }
  });
});
