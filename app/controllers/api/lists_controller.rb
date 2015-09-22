module Api
  class ListsController < ApplicationController
    def index
      @list = List.all
      render :index
    end

    def create
    end

    def update
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
