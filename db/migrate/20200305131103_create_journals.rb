class CreateJournals < ActiveRecord::Migration[6.0]
  def change
    create_table :journals do |t|
      t.string :date
      t.text :goals
      t.text :reflections
      t.bytea :blob

      t.timestamps
    end
  end
end
