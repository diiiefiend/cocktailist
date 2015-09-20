module Api
  class RatingsController < ApplicationController
    include ActionView::Helpers::TextHelper
    wrap_parameters false

    def create
      clean_params = rating_params
      clean_params[:rating] = rating_params[:rating_num].to_i
      clean_params[:user_id] = current_user.id
      clean_params.delete(:rating_num)
      @rating = Rating.new(clean_params)
      if @rating.save
        rating_num = @rating.rating
        Feed.create(user_id: current_user.id,
          cocktail_id: @rating.cocktail_id,
          activity: "rated",
          data: "#{truncate(@rating.body, length: 100, separator: ' ', ommission: '[...]')}; #{@rating.cocktail.bar.name}; #{rating_num}",
          feedable_id: @rating.id,
          feedable_type: "Rating")
        render :create
      else
        render json: @rating.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @rating = Rating.find(params[:id])
      render json: @rating
    end

    def update
      @rating = Rating.find(params[:id])
      if @rating.update(rating_params)
        render json: @rating
      else
        render json: @rating.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @rating = Rating.find(params[:id])
      @rating.try(:destroy)
      render json: {}
    end

    private

    def rating_params
      params.require(:rating).permit(:cocktail_id, :rating_num, :body)
    end
  end
end
