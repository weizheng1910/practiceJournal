Rails.application.routes.draw do
  get '/react' => 'onepage#index'
  post '/entry' => 'onepage#post'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
