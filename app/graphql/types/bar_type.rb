module Types
  class BarType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :address, String, null: false
    field :location, String, null: true

    def location
      if object.longitude.present? && object.latitude.present?
        "#{object.longitude}, #{object.latitude}"
      end
    end
  end
end
