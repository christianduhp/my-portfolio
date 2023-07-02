let currentSectionIndex = 0; // Index of the current section
let scrolling = false; // Flag to check if scrolling is in progress
const duration = 600; // Duration of the animation in milliseconds

// Function to scroll to the next section
function scrollToSection(sectionId) {
  if (window.innerWidth >= 1024) { // Check if the window width is greater than or equal to 1024
    const section = document.querySelector(sectionId);
    const start = window.pageYOffset;
    const end = section.offsetTop;    
    let startTime = null;

    function animate(currentTime) {
      if (startTime === null) {
        startTime = currentTime;
      }
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easing(progress);
      window.scrollTo(0, start + (end - start) * ease);
      if (timeElapsed < duration) {
        requestAnimationFrame(animate);
      }
    }

    function easing(t) {
      // Easing function to control the animation speed
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    requestAnimationFrame(animate);
  }
}

// Mouse scroll event
window.addEventListener('wheel', function(event) {
  if (!scrolling) { // Check if scrolling is not already in progress
    scrolling = true;
    // Detect whether the scroll was up or down
    const direction = event.deltaY > 0 ? 'down' : 'up';

    // Get the sections
    const sections = document.querySelectorAll('.section');

    // Calculate the index of the next or previous section
    let nextIndex;
    if (direction === 'down') {
      nextIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
    } else {
      nextIndex = Math.max(currentSectionIndex - 1, 0);
    }

    // Get the ID of the next or previous section
    const nextSectionId = '#' + sections[nextIndex].id;

    // Scroll to the next or previous section
    scrollToSection(nextSectionId);

    // Update the index of the current section
    currentSectionIndex = nextIndex;

    // Wait for an interval to enable scrolling again
    setTimeout(function() {
      scrolling = false;
    }, duration); // Set the duration of the animation plus an interval to prevent fast scrolls

    event.preventDefault();
  }
});
