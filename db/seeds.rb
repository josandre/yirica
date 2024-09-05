
ReservationRoom.destroy_all
Reservation.destroy_all
ReservationState.destroy_all
User.destroy_all
RoomTypeAmenity.destroy_all
RoomTypeService.destroy_all
Amenity.destroy_all
Service.destroy_all
Room.destroy_all


client_role = Role.create({ role: 'Client' })
admin_role = Role.create({ role: 'Administrator' })
user_client_1 = User.create({name: 'Jocselyn', last_name: 'Aguilar', password: 'User123!', phone: '63399135', role_id: client_role.id, email: 'jocselynaguilarchinchilla@gmail.com' })
user_client_2 = User.create({name: 'Andrea', last_name: 'Chinchilla', password: 'User1234!', phone: '63399135', role_id: admin_role.id, email: 'jaguilarc@ucenfotec.ac.cr' })
puts 'client and roles created'

deluxe = RoomType.create(name: 'Deluxe',description: 'A deluxe room with all amenities',max_people: '4',kids_accepted: true)
suite = RoomType.create(name: 'Suite',description: 'A luxurious suite with multiple rooms',max_people: '6',kids_accepted: true)
standard = RoomType.create(name: 'Standard',description: 'A standard room with basic amenities',max_people: '2',kids_accepted: false)
puts 'room types created'

amenities = [
  'Free Wi-Fi', 'Air Conditioning', 'Flat-screen TV', 'Mini Fridge', 'Coffee Maker',
  'Room Safe', 'Iron & Ironing Board', 'Hairdryer', 'Private Balcony', 'In-room Dining',
  'Complimentary Toiletries', 'Bathrobe & Slippers', 'Blackout Curtains', 'Desk & Chair',
  'Telephone', 'Alarm Clock', 'Wardrobe or Closet', 'Seating Area', 'Soundproofing',
  'Heating'
].map { |name| Amenity.create(name: name) }

services = [
  'Room Service', 'Daily Housekeeping', 'Laundry Service', '24-hour Reception',
  'Concierge Service', 'Airport Shuttle', 'Valet Parking', 'Fitness Center',
  'Spa Services', 'Massage Services', 'Swimming Pool Access', 'Business Center',
  'Conference Room', 'Babysitting Service', 'Pet-friendly Rooms', 'Restaurant on Site',
  'Bar/Lounge Access', 'Free Breakfast', 'High-speed Internet Access', 'Wake-up Service'
].map { |name| Service.create(name: name) }


def assign_random_amenities_and_services(room_type, amenities, services)
  room_type.amenities << amenities.sample(7)
  room_type.services << services.sample(7)
end

assign_random_amenities_and_services(deluxe, amenities, services)
assign_random_amenities_and_services(suite, amenities, services)
assign_random_amenities_and_services(standard, amenities, services)

puts 'Amenities and Services associated with Room Types'

room_1 = Room.create(
  usage_amount: 20,
  adult_price: 150.0,
  kids_price: 50.0,
  number:101,
  location: '1st Floor',
  room_type_id: deluxe.id,
  is_active: true,
  is_beachfront: true,
  sqm: 70,
  bathrooms: 2,
  beds: 2
)
room_1.image_rooms.create!(image: 'https://hotelhubstorageaccount.blob.core.windows.net/hotelhubblobcontainer/rooms/junior-suite.png', is_principal: true)


room_2 = Room.create(
  usage_amount: 15,
  adult_price: 200.0,
  kids_price: 60.0,
  number: 201,
  location: '2nd Floor',
  room_type_id: suite.id,
  is_active: true,
  is_beachfront:false,
  sqm: 90,
  bathrooms: 3,
  beds: 5
)
room_2.image_rooms.create!(image: 'https://hotelhubstorageaccount.blob.core.windows.net/hotelhubblobcontainer/rooms/family.png')

