function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function distanceBetween(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
