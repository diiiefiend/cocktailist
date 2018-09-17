module Api
  class ListitemsController < ApplicationController
    def index
      @listitems = Listitem.where(list_id: params[:id]).page(params[:page])
      render :index
    end

    def create
      clean_params = listitem_params
      @listitem = Listitem.new(clean_params)
      if @listitem.save
        Feed.new_feed_item_from_listitem!(current_user, @listitem)
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
      Listitem.include_additional_info.find(params[:id])
    end

    def listitem_params
      params.require(:listitem).permit(:cocktail_id, :list_id)
    end

  end
end
