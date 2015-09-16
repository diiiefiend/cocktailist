# t.integer  "user_id",     null: false
# t.integer  "cocktail_id", null: false
# t.string   "activity",    null: false

class Feed < ActiveRecord::Base
  validates :user_id, :cocktail_id, :activity, presence: true

  belongs_to :user
  belongs_to :cocktail

end
