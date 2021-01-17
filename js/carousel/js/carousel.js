class Carousel {
  constructor(idName, transitionTime = 500, holdTime = 5000) {
    this.carouselId = idName;
    this.transitionTime = transitionTime;
    this.holdTime = holdTime;
    this.currentIndex = 0;
    this.prevIndex = null;
    this.nextIndex = 1;
    this.imagesList = null;
    this.carousel = null;
    this.imageWrapper = null;
    this.carouselWidth;
    this.init();
  }

  init() {
    let carousel = document.getElementById(this.carouselId);
    let imagesList = Array.from(carousel.getElementsByTagName("img"));
    this.imagesList = imagesList;
    let leftPosition = 0;

    if (carousel) {
      this.carousel = carousel;
      let imageWrapper = Array.from(carousel.childNodes).find(
        ({ className }) => className == "carousel-image-wrapper"
      );

      this.imageWrapper = imageWrapper;

      carousel.style.width = "100%";
      carousel.style.height = "100%";
      carousel.style.position = "relative";
      carousel.style.overflow = "hidden";

      imageWrapper.style.height = "100%";
      imageWrapper.style.width = "100%";
      imageWrapper.style.position = "absolute";
      this.carouselWidth = imageWrapper.offsetWidth;

      imagesList.forEach((imageItem, index) => {
        imageItem.style.width = "100%";
        imageItem.style.position = "absolute";
        imageItem.style.left = `${index * imageItem.offsetWidth}px`;
      });

      this.addButtons();
    } else {
      console.error(`Can retrive element with id ${this.carouselId}`);
    }
  }

  addButtons() {
    let prevButton = document.createElement("button");
    let nextButton = document.createElement("button");
    prevButton.innerHTML = "Prev";
    nextButton.innerHTML = "Next";

    prevButton.style.position = "absolute";
    prevButton.style.top = "50%";

    nextButton.style.position = "absolute";
    nextButton.style.top = "50%";
    nextButton.style.right = "0";

    prevButton.addEventListener("click", () => {
      let nextIndex = this.currentIndex - 1;
      this.moveTo(nextIndex);
    });

    nextButton.addEventListener("click", () => {
      let nextIndex = this.currentIndex + 1;
      this.moveTo(nextIndex);
    });

    this.carousel.appendChild(prevButton);
    this.carousel.appendChild(nextButton);
  }

  moveTo(nextIndex) {
    let speed = 0;
    let indexDiff = this.currentIndex - nextIndex;
    this.currentIndex = nextIndex;

    let currentPositon = this.imageWrapper.offsetLeft;
    let nextPosition = currentPositon + indexDiff * this.carouselWidth;

    let positionDiff = currentPositon - nextPosition;

    speed = -(positionDiff / this.transitionTime) / 0.06;

    let moveImage = setInterval(() => {
      currentPositon = currentPositon + speed;

      this.imageWrapper.style.left = `${currentPositon}px`;

      if (speed < 0) {
        if (currentPositon < nextPosition) {
          this.imageWrapper.style.left = `${nextPosition}px`;
          this.currentPositon = nextPosition;
          clearInterval(moveImage);
        }
      } else {
        if (currentPositon > nextPosition) {
          this.imageWrapper.style.left = `${nextPosition}px`;
          this.currentPositon = nextPosition;

          clearInterval(moveImage);
        }
      }
    }, 1000 / 60);
  }
}

let car = new Carousel("carousel-1");
