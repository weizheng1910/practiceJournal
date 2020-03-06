class CreateRecordings < ActiveRecord::Migration[6.0]
  def change
    create_table :recordings do |t|
      t.string :name
      t.string :file
      t.references :journal, null: false, foreign_key: true
    end
  end
end
