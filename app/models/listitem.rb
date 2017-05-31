# t.integer  "cocktail_id", null: false
# t.integer  "list_id",     null: false
# t.datetime "created_at",  null: false
# t.datetime "updated_at",  null: false

class Listitem < ActiveRecord::Base
  validates :cocktail_id, :list_id, presence: true

  belongs_to :list
  belongs_to :cocktail

  has_many :feed_items, as: :feedable, class_name: "Feed", dependent: :destroy

  scope :includes_items, -> { includes(:user, :cocktail) }

  paginates_per 5
end
