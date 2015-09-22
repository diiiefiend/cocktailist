json.(cocktail, :id, :name, :liquor, :ingredients, :bar)

json.img_url asset_path(cocktail.img.url)
json.cocktailPic cocktail.img.url(:small)
