json.(@cocktail, :id, :name, :liquor, :ingredients, :bar)

json.ratings @cocktail.ratings do |rating|
  json.partial! 'api/ratings/rating', rating: rating
end
