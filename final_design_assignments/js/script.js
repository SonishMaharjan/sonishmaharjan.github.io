const POP_OVER_DISPLAY = { 0: "none", 1: "block" };
let popOverValue = 0;

let hamburgerIcon = document.getElementById("hamburger-icon-id");
let headerPop = document.getElementById("header-pop-up-id");

hamburgerIcon.addEventListener("click", (event) => {
  popOverValue = (popOverValue + 1) % 2;
  headerPop.style.display = POP_OVER_DISPLAY[popOverValue];
});

function reportWindowSize() {
  popOverValue = 0;
  headerPop.style.display = POP_OVER_DISPLAY[popOverValue];
}
window.onresize = reportWindowSize;
