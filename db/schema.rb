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

ActiveRecord::Schema.define(version: 20221031210919) do

  create_table "bars", force: :cascade do |t|
    t.string "name",      limit: 255, null: false
    t.string "address",   limit: 255, null: false
    t.float  "latitude",  limit: 53
    t.float  "longitude", limit: 53
  end

  create_table "cocktails", force: :cascade do |t|
    t.string   "name",             limit: 255, null: false
    t.string   "liquor",           limit: 255, null: false
    t.string   "ingredients",      limit: 255, null: false
    t.integer  "bar_id",           limit: 4,   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "img_file_name",    limit: 255
    t.string   "img_content_type", limit: 255
    t.integer  "img_file_size",    limit: 4
    t.datetime "img_updated_at"
    t.float    "avg_rating",       limit: 53
  end

  create_table "feeds", force: :cascade do |t|
    t.integer  "user_id",       limit: 4,   null: false
    t.integer  "cocktail_id",   limit: 4,   null: false
    t.string   "activity",      limit: 255, null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "data",          limit: 255
    t.integer  "feedable_id",   limit: 4,   null: false
    t.string   "feedable_type", limit: 255, null: false
  end

  create_table "listitems", force: :cascade do |t|
    t.integer  "cocktail_id", limit: 4, null: false
    t.integer  "list_id",     limit: 4, null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  create_table "lists", force: :cascade do |t|
    t.string   "name",       limit: 255, null: false
    t.integer  "user_id",    limit: 4,   null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "ratings", force: :cascade do |t|
    t.integer  "user_id",           limit: 4,     null: false
    t.integer  "cocktail_id",       limit: 4,     null: false
    t.integer  "rating",            limit: 4,     null: false
    t.text     "body",              limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "scale_composition", limit: 4
    t.integer  "scale_spirited",    limit: 4
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        limit: 255, null: false
    t.string   "email",           limit: 255, null: false
    t.string   "password_digest", limit: 255, null: false
    t.string   "session_token",   limit: 255, null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "uid",             limit: 255
    t.string   "provider",        limit: 255
  end

end
