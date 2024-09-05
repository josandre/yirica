# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    puts "ability #{user.client?}"

    if user.administrator?
      can :manage, :all

    elsif user.client?

      can :read, Room

      can :read, RoomType

      can :read, Response

      can :read, Comment

      can :create, Comment

      can :delete, Comment do |comment|
        comment.user == user
      end
      can :update, Comment do |comment|
        comment.user == user
      end

      can :read, Reservation do |reservation|
        reservation.user == user
      end
      can :create, Reservation

      can :delete, Reservation do |reservation|
        reservation.user == user
      end
      can :update, Reservation do |reservation|
        reservation.user == user
      end

      can :read, Bill do |bill|
        bill.reservation.user == user
      end

      can :create, CancelRequest
      can :read, CancelRequest do |cancel_request|
        cancel_request.reservation.user == user
      end
      can :delete, CancelRequest do |cancel_request|
        cancel_request.reservation.user == user
      end
      can :update, CancelRequest do |cancel_request|
        cancel_request.reservation.user == user
      end

      can :read, ResponseCancel do |response_cancel|
        response_cancel.cancel_request.reservation.user == user
      end

      can :read, ReservationRoom do |reservation_room|
        reservation_room.reservation.user == user
      end
      can :update, ReservationRoom do |reservation_room|
        reservation_room.reservation.user == user
      end
    end

  end
end
