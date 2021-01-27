function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}
function getEndPoint(point, angle, length) {
  let x = point.x + Math.cos(degToRad(angle)) * length;
  let y = point.y + Math.sin(degToRad(angle)) * length;

  return { x, y };
}

function getDistance(pointA, pointB) {
  return Math.abs(
    Math.sqrt(
      Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2)
    )
  );
}

function getAngle(p1, p2, origin) {
  var d1 = this.getDistance(p1, origin);
  var d2 = this.getDistance(p2, origin);
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}
