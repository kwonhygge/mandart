const profile = document.querySelector('nav .profile');
const bubble = document.querySelector('nav .bubble');

profile
  ? profile.addEventListener('click', function () {
      bubble.classList.toggle('showing');
    })
  : null;
