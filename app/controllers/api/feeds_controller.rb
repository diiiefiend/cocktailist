module Api
  class FeedsController < ApplicationController
    wrap_parameters false

    def show
      @feedItems = Feed.recent.includes_items.page(params[:page])
      render :show
    end

  end
end
