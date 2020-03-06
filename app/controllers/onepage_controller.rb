class OnepageController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
  end

  def post

    # begin
     #     result = Cloudinary::Uploader.upload(obj[1], :allowed_formats => ["mp3"])
     #     rescue => e
     #   if e
     #     puts "error"
      #    return
      #  end
        # @candidate.resume_url = result["url"]
        # @candidate.update(candidate_params)

    puts params['date']
    puts params['goals']
    puts params['reflections']

    journal = Journal.create(date:params['date'], goals: params['goals'], reflections: params['reflections'])



    #obj[1] is the file object 
    puts "START LOOP"
    params.each do |obj|
      if obj[0][0..5] == 'record'
        #obj1 is the actual file object  
        puts obj[1]
        begin
          result = Cloudinary::Uploader.upload(obj[1], :allowed_formats => ["mp3"])
          rescue => e
          if e
            puts "error"
            return
          end





      end
    end

    
    puts "END LOOP"
    
    
  end



  
end
