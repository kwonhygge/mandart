const themeOptions = document.querySelectorAll(".option input");

themeOptions.forEach(option => {
    option.addEventListener("click", function (e) {
        document.documentElement.setAttribute("data-theme", e.target.value);
    })
}

)