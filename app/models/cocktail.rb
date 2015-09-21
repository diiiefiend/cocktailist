# t.string  "name",        null: false
# t.string  "liquor",      null: false
# t.string  "ingredients", null: false
# t.integer "bar_id"

class Cocktail < ActiveRecord::Base
  validates :name, :liquor, :ingredients, presence: true
  has_attached_file :img, default_url: "placeholder.png", styles: {small: "150x150>"}
  validates_attachment_content_type :img, content_type: /\Aimage\/.*\Z/

  has_many :ratings,
    dependent: :destroy

  has_many :list_items,
    dependent: :destroy

  belongs_to :bar,
    class_name: "Bar",
    foreign_key: :bar_id,
    primary_key: :id

  has_many :feed_items, as: :feedable, class_name: "Feed", dependent: :destroy
end
