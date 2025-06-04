// Back to Top Button
const backToTopButton = document.getElementById("back-to-top-button");

function toggleBackToTopButton() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // For smooth scrolling
  });
}

// Adding action listeners.
window.addEventListener("scroll", toggleBackToTopButton);
backToTopButton.addEventListener("click", scrollToTop);