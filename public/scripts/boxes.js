const connectInput = () => {
    const sideSmallObjs = document.querySelectorAll('.small-boxes.side .small-obj');
    const middleSmallObjs = document.querySelectorAll(
        '.small-boxes.middle .small-obj'
    );
    for (let i = 0; i < 8; i++) {
        middleSmallObjs[i].addEventListener('change', function (event) {
            giveValue(event.target, sideSmallObjs);
        });
        sideSmallObjs[i].addEventListener('change', function (event) {
            giveValue(event.target, middleSmallObjs);
        });
    }
}

const giveValue = (target, other) => {
    for (let i = 0; i < 8; i++) {
        if (target.name === other[i].name) {
            other[i].value = target.value;
        }
    }
}

const applyTheme = () => {
    const themeId = sessionStorage.getItem("themeId");
    document.documentElement.setAttribute('data-theme', themeId);
}

const giveNameToBoxes = () => {
    const smallBoxes = document.querySelectorAll(".small-boxes.side");
    console.log(smallBoxes);
    smallBoxes.forEach((smallBox, i) => {
        const smallPlans = smallBox.querySelectorAll(".small-plan");
        const smallObj = smallBox.querySelector(".small-obj");
        smallObj.name = `smallObj${i}`;
        smallPlans.forEach(smallPlan => {
            smallPlan.name = `plan${i}`;
        })
    })
}

applyTheme();
giveNameToBoxes();
connectInput();