json.total_count @search_results.total_count

json.results do
  json.array! @search_results do |search_result|
    if search_result.searchable_type == "Cocktail"
      json.partial! "api/cocktails/cocktail", cocktail: search_result.searchable
      json._type "Cocktail"
    elsif search_result.searchable_type == "Bar"
      json.partial! "api/bars/bar", bar: search_result.searchable
      json._type "Bar"
    else
      json.partial! "api/users/user", user: search_result.searchable
      json._type "User"
    end
  end
end
