function scrollToTop() {
  // Scroll to the top of the page.
  // Without this, if we already scrolled down we will go to the next
  // page and start already scrolled down.
  window.scrollTo(0, 0);
}

export default scrollToTop;
