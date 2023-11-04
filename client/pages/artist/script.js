const createdBtn = document.getElementById("created-button");
const ownedBtn = document.getElementById("owned-button");
const collectionBtn = document.getElementById("collection-button");

function btnClick(button) {
  createdBtn.classList.remove("clicked-on");
  ownedBtn.classList.remove("clicked-on");
  collectionBtn.classList.remove("clicked-on");
  button.classList.add("clicked-on");
}

createdBtn.addEventListener("click", () => {
  btnClick(createdBtn);
});
ownedBtn.addEventListener("click", () => {
  btnClick(ownedBtn);
});
collectionBtn.addEventListener("click", () => {
  btnClick(collectionBtn);
});

btnClick(createdBtn);
