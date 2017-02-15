# t.integer  "user_id",     null: false
# t.integer  "cocktail_id", null: false
# t.integer  "rating",      null: false
# t.text     "body"
# t.datetime "created_at"
# t.datetime "updated_at"
# t.integer  "scale_composition"
# t.integer  "scale_spirited"

class Rating < ActiveRecord::Base
  validates :user_id, :cocktail_id, :rating, presence: true
  validates :rating, numericality: {greater_than: 0}

  belongs_to :user
  belongs_to :cocktail

  has_many :feed_items, as: :feedable, class_name: "Feed", dependent: :destroy
end
