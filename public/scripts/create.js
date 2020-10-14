function init() {
  const themeId = sessionStorage.getItem('themeId');
  document.documentElement.setAttribute('data-theme', themeId);
}

init();
