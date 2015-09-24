class Api::SessionsController < ApplicationController
  wrap_parameters false

  def facebook
    user = User.find_or_create_by_fb_hash(request.env['omniauth.auth'])
    log_in!(user)

    flash[:success] = "Logged in with Facebook!"
    redirect_to root_url
  end

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
