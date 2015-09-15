module ApplicationHelper
  def form_auth
    <<-HTML.html_safe
      <input type="hidden" name="authenticity_token" value="#{form_authenticity_token}">
    HTML
  end
end
