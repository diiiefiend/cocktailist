json.array! @feedItems do |feedItem|
  json.extract! feedItem, :id, :user_id, :cocktail_id, :activity, :data
  json.time feedItem.created_at.to_formatted_s(:long_ordinal)
  json.username feedItem.user.username
  json.cocktailName feedItem.cocktail.name
  json.cocktailPic feedItem.cocktail.img.url(:small)
end
