class CreateListitems < ActiveRecord::Migration
  def change
    create_table :listitems do |t|
      t.integer :cocktail_id, null: false, index: true
      t.integer :list_id, null: false, index: true
      t.timestamps null: false
    end

    remove_column :lists, :cocktail_id
  end
end
