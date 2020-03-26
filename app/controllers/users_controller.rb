class UsersController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_user, only: [:inactivate]
  before_action :set_user_to_save, only: [:save]  

  def index
    @users = User.all
    render component: 'users/Users', props: { users: @users, newUser: User.new }
  end

  def inactivate
    @user.discarded? ? @user.undiscard : @user.discard
    render json: { user: @user }
  rescue StandardError => e
    render json: { error: e, user: @user }, status: 422
  end
  
  def save
    @user.assign_attributes(user_params)
    if @user.valid? && @user.save      
      render json: { user: @user }
    else
      render json: { error: @user.errors.messages, user: @user }, status: 422          
    end
  rescue StandardError => e
    render json: { error: e, user: @user }, status: 422    
  end

  private  
    
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:user_id])
  end
    
  # Use callbacks to share common setup or constraints between actions.
  def set_user_to_save
    @user = if params[:user_id] && params[:user_id] != 'null'
              User.find(params[:user_id])
            else
              User.new
            end
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.require(:user).permit(:id, :f_name, :l_name)
  end


end
