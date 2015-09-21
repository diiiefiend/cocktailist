class Api::SessionsController < ApplicationController
  layout "signin"

  before_action :ensure_logged_in, only: :destroy

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
      # flash[:errors] = ["Invalid username/password combo"]
      # redirect_to new_session_url
      header :unprocessable_entity
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
