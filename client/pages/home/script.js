//For Timer
//November 5, 2023, at 00:00:00
var date = new Date(Date.UTC(2023, 10, 5, 0, 0, 0));
date.setHours(date.getHours() - 4); //GMT+4

function updateTimer() {
  var now = new Date().getTime();
  var remainingTime = date - now;

  if (remainingTime <= 0) {
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
  } else {
    var hours = Math.floor(remainingTime / (1000 * 60 * 60));
    var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    document.getElementById("hours").textContent =
      hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").textContent =
      minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").textContent =
      seconds < 10 ? "0" + seconds : seconds;
  }
}

setInterval(updateTimer, 1000);
