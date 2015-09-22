json.extract! list, :id, :name, :user_id
json.username list.user
json.time cocktail.created_at.to_formatted_s(:long_ordinal)
json.time cocktail.updated_at.to_formatted_s(:long_ordinal)
