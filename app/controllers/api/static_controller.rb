class Api::StaticController < ApplicationController

  def search
    search_term = params[:query]

    @cocktail_search_results = Cocktail.search do 
      keywords(search_term)
    end

    @bar_search_results = Bar.search do 
      keywords(search_term)
    end

    @user_search_results = User.search do 
      keywords(search_term)
    end

    render :search
  end

end
