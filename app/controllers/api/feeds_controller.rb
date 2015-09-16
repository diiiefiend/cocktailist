module Api
  class FeedsController < ApplicationController

    def show
      @feedItems = Feed.all.order(created_at: :desc).limit(10)
      render :show
    end

  end
end
