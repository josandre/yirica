
class UserRepository

  def get_by_id(user_id)
    User.find(user_id)
  end

  def get_all_users
    admin_role = Role.find_by(role: 'Administrator')
    User.where.not(role_id: admin_role.id)
  end


  def get_admin
    admin_role = Role.find_by(role: 'Administrator')
    User.where(role_id: admin_role.id)
  end
end