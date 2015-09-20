json.extract! rating, :id, :rating, :user_id, :body
json.time rating.updated_at.to_formatted_s(:long_ordinal)
json.username rating.user.username
