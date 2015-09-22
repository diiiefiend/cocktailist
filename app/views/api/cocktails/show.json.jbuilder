json.partial! 'api/cocktails/cocktail', cocktail: @cocktail

json.user_rating_id @user_rating_id

json.ratings @cocktail.ratings do |rating|
  json.partial! 'api/ratings/rating', rating: rating
end
