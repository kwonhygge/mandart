const textareas = document.querySelectorAll('textarea');
const inputs = document.querySelectorAll('input[type="text]');
const MAX_LENGTH = 40;

const getByteLength = (s) => {
  if (s == null || s.length == 0) {
    return 0;
  }
  let size = 0;

  for (let i = 0; i < s.length; i++) {
    size += charByteSize(s.charAt(i));
  }

  return size;
};

const cutByteLength = (e) => {
  const s = e.target.value;
  if (s == null || s.length == 0) {
    return 0;
  }
  let size = 0;
  let rIndex = s.length;

  for (let i = 0; i < s.length; i++) {
    size += charByteSize(s.charAt(i));
    if (size == MAX_LENGTH) {
      rIndex = i + 1;
      break;
    } else if (size > MAX_LENGTH) {
      rIndex = i;
      break;
    }
  }

  e.target.value = s.substring(0, rIndex);
};

const charByteSize = (ch) => {
  if (ch == null || ch.length == 0) {
    return 0;
  }

  let charCode = ch.charCodeAt(0);

  if (charCode <= 0x00007f) {
    return 1;
  } else if (charCode <= 0x0007ff) {
    return 2;
  } else if (charCode <= 0x00ffff) {
    return 3;
  } else {
    return 4;
  }
};
textareas.forEach((input) => {
  input.addEventListener('keydown', cutByteLength);
  input.addEventListener('keyup', cutByteLength);
});
inputs.forEach((input) => {
  input.addEventListener('keydown', cutByteLength);
  input.addEventListener('keyup', cutByteLength);
});
