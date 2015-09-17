class AddDataToFeeds < ActiveRecord::Migration
  def change
    add_column :feeds, :data, :string
  end
end
