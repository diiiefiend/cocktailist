json.(@cocktail, :id, :name, :liquor, :ingredients, :bar)

json.img_url asset_path(@cocktail.img.url)
json.cocktailPic @cocktail.img.url(:small)

json.user_rating_id @user_rating_id

json.average_rating @average_rating

json.ratings @cocktail.ratings do |rating|
  json.partial! 'api/ratings/rating', rating: rating
end
