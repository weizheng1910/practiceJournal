class JournalSerializer < ActiveModel::Serializer
  has_many :record

  attributes :id, :date, :goals, :reflections
end
