class BillService

  def initialize
    @bill_repository = BillRepository.new
  end

  def bill_exits_by_reservation(reservation)
    @bill_repository.bill_exits_by_reservation(reservation)
  end


  def create_bill(reservation, total)
    @bill_repository.create_bill(reservation, total)
  end
end