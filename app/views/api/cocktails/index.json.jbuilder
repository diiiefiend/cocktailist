json.array! @cocktails do |cocktail|
  json.extract! cocktail, :id, :name, :liquor, :ingredients, :bar, :ratings
  json.time cocktail.created_at.to_formatted_s(:long_ordinal)
end
