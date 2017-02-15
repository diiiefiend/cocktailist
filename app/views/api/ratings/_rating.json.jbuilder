json.extract! rating, :id, :rating, :user_id, :body, :scale_composition, :scale_spirited
json.time rating.updated_at.to_formatted_s(:long_ordinal)
json.username rating.user.username
