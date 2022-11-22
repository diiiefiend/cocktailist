json.total_count @cocktail_search_results.results.total_count + @bar_search_results.results.total_count + @user_search_results.results.total_count

json.results do 
  # need this to be 1 big array so it's properly parsed as a collection, sigh

  cocktailsArr = json.array! @cocktail_search_results.results.each do | result |
    json.partial! "api/cocktails/cocktail", cocktail: result
    json._type "Cocktail"
  end
  barsArr = json.array! @bar_search_results.results.each do | result |
    json.partial! "api/bars/bar", bar: result
    json._type "Bar"
  end
  usersArr = json.array! @user_search_results.results.each do | result |
    json.partial! "api/users/user", user: result
    json._type "User"
  end

  cocktailsArr + barsArr + usersArr
end