module Api
  class FeedsController < ApplicationController
    wrap_parameters false

    def show
      @feedItems = Feed.all.order(created_at: :desc).includes(:user, :cocktail).page(params[:page])
      render :show
    end

  end
end
