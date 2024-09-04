class BillRepository

  def bill_exits_by_reservation(reservation)
    Bill.exists?(reservation_id: reservation.id)
  end

  def create_bill(reservation, total)
    Bill.create!(
      reservation_id: reservation.id,
      discount: 0,
      taxes: 0,
      room_price: total,
      total: total,
      refund_price: 100
    )
  end

end