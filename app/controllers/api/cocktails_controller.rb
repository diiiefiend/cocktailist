module Api
  class CocktailsController < ApplicationController
    wrap_parameters false

    def index
      @cocktails = Cocktail.recent.include_additional_info
      render :index
    end

    def show
      @cocktail = current_cocktail
      if logged_in?
        user_rating = @cocktail.ratings.find_by(user_id: current_user.id)
      else
        user_rating = nil
      end
      @user_rating_id = user_rating.nil? ? -1 : user_rating.id
      render :show
    end

    def create
      errors = []
      clean_params = cleanup_params(cocktail_params, errors)

      if(!errors.empty?)
        return render json: errors, status: :unprocessable_entity
      end

      @cocktail = Cocktail.new(clean_params)
      if @cocktail.save
        Feed.new_feed_item_from_cocktail!(current_user, @cocktail)
        render json: @cocktail
      else
        render json: @cocktail.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @cocktail = current_cocktail

      errors = []
      clean_params = cleanup_params(cocktail_params, errors)

      if(!errors.empty?)
        return render json: errors, status: :unprocessable_entity
      end

      if @cocktail.update(clean_params)
        render json: @cocktail
      else
        render json: @cocktail.errors.full_messages, status: :unprocessable_entity
      end
    end

    # def destroy
    #   @cocktail = current_cocktail
    #   @cocktail.try(:destroy)
    #   render json: {}
    # end

    private
    def current_cocktail
      Cocktail.include_additional_info.find(params[:id])
    end

    def cocktail_params
      params.require(:cocktail).permit(:name, :liquor, :ingredients, :bar_name, :bar_address, :img)
    end

    #TODO rewrite this whole method...this is NOT how you do this
    def cleanup_params(cocktail_params, errors)
      clean_params = cocktail_params
      clean_params[:ingredients] = clean_params[:ingredients].downcase
      clean_params[:liquor] = clean_params[:liquor].downcase

      bar = Bar.find_by(name: clean_params[:bar_name])
      if bar.nil?
        bar_params = Hash.new
        bar_params[:name] = clean_params[:bar_name]
        bar_params[:address] = clean_params[:bar_address]
        @bar = Bar.new(bar_params)
        if !@bar.save
          errors << "Need bar details:"
          errors.concat(@bar.errors.full_messages)
          return errors
        end
      end
      clean_params[:bar_id] = Bar.find_by(name: clean_params[:bar_name]).id
      clean_params.delete(:bar_name)
      clean_params.delete(:bar_address)

      clean_params
    end
  end
end
