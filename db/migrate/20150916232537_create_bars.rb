class CreateBars < ActiveRecord::Migration
  def change
    create_table :bars do |t|
      t.string :name, null: false
      t.string :address, null: false
    end

  end
end
