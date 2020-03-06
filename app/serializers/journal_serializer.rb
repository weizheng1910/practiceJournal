class JournalSerializer < ActiveModel::Serializer
  has_many :recordings
  attributes :id, :date, :goals, :reflections
end
