# Phase 2: Rating Cocktails, Viewing Cocktails and Scores

## Rails
### Models

### Controllers
Api::CocktailsController (create, destroy, index, show, update, edit)
Api::BarController (create, destroy, update)
Api::RatingsController (create, destroy, show, update, edit, new)

### Views
* cocktails/show.json.jbuilder

## Backbone
### Models
* Cocktail (parses nested `ratings` association)
* Rating

### Collections
* Cocktails
* Ratings

### Views
* ReviewForm
* FeedIndex (composite view)
* FeedShow 
* EntryShow (composite view)
* ReviewShow (composite view)
* BarShow

## Gems/Libraries
