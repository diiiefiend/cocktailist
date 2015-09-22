# t.string   "username",        null: false
# t.string   "email",           null: false
# t.string   "password_digest", null: false
# t.string   "session_token",   null: false
# t.datetime "created_at",      null: false
# t.datetime "updated_at",      null: false

class User < ActiveRecord::Base
  validates :username, :email, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: {minimum: 5, allow_nil: true}
  after_initialize :ensure_session_token

  has_many :feed_items,
    class_name: "Feed",
    foreign_key: :user_id,
    primary_key: :id,
    dependent: :destroy

  has_many :ratings,
    dependent: :destroy

  has_many :lists,
    dependent: :destroy

  has_many :list_items,
    through: :lists,
    dependent: :destroy

  attr_reader :password

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

  def self.generate_token
    SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = self.class.generate_token
    self.save!
    session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end


  private
  def ensure_session_token
    self.session_token ||= self.class.generate_token
  end
end
