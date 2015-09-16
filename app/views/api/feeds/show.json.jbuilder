json.array! @feedItems do |feedItem|
  json.id feedItem.id
  json.user_id feedItem.user_id
  json.cocktail_id feedItem.cocktail_id
  json.activity feedItem.activity
  json.created_at feedItem.created_at
  json.username feedItem.user.username
  json.cocktailName feedItem.cocktail.name
end
