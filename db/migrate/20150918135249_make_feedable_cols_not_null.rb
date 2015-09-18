class MakeFeedableColsNotNull < ActiveRecord::Migration
  def change
    change_column_null :feeds, :feedable_id, false
    change_column_null :feeds, :feedable_type, false
  end
end
