# t.string "name",    null: false
# t.string "address", null: false

class Bar < ActiveRecord::Base
  validates :name, :address, presence: true

  has_many :cocktails,
  dependent: :destroy
end
