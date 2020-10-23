const themeOptions = document.querySelectorAll(".option input");

const initChecked = () => {
    themeId = sessionStorage.getItem("themeId");
    themeOptions.forEach(option => {
        if (option.value === themeId) {
            option.checked = true;
        }
    })
}

const showInit = () => {
    initChecked();
    themeOptions.forEach(option => {
        option.addEventListener("click", function (e) {
            document.documentElement.setAttribute("data-theme", e.target.value);
        })
    }
    )
}

showInit();