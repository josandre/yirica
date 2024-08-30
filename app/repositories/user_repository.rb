
class UserRepository

  def get_by_id(user_id)
    User.find(user_id)
  end
end