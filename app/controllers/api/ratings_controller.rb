class RatingsController < ApplicationController
  def create
    clean_params = rating_params

    @rating = Rating.new(rating_params)
    if @rating.save
      Feed.create(user_id: current_user.id, cocktail_id: @rating.cocktail_id, activity: "rated", data: @rating.body+"; "+@rating.cocktail.bar.name)
      render json: @rating
    else
      render json: @rating.errors.full_messages, status: :unprocessable_entity
    end
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
    params.require(:rating).permit(:cocktail_id, :rating, :body)
  end
end
