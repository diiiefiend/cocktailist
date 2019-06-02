# t.integer  "user_id",     null: false
# t.integer  "cocktail_id", null: false
# t.string   "activity",    null: false

class Feed < ApplicationRecord

  validates :user_id, :cocktail_id, :activity, presence: true
  validates :activity, inclusion: {in: %w(added rated listed), message: "invalid activity"}

  belongs_to :user
  belongs_to :cocktail

  belongs_to :feedable, polymorphic: true

  scope :include_additional_info, -> { includes(:user, :cocktail) }
  scope :recent, -> { order(created_at: :desc) }

  paginates_per 7      #for kaminari

  # TODO combine these three methods
  def self.new_feed_item_from_cocktail!(current_user, cocktail)
    delimiter = " | "
    Feed.create!(
      user_id: current_user.id,
      cocktail_id: cocktail.id,
      activity: "added",
      data: cocktail.ingredients + delimiter + cocktail.bar.name,
      feedable_id: cocktail.id,
      feedable_type: "Cocktail"
    )
  end

  def self.new_feed_item_from_listitem!(current_user, listitem)
    delimiter = " | "
    Feed.create!(
      user_id: current_user.id,
      cocktail_id: listitem.cocktail_id,
      activity: "listed",
      data: delimiter + listitem.cocktail.bar.name + delimiter + listitem.list.name,
      feedable_id: listitem.id,
      feedable_type: "Listitem"
    )
  end

  def self.new_feed_item_from_rating!(current_user, rating)
    delimiter = " | "
    truncated_rating_body = rating.body.length > 100 ? rating.body[0...100] + "..." : rating.body
    Feed.create(user_id: current_user.id,
      cocktail_id: rating.cocktail_id,
      activity: "rated",
      data: truncated_rating_body + delimiter + rating.cocktail.bar.name + delimiter + "#{rating.rating}",
      feedable_id: rating.id,
      feedable_type: "Rating")
  end
end
