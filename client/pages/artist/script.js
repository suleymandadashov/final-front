//for three tab buttons:
const createdBtn = document.getElementById("created-button");
const ownedBtn = document.getElementById("owned-button");
const collectionBtn = document.getElementById("collection-button");
const nftCardsContainer = document.querySelector(".nft-cards .container");

function btnClick(button) {
  createdBtn.classList.remove("clicked-on");
  ownedBtn.classList.remove("clicked-on");
  collectionBtn.classList.remove("clicked-on");
  button.classList.add("clicked-on");
}

createdBtn.addEventListener("click", () => {
  btnClick(createdBtn);
  if (nftCardsContainer.childElementCount > 0) {
    //checks whether there are any nfts in the container
    nftCardsContainer.style.display = "grid";
    document.querySelector(".nft-cards__empty").style.display = "none";
  } else {
    return;
  }
});
ownedBtn.addEventListener("click", () => {
  btnClick(ownedBtn);
  nftCardsContainer.style.display = "none";
  document.querySelector(".nft-cards__empty").style.display = "initial";
});
collectionBtn.addEventListener("click", () => {
  btnClick(collectionBtn);
  nftCardsContainer.style.display = "none";
  document.querySelector(".nft-cards__empty").style.display = "initial";
});

btnClick(createdBtn);

//API part:
const API_BASE_URL =
  "https://final-nft-marketplace.up.railway.app/api/creators";
const NOT_FOUND_URL = "http://127.0.0.1:5500/client/pages/not-found/index.html";
let searchParams = new URLSearchParams(window.location.search);
let artistId = searchParams.get("artist_id");

const loadingElement = document.querySelector(".loader-container");
const artistPageBody = document.querySelector("#Artist");

function getData() {
  loadingElement.style.display = "initial";
  artistPageBody.style.overflow = "hidden";
  fetch(`${API_BASE_URL}/${artistId}`)
    .then((res) => {
      if (res.status === 404) {
        window.location.href = NOT_FOUND_URL;
      }
      return res.json();
    })
    .then((data) => {
      let artistData = data;
      fillArtistPage(artistData);
    })
    .finally(() => {
      loadingElement.style.display = "none";
      artistPageBody.style.overflow = "auto";
    });
}

getData();

function fillArtistPage(artist) {
  document.querySelector(".artist__left h2").textContent = artist.name;
  document.querySelector(
    ".artist__left img"
  ).src = `../../../${artist.profileImgPath}`;
  document.querySelector(".artist__left__bio p").textContent = artist.bio;
  editedArtistVolume = formatNumberInThousands(artist.volume);
  document.querySelector(
    ".artist__left__stats div:nth-child(1) h4"
  ).textContent = `${editedArtistVolume}+`;
  document.querySelector(
    ".artist__left__stats div:nth-child(2) h4"
  ).textContent = `${artist.nftSold}+`;
  document.querySelector(
    ".artist__left__stats div:nth-child(3) h4"
  ).textContent = `${artist.followers}+`;

  //Chain id
  const firstFourChars = artist.chainId.slice(0, 4);
  const lastFourChars = artist.chainId.slice(-4);
  const shortenedChainId = `${firstFourChars}...${lastFourChars}`;
  document
    .querySelectorAll(".artist__left__btns__copy-btn p")
    .forEach((button) => {
      button.textContent = shortenedChainId;
    });

  //Copying to the clipboard
  document
    .querySelector(".artist__left__btns__copy-btn")
    .addEventListener("click", () => {
      navigator.clipboard.writeText(artist.chainId);
      Toastify({
        text: "Chain ID copied to clipboard!",
        duration: 3000,
        newWindow: true,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    });

  //NFT Cards
  nftCount = artist.nfts.length;
  document.querySelector("#created-button div").innerHTML = nftCount;
  if (nftCount == 0) {
    nftCardsContainer.style.display = "none";
    document.querySelector(".nft-cards__empty").style.display = "initial";
  } else {
    artist.nfts.forEach((nft) => {
      const nftCard = document.createElement("div");
      nftCard.classList.add("nft-cards__card");
      const nftSrc = `../../../${nft.imgPath}`;
      const avatarSrc = `../../../${artist.profileImgPath}`;
      nftCard.innerHTML = `
    <img src=${nftSrc} alt="${nft.name} NFT" />
    <div class="nft-cards__card__text">
      <h5>${nft.name}</h5>
      <div class="nft-cards__card__text__artist">
        <img
          src="${avatarSrc}"
          alt="${artist.name}"
        />
        <span>${artist.name}</span>
      </div>
      <div class="nft-cards__card__text__details">
        <div class="nft-cards__card__text__details__price">
          <h5>Price</h5>
          <p>${nft.price.value} ${nft.price.currency}</p>
        </div>
        <div class="nft-cards__card__text__details__bid">
          <h5>Highest Bid</h5>
          <p>${nft.highestBid.value} ${nft.highestBid.currency}</p>
        </div>
      </div>
    </div>
  `;
      nftCardsContainer.appendChild(nftCard);
    });
  }
}

//To convert volume numbers from (f.e) 80000 to 80k
function formatNumberInThousands(numberStr) {
  const number = parseInt(numberStr);

  if (!isNaN(number)) {
    if (number >= 1000) {
      return (number / 1000).toFixed(0) + "k";
    } else {
      return number.toString();
    }
  }
  return numberStr;
}

//Follow btn using local storage
const followBtn = document.querySelector(".artist__left__btns__follow-btn");
const followBtnText = document.querySelector(
  ".artist__left__btns__follow-btn p"
);
const followBtnImg = document.querySelector(
  ".artist__left__btns__follow-btn img"
);

const isFollowed =
  JSON.parse(localStorage.getItem(`followed_${artistId}`)) || false;
updateButtonColor(isFollowed);

followBtn.addEventListener("click", () => {
  const isFollowed = !JSON.parse(localStorage.getItem(`followed_${artistId}`));
  localStorage.setItem(`followed_${artistId}`, isFollowed);
  updateButtonColor(isFollowed);
});

function updateButtonColor(isFollowed) {
  if (isFollowed) {
    followBtn.classList.add("following");
    followBtnText.textContent = "Following";
    followBtnImg.src = "../../media/icons/check.svg";
  } else {
    followBtn.classList.remove("following");
    followBtnText.textContent = "Follow";
    followBtnImg.src = "../../media/icons/plus.svg";
  }
}
