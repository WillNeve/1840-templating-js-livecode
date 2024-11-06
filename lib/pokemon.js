// 1. select the templates
const cardTemplate = document.querySelector("#cardTemplate");
const infoTemplate = document.querySelector("#infoTemplate");
// 2. select the containers
const cardsContainer = document.querySelector("#cardsContainer");
const infoContainer = document.querySelector("#infoContainer");
// 3. make our initial fetch request to the PokeApi pokemon list endpoint
fetch("https://pokeapi.co/api/v2/pokemon")
  .then((resp) => resp.json())
  .then((listData) => {
    const pokemons = listData.results;
    // 4. iterate through pokemon results from request
    pokemons.forEach((pokemon) => {
      // 5. make a second request to the PokeApi pokemon details endpoint
      fetch(pokemon.url)
        .then((resp) => resp.json())
        .then((pokemonData) => {
          // 6. clone the card template node
          const pokemonCard = cardTemplate.content.cloneNode(true);
          // 7. querySelect the sub-nodes on the clone and change required attributes/contents
          pokemonCard.querySelector("img").src =
            pokemonData.sprites["front_default"];
          pokemonCard.querySelector("h2").innerText = pokemonData.name;
          pokemonCard.querySelector("p").innerText =
            pokemonData.types[0].type.name;
          pokemonCard.querySelector("a").href = pokemon.url;
          // 8. add an event listener to the anchor element (link) ....
          // ... see sub steps in the event of a click
          pokemonCard.querySelector("a").addEventListener("click", (event) => {
            // 1. prevent the default behaviour (navigation)
            event.preventDefault();
            // 2. clone the info template node
            const infoContents = infoTemplate.content.cloneNode(true);
            // 3. querySelect the sub-nodes on the clone and change required attributes/contents
            infoContents.querySelector("img").src =
              pokemonData.sprites["front_default"];
            infoContents.querySelector("h2").innerText = pokemonData.name;
            infoContents.querySelector("p").innerText =
              pokemonData.types[0].type.name;
            // 4. set the contents of the info container (right column) to empty
            infoContainer.innerHTML = "";
            // 5. A ppend the info clone to the info container
            infoContainer.appendChild(infoContents);
          });
          // 9. append the card clone to our cards container (left column)
          cardsContainer.appendChild(pokemonCard);
        });
    });
  });
