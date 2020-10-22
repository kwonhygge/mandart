const pass1 = document.getElementById('password');
const pass2 = document.getElementById('password2');
const circle1 = document.querySelector('#password~.confirm-circle');
const circle2 = document.querySelector('#password2~.confirm-circle');
const circles = document.querySelectorAll(".confirm-circle");

const checkPassword = () => {
  const isLengthProper = checkLength();
  if (isLengthProper && pass2.value.length > 0) {
    if (pass1.value === pass2.value) {
      circle2.style.background = '#89A390';
    } else {
      circle1.style.background = '#FF0000';
      circle2.style.background = '#FF0000';
    }
  }

};

const checkLength = () => {
  if (pass1.value.length >= 6) {
    circle1.style.background = '#89A390'
    return true;
  } else {
    circle1.style.background = '#FF0000'
    return false;
  }

}

const init = () => {
  pass1.addEventListener('change', checkPassword);
  pass1.addEventListener('keyup', checkPassword);
  pass2.addEventListener('change', checkPassword);
  pass2.addEventListener('keyup', checkPassword);
};
init();
