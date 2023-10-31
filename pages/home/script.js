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

//For Sidebar
var sidebar = document.getElementsByClassName("sidebar")[0];
var burgerBtn = document.getElementById("burger-btn");

burgerBtn.addEventListener("click", function () {
  sidebar.style.right = "0";
});

document.addEventListener("click", function (e) {
  if (e.target !== sidebar && e.target !== burgerBtn) {
    sidebar.style.right = "-300px";
  }
});

//For Subscription
const emailRegex = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;

//We have 2 same forms in home page:
const emailForms = document.querySelectorAll(".emailForm");
const emailInputs = document.querySelectorAll(".emailInput");

emailForms.forEach((emailForm, index) => {
  emailForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInputs[index].value;

    if (emailInputs[index].value === "") {
      Toastify({
        text: "Please enter your email address to subscribe.",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #FFD700, #FFB90F)",
        },
      }).showToast();
    } else {
      if (emailRegex.test(email)) {
        Toastify({
          text: "Subscription successful! Watch your inbox for updates.",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        emailInputs[index].value = "";
      } else {
        Toastify({
          text: "Email is not valid!",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to right, #FF0000, #FF5733)",
          },
        }).showToast();
      }
    }
  });
});
