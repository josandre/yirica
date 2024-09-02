class UserService

  def initialize
    @user_repository = UserRepository.new
  end


  def get_by_id(user_id)
    puts "user id in service #{user_id}"
    user = @user_repository.get_by_id(user_id)
    puts "user in repository: #{user}"
    user
  end
end