Rails.application.routes.draw do
  get '/react' => 'onepage#index'
  get '/entry' => 'onepage#show'
  post '/entry' => 'onepage#post'
  post '/delete' => 'onepage#delete'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
