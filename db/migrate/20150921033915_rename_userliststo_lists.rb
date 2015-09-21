class RenameUserliststoLists < ActiveRecord::Migration
  def change
    rename_table :userlists, :lists
  end
end
