module Api
  class ListitemsController < ApplicationController
    def create
      clean_params = listitem_params
      @listitem = Listitem.new(clean_params)
      if @listitem.save
        Feed.create(user_id: current_user.id,
          cocktail_id: @listitem.cocktail_id,
          activity: "listed",
          data: "; #{@listitem.cocktail.bar.name}; #{@listitem.list.name}",
          feedable_id: @listitem.id,
          feedable_type: "Listitem")
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
