module Api
  class ListsitemsController < ApplicationController
    def create
    end

    def update
    end

    def show
      @listitem = current_listitem
      render :show
    end

    def destroy
      @listitem = current_listitem
      @listitem.try(:destroy)
      render json: {}
    end

    private
    def current_listitem
      Listitem.includes(:cocktail, :list).find(params[:id])
    end

    def listitem_params
      params.require(:listitem).permit(:cocktail_id, :list_id)
    end

  end
end
