class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  belongs_to :role
  has_many :comments
  has_many :responses
  has_many :reservations, dependent: :destroy

  before_destroy :nullify_comments
  before_validation :set_default_role, on: :create

  def administrator?
    role.role == 'Administrator'
  end

  def jwt_payload
    super.merge('user_id' => id)
  end

  def client?
    role.role == 'Client'
  end

  private
  def nullify_comments
    comments.update_all(user_id: nil)
  end

  def set_default_role
    self.role ||= Role.find_by(id: 1)
  end

end
