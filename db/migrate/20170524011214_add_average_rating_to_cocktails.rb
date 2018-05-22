class AddAverageRatingToCocktails < ActiveRecord::Migration
  def change
    add_column :cocktails, :avg_rating, :float
  end
end
