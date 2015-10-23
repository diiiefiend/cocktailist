json.array! @cocktails do |cocktail|
  json.extract! cocktail, :id, :name, :liquor, :ingredients, :bar, :avg_rating
  json.cocktailPic cocktail.img.url(:small)
  json.time cocktail.created_at.to_formatted_s(:long_ordinal)
end
