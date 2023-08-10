const access_key="B7sugshGeoTg4licyOPTSp6C-q966gDTxoIi0-lYDgA";

const form_element = document.querySelector("form");
const input_element = document.getElementById("search-input");
const search_results=document.querySelector(".search-results");
const show_more = document.getElementById("show-more-button");

let input_data = "";
let page = 1;

async function search_images(){
    input_data = input_element.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input_data}&client_id=${access_key}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1){
        search_results.innerHTML = "";
    }
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        search_results.appendChild(imageWrapper);
        
    });
    page ++;
    if(page > 1){
        show_more.style.display = "block";
    }
}
form_element.addEventListener("submit", (event) => {
    event.preventDefault();
    page=1;
    search_images();

})
show_more.addEventListener("click", () => {
    search_images();

})
