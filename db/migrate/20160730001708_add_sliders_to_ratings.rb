class AddSlidersToRatings < ActiveRecord::Migration
  def change
    add_column :ratings, :scale_composition, :integer
    add_column :ratings, :scale_spirited, :integer

  end
end
