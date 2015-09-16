# t.string  "name",        null: false
# t.string  "liquor",      null: false
# t.string  "ingredients", null: false
# t.integer "bar_id"

class Cocktail < ActiveRecord::Base
  validates :name, :liquor, :ingredients, presence: true

  has_many :feed_items,
    class_name: "Feed",
    foreign_key: :cocktail_id,
    primary_key: :id,
    dependent: :destroy

end
