/** utilites function*/
function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

function generateRandomCode(length) {
  let possible = "0123456789ABCD";
  let string = "";

  for (let i = 0; i < length; i++) {
    string += possible.charAt(randomInt(0, possible.length - 1));
  }
  return string;
}

function randomInt(min, max) {
  return Math.random() * (max - min) + min;
}
