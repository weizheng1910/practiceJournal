

class OnepageController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
  end

  def post
      puts params
    # If entry with same data already exist?
    if @journal = Journal.find_by(date: params['date'])
      @journal.update(goals: params['goals'], reflections: params['reflections'])
      # Update recordings by
      # Destroying existing recordings associated with this entry
      # Then updating it again with new ones
      # @old_recordings = Recording.where(journal_id: @journal_id)
      # @old_recordings.destroy

      params.each do |param|
        # Checking if the first 6 characters is 'record'
        puts "What is in param???"
        puts param
        if param[0][0..5] == 'record'
          # Each parameter is an array; the param[0] is the key and param[1] is the value   
          # The value of the parameter, param[1] is a Javascript File object, where
          # .original_filename accesses the file name, and
          # .tempfile points to the actual file.
          

          if param[1].is_a? String
            next
          end

          puts "Not a JSON OBJECT"
          #recording = JSON.parse(param[1])
          #puts "Convert param[1] to object"
          #puts recording

          #puts string_to_object['name']
          #puts string_to_object['file']

          file_name = param[1].original_filename
          file = param[1].tempfile
          puts file_name
          puts file
          

          
          
          
          begin
            # Upload file to Cloudinary, 
            # After which, the same file could be accessed using 
            # result[:url]
            result = Cloudinary::Uploader.upload(file, :resource_type => :video)
            puts result['url']
            recording = Recording.create(name: file_name, file: result['url'], journal_id: @journal.id)
            
            rescue => e
            if e
              puts e
              return
            end     
          end # end begin
        end # end if param[0][0..5] 
      end #end loop




    # Start else-condition if existing entry doesn't exist.
    else
      puts params['date']
      puts params['goals']
      puts params['reflections']

      @journal = Journal.create(date:params['date'], goals: params['goals'], reflections: params['reflections'])

      # params is an object of the post request. It is the request.body 
      # For each parameter in the params object, check if the name contains 'record'. If it does, it contains the recording file
      params.each do |param|
        # Checking if the first 6 characters is 'record'
        if param[0][0..5] == 'record'
          # Each parameter is an array; the param[0] is the key and param[1] is the value   
          # The value of the parameter, param[1] is a Javascript File object, where
          # .original_filename accesses the file name, and
          # .tempfile points to the actual file.
          file_name = param[1].original_filename
          puts file_name
          puts param[1].tempfile
          begin
            # Upload file to Cloudinary, 
            # After which, the same file could be accessed using 
            # result[:url]
            result = Cloudinary::Uploader.upload(param[1].tempfile, :resource_type => :video)
            puts result['url']
            recording = Recording.create(name: file_name, file: result['url'], journal_id: @journal.id)
            
            rescue => e
            if e
              puts e
              return
            end     
          end # end begin
        end # end if param[0][0..5] 
      end #end loop
      
      this_journal = Journal.joins(:recordings).last
      serialized_journal = JournalSerializer.new(this_journal).as_json  
      render plain: serialized_journal.to_json
    end #end conditional (if doesn't exist)
    
  end
    
  def show
    puts "Show action success"
    puts params['date'] 
    
    if journal = Journal.find_by(date: params['date'])
      puts "In here"
      serialized_journal = JournalSerializer.new(journal).as_json
      render plain: serialized_journal.to_json
    end


  end #end show 



  
end
