document.addEventListener("DOMContentLoaded", function () {
  const circles = document.querySelectorAll(".circle-bar");

  let svgSize = 0; // progress circle size adjust here

  if (window.innerWidth < 768) {
    svgSize = window.innerWidth * 0.45;
  } else {
    svgSize = 0.35 * window.innerHeight;
  }

  circles.forEach((svg) => {
    svg.setAttribute("width", `${svgSize}px`);
    svg.setAttribute("height", `${svgSize}px`);

    const cx = svgSize / 2;
    const cy = svgSize / 2;
    const r = svgSize / 2 - svgSize * 0.08; // stroke width offset relative to svgSize

    const circle = svg.querySelector(".circle-corners");

    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    if (window.innerWidth < 768) {
      circle.style.strokeWidth = "5vw"; // stroke width
    } else {
      circle.style.strokeWidth = "4vh"; // stroke width
    }

    let circle1 = document.getElementById("circleMask");

    if (circle1) {
      circle1.setAttribute("cx", cx);
      circle1.setAttribute("cy", cy);
      circle1.setAttribute("r", r);
      if (window.innerWidth < 768) {
        circle1.style.strokeWidth = "5vw"; // stroke width
      } else {
        circle1.style.strokeWidth = "3.2vh"; // stroke width
      }

      circle1.style.strokeDasharray = `${2 * Math.PI * r}`;
    }

    // Update the pattern size if needed
    const pattern = svg.querySelector("#colorPattern");
    if (pattern) {
      pattern.setAttribute("width", svgSize);
      pattern.setAttribute("height", svgSize);

      const image = pattern.querySelector("image");
      if (image) {
        image.setAttribute("width", svgSize);
        image.setAttribute("height", svgSize);
      }
    }
  });

  setProgress(15.32, [1, 2, 3], ".countdown-top-left");
  setProgress(23.43, [4, 5, 6], ".countdown-top-right");
  setProgress(49.13, [7, 8], ".countdown-bottom-left");
  setProgress(34.24, [2, 4], ".countdown-bottom-right");

  setTimeout(() => {
    document.querySelector(".countdown").style.display = "none";
    document
      .querySelector(".start-message")
      .classList.add("show-start-message");
  }, 10000);
});

function setProgress(initialNumber, runners, circleName) {
  const circle = document.querySelector(circleName + " .circle-bar #myCircle");
  const radius = circle.r.baseVal.value;
  let finalNumber = parseFloat(initialNumber) * 2;
  console.log(radius);

  const circumference = 2 * Math.PI * radius;
  console.log(circumference);
  console.log(circle.getBoundingClientRect().width / 2);

  runners.forEach((runner) => {
    let runnerElement = document.createElement("div");
    runnerElement.classList.add("runner-" + runner);
    document
      .querySelector(circleName + " #numbers-container")
      .appendChild(runnerElement);
  });

  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  const offset = circumference - (100 / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  //const numberElement = document.getElementById("number");
  const numberElement = document.querySelector(circleName + " #number");

  numberElement.innerHTML = initialNumber;
  let number = parseFloat(numberElement.innerHTML).toFixed(2);

  // Remove the animation class, trigger reflow, then add it again
  numberElement.classList.remove("number-animation");
  //numberElement.classList.add("strong-tilt-move-shake");
  numberElement.classList.add("number-red");
  void numberElement.offsetWidth; // Trigger reflow

  let shadowGiver = document.querySelector(circleName + " #shadow-giver");
  shadowGiver.classList.remove("shadow-giver");

  const intervalDuration = 50 / ((finalNumber - number) / 55);
  console.log("duration", intervalDuration);

  setTimeout(() => {
    numberElement.classList.remove("number-red");
    numberElement.classList.add("blink-animation");
    shadowGiver.classList.add("shadow-giver");
    numberElement.innerHTML = parseFloat(finalNumber).toFixed(2);
  }, 3000);

  /*setTimeout(() => {
    //numberElement.classList.remove("strong-tilt-move-shake");
    //numberElement.classList.remove("number-red");
    //numberElement.classList.add("number-animation");
    shadowGiver.classList.add("shadow-giver");
    let bigger = false;
    if (number > finalNumber) {
      bigger = true;
    }
    if (!bigger) {
      const myinterval = setInterval(() => {
        if (Math.floor(number) < Math.floor(finalNumber)) {
          number++;
          numberElement.innerHTML = parseFloat(number).toFixed(2);
        } else {
          if (finalNumber.toString().split(".")[1]) {
            console.log(number.toString().split(".")[0]);
            number =
              number.toString().split(".")[0] +
              "." +
              finalNumber.toString().split(".")[1].substring(0, 2);
            numberElement.innerHTML = number;
          }

          clearInterval(myinterval);
          //numberElement.classList.remove("number-animation");
          numberElement.classList.remove("number-red");
          numberElement.classList.add("blink-animation");
        }
      }, intervalDuration);
    } else {
      console.log("hrere");
      const myinterval = setInterval(() => {
        if (Math.floor(number) > Math.floor(finalNumber)) {
          number--;
          numberElement.innerHTML = parseFloat(number).toFixed(2);
        } else {
          if (finalNumber.toString().split(".")[1]) {
            console.log(number.toString().split(".")[0]);
            number =
              number.toString().split(".")[0] +
              "." +
              finalNumber.toString().split(".")[1].substring(0, 2);
            numberElement.innerHTML = number;
          }
          clearInterval(myinterval);
          //numberElement.classList.remove("number-animation");
          numberElement.classList.remove("number-red");
          numberElement.classList.add("blink-animation");
        }
      }, intervalDuration);
    }
  }, 0);*/

  setTimeout(() => {
    let circleContainer = document.querySelector(circleName);
    circleContainer.style.display = "none";
  }, 10000);
}
