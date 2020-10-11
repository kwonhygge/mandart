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

const wholeBoxes = document.querySelectorAll('.big-boxes');

const loadBoxes = () => {
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
  loadBoxes();
};

init();
