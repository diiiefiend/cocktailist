Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  use_doorkeeper
  root to: 'main#root'

  get '/auth/facebook/callback', to: 'api/sessions#facebook'

  namespace :api, defaults: {format: :json} do
    get "/search", to: "static#search"

    resources :users, only: [:create, :show, :index] do
      member do
        resources :lists, only: [:index, :create, :update, :show, :destroy] do
          member do
            resources :listitems, only: [:index, :create, :update, :show, :destroy]
          end
        end
      end
    end

    resource :session, only: [:show, :create, :destroy]

    resources :cocktails, except: [:new, :edit] do
      member do
        resources :ratings, only: [:create, :update, :destroy, :show]
      end
    end

    resource :feed, only: [:show]

  end
end
