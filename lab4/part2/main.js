const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageFiles = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
const altTexts = {
    'pic1.jpg': 'Closeup of a human eye',
    'pic2.jpg': 'Rock formations on a beach',
    'pic3.jpg': 'Purple flowers',
    'pic4.jpg': 'Ancient temple',
    'pic5.jpg': 'Raindrops on a leaf'
  };

/* Looping through images */
imageFiles.forEach(file => {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${file}`);
    newImage.setAttribute('alt', altTexts[file]);
    thumbBar.appendChild(newImage);
  
    newImage.addEventListener('click', () => {
      displayedImage.src = `images/${file}`;
      displayedImage.alt = altTexts[file];
    });
  });

const newImage = document.createElement('img');
newImage.setAttribute('src', xxx);
newImage.setAttribute('alt', xxx);
thumbBar.appendChild(newImage);

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
    const className = btn.getAttribute('class');
    if (className === 'dark') {
      btn.setAttribute('class', 'light');
      btn.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    } else {
      btn.setAttribute('class', 'dark');
      btn.textContent = 'Darken';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
  });
  