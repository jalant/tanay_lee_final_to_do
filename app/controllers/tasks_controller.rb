class TasksController < ApplicationController
  def new
    @task = Task.new
    @tasks = Task.all.sort_by{|task| [task.priority.urgency_index, task.name]}.reverse
    @priorities = Priority.all
  end

def create
  task = Task.new(params[:task])
  task.save!
  name = task.priority.name
  color = task.priority.color
  urgency_index = task.priority.urgency_index

  render json: {task: task, priority_name: name, urgency_index: urgency_index, priority_color: color, priorityid: task.priority.id}
end

def destroy
  task = Task.find(params[:id])
  task.destroy();
  render json: task
end

def update 
  task = Task.find(params[:id])
  task.update_attributes(params[:task])

  name = task.priority.name
  color = task.priority.color
  urgency_index = task.priority.urgency_index

  render json: {task: task, priority_name: name, urgency_index: urgency_index, priority_color: color, priorityid: task.priority.id}
end

 def increase_urgency
  task = Task.find(params[:id])
  task.increase_urgency

  name = task.priority.name
  color = task.priority.color
  urgency_index = task.priority.urgency_index

  render json: {task: task, priority_name: name, urgency_index: urgency_index, priority_color: color, priorityid: task.priority.id}
 end

 def decrease_urgency
  task = Task.find(params[:id])
  task.decrease_urgency

  name = task.priority.name
  color = task.priority.color
  urgency_index = task.priority.urgency_index

  render json: {task: task, priority_name: name, urgency_index: urgency_index, priority_color: color, priorityid: task.priority.id}



 end 

end
