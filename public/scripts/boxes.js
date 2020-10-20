

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