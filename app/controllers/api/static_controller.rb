class Api::StaticController < ApplicationController

  def search
    @search_results = PgSearch.multisearch(params[:query]).includes(:searchable).page(params[:page])
    render :search
  end

end
