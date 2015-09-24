# t.integer  "user_id",     null: false
# t.integer  "cocktail_id", null: false
# t.string   "activity",    null: false

class Feed < ActiveRecord::Base
  validates :user_id, :cocktail_id, :activity, presence: true
  validates :activity, inclusion: {in: %w(added rated listed), message: "invalid activity"}

  belongs_to :user
  belongs_to :cocktail

  belongs_to :feedable, polymorphic: true

  paginates_per 7      #for kaminari
end
