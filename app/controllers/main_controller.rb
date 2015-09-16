class MainController < ApplicationController
  before_action :ensure_logged_in

  def root; end
end
