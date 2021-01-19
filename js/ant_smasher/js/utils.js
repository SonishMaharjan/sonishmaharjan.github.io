function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function distanceBetween(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function isIntersect(point, circle) {
  return (
    Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) <
    circle.radius
  );
}
