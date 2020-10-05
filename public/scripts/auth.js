const pass1 = document.getElementById('password1');
const pass2 = document.getElementById('password2');
const circles = document.querySelectorAll('.confirm-circle');

const checkPassword = () => {
  if (pass1.value === pass2.value) {
    circles.forEach((circle) => (circle.style.background = 'green'));
  } else {
    circles.forEach((circle) => (circle.style.background = 'red'));
  }
};

const init = () => {
  pass1.addEventListener('change', checkPassword);
  pass2.addEventListener('change', checkPassword);
};
init();
