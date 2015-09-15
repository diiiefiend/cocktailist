class CreateUsers < ActiveRecord::Migration
  def change
    drop_table :user_tables
    
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false, unique: true
      t.string :password_digest, null: false
      t.string :session_token, null: false

      t.timestamps null: false
    end
  end
end
