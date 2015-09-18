module Api
  class FeedsController < ApplicationController

    def show
      @feedItems = Feed.all.order(created_at: :desc).limit(7).includes(:user, :cocktail)
      render :show
    end

  end
end
