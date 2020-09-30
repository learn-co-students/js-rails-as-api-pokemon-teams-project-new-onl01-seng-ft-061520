const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", getTrainers());

function getTrainers() {
    fetch(TRAINERS_URL)
	.then( (response) => response.json())
	.then( (trainers) => {
	    trainers.forEach( (trainer) => {
	    	createTrainerCard(trainer);
	    });
	});
};

function removePokemon(event){
    const pokemonId = event.target.attributes[1].value;
    fetch(POKEMONS_URL + `/${pokemonId}`, {
	method: "DELETE",
	headers: {
	    "Content-Type": "application/json",
	    "Accept": "application/json"
	},
	body: JSON.stringify({
	    pokemon_id: pokemonId
	})
    })
    event.target.previousSibling.remove();
    event.target.remove();
}

function createNewPokemon(event){
    fetch(POKEMONS_URL, {
	method: "POST",
	headers: {
	    "Content-Type": "application/json",
	    "Accept": "application/json"
	},
	body: JSON.stringify({
	    //takes trainer id from button attribute
	    trainer_id: event.target.attributes[0].value
	})
    })
	.then( (response) => response.json())
	.then( (object) => {
	    if(object != "roster full"){
		renderNewPokemon(object);
	    }
	});
};


function createTrainerCard(trainer){
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-id", `${trainer.id}`)
    const trainerName = document.createElement("p");
    trainerName.innerText = `${trainer.name}`;
    const addPokemonBtn = document.createElement("button");
    addPokemonBtn.innerText = "Add Pokemon";
    addPokemonBtn.setAttribute("data-trainer-id", `${trainer.id}`);
    addPokemonBtn.addEventListener("click", (event) => {
	createNewPokemon(event);
    });
    const main = document.querySelector("main");
    main.appendChild(card);
    card.appendChild(trainerName);
    card.appendChild(addPokemonBtn);
    renderAllPokemon(trainer);
};

function renderAllPokemon(trainer){
    const card = document.querySelector(`.card[data-id=${CSS.escape(trainer.id.toString())}]`);
    const pokemonList = document.createElement("ul");
    card.appendChild(pokemonList);
    trainer.pokemons.forEach( (pokemon) => {
	renderNewPokemon(pokemon);
    });
};

function renderNewPokemon(pokemon){
    const pokemonList = document.querySelector(`.card[data-id=${CSS.escape(pokemon.trainer_id.toString())}] ul`);
    const pokemonElement = document.createElement("li");
    pokemonElement.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class=\"release\" data-pokemon-id=${pokemon.id}>Release</button>`;
    pokemonList.appendChild(pokemonElement);
    const btn = document.querySelector(`.release[data-pokemon-id=${CSS.escape(pokemon.id.toString())}]`);
    btn.addEventListener("click", (event) =>  {
	removePokemon(event);
    })
}
