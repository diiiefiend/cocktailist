module Types
  class FeedType < Types::BaseObject
    field :id, ID, null: false, description: "ID of the feed"
    field :activity, String, null: false, description: "Feed Activity"
    field :cocktail, CocktailType, null: false, description: "Cocktail for the feed item"

    def cocktail
      Loaders::PrimaryKeyLoader.for(Cocktail).load(object.cocktail_id)
    end
  end
end
