class Task < ActiveRecord::Base
  attr_accessible :name, :desc, :duedate, :priority_id

  belongs_to :priority

  def increase_urgency
  	urgency_index = self.priority.urgency_index
  	priorities = Priority.where("urgency_index > #{urgency_index}").sort{|x,y| x.urgency_index <=> y.urgency_index}

  	unless priorities.empty?
  		self.priority = priorities.shift
  		self.save
  	end

  end

  def decrease_urgency
  	urgency_index = self.priority.urgency_index
  	priorities = Priority.where("urgency_index < #{urgency_index}").sort{|x,y| x.urgency_index <=> y.urgency_index}

  	unless priorities.empty?
  		self.priority = priorities.last
  		self.save
  	end

  end

end
