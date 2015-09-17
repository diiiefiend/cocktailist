class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :user_id, null: false, index: true
      t.integer :cocktail_id, null: false, index: true
      t.integer :rating, null: false
      t.text :body
      t.timestamps
    end

    change_column_null :cocktails, :bar_id, false
  end
end
