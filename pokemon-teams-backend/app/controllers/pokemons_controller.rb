class PokemonsController < ApplicationController
  def create
    trainer = Trainer.find(params[:trainer_id])
    if trainer.pokemons.length < 6
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
      render json: pokemon
    else
      render json: {message: "There can only be 6 pokemon in a team, please release a pokemon before adding a new one."}
    end
  end

  def destroy
    render json: Pokemon.find(params[:id]).destroy
  end
end
