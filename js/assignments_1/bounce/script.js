function moveBall() {
  var wrapper = document.getElementById("my-wrapper");
  var ball = document.getElementById("blue-ball");
  var x = 0;
  var y = 0;
  var speed = 5;

  var minHeight = wrapper.getBoundingClientRect().top;
  var maxHeight = wrapper.getBoundingClientRect().bottom;

  setInterval(() => {
    if (y < minHeight || y + 30 > maxHeight) {
      speed = -speed;
    }
    y += speed;
    ball.style.top = `${y}px`;
  }, 100);
}

moveBall();
