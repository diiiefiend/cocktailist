class DeleteRatyRateTables < ActiveRecord::Migration
  def change
    drop_table :rating_caches
    drop_table :rates
    drop_table :overall_averages
  end
end
