class SessionsController < ApplicationController
  layout "signin"

  before_action :ensure_logged_in, only: :destroy

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user.nil?
      flash[:errors] = ["Invalid username/password combo"]
      redirect_to new_session_url
    else
      log_in!(@user)
      redirect_to root_url
    end
  end

  def destroy
    log_out!
    redirect_to new_session_url
  end
end
