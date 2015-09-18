class AddPolymorphismtoFeeds < ActiveRecord::Migration
  def change
    add_column :feeds, :feedable_id, :integer
    add_column :feeds, :feedable_type, :string

    add_index :feeds, :feedable_id
  end
end
