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
