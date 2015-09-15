class CreateUserTable < ActiveRecord::Migration
  def change
    create_table :user_tables do |t|
      t.string :username, null: false
      t.string :email, null: false, unique: true
      t.string :password_digest, null: false
      t.string :session_token, null: false

      t.timestamps null: false
    end
  end
end
