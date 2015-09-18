json.(@cocktail, :id, :name, :liquor, :ingredients, :bar)

json.img_url asset_path(@cocktail.img.url)

json.ratings @cocktail.ratings do |rating|
  json.partial! 'api/ratings/rating', rating: rating
end
