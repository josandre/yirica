class CancelRequestsController < ApplicationController
  before_action :set_cancel_request, only: %i[ show edit update destroy ]
  before_action :initialize_cancel_request_service
  before_action :authenticate_request
  load_and_authorize_resource

  # GET /cancel_requests or /cancel_requests.json
  def index


  end

  # GET /cancel_requests/1 or /cancel_requests/1.json
  def show
  end

  # GET /cancel_requests/new
  def new

  end

  # GET /cancel_requests/1/edit
  def edit
  end

  # POST /cancel_requests or /cancel_requests.json
  def create
    reason = cancel_request_params[:reason]
    reservation_id = cancel_request_params[:reservation_id]

    puts "reason #{reason}"
    puts "reservation #{reservation_id}"
    current_user = @current_user
    json_response = @cancel_request_service.create_cancel_request(reason, reservation_id, current_user)
    render json: json_response, status: json_response[:status_code]
  end

  # PATCH/PUT /cancel_requests/1 or /cancel_requests/1.json
  def update

  end

  # DELETE /cancel_requests/1 or /cancel_requests/1.json
  def destroy
    @cancel_request.destroy!

    respond_to do |format|
      format.html { redirect_to cancel_requests_url, notice: "Cancel request was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def initialize_cancel_request_service
    @cancel_request_service = CancelRequestService.new
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_cancel_request
      @cancel_request = CancelRequest.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def cancel_request_params
      params.require(:cancel_request).permit(:reason, :reservation_id)
    end


end
