class UsersController < ApplicationController
  def index
    @users = User.all
    render component: 'users/Index', props: { users: @users, new_user: User.new }
  end
end
