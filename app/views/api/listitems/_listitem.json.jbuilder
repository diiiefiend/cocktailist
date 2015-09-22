json.extract! listitem, :id, :cocktail_id, :list_id
json.partial! 'api/cocktails/cocktail', cocktail: listitem.cocktail
json.username listitem.list.user.username

json.time listitem.updated_at.to_formatted_s(:long_ordinal)
