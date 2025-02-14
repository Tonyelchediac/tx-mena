const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
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