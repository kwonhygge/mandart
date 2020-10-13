const themes = [
  {
    name: 'Modern',
    mainObjBackground: '#F2F2F2',
    bigPlansBackground: '#333333',
    smallPlansBackground: '#F2F2F2',
    borderColor: '#C7D2CE',
  },
  {
    name: 'Sky',
    mainObjBackground: '#FFFFFF',
    bigPlansBackground: '#CEDBE3',
    smallPlansBackground: '#FFFFFF',
    borderColor: '#8F92B0',
  },
  {
    name: 'MoonNight',
    mainObjBackground: '#323232',
    bigPlansBackground: '#ECD9B9',
    smallPlansBackground: '#323232',
    borderColor: '#FFFFFF',
  },
  {
    name: 'Egyption',
    mainObjBackground: '#D7CBB5',
    bigPlansBackground: '#333333',
    smallPlansBackground: '#D7CBB5',
    borderColor: '#A99C83',
  },
  {
    name: 'Greenary',
    mainObjBackground: ' #89A390',
    bigPlansBackground: '#CDD7CA',
    smallPlansBackground: ' #89A390',
    borderColor: '#CFCFCF',
  },
  {
    name: 'ModernBlue',
    mainObjBackground: '#F2F2F2',
    bigPlansBackground: '#3E4A6B',
    smallPlansBackground: '#F2F2F2',
    borderColor: '#CBCFD0',
  },
];

const mainTitleInput = document.querySelector('.mainTitle');
const chosenThemeImg = document.querySelector('#box-modal5 .footer img');
const mainTitle = document.querySelector('#box-modal5 .footer .body2');
// handle choice
const options = document.querySelectorAll('.option input');

// modal

const plusBtn = document.getElementById('plusBtn');
const backdrop = document.querySelector('.backdrop');
const modals = document.querySelectorAll('.modal');
const SHOWING = 'showing';

const modal1 = document.getElementById('box-modal1');
const modal2 = document.getElementById('box-modal2');
const modal3 = document.getElementById('box-modal3');
const modal4 = document.getElementById('box-modal4');
const modal5 = document.getElementById('box-modal5');
const nextBtn1 = document.getElementById('nextBtn1');
const nextBtn2 = document.getElementById('nextBtn2');
const nextBtn3 = document.getElementById('nextBtn3');
const nextBtn4 = document.getElementById('nextBtn4');
const nextBtn5 = document.getElementById('nextBtn5');
const prevBtn2 = document.getElementById('prevBtn2');
const prevBtn3 = document.getElementById('prevBtn3');
const prevBtn4 = document.getElementById('prevBtn4');
const prevBtn5 = document.getElementById('prevBtn5');

const modalClose = () => {
  modals.forEach((modal) => {
    modal.classList.remove(SHOWING);
  });
};
const goModalFive = () => {
  modalClose();
  modal5.classList.add(SHOWING);
  options.forEach((option) => {
    option.checked ? (chosenThemeImg.src = `/imgs/${option.id}.png`) : null;
  });
  mainTitle.innerHTML = mainTitleInput.value;
  nextBtn5.addEventListener('click', function () {});
  prevBtn5.addEventListener('click', function () {
    goModalFour();
  });
};

const goModalFour = () => {
  modalClose();
  modal4.classList.add(SHOWING);

  nextBtn4.addEventListener('click', function () {
    goModalFive();
  });
  prevBtn4.addEventListener('click', function () {
    goModalThree();
  });
};

const goModalThree = () => {
  modalClose();
  modal3.classList.add(SHOWING);
  nextBtn3.addEventListener('click', function () {
    goModalFour();
  });
  prevBtn3.addEventListener('click', function () {
    goModalTwo();
  });
};

const goModalTwo = () => {
  modalClose();
  modal2.classList.add(SHOWING);
  nextBtn2.addEventListener('click', function () {
    goModalThree();
  });
  prevBtn2.addEventListener('click', function () {
    goModalOne();
  });
};

const goModalOne = () => {
  modalClose();
  modal1.classList.add(SHOWING);
  nextBtn1.addEventListener('click', function () {
    goModalTwo();
  });
};
const clickPlusBtn = () => {
  initCloseBtnsEvent();
  loadBoxes();
  goModalOne();
};
initCloseBtnsEvent = () => {
  const closeBtns = document.querySelectorAll('.closeBtn');
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', modalClose);
  });
};

const loadBoxes = () => {
  // boxes
  const wholeBoxes = document.querySelectorAll('.option-container .big-boxes');
  wholeBoxes.forEach((wholeBox, i) => {
    wholeBox.style.background = themes[i].smallPlansBackground;
    wholeBox.style.borderColor = themes[i].borderColor;

    const bigBoxes = wholeBox.querySelectorAll('.small-boxes');
    const smallLines = wholeBox.querySelectorAll('.small-line');
    const smallBoxes = wholeBox.querySelectorAll('.small-box');
    smallLines.forEach((eachLine) => {
      eachLine.style.borderColor = themes[i].borderColor;
    });
    bigBoxes[4].style.background = themes[i].bigPlansBackground;

    let middleIndex = 4;
    smallBoxes.forEach((eachBox, j) => {
      eachBox.style.borderColor = themes[i].borderColor;
      smallBoxes[40].style.background = themes[i].mainObjBackground;
      if (j === middleIndex) {
        smallBoxes[j].style.background = themes[i].bigPlansBackground;
        middleIndex += 9;
      }
    });
  });
};

const init = () => {
  plusBtn.addEventListener('click', function () {
    clickPlusBtn();
  });
};

init();
