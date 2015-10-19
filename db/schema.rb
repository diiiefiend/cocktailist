# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20151019180619) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bars", force: :cascade do |t|
    t.string "name",      null: false
    t.string "address",   null: false
    t.float  "latitude"
    t.float  "longitude"
  end

  create_table "cocktails", force: :cascade do |t|
    t.string   "name",             null: false
    t.string   "liquor",           null: false
    t.string   "ingredients",      null: false
    t.integer  "bar_id",           null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "img_file_name"
    t.string   "img_content_type"
    t.integer  "img_file_size"
    t.datetime "img_updated_at"
  end

  add_index "cocktails", ["bar_id"], name: "index_cocktails_on_bar_id", using: :btree

  create_table "feeds", force: :cascade do |t|
    t.integer  "user_id",       null: false
    t.integer  "cocktail_id",   null: false
    t.string   "activity",      null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "data"
    t.integer  "feedable_id",   null: false
    t.string   "feedable_type", null: false
  end

  add_index "feeds", ["cocktail_id"], name: "index_feeds_on_cocktail_id", using: :btree
  add_index "feeds", ["feedable_id"], name: "index_feeds_on_feedable_id", using: :btree
  add_index "feeds", ["user_id"], name: "index_feeds_on_user_id", using: :btree

  create_table "listitems", force: :cascade do |t|
    t.integer  "cocktail_id", null: false
    t.integer  "list_id",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "listitems", ["cocktail_id"], name: "index_listitems_on_cocktail_id", using: :btree
  add_index "listitems", ["list_id"], name: "index_listitems_on_list_id", using: :btree

  create_table "lists", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "lists", ["user_id"], name: "index_lists_on_user_id", using: :btree

  create_table "pg_search_documents", force: :cascade do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "ratings", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.integer  "cocktail_id", null: false
    t.integer  "rating",      null: false
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ratings", ["cocktail_id"], name: "index_ratings_on_cocktail_id", using: :btree
  add_index "ratings", ["user_id"], name: "index_ratings_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "uid"
    t.string   "provider"
  end

  add_index "users", ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true, using: :btree

end