room_3 = Room.create(
  usage_amount: 10,
  adult_price: 100.0,
  kids_price: 0,
  number: 301,
  location: '3rd Floor',
  room_type_id: standard.id,
  is_active: true,
  is_beachfront:false,
  sqm: 45,
  bathrooms: 1,
  beds: 1
)
room_3.image_rooms.create!(image: 'https://hotelhubstorageaccount.blob.core.windows.net/hotelhubblobcontainer/rooms/executive.png')

room_4 = Room.create(
  usage_amount: 2,
  adult_price: 20.0,
  kids_price: 0,
  number: 304,
  location: '3rd Floor',
  room_type_id: standard.id,
  is_active: true,
  is_beachfront: false,
  sqm: 45,
  bathrooms: 1,
  beds: 1
)
room_4.image_rooms.create!(image: 'https://hotelhubstorageaccount.blob.core.windows.net/hotelhubblobcontainer/rooms/double-standard.png')


room_5 = Room.create(
  usage_amount: 5,
  adult_price: 120.0,
  kids_price: 40.0,
  number: 102,
  location: '1st Floor',
  room_type_id: deluxe.id,
  is_active: true,
  is_beachfront: false,
  sqm: 65,
  bathrooms: 1,
  beds: 2
)
room_5.image_rooms.create!(image: 'https://hotelhubstorageaccount.blob.core.windows.net/hotelhubblobcontainer/rooms/deluxe.png')

room_6 = Room.create(
  usage_amount: 8,
  adult_price: 250.0,
  kids_price: 80.0,
  number: 202,
  location: '2nd Floor',
  room_type_id: suite.id,
  is_active: true,
  is_beachfront: true,
  sqm: 85,
  bathrooms: 2,
  beds: 4
)
room_6.image_rooms.create!(image: 'https://hotelhubstorageaccount.blob.core.windows.net/hotelhubblobcontainer/rooms/beach-front-standard-single.png')

room_7 = Room.create(
  usage_amount: 12,
  adult_price: 90.0,
  kids_price: 20.0,
  number: 302,
  location: '3rd Floor',
  room_type_id: standard.id,
  is_active: true,
  is_beachfront: false,
  sqm: 50,
  bathrooms: 1,
  beds: 1
)
room_7.image_rooms.create!(image: 'https://hotelhubstorageaccount.blob.core.windows.net/hotelhubblobcontainer/rooms/suite.png')


room_8 = Room.create(
  usage_amount: 7,
  adult_price: 180.0,
  kids_price: 60.0,
  number: 103,
  location: '1st Floor',
  room_type_id: deluxe.id,
  is_active: true,
  is_beachfront: true,
  sqm: 75,
  bathrooms: 2,
  beds: 2
)
room_8.image_rooms.create!(image: 'https://hotelhubstorageaccount.blob.core.windows.net/hotelhubblobcontainer/rooms/deluxe.png')

room_9 = Room.create(
  usage_amount: 3,
  adult_price: 220.0,
  kids_price: 70.0,
  number: 203,
  location: '2nd Floor',
  room_type_id: suite.id,
  is_active: true,
  is_beachfront: true,
  sqm: 95,
  bathrooms: 3,
  beds: 5
)
room_9.image_rooms.create!(image: 'https://hotelhubstorageaccount.blob.core.windows.net/hotelhubblobcontainer/rooms/beach-front-standard-single.png')

active_reservation_state = ReservationState.create(state: "Active", description: "The reservation is active")
canceled_reservation_state = ReservationState.create(state: "Canceled", description: "The reservation was canceled")
pending_reservation_state = ReservationState.create(state: "Pending payment", description: "The reservation needs to be paid")

client_1 = User.find_by(email: 'jocselynaguilarchinchilla@gmail.com')
client_2 = User.find_by(email: 'jaguilarc@ucenfotec.ac.cr')

