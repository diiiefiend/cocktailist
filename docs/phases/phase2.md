# Phase 2: Rating Cocktails, Viewing Cocktails and Scores

## Rails
### Models

### Controllers
Api::CocktailsController (create, destroy, index, show, update, edit)
Api::FeedsController (show)
Api::RatingsController (create, destroy, show, update, edit, new)

### Views
* cocktails/index.json.jbuilder
* cocktails/show.json.jbuilder
* feed/show.json.jbuilder

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

## Gems/Libraries
