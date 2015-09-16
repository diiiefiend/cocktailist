class CreateFeedTable < ActiveRecord::Migration
  def change
    create_table :feed_tables do |t|
      t.integer :user_id, null: false, index: true
      t.integer :cocktail_id, null: false, index: true
      t.string :activity, null: false

      t.timestamps null: false
    end

    add_column(:cocktails, :created_at, :datetime)
    add_column(:cocktails, :updated_at, :datetime)
  end
end
