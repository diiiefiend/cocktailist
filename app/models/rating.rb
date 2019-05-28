# t.integer  "user_id",     null: false
# t.integer  "cocktail_id", null: false
# t.integer  "rating",      null: false
# t.text     "body"
# t.datetime "created_at"
# t.datetime "updated_at"
# t.integer  "scale_composition"
# t.integer  "scale_spirited"

class Rating < ApplicationRecord
  validates :user_id, :cocktail_id, :rating, presence: true
  validates :rating, numericality: {greater_than: 0}

  belongs_to :user
  belongs_to :cocktail

  after_save :update_avg_rating

  has_many :feed_items, as: :feedable, class_name: "Feed", dependent: :destroy

  delegate :calculate_avg_rating, to: :cocktail, prefix: true, allow_nil: true

  def update_avg_rating
    cocktail.update!(avg_rating: cocktail_calculate_avg_rating)
  end
end
