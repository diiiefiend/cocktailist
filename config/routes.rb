Rails.application.routes.draw do
  root to: 'main#root'

  resources :users, only: [:new, :create, :show]

  resource :session, only: [:new, :create] do
    member do
      get 'destroy', as: 'delete'
    end
  end
end
