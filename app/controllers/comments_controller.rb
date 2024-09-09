class CommentsController < ApplicationController
  before_action :authenticate_request, only: [:create]
  before_action :set_comment, only: %i[ show edit update destroy ]
  before_action :initialize_comment_service
  load_and_authorize_resource



  # GET /comments or /comments.json
  def index


  end

  # GET /comments/1 or /comments/1.json
  def show
  end

  # GET /comments/new
  def new
    @comment = Comment.new
  end

  # GET /comments/1/edit
  def edit
  end

  # POST /comments or /comments.json
  def create
    comment = comment_params[:comment]
    punctuation = comment_params[:punctuation]
    room_id = comment_params[:room_id]
    puts "current user #{@current_user.id}"

    json_response = @comment_service.create(comment, punctuation, @current_user, room_id)
    render json: json_response, status: json_response[:status_code]
  end



  private
    def set_comment
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:comment, :punctuation, :room_id)
    end

    def initialize_comment_service
      @comment_service = CommentService.new
    end
end
