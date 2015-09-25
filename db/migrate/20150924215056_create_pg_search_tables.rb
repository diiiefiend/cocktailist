class CreatePgSearchTables < ActiveRecord::Migration
  def change
    create_table :pg_search do |t|
      t.text :content
      t.belongs_to :searchable, polymorphic: true
      t.integer :searchable_id
      t.string :searchable_type
      t.timestamps null: false
    end

    add_index :users, [:provider, :uid], unique: true
  end
end
