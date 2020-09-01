const createBox = document.querySelector('.create-box');
const themeBtns = document
  .querySelector('.theme-colors')
  .getElementsByTagName('input');
const colors = ['green', 'pink', 'blue', 'olive', 'purple', 'dark'];

function handleThemeColor(target) {
  createBox.classList.add(target.id);
  for (let i = 0; i < colors.length; i++) {
    if (colors[i] !== target.id) {
      createBox.classList.remove(colors[i]);
    }
  }
}

function init() {
  for (let i = 0; i < themeBtns.length; i++) {
    themeBtns[i].addEventListener('click', function (event) {
      handleThemeColor(event.target);
    });
  }
}

init();
