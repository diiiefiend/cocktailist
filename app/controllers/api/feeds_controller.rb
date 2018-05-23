module Api
  class FeedsController < ApplicationController
    wrap_parameters false

    def show
      @feedItems = Feed.recent.include_additional_info.page(params[:page])
      render :show
    end

  end
end
