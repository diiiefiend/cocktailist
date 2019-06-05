module Types
  class CocktailType < Types::BaseObject
    field :id, ID, null: false, description: "ID of the cocktail"
    field :name, String, null: false, description: "Cocktail name"
    field :liquor, String, null: false, description: "Main liquor of the cocktail"
    field :bar, BarType, null: false, description: "Bar the cocktail came from"

    def bar
      Loaders::PrimaryKeyLoader.for(Bar).load(object.bar_id)
    end
  end
end
