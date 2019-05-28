# t.string "name",    null: false
# t.string "address", null: false
# t.float "longitude"
# t.float "latitude"

class Bar < ApplicationRecord
  include PgSearch
  multisearchable against: [:name, :address]

  geocoded_by :full_address
  after_validation :geocode

  validates :name, :address, presence: true

  has_many :cocktails,
  dependent: :destroy

  def full_address
    self.address
  end
end
