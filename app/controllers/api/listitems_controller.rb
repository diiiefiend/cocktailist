module Api
  class ListsitemsController < ApplicationController
    def create
      clean_params = listitem_params
      @listitem = Listitem.new(clean_params)
      if @listitem.save
        render json: @listitem
      else
        render json: @listitem.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @listitem = current_listitem
      if @listitem.update(listitem_params)
        render json: @listitem
      else
        render json: @listitem.errors.full_messages, status: :unprocessable_entity
      end
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
