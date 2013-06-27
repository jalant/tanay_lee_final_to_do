Ajaxtodo::Application.routes.draw do
  root to: 'home#index'
 	get '/tasks/change_sorting' => 'tasks#change_sorting'

  #Notice that I am only including the resourceful routes that I am using, not all seven
  #index is only included because it appears to be necessary for form_for in some cases
  resources :tasks do 
  	member do 
  		post :increase_urgency 
  		post :decrease_urgency
  	end
  end
  resources :priorities
end
