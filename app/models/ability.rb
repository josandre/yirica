# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)

    if user.administrator?
      can :manage, :all

    elsif user.client?
      puts "user role is #{user.role.role}"
      puts "else if"


      can :read, :Room
      can :read, :RoomType

      can :read, :Responses

      can :read, :Comment
      can :create, :Comment
      can :delete, :Comment do |comment|
        comment.user == user
      end
      can :update, :Comment do |comment|
        comment.user == user
      end

      can :read, :Reservation do |reservation|
        reservation.user == user
      end
      can :create, :Reservation
      can :delete, :Reservation do |reservation|
        reservation.user == user
      end
      can :update, :Reservation do |reservation|
        reservation.user == user
      end

      can :read, :Bill do |bill|
        bill.reservation.user == user
      end

      can :create, :CancelRequest
      can :read, :CancelRequest do |cancel_request|
        cancel_request.reservation.user == user
      end
      can :delete, :CancelRequest do |cancel_request|
        cancel_request.reservation.user == user
      end
      can :update, :CancelRequest do |cancel_request|
        cancel_request.reservation.user == user
      end

      can :read, :ResponseCancel do |response_cancel|
        response_cancel.cancel_request.reservation.user == user
      end



      can :read, :ReservationRoom do |reservation_room|
        reservation_room.reservation.user == user
      end
      can :update, :ReservationRoom do |reservation_room|
        reservation_room.reservation.user == user
      end
    end
    # https://github.com/CanCanCommunity/cancancan/blob/develop/docs/define_check_abilities.md
  end
end
