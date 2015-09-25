class RenamePgTable < ActiveRecord::Migration
  def change
    rename_table :pg_search, :pg_search_documents
  end
end
