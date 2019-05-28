# t.string   "name",        null: false
# t.integer  "user_id",     null: false
# t.datetime "created_at",  null: false
# t.datetime "updated_at",  null: false

class List < ApplicationRecord
  validates :name, :user_id, presence: true
  # should have something to vailidate that the combo of name and user_id is unique

  belongs_to :user

  has_many :listitems,
    dependent: :destroy

  DEFAULT_LISTS = [
    TO_TRY = "to_try",
    EXPERIENCED = "experienced"
  ]

end
