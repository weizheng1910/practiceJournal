class RecordingSerializer < ActiveModel::Serializer
  belongs_to :journal

  attributes :id, :name, :file, 
end
