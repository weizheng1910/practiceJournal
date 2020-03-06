class OnepageController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
  end

  def post

    puts params[:date]
    puts params[:goals]
    puts params[:reflections]
    puts params[:blob]

    
    
  end



  
end
