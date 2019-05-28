# t.string   "username",        null: false
# t.string   "email",           null: false
# t.string   "password_digest", null: false
# t.string   "session_token",   null: false
# t.datetime "created_at",      null: false
# t.datetime "updated_at",      null: false

class User < ApplicationRecord
  include PgSearch
  multisearchable against: [:username, :email]

  validates :username, :email, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: {minimum: 5, allow_nil: true}
  after_initialize :ensure_session_token
  after_create :create_default_lists!

  has_many :feed_items,
    class_name: "Feed",
    foreign_key: :user_id,
    primary_key: :id,
    dependent: :destroy

  has_many :ratings,
    dependent: :destroy

  has_many :lists,
    dependent: :destroy

  has_many :listitems, through: :lists, dependent: :destroy

  attr_reader :password

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

  def self.find_or_create_by_fb_hash(auth_hash)
    user = User.find_by(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid])

    unless user
      user = User.new(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid],
            username: auth_hash[:info][:name],
            email: auth_hash[:info][:image], #bad solution
            password: SecureRandom::urlsafe_base64)
      if user.save
        List.create(user_id: user.id, name: 'to-try')
        List.create(user_id: user.id, name: 'experienced')
      end
    end

    user
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

  def create_default_lists!
    lists.create!(List::DEFAULT_LISTS.map {|name| { name: name } })
  end
end
