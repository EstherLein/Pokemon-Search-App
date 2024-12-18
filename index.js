const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-container");

/*const endpoint = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`;*/

const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    const data = await res.json();
    showPokemon(data);
  } catch (err) {
    alert("Pokémon not found")
    console.log(err);
  }
};

const showPokemon = (data) => {
  const { name, id, weight, height, types, sprites, stats } = data;

  pokemonName.textContent = `${name[0].toUpperCase() + name.slice(1)}`;
  pokemonId.textContent = `#${id}`;
  pokemonWeight.textContent = `Weight: ${weight}`;
  pokemonHeight.textContent = `Height: ${height}`;

  hp.textContent = `${stats[0].base_stat}`;
  attack.textContent = `${stats[1].base_stat}`;
  defense.textContent = ` ${stats[2].base_stat}`;
  specialAttack.textContent = `${stats[3].base_stat}`;
  specialDefense.textContent = `${stats[4].base_stat}`;
  speed.textContent = `${stats[5].base_stat}`;

  spriteContainer.innerHTML = `<img src="${sprites.front_default}" alt="Image of ${name}" id="sprite">`

  pokemonTypes.innerHTML = types.map(typeObj => `<span>${typeObj.type.name.toUpperCase()}</span>`).join(" ");


 /* const slot1Name = types[0]?.type?.name;
  const slot2Name = types[1]?.type?.name || "";
  pokemonTypes.textContent = `${slot1Name.toUpperCase() + " " + slot2Name.toUpperCase()}`;
  not possible because of user stories requirements*/
};

searchButton.addEventListener("click", e => {
  e.preventDefault();
  getPokemon();
});

searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        searchButton.click();
    }
});