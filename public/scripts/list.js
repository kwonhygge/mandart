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

const modalClose = () => {
  modals.forEach((modal) => {
    modal.classList.remove(SHOWING);
  });
};
const goModalFive = () => {
  nextBtn4.addEventListener('click', function () {
    modal4.classList.remove(SHOWING);
    modal5.classList.add(SHOWING);
    goModalFive();
  });
};

const goModalFour = () => {
  nextBtn3.addEventListener('click', function () {
    modal3.classList.remove(SHOWING);
    modal4.classList.add(SHOWING);
    goModalFive();
  });
};

const goModalThree = () => {
  nextBtn2.addEventListener('click', function () {
    modal2.classList.remove(SHOWING);
    modal3.classList.add(SHOWING);
    goModalFour();
  });
};

const goModalTwo = () => {
  nextBtn1.addEventListener('click', function () {
    modal1.classList.remove(SHOWING);
    modal2.classList.add(SHOWING);
    goModalThree();
  });
};

const clickPlusBtn = () => {
  initCloseBtnsEvent();
  loadBoxes();
  plusBtn.addEventListener('click', function () {
    modal1.classList.add(SHOWING);
    goModalTwo();
  });
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
  clickPlusBtn();
};

init();
