class AddLongitudeLatitudeToBars < ActiveRecord::Migration
  def change
    add_column :bars, :latitude, :float
    add_column :bars, :longitude, :float
  end
end
