// =============================================
// STEP 1: Set up the image array 
// =============================================
const images = [
  './assets/image-content/image-1.png',
  './assets/image-content/image-2.png',
  './assets/image-content/image-3.png',
  './assets/image-content/image-4.png',
  './assets/image-content/image-5.png',
  './assets/image-content/image-6.png'
];

// =============================================
// STEP 2: Reference HTML elements 
// =============================================
const imageContent = document.querySelector('.image-content');   // Image container
const mainButton = document.getElementById('main-button');       // Image switch button
const finalMessage = document.querySelector('.final-message');   // Final message

// NEW: Letter popup elements (make sure these IDs exist in index.html)
const letterOverlay = document.getElementById('letter-overlay');
const letterClose = document.getElementById('letter-close');

// =============================================
// STEP 3: Track what image we're at 
// =============================================
let currentIndex = 0;

// =============================================
// STEP 4: Update image function 
// =============================================
function updateImage() {
  imageContent.style.opacity = 0;

  const img = new Image();
  img.src = images[currentIndex];

  img.onload = () => {
    imageContent.style.backgroundImage = `url('${images[currentIndex]}')`;
    imageContent.style.opacity = 1;
  };
}

// =============================================
// STEP 5: Letter open/close functions
// =============================================
function openLetter() {
  // safety check in case IDs are missing
  if (!letterOverlay) return;
  letterOverlay.classList.add('show');
}

function closeLetter() {
  if (!letterOverlay) return;
  letterOverlay.classList.remove('show');
}

// Close button click
if (letterClose) {
  letterClose.addEventListener('click', closeLetter);
}

// Optional: click outside the card closes the popup
if (letterOverlay) {
  letterOverlay.addEventListener('click', (e) => {
    if (e.target === letterOverlay) closeLetter();
  });
}

// Optional: press Escape to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLetter();
});

// =============================================
// STEP 6: Initial image display 
// =============================================
updateImage();

// =============================================
// STEP 7: Button click handler 
// =============================================
mainButton.addEventListener('click', () => {
  currentIndex++;

  if (currentIndex < images.length) {
    updateImage();
  }

  // When we reach the last image
  if (currentIndex === images.length - 1) {
    mainButton.style.display = 'none';
    finalMessage.style.display = 'block';

    // NEW: open the letter popup
    openLetter();
  }
});
