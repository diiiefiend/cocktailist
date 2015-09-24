json.listitems @listitems do |listitem|
  json.partial! 'api/listitems/listitem', listitem: listitem
end
