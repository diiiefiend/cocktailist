module Api
  class BarsController < ApplicationController
    private
    def bar_params
      params.require(:bar).permit(:name, :address)
    end
  end
end
