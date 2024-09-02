# frozen_string_literal: true

class PaymentSuccessJob < ApplicationJob
  queue_as :default

  def perform(user, reservation_info, rooms, metadata, total)
    Rails.logger.info "PaymentSuccessJob started for User: #{user} at #{Time.current}"
    reservation = Reservation.create!(
      checking_date: reservation_info[:checkIn],
      checkout_date: reservation_info[:checkOut],
      user_notes: "Tests",
      user_id: user.id,
      reservation_state_id: default_reservation_state.id, # Assuming you have a default state
      is_refunded: true
    )

    rooms.each do |id|
      puts "room id #{id}"
      room = Room.find(id)
      ReservationRoom.create!(
        room_id: room.id,
        reservation_id: reservation.id
      )
    end

    bill = Bill.create!(
      reservation_id: reservation.id,
      discount: 0,
      taxes: 0,
      room_price: total,
      total: total,
      refund_price: 100
    )

    CheckoutMailer.bill_mail(user, bill, metadata ).deliver_now
    CheckoutMailer.reservation_mail(user, metadata, reservation).deliver_now
    Rails.logger.info "PaymentSuccessJob finished for User: #{user} at #{Time.current}"
  end

  private
  def default_reservation_state
    ReservationState.find_by(state: 'Active')
  end
end
