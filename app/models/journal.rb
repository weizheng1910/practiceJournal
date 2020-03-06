class Journal < ApplicationRecord
  has_many :recordings, :inverse_of => :journal
end
