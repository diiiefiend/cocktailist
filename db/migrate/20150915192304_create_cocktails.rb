class CreateCocktails < ActiveRecord::Migration
  def change
    create_table :cocktails do |t|
      t.string :name, null: false
      t.string :liquor, null: false
      t.string :ingredients, null: false
      t.integer :bar_id, index: true
    end
  end
end
