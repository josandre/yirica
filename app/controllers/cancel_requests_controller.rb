class CancelRequestsController < ApplicationController
  before_action :set_cancel_request, only: %i[ show edit update destroy ]

  # GET /cancel_requests or /cancel_requests.json
  def index
    @cancel_requests = CancelRequest.all
  end

  # GET /cancel_requests/1 or /cancel_requests/1.json
  def show
  end

  # GET /cancel_requests/new
  def new
    @cancel_request = CancelRequest.new
  end

  # GET /cancel_requests/1/edit
  def edit
  end

  # POST /cancel_requests or /cancel_requests.json
  def create
    @cancel_request = CancelRequest.new(cancel_request_params)

    respond_to do |format|
      if @cancel_request.save
        format.html { redirect_to cancel_request_url(@cancel_request), notice: "Cancel request was successfully created." }
        format.json { render :show, status: :created, location: @cancel_request }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @cancel_request.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /cancel_requests/1 or /cancel_requests/1.json
  def update
    respond_to do |format|
      if @cancel_request.update(cancel_request_params)
        format.html { redirect_to cancel_request_url(@cancel_request), notice: "Cancel request was successfully updated." }
        format.json { render :show, status: :ok, location: @cancel_request }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @cancel_request.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /cancel_requests/1 or /cancel_requests/1.json
  def destroy
    @cancel_request.destroy!

    respond_to do |format|
      format.html { redirect_to cancel_requests_url, notice: "Cancel request was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cancel_request
      @cancel_request = CancelRequest.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def cancel_request_params
      params.require(:cancel_request).permit(:reason, :date, :is_confirmed, :reservation_id)
    end
end
