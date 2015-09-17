# t.integer  "user_id",     null: false
# t.integer  "cocktail_id", null: false
# t.integer  "rating",      null: false
# t.text     "body"
# t.datetime "created_at"
# t.datetime "updated_at"

class Rating < ActiveRecord::Base
  validates :user_id, :cocktail_id, :rating, presence: true

  belongs_to :user
  belongs_to :cocktail

end
