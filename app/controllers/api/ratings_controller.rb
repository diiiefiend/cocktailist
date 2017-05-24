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
        Feed.new_feed_item_from_rating!(current_user, @rating)
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
      clean_params = rating_params
      clean_params[:rating] = rating_params[:rating_num]
      clean_params.delete(:rating_num)
      if @rating.update(clean_params)
        # create a new feeditem with the updated rating
        Feed.new_feed_item_from_rating!(current_user, @rating)
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
