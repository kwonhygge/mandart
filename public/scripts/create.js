const mainObjInput = document.querySelector('.mainbox-container .main-obj');
const sideSmallObjs = document.querySelectorAll('.small-boxes.side .small-obj');
const middleSmallObjs = document.querySelectorAll(
  '.small-boxes.middle .small-obj'
);
const themeId = sessionStorage.getItem('themeId');

const loadStorageDatas = () => {
  const mainObj = sessionStorage.getItem('mainObj');
  const smallObjs = JSON.parse(sessionStorage.getItem('smallObjs'));
  const mainTitle = sessionStorage.getItem('mainTitle');
  const themeIdInput = document.getElementById('themeId');
  const mainTitleInput = document.getElementById('mainTitle');

  mainTitleInput.value = mainTitle;
  mainObjInput.value = mainObj;
  themeIdInput.value = themeId;
  for (let i = 0; i < 8; i++) {
    sideSmallObjs[i].value = smallObjs[i];
    middleSmallObjs[i].value = smallObjs[i];
  }
};



const init = () => {
  loadStorageDatas();
};

init();
