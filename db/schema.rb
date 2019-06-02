# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_30_004502) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bars", id: :serial, force: :cascade do |t|
    t.string "name", null: false
    t.string "address", null: false
    t.float "latitude"
    t.float "longitude"
  end

  create_table "cocktails", id: :serial, force: :cascade do |t|
    t.string "name", null: false
    t.string "liquor", null: false
    t.string "ingredients", null: false
    t.integer "bar_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "img_file_name"
    t.string "img_content_type"
    t.integer "img_file_size"
    t.datetime "img_updated_at"
    t.float "avg_rating"
    t.index ["bar_id"], name: "index_cocktails_on_bar_id"
  end

  create_table "feeds", id: :serial, force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "cocktail_id", null: false
    t.string "activity", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "data"
    t.integer "feedable_id", null: false
    t.string "feedable_type", null: false
    t.index ["cocktail_id"], name: "index_feeds_on_cocktail_id"
    t.index ["feedable_id"], name: "index_feeds_on_feedable_id"
    t.index ["user_id"], name: "index_feeds_on_user_id"
  end

  create_table "listitems", id: :serial, force: :cascade do |t|
    t.integer "cocktail_id", null: false
    t.integer "list_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cocktail_id"], name: "index_listitems_on_cocktail_id"
    t.index ["list_id"], name: "index_listitems_on_list_id"
  end

  create_table "lists", id: :serial, force: :cascade do |t|
    t.string "name", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_lists_on_user_id"
  end

  create_table "oauth_access_grants", force: :cascade do |t|
    t.bigint "resource_owner_id", null: false
    t.bigint "application_id", null: false
    t.string "token", null: false
    t.integer "expires_in", null: false
    t.text "redirect_uri", null: false
    t.datetime "created_at", null: false
    t.datetime "revoked_at"
    t.string "scopes"
    t.index ["application_id"], name: "index_oauth_access_grants_on_application_id"
    t.index ["resource_owner_id"], name: "index_oauth_access_grants_on_resource_owner_id"
    t.index ["token"], name: "index_oauth_access_grants_on_token", unique: true
  end

  create_table "oauth_access_tokens", force: :cascade do |t|
    t.bigint "resource_owner_id"
    t.bigint "application_id", null: false
    t.string "token", null: false
    t.string "refresh_token"
    t.integer "expires_in"
    t.datetime "revoked_at"
    t.datetime "created_at", null: false
    t.string "scopes"
    t.string "previous_refresh_token", default: "", null: false
    t.index ["application_id"], name: "index_oauth_access_tokens_on_application_id"
    t.index ["refresh_token"], name: "index_oauth_access_tokens_on_refresh_token", unique: true
    t.index ["resource_owner_id"], name: "index_oauth_access_tokens_on_resource_owner_id"
    t.index ["token"], name: "index_oauth_access_tokens_on_token", unique: true
  end

  create_table "oauth_applications", force: :cascade do |t|
    t.string "name", null: false
    t.string "uid", null: false
    t.string "secret", null: false
    t.text "redirect_uri", null: false
    t.string "scopes", default: "", null: false
    t.boolean "confidential", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["uid"], name: "index_oauth_applications_on_uid", unique: true
  end

  create_table "pg_search_documents", id: :serial, force: :cascade do |t|
    t.text "content"
    t.integer "searchable_id"
    t.string "searchable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ratings", id: :serial, force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "cocktail_id", null: false
    t.integer "rating", null: false
    t.text "body"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "scale_composition"
    t.integer "scale_spirited"
    t.index ["cocktail_id"], name: "index_ratings_on_cocktail_id"
    t.index ["user_id"], name: "index_ratings_on_user_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid"
    t.string "provider"
    t.index ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true
  end

  add_foreign_key "oauth_access_grants", "oauth_applications", column: "application_id"
  add_foreign_key "oauth_access_tokens", "oauth_applications", column: "application_id"
end
