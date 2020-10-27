class Pokemon < ApplicationRecord
  belongs_to :trainer

  validate do
    pokemon_count_value?
  end

  private 
  
  def pokemon_count_value?
    if self.trainer.pokemons.count >= 6
      self.errors.add(:team_max, "max is 6 pokemon")
    end
  end
end
