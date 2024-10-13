const bells = new Audio('./sounds/bell.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const session = document.querySelector('.minutes');
const progressCircle = document.querySelector(".progress-ring circle");

let myInterval; 
let state = true;
let totalTime;
let remainingTime;

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);

  if (state) {
    state = false;
    totalTime = sessionAmount * 60;
    remainingTime = totalTime;

    const updateSeconds = () => {
      const minuteDiv = document.querySelector('.minutes');
      const secondDiv = document.querySelector('.seconds');
      
      if (remainingTime <= 0) {
        bells.play();
        clearInterval(myInterval);
        state = true;
        return;
      }

      remainingTime--;

      let minutesLeft = Math.floor(remainingTime / 60);
      let secondsLeft = remainingTime % 60;

      // Update the display
      minuteDiv.textContent = `${minutesLeft}`;
      secondDiv.textContent = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

      // Update the circle's stroke-dashoffset
      const progress = remainingTime / totalTime;
      const offset = 565.48 * (1 - progress); // 565.48 = 2 * PI * r (r=90)
      progressCircle.style.strokeDashoffset = offset;
    };

    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.');
  }
}

startBtn.addEventListener('click', appTimer);
