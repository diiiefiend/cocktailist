json.extract! list, :id, :name, :user_id
json.username list.user.username
json.time list.created_at.to_formatted_s(:long_ordinal)
json.time list.updated_at.to_formatted_s(:long_ordinal)

json.listitems list.listitems do |listitem|
  json.partial! 'api/listitems/listitem', listitem: listitem
end

json.listlength list.listitems.length
