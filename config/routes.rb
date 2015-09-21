Rails.application.routes.draw do
  post '/rate' => 'rater#create', :as => 'rate'
  root to: 'main#root'

  resources :users, only: [:new, :create, :show] do
    member do
      resources :lists do
        member do
          resources :listitems
        end
      end
    end
  end

  resource :session, only: [:new, :create] do
    member do
      get 'destroy', as: 'delete'
    end
  end

  namespace :api, defaults: {format: :json} do
    resources :cocktails, except: [:new, :edit] do
      member do
        resources :ratings, only: [:create, :update, :destroy, :show]
      end
    end
    resource :feed, only: [:show]
  end
end
