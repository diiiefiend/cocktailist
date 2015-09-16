class CreateFeed < ActiveRecord::Migration
  def change
    drop_table :feed_tables

    create_table :feeds do |t|
      t.integer :user_id, null: false, index: true
      t.integer :cocktail_id, null: false, index: true
      t.string :activity, null: false

      t.timestamps null: false
    end
  end
end
