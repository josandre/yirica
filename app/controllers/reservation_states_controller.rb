class ReservationStatesController < ApplicationController
  before_action :set_reservation_state, only: %i[ show edit update destroy ]

  # GET /reservation_states or /reservation_states.json
  def index
    @reservation_states = ReservationState.all
  end

  # GET /reservation_states/1 or /reservation_states/1.json
  def show
  end

  # GET /reservation_states/new
  def new
    @reservation_state = ReservationState.new
  end

  # GET /reservation_states/1/edit
  def edit
  end

  # POST /reservation_states or /reservation_states.json
  def create
    @reservation_state = ReservationState.new(reservation_state_params)

    respond_to do |format|
      if @reservation_state.save
        format.html { redirect_to reservation_state_url(@reservation_state), notice: "Reservation state was successfully created." }
        format.json { render :show, status: :created, location: @reservation_state }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @reservation_state.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /reservation_states/1 or /reservation_states/1.json
  def update
    respond_to do |format|
      if @reservation_state.update(reservation_state_params)
        format.html { redirect_to reservation_state_url(@reservation_state), notice: "Reservation state was successfully updated." }
        format.json { render :show, status: :ok, location: @reservation_state }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @reservation_state.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reservation_states/1 or /reservation_states/1.json
  def destroy
    @reservation_state.destroy!

    respond_to do |format|
      format.html { redirect_to reservation_states_url, notice: "Reservation state was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reservation_state
      @reservation_state = ReservationState.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def reservation_state_params
      params.require(:reservation_state).permit(:state)
    end
end
