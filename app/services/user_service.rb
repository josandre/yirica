class UserService

  def initialize
    @user_repository = UserRepository.new
  end


  def get_by_id(user_id)
    user = @user_repository.get_by_id(user_id)
    user
  end

  def get_admin
    @user_repository.get_admin
  end

  def get_all_users
    begin
      users = @user_repository.get_all_users

      if users.present?
        {
          status: { code: 200, message: 'Users retrieved successfully.' },
          data: users.as_json(only: [:id, :name, :last_name, :email, :phone, :role_id, :created_at, :updated_at]),
          status_code: :ok
        }
      else {
        status: { code: 422, message: 'There are not users available.' },
        status_code: :unprocessable_entity
      }
      end
    rescue => e
      {
        status: { code: 500, message: 'An error occurred while fetching users.', error: e.message },
        status_code: :internal_server_error
      }
    end
  end
end