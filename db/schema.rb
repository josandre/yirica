# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_08_22_233051) do
  create_table "bills", force: :cascade do |t|
    t.decimal "discount"
    t.decimal "taxes"
    t.decimal "room_price"
    t.decimal "total"
    t.decimal "refund_price"
    t.integer "reservation_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reservation_id"], name: "index_bills_on_reservation_id"
  end

  create_table "cancel_requests", force: :cascade do |t|
    t.text "reason"
    t.date "date"
    t.boolean "is_confirmed"
    t.integer "reservation_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reservation_id"], name: "index_cancel_requests_on_reservation_id"
  end

  create_table "comments", force: :cascade do |t|
    t.string "comment"
    t.integer "punctuation"
    t.boolean "is_legal"
    t.integer "user_id", null: false
    t.integer "room_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["room_id"], name: "index_comments_on_room_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "reservation_rooms", force: :cascade do |t|
    t.integer "room_id", null: false
    t.integer "reservation_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reservation_id"], name: "index_reservation_rooms_on_reservation_id"
    t.index ["room_id"], name: "index_reservation_rooms_on_room_id"
  end

  create_table "reservation_states", force: :cascade do |t|
    t.string "state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
  end

  create_table "reservations", force: :cascade do |t|
    t.date "checking_date"
    t.date "checkout_date"
    t.text "user_notes"
    t.boolean "is_refunded"
    t.integer "reservation_state_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["reservation_state_id"], name: "index_reservations_on_reservation_state_id"
    t.index ["user_id"], name: "index_reservations_on_user_id"
  end

  create_table "response_cancels", force: :cascade do |t|
    t.text "response"
    t.date "date"
    t.text "refund_information"
    t.boolean "is_refunded"
    t.integer "cancel_request_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cancel_request_id"], name: "index_response_cancels_on_cancel_request_id"
  end

  create_table "responses", force: :cascade do |t|
    t.string "response"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "comment_id", null: false
    t.index ["comment_id"], name: "index_responses_on_comment_id"
    t.index ["user_id"], name: "index_responses_on_user_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "room_types", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "max_people"
    t.boolean "kids_accepted"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rooms", force: :cascade do |t|
    t.integer "usage_amount"
    t.decimal "adult_price"
    t.decimal "kids_price"
    t.integer "number"
    t.string "location"
    t.integer "room_type_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_active"
    t.boolean "is_beachfront"
    t.integer "sqm"
    t.integer "bathrooms"
    t.integer "beds"
    t.index ["room_type_id"], name: "index_rooms_on_room_type_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "last_name"
    t.string "password"
    t.string "phone"
    t.integer "role_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "jti"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  add_foreign_key "bills", "reservations"
  add_foreign_key "cancel_requests", "reservations"
  add_foreign_key "comments", "rooms"
  add_foreign_key "comments", "users"
  add_foreign_key "reservation_rooms", "reservations"
  add_foreign_key "reservation_rooms", "rooms"
  add_foreign_key "reservations", "reservation_states"
  add_foreign_key "reservations", "users"
  add_foreign_key "response_cancels", "cancel_requests"
  add_foreign_key "responses", "comments"
  add_foreign_key "responses", "users"
  add_foreign_key "rooms", "room_types"
  add_foreign_key "users", "roles"
end
