Rails.application.routes.draw do
  resources :image_rooms

  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup',
    password: 'reset-password',
  },
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations',
               passwords: 'users/passwords',
             }

  resources :rooms do
    collection do
      get 'most_used', to: 'rooms#most_used'
      get 'search', to: 'rooms#search'
    end
  end

  resources :response_cancels
  resources :cancel_requests
  resources :bills
  resources :reservation_rooms
  resources :reservations
  resources :reservation_states
  resources :responses
  resources :comments
  resources :room_types
  resources :users
  resources :roles
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.


  get "up" => "rails/health#show", as: :rails_health_check

  root to: redirect('/app')

  get 'app', to: 'client_app#client_app'

  get '/app/*path', to: 'client_app#client_app', constraints: ->(req) { !req.xhr? && req.format.html? }

  get 'roles', to: 'roles#index'


  # Defines the root path route ("/")
  # root "posts#index"
end

