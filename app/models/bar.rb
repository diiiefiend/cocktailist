# t.string "name",    null: false
# t.string "address", null: false

class Bar < ActiveRecord::Base
  include PgSearch
  multisearchable against: [:name, :address]

  validates :name, :address, presence: true

  has_many :cocktails,
  dependent: :destroy
end
