# t.string  "name",        null: false
# t.string  "liquor",      null: false
# t.string  "ingredients", null: false
# t.integer "bar_id"

class Cocktail < ApplicationRecord
  include PgSearch
  multisearchable against: [:name, :liquor, :ingredients]

  validates :name, :liquor, :ingredients, presence: true
  has_attached_file :img, default_url: "placeholder.png", styles: {small: "150x150>"}
  validates_attachment_content_type :img, content_type: /\Aimage\/.*\Z/

  has_many :ratings,
    dependent: :destroy

  has_many :listitems,
    dependent: :destroy

  belongs_to :bar,
    class_name: "Bar",
    foreign_key: :bar_id,
    primary_key: :id

  has_many :feed_items, as: :feedable, class_name: "Feed", dependent: :destroy

  scope :include_additional_info, -> { includes(:bar, :ratings) }
  scope :recent, -> { order(created_at: :desc) }

  def calculate_avg_rating
    current_ratings = ratings
    if current_ratings.length > 0
      avg = current_ratings.pluck(:rating).inject(:+) / current_ratings.length.to_f
    else
      avg = -1
    end
  end

end
