

class OnepageController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
  end

  def post

    puts params['date']
    puts params['goals']
    puts params['reflections']

    @journal = Journal.create(date:params['date'], goals: params['goals'], reflections: params['reflections'])

    #obj[1] is the file object 
    puts "START LOOP"
    params.each do |obj|
      if obj[0][0..5] == 'record'
        #obj1 is the actual file object  
        file_name = obj[1].original_filename
        puts file_name
        puts obj[1].tempfile
         begin
         result = Cloudinary::Uploader.upload(obj[1].tempfile, :resource_type => :video)
          puts "Yes conditional passed"
          puts result['url']
          recording = Recording.create(name: file_name, file: result['url'], journal_id: @journal.id)
          
          rescue => e
          if e
            puts e
            puts "Something wrong"
            return
          end     
      end # end conditional check 

    end # end loop

    

    
  end #end loop
    
    x = Jour
    
  end
    
  



  
end
