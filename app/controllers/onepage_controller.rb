class OnepageController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
  end

  def post

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
