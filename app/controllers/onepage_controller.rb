class OnepageController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
  end

  def post

    if params["candidate"]["resume"] != nil
      begin
      result = Cloudinary::Uploader.upload(params["candidate"]["resume"], :allowed_formats => ["pdf"])
      rescue => e
        if e
          redirect_to edit_candidate_path, flash: { error: "Error" }
          return
        end
      end
      @candidate.resume_url = result["url"]

    puts params['date']
    puts params['goals']
    puts params['reflections']

    #obj[1] is the file object 
    puts "START LOOP"
    params.each do |obj|
      if obj[0][0..5] == 'record' 
        puts obj[1]
      end

    end
    puts "END LOOP"
    
    
  end



  
end
