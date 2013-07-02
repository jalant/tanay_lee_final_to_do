var edit_id;
function repopulate_row(data){
  var task = $('<tr>');
  var upArrowLink = $('<a href="#">').html('<i class="general foundicon-up-arrow"></i>').attr('data-id', data.task.id).addClass('up');
  var downArrowLink = $('<a href="#">').html('<i class="general foundicon-down-arrow"></i>').attr('data-id', data.task.id).addClass('down');
  $('<td>').append(upArrowLink).append(downArrowLink).appendTo(task);
  $('<td class="name">').text(data.task.name).appendTo(task);
  $('<td class="desc">').text(data.task.desc).appendTo(task);
  $('<td class= "duedate">').text(data.task.duedate).appendTo(task);
  $('<td class= "priority_urgency_name">').text(data.priority_name).appendTo(task);
  $('<td class= "priority_id">').text(data.priorityid).appendTo(task).addClass('hidden');
  $('<td>').text(data.urgency_index).addClass('priority_urgency_index').addClass("hidden").appendTo(task);
  $(task).css('background-color', data.priority_color);
  var data_cell_for_options = $('<td>').addClass('options');
  var view_button = $('<a>').attr('href', '#').text('View').addClass('small button success radius');
  var delete_button = $('<a>').attr('href', '#').text('Delete').addClass('small button alert radius delete-button').attr('data-id', data.task.id);
  var edit_button = $('<a>').attr('href', '#').text('Edit').addClass('small button radius edit-button').attr('data-id', data.task.id);
  data_cell_for_options.append(view_button);
  data_cell_for_options.append(delete_button);
  data_cell_for_options.append(edit_button);
  data_cell_for_options.appendTo(task).fadeIn(2000);
  add_node(task);
  $('#new_task input[type=text]').val('');
}
function increase_priority(e){
  e.preventDefault();
  var id_of_task = $(this).data('id');
  var task_row = $(this).parent().parent().fadeOut(1000);
  $.ajax(
  {
    type: 'POST',
    url: id_of_task+ '/increase_urgency',
    success: function(data){repopulate_row(data);}
  });
}
function decrease_priority(e){
  e.preventDefault();
  var id_of_task = $(this).data('id');
  var task_row = $(this).parent().parent().fadeOut(1000);
  $.ajax(
  {
    type: 'POST',
    url: id_of_task+ '/decrease_urgency',
    success: function(data){repopulate_row(data);}
  });
}
function tiny_edit_button(e){
  e.preventDefault();
  $('.edit-button').hide();
  $('#cancel').removeClass('hidden')
  var task_id = $(this).data('id');
  edit_id = task_id;
  var task_row = $(this).parent().parent();
  var name = task_row.find('.name').text();
  $('#task_name').val(name.trim());
  $('#task_desc').val(task_row.find('.desc').text());
  $('#task_duedate').val(task_row.find('.duedate').text());
  var priority_name = task_row.find('.priority_urgency_name').text();
  $('#submit').addClass('hidden');
  $('#edit-submit').removeClass('hidden').attr('data-task-id', task_id);
  $('tbody').off('click', '.up');
  $('tbody').off('click', '.down');
   $('tbody').off('click', '.delete-button');
 
  task_row.css('position', 'absolute');
  task_row.animate({top: "+=323px", left: "+=900px" , opacity: 0.75}, 1500)
  task_row.addClass('tmp-position')

  var drop_box = $('#task_priority_id').children();
  for(i=0; i<drop_box.length; i++){
    if(priority_name === $(drop_box[i]).text()){
      $(drop_box[i]).prop('selected', true);
      return;
    }
  }
}
function tiny_delete_button(e){
  e.preventDefault();
  var id_of_task = $(this).data('id');
  var task_row = $(this).parent().parent().fadeOut(2000);
  $.ajax(
  {
    type: 'DELETE',
    url: id_of_task
  });
}
function large_edit_button(e){
  e.preventDefault();
  $('tbody').on('click', '.up', increase_priority);
  $('tbody').on('click', '.down', decrease_priority);
  $('tbody').on('click', '.delete-button', tiny_delete_button);
  $('#cancel').addClass('hidden');
  $('.edit-button').fadeIn(1000);
  $('#edit-submit').addClass('hidden');
  $('#submit').removeClass('hidden');
  $('.tmp-position').remove()
  var settings =
  {
    task: {
      name: $('#task_name').val(),
      desc: $('#task_desc').val(),
      duedate: $('#task_duedate').val(),
      priority_id: $('#task_priority_id').val()
    }
  };
  $.ajax(
  {
    type: 'PUT',
    data: settings,
    url: edit_id,
    success: function(data){repopulate_row(data);}
  });
}
function cancel_update(e) {
  e.preventDefault();
  $('#cancel').addClass('hidden');
  $('.edit-button').fadeIn(1000);
  $('#edit-submit').addClass('hidden');
  $('#submit').removeClass('hidden');
  $('#new_task input[type=text]').val('');
  $('tbody').empty();
  $('tbody').append(e.data.prevState);
  $('.tmp-position').remove();
}
function create_task(e){
  e.preventDefault();
  var settings =
  {
    task: {
      name: $('#task_name').val(),
      desc: $('#task_desc').val(),
      duedate: $('#task_duedate').val(),
      priority_id: $('#task_priority_id').val()
    }
  };
  $.post('/tasks', settings, function(data){repopulate_row(data);});
}
function add_node(task){
  $('tbody').append(task.fadeIn(2000));
  // task.appendTo($('tbody')).fadeIn(20000);
  sorted = $('tbody tr').sort(sort_by_urgency_index_name);
  $('tbody').empty().append(sorted);
}
function sort_by_urgency_index_name(a,b){
  index_a = $(a).children('.priority_urgency_index').text();
  index_b = $(b).children('.priority_urgency_index').text();
  index_c = $(a).children('.name').text();
  index_d = $(b).children('.name').text();

  if(index_a < index_b){
    return 1;
  }
  else if(index_a > index_b){
    return -1;
  }
  else {
    if (index_c > index_d) {
      return 1;
    }
    else if (index_c < index_d) {
      return -1;
    }
    else {
      return 0;
    }
  }
}
function sort_by_urgency_index(a,b){
  index_a = $(a).children('.priority_urgency_index').text();
  index_b = $(b).children('.priority_urgency_index').text();

  if(index_a < index_b){
    return 1;
  } else if(index_a > index_b){
    return -1;
  } else {
    return 0;
  }
}
function sort_by_desc(a,b){
  name_a = $(a).children('.desc').text();
  name_b = $(b).children('.desc').text();
  if(name_a > name_b){
    return 1;
  } else if(name_a < name_b){
    return -1;
  } else {
    return 0;
  }
}
function sort_by_date(a,b){
  date_a = $(a).children('.duedate').text();
  date_b = $(b).children('.duedate').text();
  if(date_a > date_b){
    return 1;
  } else if(date_a < date_b){
    return -1;
  } else {
    return 0;
  }
}
function sort_by_name(a,b){
  name_a = $(a).children('.name').text();
  name_b = $(b).children('.name').text();
  if(name_a > name_b){
    return 1;
  } else if(name_a < name_b){
    return -1;
  } else {
    return 0;
  }
}
function task_sort_by_name(e){
  e.preventDefault();
  sorted = $('tbody tr').sort(sort_by_name);
  $('tbody').empty().append(sorted);
}
function task_sort_by_date(e){
  e.preventDefault();
  sorted = $('tbody tr').sort(sort_by_date);
  $('tbody').empty().append(sorted);
}
function task_sort_by_desc(e){
  e.preventDefault();
  sorted = $('tbody tr').sort(sort_by_desc);
  $('tbody').empty().append(sorted);
}
function task_sort_by_priority(e){
  e.preventDefault();
  sorted = $('tbody tr').sort(sort_by_urgency_index);
  $('tbody').empty().append(sorted);
}

$(function(){
  $('tbody').on('click', '.up', increase_priority);
  $('tbody').on('click', '.down', decrease_priority);
  $('tbody').on('click', '.edit-button', tiny_edit_button);
  $('tbody').on('click', '.delete-button', tiny_delete_button);
  $('#edit-submit').on('click', large_edit_button);
  $('#cancel').on('click', { prevState: $('tbody').children() }, cancel_update)
  $('#submit').on('click', create_task);
  $('#task_name_link').on('click', task_sort_by_name);
  $('#task_duedate_link').on('click', task_sort_by_date);
  $('#task_description_link').on('click', task_sort_by_desc);
  $('#task_priority_link').on('click', task_sort_by_priority);

  $('.drag').draggable({containment: 'body'});







});