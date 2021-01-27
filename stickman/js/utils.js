function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function getEndPoint(point, angle, length) {
  let x = point.x + Math.cos(degToRad(angle)) * length;
  let y = point.y + Math.sin(degToRad(angle)) * length;

  return { x, y };
}
