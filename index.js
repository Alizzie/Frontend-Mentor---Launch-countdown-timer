// Countdown

//Selecting Elements
const countdown = document.getElementById("countdown");
const endedTimer = document.getElementsByClassName("endTimer")[0];
const spanTops = Array.from(countdown.getElementsByClassName("span-top"));
const spanBottoms = Array.from(countdown.getElementsByClassName("span-bottom"));
// [0] = days; [1] = hours; [2] = minutes; [3] = seconds


// By Refreshing the page, the countdown time always starts with totalTimeLeft: 8d 23h 55min 41s
// Countdown = Endtime - current Time
// EndTime = new Date(currentTime in milliseconds plus totalTimeLeft in miliseconds)
const dayLeft = 8 * 24 * 60 * 60 * 1000;
const hoursLeft = 23 * 60 * 60 * 1000;
const minutesLeft = 55 * 60 * 1000;
const secondsLeft = 41 * 1000;
const totalTimeLeft = dayLeft + hoursLeft + minutesLeft + secondsLeft;

var endTime = new Date(Date.parse(new Date()) + totalTimeLeft);


// Calculate Countdown Time: remaining Time = EndTime - current Time (all in miliseconds -> Date.parse())
function remainingTime(eT) {
  var total = Date.parse(eT) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor((total / (1000 * 60 * 60 * 24)));

  return {
    total,
    seconds,
    minutes,
    hours,
    days
  };
}


// Running Countdown and updating the Time every 1000 miliseconds / 1 seconds
function runCountdown(eT) {

  // Updating the countdown time (cdT) in the cards
  function updatingTime() {

      const cdT = remainingTime(eT);

      spanTops[0].innerHTML = ("0" + cdT.days);
      spanBottoms[0].innerHTML = ("0" + cdT.days);
      spanTops[1].innerHTML = ("0" + cdT.hours).slice(-2);
      spanBottoms[1].innerHTML = ("0" + cdT.hours).slice(-2);
      spanTops[2].innerHTML = ("0" + cdT.minutes).slice(-2);
      spanBottoms[2].innerHTML = ("0" + cdT.minutes).slice(-2);
      spanTops[3].innerHTML = ("0" + cdT.seconds).slice(-2);
      spanBottoms[3].innerHTML = ("0" + cdT.seconds).slice(-2);

      // Case Timer ends:
      if (cdT.total < 0 || end) {
        clearInterval(updateTime);
        spanTops.forEach(spanTop => spanTop.innerHTML = ("00"));
        spanBottoms.forEach(spanBottom => spanBottom.innerHTML = ("00"));
        setTimeout(() => endedTimer.classList.add("show"), 100);
      }
    }

  updatingTime();
  var updateTime = setInterval(updatingTime, 1000);
}

runCountdown(endTime);


// Ending Timer with Space Key and Reload with Enter Key
var end = false;
document.addEventListener("keydown", function(event) {
  if (event.keyCode === 32) {
    end = true;
  } else if (event.keyCode === 13) {
    location.reload();
  }
});
