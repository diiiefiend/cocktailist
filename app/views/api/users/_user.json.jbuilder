json.(user, :id, :username, :email)

json.created_at user.created_at.strftime("%m/%d/%Y")
