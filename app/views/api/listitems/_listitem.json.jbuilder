json.extract! listitem, :id, :cocktail_id, :user_id
json.cocktail listitem.cocktail
json.username listitem.list.user.username

json.time listitem.updated_at.to_formatted_s(:long_ordinal)
