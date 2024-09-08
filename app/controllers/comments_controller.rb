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
    user_id = comment_params[:user_id]
    room_id = comment_params[:room_id]

    json_response = @comment_service.create(comment, punctuation, user_id, room_id)
    render json: json_response, status: json_response[:status_code]
  end

  # PATCH/PUT /comments/1 or /comments/1.json
  def update
    respond_to do |format|
      if @comment.update(comment_params)
        format.html { redirect_to comment_url(@comment), notice: "Comment was successfully updated." }
        format.json { render :show, status: :ok, location: @comment }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1 or /comments/1.json
  def destroy
    @comment.destroy!

    respond_to do |format|
      format.html { redirect_to comments_url, notice: "Comment was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    def set_comment
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:comment, :punctuation, :user_id, :room_id)
    end

    def initialize_comment_service
      @comment_service = CommentService.new
    end
end
