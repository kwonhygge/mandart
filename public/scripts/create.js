const mainObjInput = document.querySelector('.mainbox-container .main-obj');
const sideSmallObjs = document.querySelectorAll('.small-boxes.side .small-obj');
const middleSmallObjs = document.querySelectorAll(
  '.small-boxes.middle .small-obj'
);

const applyTheme = () => {
  const themeId = sessionStorage.getItem('themeId');
  document.documentElement.setAttribute('data-theme', themeId);
};

const loadStorageDatas = () => {
  const mainObj = sessionStorage.getItem('mainObj');
  const smallObjs = JSON.parse(sessionStorage.getItem('smallObjs'));
  const mainTitle = sessionStorage.getItem('mainTitle');
  const mainTitleInput = document.getElementById('mainTitle');

  mainTitle.value = mainTitle;
  mainObjInput.value = mainObj;
  for (let i = 0; i < 8; i++) {
    sideSmallObjs[i].value = smallObjs[i];
    middleSmallObjs[i].value = smallObjs[i];
  }
};
function connectInput() {
  for (let i = 0; i < 8; i++) {
    middleSmallObjs[i].addEventListener('change', function (event) {
      giveValue(event.target, sideSmallObjs);
    });
    sideSmallObjs[i].addEventListener('change', function (event) {
      giveValue(event.target, middleSmallObjs);
    });
  }
}
function giveValue(target, other) {
  for (let i = 0; i < 8; i++) {
    if (target.name === other[i].name) {
      other[i].value = target.value;
    }
  }
}

const init = () => {
  applyTheme();
  loadStorageDatas();
  connectInput();
};

init();
