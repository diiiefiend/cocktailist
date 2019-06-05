module Types
  class QueryType < Types::BaseObject
    field :cocktail, CocktailType, null: true, description: "Cocktail By ID" do
      argument :id, ID, required: true
    end

    field :feed_items, [FeedType], null: false, description: "Current user's feed items"

    def cocktail(id:)
      Cocktail.find(id)
    end

    def feed_items
      current_user = context[:current_user]
      current_user.feed_items if current_user.present?
    end
  end
end
