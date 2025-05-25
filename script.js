
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