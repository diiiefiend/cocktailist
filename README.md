# cocktailist

[Heroku link][heroku]

[heroku]: http://cocktailist.herokuapp.com

## Minimum Viable Product
cocktailist is a clone of Goodreads built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create cocktail entries
- [ ] Review cocktails
- [ ] View cocktail summaries and reviews/scores
- [ ] Add cocktails to had/want to try/not interested lists
- [ ] Searching for cocktails

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Cocktail Entry Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create cocktail entries using
a simple text form in a Rails view. The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

[Details][phase-one]

### Phase 2: Rating Cocktails, Viewing Cocktails and Scores  (~2 days)
I will add API routes to serve entry and rating data as JSON, then add Backbone
models and collections that fetch data from those routes. Rating data will be processed and aggregated.
By the end of this phase, users will be able to create entries/reviews and view both entries and ratings, all
inside a single Backbone app.

[Details][phase-two]

### Phase 3: More Advanced Cocktail Entries (~1 day)
I plan to use third-party libraries to add functionality to the `CocktailNew` and
`CocktailShow` views in this phase. I want to integrate Filepicker/Amazon S3 for file upload so
users can add images during entry creation and possibly reviews.

[Details][phase-three]

### Phase 4: Browsing Cocktails, User Lists (~2 days)
Users will be able to browse cocktails by liquor. They will be able to add cocktails to one of several lists: 
"experienced", "want to try", and "not interested." A 'ListShow' view will be added to display each of 
these lists and some stats on the entry. 

[Details][phase-four]

### Phase 5: Searching for Cocktails (~1 day)
Users will be able to search for cocktails by name. (Simple straightforward search for now.) A search 
results view will be added.

[Details][phase-five]


### Bonus Features (TBD)
- [ ] Browse cocktails by bar or ingredient (integrating Google Map API)
- [ ] Tag cocktails (i.e. spicy, adventurous, traditional, etc.)
- [ ] Browse cocktails by tag
- [ ] Get recommendations based on drinking history, tags, and location
- [ ] A 2-d graph view of cocktails, plotted out based on tags, if I can find a way to quantify the tags
- [ ] User activity feeds
- [ ] Ability to follow users, comments on their activity, etc
- [ ] Pagination/infinite scroll on the recommendations page/lists page
- [ ] Smart search (i.e. autocomplete words)

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md

