const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      const targetSection = document.querySelector(this.hash);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    navLinks.classList.remove('active');
  });
});

document.addEventListener('click', (event) => {
  const isClickInsideNavLinks = navLinks.contains(event.target);
  const isClickOnHamburger = hamburger.contains(event.target);

  if (!isClickInsideNavLinks && !isClickOnHamburger) {
    navLinks.classList.remove('active');
  }
});

document.querySelector(".scroll-to-contact").addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".scroll-to-project").addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector("#portfolio").scrollIntoView({ behavior: "smooth" });
});