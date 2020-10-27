const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const main = document.querySelector('main')

//loadTrainer is anonomous function invockes trainers fetching from trainers url 
document.addEventListener("DOMContentLoaded", () => loadTrainers())
const loadTrainers = () => {
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(json => {
            //loop over the trainer array 
            json.forEach(trainer => renderTrainer(trainer))
        })
}

//checks for trainerHash in console 
const renderTrainer = (trainerHash) => { //checks for trainerHash in console 
    //creating DOM elements
    //console.log("tranerHash", trainerHash)
    //debugger
    console.log("tranerHash", trainerHash)
    const div = document.createElement("div")
    const p = document.createElement("p")
    const button = document.createElement("button")
    const ul = document.createElement("ul")

    //sets attributs on the created dom
    div.setAttribute("class", "card")
    div.setAttribute("data-id", trainerHash.id)

    //sets the actual trainers name 
    p.innerHTML = trainerHash.name

    //set the buttons
    button.setAttribute("data-trainer-id", trainerHash.id)
    button.innerHTML = "Add Pokemon"
        //attach eventListner to the button (click)
    button.addEventListener("click", createPokemon) //handle request 

    //append add p, button, ul
    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)

    //the append the div and desplay it to the page 
    main.appendChild(div) //2 check for the appind child in consloe 

    trainerHash.pokemons.forEach(pokemon => renderPokemon(pokemon))

}

const renderPokemon = (pokemon) => {
    //target the trainer id form the pokemon  
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement("li")
    const button = document.createElement("button")

    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    button.setAttribute("class-pokemon-id", pokemon.id)
    button.innerHTML = "Realese"

    //attach eventListner to the button (click)
    button.addEventListener("click", deletePokemon)

    //apped the variable stored in the line 55
    li.appendChild(button)
    ul.appendChild(li)
}
const createPokemon = (e) => {
    e.preventDefault()
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ trainer_id: e.target.dataset.trainerId })
    }
    fetch(POKEMONS_URL, configObj)
        .then(res => res.json())
        .then(json => {
            if (json.message) {
                alert(json.message)
            } else {
                renderPokemon(json)
            }
        })
}
const deletePokemon = (e) => {
    e.preventDefault()

    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
        //remove the full row
    e.target.parentElement.remove()

}