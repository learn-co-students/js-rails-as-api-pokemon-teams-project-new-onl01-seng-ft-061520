class PokemonsController < ApplicationController
  def create
    trainer = Trainer.find(pokemon_params[:trainer_id])
    if trainer.pokemons.count < 6
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      new_pokemon = Pokemon.create(nickname: name, species: species, trainer_id: pokemon_params[:trainer_id])
      render json: new_pokemon, only: [:trainer_id, :nickname, :species, :id]
    else
      render json: "roster full".to_json
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:pokemon_id])
    pokemon.destroy
  end

  private
  def pokemon_params
    params.require(:pokemon).permit(:trainer_id)
  end
end
