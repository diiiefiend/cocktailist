module Api
  class CocktailsController < ApplicationController
    def index
      @cocktails = Cocktail.all
      render json: @cocktails
    end

    def show
      @cocktail = current_cocktail
      render :show
    end

    def create
      @cocktail = Cocktail.new(cocktail_params)
      if @cocktail.save
        render json: @cocktail
      else
        render json: @cocktail.errors.full_messages, status: :unprocessable_entity
      end
    end

    def edit
      @cocktail = current_cocktail
      if @cocktail.update(cocktail_params)
        render json: @cocktail
      else
        render json: @cocktail.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @cocktail = current_cocktail
      @cocktail.try(:destroy)
      render json: {}
    end

    private
    def current_cocktail
      Cocktail.find(params[:id])
    end

    def cocktail_params
      params.require(:cocktail).permit(:name, :liquor, :ingredients, :bar_id)
    end
  end
end
