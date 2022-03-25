window.addEventListener("DOMContentLoaded", init);

function init() {
  loadData();
}

async function loadData() {
  const response = await fetch(
    "https://linneavisser.com/wp-recreate/wp-json/wp/v2/bike?_embed"
  );
  //console.log("response2", response);
  const bikeData = await response.json();

  displayBike(bikeData);
}

async function displayBike(bikes) {
  bikes.forEach(async (bike) => {
    console.log("bike", bike);
    // grab template
    const clone = document.querySelector("template").content;
    //copy
    const copy = clone.cloneNode(true);
    //content
    copy.querySelector(".brand").textContent = bike.brand;
    copy.querySelector("h3.name").textContent = bike.title.rendered;
    copy.querySelector("p.price").textContent = `$${bike.price}`;
    copy.querySelector("p.colour").textContent = bike.colour;
    copy.querySelector("p.stock").textContent = bike.stock;
    copy.querySelector("img").src =
      bike._embedded[
        "wp:featuredmedia"
      ][0].media_details.sizes.medium_large.source_url;

    // parent
    const parent = document.querySelector("main");

    //append
    parent.appendChild(copy);
  });
}
