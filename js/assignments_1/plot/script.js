var points = [
  { x: 10, y: 20 },
  { x: 34, y: 53 },
  { x: 122, y: 34 },
  { x: 200, y: 343 },
  { x: 132, y: 64 },
  { x: 200, y: 303 },
];

function createPoint(x, y) {
  var point = document.createElement("div");
  point.classList.add("point");
  point.style.left = `${x}px`;
  point.style.top = `${y}px`;

  point.onclick = (event) => {
    event.target.remove();
  };

  plain.appendChild(point);
}

points.forEach((point) => {
  createPoint(point.x, point.y);
});
