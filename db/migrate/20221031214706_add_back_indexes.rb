class AddBackIndexes < ActiveRecord::Migration
  def change
    add_index "cocktails", ["bar_id"], name: "index_cocktails_on_bar_id", using: :btree

    add_index "feeds", ["cocktail_id"], name: "index_feeds_on_cocktail_id", using: :btree
    add_index "feeds", ["feedable_id"], name: "index_feeds_on_feedable_id", using: :btree
    add_index "feeds", ["user_id"], name: "index_feeds_on_user_id", using: :btree

    add_index "listitems", ["cocktail_id"], name: "index_listitems_on_cocktail_id", using: :btree
    add_index "listitems", ["list_id"], name: "index_listitems_on_list_id", using: :btree

    add_index "lists", ["user_id"], name: "index_lists_on_user_id", using: :btree

    add_index "ratings", ["cocktail_id"], name: "index_ratings_on_cocktail_id", using: :btree
    add_index "ratings", ["user_id"], name: "index_ratings_on_user_id", using: :btree

    add_index "users", ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true, using: :btree
  end
end