room_101 = Room.find_by(number: 101)
room_102 = Room.find_by(number: 102)
room_103 = Room.find_by(number: 103)
room_201 = Room.find_by(number: 201)
room_202 = Room.find_by(number: 202)
room_203 = Room.find_by(number: 203)
room_301 = Room.find_by(number: 301)
room_302 = Room.find_by(number: 302)
room_304 = Room.find_by(number: 304)

reservation_1 = Reservation.create(
  checking_date: Date.today,
  checkout_date: Date.today + 3.days,
  user_notes: 'First time visiting.',
  is_refunded: false,
  reservation_state_id: active_reservation_state.id,
  user_id: client_1.id
)

reservation_2 = Reservation.create(
  checking_date: Date.today + 5.days,
  checkout_date: Date.today + 7.days,
  user_notes: 'Would like an extra bed.',
  is_refunded: false,
  reservation_state_id: pending_reservation_state.id,
  user_id: client_2.id
)

reservation_3 = Reservation.create(
  checking_date: Date.today + 10.days,
  checkout_date: Date.today + 13.days,
  user_notes: 'Ocean view requested.',
  is_refunded: true,
  reservation_state_id: canceled_reservation_state.id,
  user_id: client_1.id
)

reservation_4 = Reservation.create(
  checking_date: Date.today + 2.days,
  checkout_date: Date.today + 4.days,
  user_notes: 'Late check-in requested.',
  is_refunded: false,
  reservation_state_id: active_reservation_state.id,
  user_id: client_2.id
)

reservation_5 = Reservation.create(
  checking_date: Date.today + 1.day,
  checkout_date: Date.today + 2.days,
  user_notes: 'Honeymoon package.',
  is_refunded: false,
  reservation_state_id: pending_reservation_state.id,
  user_id: client_1.id
)

reservation_6 = Reservation.create(
  checking_date: Date.today + 3.days,
  checkout_date: Date.today + 5.days,
  user_notes: 'Business trip.',
  is_refunded: false,
  reservation_state_id: active_reservation_state.id,
  user_id: client_2.id
)

reservation_7 = Reservation.create(
  checking_date: Date.today + 8.days,
  checkout_date: Date.today + 10.days,
  user_notes: 'Family vacation, need extra beds.',
  is_refunded: false,
  reservation_state_id: pending_reservation_state.id,
  user_id: client_1.id
)

reservation_8 = Reservation.create(
  checking_date: Date.today + 4.days,
  checkout_date: Date.today + 6.days,
  user_notes: 'Anniversary celebration.',
  is_refunded: false,
  reservation_state_id: active_reservation_state.id,
  user_id: client_2.id
)

reservation_9 = Reservation.create(
  checking_date: Date.today + 12.days,
  checkout_date: Date.today + 14.days,
  user_notes: 'Quiet room needed for work.',
  is_refunded: true,
  reservation_state_id: canceled_reservation_state.id,
  user_id: client_1.id
)

reservation_10 = Reservation.create(
  checking_date: Date.today + 6.days,
  checkout_date: Date.today + 9.days,
  user_notes: 'Large group, connecting rooms requested.',
  is_refunded: false,
  reservation_state_id: pending_reservation_state.id,
  user_id: client_2.id
)

ReservationRoom.create(reservation_id: reservation_1.id,room_id: room_101.id)
ReservationRoom.create(reservation_id: reservation_2.id, room_id: room_201.id)
ReservationRoom.create(reservation_id: reservation_3.id, room_id: room_301.id)
ReservationRoom.create(reservation_id: reservation_4.id, room_id: room_304.id)
ReservationRoom.create(reservation_id: reservation_5.id, room_id: room_101.id)
ReservationRoom.create(reservation_id: reservation_6.id, room_id: room_102.id)
ReservationRoom.create(reservation_id: reservation_7.id, room_id: room_202.id)
ReservationRoom.create(reservation_id: reservation_8.id, room_id: room_103.id)
ReservationRoom.create(reservation_id: reservation_9.id, room_id: room_302.id)
ReservationRoom.create(reservation_id: reservation_10.id, room_id: room_203.id)