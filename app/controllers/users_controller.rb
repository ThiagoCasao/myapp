class UsersController < ApplicationController
  def index
    @users = User.all
    render component: 'users/Index', props: { users: @users, newUser: User.new }
  end
end
