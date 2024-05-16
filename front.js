// Define an array of colors
const colors = ['#C06C84', '#6C5B7B', '#355C7D', '#E6A9B8', '#AEB6BF', '#6D214F'];

function getRandomColor() {
  // Pick a random color from the colors array
  return colors[Math.floor(Math.random() * colors.length)];
}

function changeBorderColor() {
  let textBox = document.getElementById('collegeID');
  let button = document.getElementById('submitButton');
  let container = document.querySelector('.container-fluid');
  let color = getRandomColor();

  textBox.style.borderColor = color;
  button.style.backgroundColor = color;
  container.style.borderColor = color;
}

setInterval(changeBorderColor, 1000);

function checkID() {
  let collegeID = document.getElementById('collegeID').value.trim();
  if (collegeID === 'IGDTUW123') {
      alert('Welcome to ID Card generator');
      window.location.href = 'branch/Id card/department.html';
  } else {
      if (collegeID === '') {
          alert('Please enter your ID.');
      } else {
          alert('Invalid ID');
      }
  }
}
