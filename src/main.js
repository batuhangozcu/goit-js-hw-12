import "./init";

// Kullanılacak kısmın import edilmesi
import SimpleLightbox from "simplelightbox";
// Ek stillerin eklenmesi
import "simplelightbox/dist/simple-lightbox.min.css";

// Dokümantasyonda belirtilen import
import iziToast from "izitoast";
// Stil importu
import "izitoast/dist/css/iziToast.min.css";

import axios, { isCancel, AxiosError } from "axios";

const input = document.getElementById("input");
const button = document.getElementById("submitButton");
const lists = document.querySelector(".lists");
const loadMore = document.getElementById("loadMore");
const loaderContainer = document.querySelector(".loaderDiv");

const params = new URLSearchParams({
  key: "48294638-370103394c700755fbc6c4620",
  image_type: "photo",
  orientation: "horizontal",
  safesearch: "true",
  per_page: "40",
});

let page = 1;

loadMore.style.display = "none";

button.addEventListener("click", async (e) => {
  loaderContainer.innerHTML = `<span class="loader"></span>`;
  lists.innerHTML = "";
  e.preventDefault;
  params.set("q", input.value);
  try {
    const images = await fetchImages();
    renderImages(images);
  } catch (error) {
    alert(error);
  }
});

async function fetchImages() {
  const response = await axios.get(`https://pixabay.com/api/?${params}`);
  return response.data;
}

function renderImages(images) {
  if (images.total == 0) {
    iziToast.error({
      position: "topRight",
      message:
        "Sorry, there are no images matching your search query. Please try again!",
    });
  }

  const markup = images.hits
    .map((photo) => {
      return `<li class="list">
       <div class="cards">
       <a class="link" href= "${photo.largeImageURL}">
       <img
        class="image"
        src="${photo.webformatURL}"
        data-source="${photo.largeImageURL}"
        alt="${photo.tags}"
      />
       </a>
       <div class="info">
       <p>Likes <span>${photo.likes}</span></p>
       <p>Views <span>${photo.views}</span></p>
       <p>Comments <span>${photo.comments}</span></p>
       <p>Downloads <span>${photo.downloads}</span></p>
       </div>
       </div>
       </li>`;
    })
    .join("");
  loaderContainer.innerHTML = "";
  lists.insertAdjacentHTML("beforeend", markup);

  if ((page > 1, images.total !== 0)) {
    // loadMore.textContent = "Load More";
    loadMore.style.display = "flex";
  }
  lists.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.tagName !== "IMG") {
      return;
    }
  });

  const lightBox = new SimpleLightbox(".cards a", {
    captionsData: "alt",
    captionDelay: 250,
  });
  lightBox.refresh();
}

loadMore.addEventListener("click", async () => {
  try {
    page += 1;
    params.set("page", page);
    const images = await fetchImages();
    renderImages(images);
    if (images.totalHits < page * 40) {
      loadMore.style.display = "none";
      iziToast.info({
        position: "topRight",
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
    const imageSize = document.querySelector(".cards").getBoundingClientRect();
    window.scrollBy({
      behavior: "smooth",
      top: imageSize.height * 3,
    });
  } catch (error) {
    alert(error);
  }
});
