class AddAttachmentImgToCocktails < ActiveRecord::Migration
  def self.up
    change_table :cocktails do |t|
      t.attachment :img
    end
  end

  def self.down
    remove_attachment :cocktails, :img
  end
end
