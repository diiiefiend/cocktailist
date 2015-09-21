Rails.application.routes.draw do
  root to: 'main#root'


  namespace :api, defaults: {format: :json} do
    resources :users, only: [:new, :create, :show] do
      member do
        resources :lists do
          member do
            resources :listitems, only: [:new, :create, :update, :edit, :destroy]
          end
        end
      end
    end

    resource :session, only: [:show, :create] do
      member do
        get 'destroy', as: 'delete'
      end
    end

    resources :cocktails, except: [:new, :edit] do
      member do
        resources :ratings, only: [:create, :update, :destroy, :show]
      end
    end
    resource :feed, only: [:show]
  end
end
