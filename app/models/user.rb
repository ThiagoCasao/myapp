class User < ApplicationRecord
  include Discard::Model
  
  validates :l_name, :f_name, presence: true
  validates :l_name, length: { minimum: 2 }
end
