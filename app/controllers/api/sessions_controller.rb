class Api::SessionsController < ApplicationController
  wrap_parameters false

  def show
    if current_user
      render :show
    else
      render json: {}
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user.nil?
      # flash.now[:errors] = ["Invalid username/password combo"]
      # redirect_to new_session_url
      render json: {}, status: :unprocessable_entity
    else
      log_in!(@user)
      render :show
    end
  end

  def destroy
    log_out!
    render json: {}
  end
end
