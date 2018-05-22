module Api
  class ListsController < ApplicationController
    def index
      if logged_in?
        @lists = current_user.lists.includes(listitems: { cocktail: {} })
      else
        @lists = nil
      end
      render :index
    end

    def create
      clean_params = list_params
      clean_params[:user_id] = current_user.id
      @list = List.new(clean_params)
      if @list.save
        render json: @list
      else
        render json: @list.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @list = current_list
      if @list.update(list_params)
        render json: @list
      else
        render json: @list.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @list = current_list
      render :show
    end

    def destroy
      @list = current_list
      @list.try(:destroy)
      render json: {}
    end

    private
    def current_list
      List.includes(:listitems, :user).find(params[:id])
    end

    def list_params
      params.require(:list).permit(:name)
    end

  end
end
