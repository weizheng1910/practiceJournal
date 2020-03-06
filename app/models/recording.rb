class Recording < ApplicationRecord
  belongs_to :journal, :inverse_of => :recordings

end