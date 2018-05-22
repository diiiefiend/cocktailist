class BackfillAverageRating < ActiveRecord::Migration
  def change
    Cocktail.transaction do
      Cocktail.all.each do |cocktail|
        cocktail.update!(avg_rating: cocktail.calculate_avg_rating)
      end
    end
  end
end
