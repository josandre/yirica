class ResponseCancelsController < ApplicationController
  before_action :set_response_cancel, only: %i[ show edit update destroy ]

  # GET /response_cancels or /response_cancels.json
  def index
    @response_cancels = ResponseCancelRequest.all
  end

  # GET /response_cancels/1 or /response_cancels/1.json
  def show
  end

  # GET /response_cancels/new
  def new
    @response_cancel = ResponseCancelRequest.new
  end

  # GET /response_cancels/1/edit
  def edit
  end

  # POST /response_cancels or /response_cancels.json
  def create
    @response_cancel = ResponseCancelRequest.new(response_cancel_params)

    respond_to do |format|
      if @response_cancel.save
        format.html { redirect_to response_cancel_url(@response_cancel), notice: "Response cancel was successfully created." }
        format.json { render :show, status: :created, location: @response_cancel }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @response_cancel.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /response_cancels/1 or /response_cancels/1.json
  def update
    respond_to do |format|
      if @response_cancel.update(response_cancel_params)
        format.html { redirect_to response_cancel_url(@response_cancel), notice: "Response cancel was successfully updated." }
        format.json { render :show, status: :ok, location: @response_cancel }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @response_cancel.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /response_cancels/1 or /response_cancels/1.json
  def destroy
    @response_cancel.destroy!

    respond_to do |format|
      format.html { redirect_to response_cancels_url, notice: "Response cancel was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_response_cancel
      @response_cancel = ResponseCancelRequest.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def response_cancel_params
      params.require(:response_cancel).permit(:response, :date, :refund_information, :is_refunded, :cancel_request_id)
    end
end
