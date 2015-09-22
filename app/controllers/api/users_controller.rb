class Api::UsersController < ApplicationController
  wrap_parameters false

  def index
    @users = User.all
    render :index
  end

  def create
    @user = User.new(user_params)
    if @user.save
      List.create(user_id: @user.id, name: 'to-try')
      List.create(user_id: @user.id, name: 'experienced')
      log_in!(@user)
      render :show
    else
      byebug
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
