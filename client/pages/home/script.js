//For Timer
//November 8, 2023, at 00:00:00
var date = new Date(Date.UTC(2023, 10, 8, 0, 0, 0));
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

artists = [];
const artistsContainer = document.querySelector(".top-artists__artists");
const loadingElement = document.querySelector(".loader");
loadingElement.style.display = "none";

function getData() {
  loadingElement.style.display = "flex";
  fetch("http://localhost:3000/api/creators")
    .then((res) => res.json())
    .then((data) => {
      artists = data;
      artists.forEach((artist) => {
        createArtistBox(artist, artistsContainer);
      });
    })
    .finally(() => {
      loadingElement.style.display = "none";
    });
}

getData();

function createArtistBox(artist, artistsContainer) {
  const artistContainer = document.createElement("div");
  artistContainer.classList.add("top-artists__artists__artist");

  const topPart = document.createElement("div");
  topPart.classList.add("top-artists__artists__artist__top");

  const artistId = document.createElement("div");
  artistId.textContent = artist.id;

  const artistAvatar = document.createElement("img");
  artistAvatar.src = `../../../${artist.profileImgPath}`;
  artistAvatar.alt = artist.name;

  topPart.appendChild(artistId);
  topPart.appendChild(artistAvatar);

  const bottomPart = document.createElement("div");
  bottomPart.classList.add("top-artists__artists__artist__bottom");

  const artistName = document.createElement("h5");
  artistName.textContent = artist.name;

  const totalSales = document.createElement("div");
  totalSales.innerHTML = `<p>Total Sales:</p>
    <p class="top-artists__artists__artist__bottom__sales">${artist.totalSale.value} ${artist.totalSale.currency}</p>`;

  bottomPart.appendChild(artistName);
  bottomPart.appendChild(totalSales);

  artistContainer.appendChild(topPart);
  artistContainer.appendChild(bottomPart);

  artistsContainer.appendChild(artistContainer);
}
