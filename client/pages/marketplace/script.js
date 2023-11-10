const NFT_API_URL = "http://localhost:3000/api/nfts";
const totalNFTCount = document.getElementById("total-nft-count");
const nftContainer = document.getElementById("container");
const loader = document.getElementById("loader");

let pageSize = 3;
let skip = 0;

function showLoader() {
  loader.style.display = "flex";
}
function hideLoader() {
  loader.style.display = "none";
}

function fetchNFTs() {
  showLoader();

  fetch(NFT_API_URL, {
    method: "POST",
    headers: {
      "CONTENT-TYPE": "application/json",
    },
    body: JSON.stringify({
      skip: skip,
      pageSize: pageSize,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      totalNFTCount.innerHTML = data.totalCount;

      renderNFTs(data.nfts);

      skip += pageSize;

      if (!data.hasMore) {
        window.removeEventListener("scroll", handleScroll);
        hideLoader();
      }
    });
}

function renderNFTs(nfts) {
  nfts.forEach((nft) => {
    const nftElement = document.createElement("div");
    nftElement.classList.add("nft-container__nft");
    nftElement.innerHTML = `
        <img src="../../../${nft.imgPath}" alt="${nft.name}" />
        <div class="nft-container__nft__text">
          <h5>${nft.name}</h5>
          <div class="nft-container__nft__text__artist">
            <img src="../../../${nft.creator.profileImgPath}" alt=${nft.creator.name} />
            <span>${nft.creator.name}</span>
          </div>
          <div class="nft-container__nft__text__details">
            <div class="nft-container__nft__text__details__price">
              <h5>Price</h5>
              <p>${nft.price.value} ${nft.price.currency}</p>
            </div>
            <div class="nft-container__nft__text__details__bid">
              <h5>Highest Bid</h5>
              <p>${nft.highestBid.value} ${nft.highestBid.currency}</p>
            </div>
          </div>
        </div>
      `;

    nftContainer.appendChild(nftElement);
  });
}

function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    fetchNFTs();
  }
}

fetchNFTs();
window.addEventListener("scroll", handleScroll);

//For tab buttons:
const nftsBtn = document.getElementById("nfts-button");
const collectionBtn = document.getElementById("collection-button");
const nftCardsContainer = document.querySelector(".nft-container .container");

function btnClick(button) {
  nftsBtn.classList.remove("clicked-on");
  collectionBtn.classList.remove("clicked-on");
  button.classList.add("clicked-on");
}

nftsBtn.addEventListener("click", () => {
  btnClick(nftsBtn);
  if (nftCardsContainer.childElementCount > 0) {
    //checks whether there are any nfts in the container
    nftCardsContainer.style.display = "grid";
    document.querySelector(".nft-container__empty").style.display = "none";
    document.querySelector(".loader-container").style.display = "flex";
    window.addEventListener("scroll", handleScroll);
  } else {
    return;
  }
});

collectionBtn.addEventListener("click", () => {
  btnClick(collectionBtn);
  nftCardsContainer.style.display = "none";
  document.querySelector(".nft-container__empty").style.display = "initial";
  document.querySelector(".loader-container").style.display = "none";
  window.removeEventListener("scroll", handleScroll);
});
btnClick(nftsBtn);
