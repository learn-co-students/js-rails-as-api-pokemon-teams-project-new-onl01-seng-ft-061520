class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: trainers, only: [:name, :id], include: [:pokemons]
  end
end
