var edit_id;

$(function(){



  var delete_button_elements = $('.delete-button')
  bind_delete_button_action_to(delete_button_elements)

  var edit_button_elements = $('.edit-button')
  bind_edit_button_action_to(edit_button_elements)

  var up_arrows = $('.up')
  bind_up_arrow_action_to(up_arrows)

  var down_arrows = $('.down')
  bind_down_arrow_action_to(down_arrows)


  //     var delete_button_elements = $('.delete-button')
  //     bind_delete_button_action_to(delete_button_elements)

  // // Activates the even handler binding to the delete buttons in the table.
  // function bind_delete_button_action_to(link_element){
  //    link_element.on('click', function(e){
  //     e.preventDefault();
  //     var id_of_task = $(this).data('id')
  //     var task_row = $(this).parent().parent().fadeOut(2000)
  //     console.log(id_of_task)

  //     $.ajax(
  //       {
  //         type: 'DELETE',
  //         url: id_of_task,
  //         success: function(data){
  //         console.log(data)
  //        // task_row.hide(2000)
  //       }
  //       });
  //   })
  //   };

  function bind_down_arrow_action_to(link_element){

    link_element.on('click', function(e){
    e.preventDefault();
    var id_of_task = $(this).data('id')
    var task_row = $(this).parent().parent().fadeOut(1000)

     $.ajax(
        {
          type: 'POST',
          url: id_of_task+ '/decrease_urgency',
          success: function(data){
          console.log(data)

       var task = $('<tr>');
       var upArrowLink = $('<a href="#">').html('<i class="general foundicon-up-arrow"></i>').attr('data-id', id_of_task).addClass('up');   
       var downArrowLink = $('<a href="#">').html('<i class="general foundicon-down-arrow"></i>').attr('data-id', id_of_task).addClass('down');
      $('<td>').append(upArrowLink).append(downArrowLink).appendTo(task);
      $('<td class="name">').text(data.task.name).appendTo(task);
      $('<td class="desc">').text(data.task.desc).appendTo(task);
      $('<td class= "duedate">').text(data.task.duedate).appendTo(task);
      $('<td class= "priority_urgency_name">').text(data.priority_name).appendTo(task);
      $('<td class= "priority_id">').text(data.priorityid).appendTo(task);
     

      $('<td>').text(data.urgency_index).addClass('priority_urgency_index').addClass("hidden").appendTo(task);
      $(task).css('background-color', data.priority_color)
      

      var data_cell_for_options = $('<td>').addClass('options');
      var view_button = $('<a>').attr('href', '#').text('View').addClass('small button success radius')
      var delete_button = $('<a>').attr('href', '#').text('Delete').addClass('small button alert radius delete-button').attr('data-id', data.task.id)
      var edit_button = $('<a>').attr('href', '#').text('Edit').addClass('small button radius edit-button').attr('data-id', data.task.id)

      data_cell_for_options.append(view_button)
      data_cell_for_options.append(delete_button)
      data_cell_for_options.append(edit_button)
      
      task.append(data_cell_for_options)

      add_node(task);

      var delete_button_elements = $('.delete-button')
      bind_delete_button_action_to(delete_button_elements)

     var edit_button_elements = $('.edit-button')
       bind_edit_button_action_to(edit_button_elements)

      var up_arrows = $('.up')
      bind_up_arrow_action_to(up_arrows)

        var down_arrows = $('.down')
        bind_down_arrow_action_to(down_arrows)


      $('#new_task input[type=text]').val('');
        
        }
        });
  })

  }


 function bind_up_arrow_action_to(link_element){

  link_element.on('click', function(e){
    e.preventDefault();
    var id_of_task = $(this).data('id')
    var task_row = $(this).parent().parent().fadeOut(1000)

     $.ajax(
        {
          type: 'POST',
          url: id_of_task+ '/increase_urgency',
          success: function(data){
          console.log(data)

       var task = $('<tr>');
       var upArrowLink = $('<a href="#">').html('<i class="general foundicon-up-arrow"></i>').attr('data-id', id_of_task).addClass('up');   
       var downArrowLink = $('<a href="#">').html('<i class="general foundicon-down-arrow"></i>').attr('data-id', id_of_task).addClass('down');
      $('<td>').append(upArrowLink).append(downArrowLink).appendTo(task);
      $('<td class="name">').text(data.task.name).appendTo(task);
      $('<td class="desc">').text(data.task.desc).appendTo(task);
      $('<td class= "duedate">').text(data.task.duedate).appendTo(task);
      $('<td class= "priority_urgency_name">').text(data.priority_name).appendTo(task);
      $('<td class= "priority_id">').text(data.priorityid).appendTo(task);
     

      $('<td>').text(data.urgency_index).addClass('priority_urgency_index').addClass("hidden").appendTo(task);
      $(task).css('background-color', data.priority_color)
      

      var data_cell_for_options = $('<td>').addClass('options');
      var view_button = $('<a>').attr('href', '#').text('View').addClass('small button success radius')
      var delete_button = $('<a>').attr('href', '#').text('Delete').addClass('small button alert radius delete-button').attr('data-id', data.task.id)
      var edit_button = $('<a>').attr('href', '#').text('Edit').addClass('small button radius edit-button').attr('data-id', data.task.id)

      data_cell_for_options.append(view_button)
      data_cell_for_options.append(delete_button)
      data_cell_for_options.append(edit_button)
      
      task.append(data_cell_for_options)

      add_node(task);

      var delete_button_elements = $('.delete-button')
      bind_delete_button_action_to(delete_button_elements)

     var edit_button_elements = $('.edit-button')
       bind_edit_button_action_to(edit_button_elements)

      var up_arrows = $('.up')
      bind_up_arrow_action_to(up_arrows)

      var down_arrows = $('.down')
      bind_down_arrow_action_to(down_arrows)


      $('#new_task input[type=text]').val('');
        
        }
        });

  })

}

  $('.down').on('click', function(e){
    
    
  })

 

  // Activates the even handler binding to the delete buttons in the table.
  function bind_delete_button_action_to(link_element){
     link_element.on('click', function(e){
      e.preventDefault();
      var id_of_task = $(this).data('id')
      var task_row = $(this).parent().parent().fadeOut(2000)
      console.log(id_of_task)

      $.ajax(
        {
          type: 'DELETE',
          url: id_of_task,
          success: function(data){
          console.log(data)
         // task_row.hide(2000)
        }
        });
    })
    };


    function bind_edit_button_action_to(edit_button){
      edit_button.on('click', function(e){
        e.preventDefault();
        var task_id = $(this).data('id')
        edit_id = task_id;
        var task_row = $(this).parent().parent()
        var name = task_row.find('.name').text()
        $('#task_name').val(name.trim())
        $('#task_desc').val(task_row.find('.desc').text())
        $('#task_duedate').val(task_row.find('.duedate').text())
        
        var priority_name = task_row.find('.priority_urgency_name').text();
        // var priority_id = task_row.find('.priority_id').text()

        $('#submit').addClass('hidden')
        $('#edit-submit').removeClass('hidden').attr('data-task-id', task_id)
        task_row.remove();
    
        var drop_box = $('#task_priority_id').children();
        for(i=0; i<drop_box.length; i++){
 
          if(priority_name === $(drop_box[i]).text()){
            $(drop_box[i]).prop('selected', true)
            return;
          }
        }    
      })
    }

    $('#edit-submit').on('click', function(e){
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

       $.ajax(
        {
          type: 'PUT',
          data: settings,
          url: edit_id,
          success: function(data){

      var task = $('<tr>');
      var upArrowLink = $('<a href="#">').html('<i class="general foundicon-up-arrow"></i>').attr('data-id', data.task.id).addClass('up');   
      var downArrowLink = $('<a href="#">').html('<i class="general foundicon-down-arrow"></i>').attr('data-id', data.task.id).addClass('down');
      $('<td>').append(downArrowLink).append(upArrowLink).appendTo(task);
      $('<td class="name">').text(data.task.name).appendTo(task);
      $('<td class="desc">').text(data.task.desc).appendTo(task);
      $('<td class= "duedate">').text(data.task.duedate).appendTo(task);
      $('<td class= "priority_urgency_name">').text(data.priority_name).appendTo(task);
      $('<td class= "priority_id">').text(data.priorityid).appendTo(task);
     

      $('<td>').text(data.urgency_index).addClass('priority_urgency_index').addClass("hidden").appendTo(task);
      $(task).css('background-color', data.priority_color)
      

      var data_cell_for_options = $('<td>').addClass('options');
      var view_button = $('<a>').attr('href', '#').text('View').addClass('small button success radius')
      var delete_button = $('<a>').attr('href', '#').text('Delete').addClass('small button alert radius delete-button').attr('data-id', data.task.id)
      var edit_button = $('<a>').attr('href', '#').text('Edit').addClass('small button radius edit-button').attr('data-id', data.task.id)

      data_cell_for_options.append(view_button)
      data_cell_for_options.append(delete_button)
      data_cell_for_options.append(edit_button)
      
      task.append(data_cell_for_options)

      add_node(task);

      var delete_button_elements = $('.delete-button')
      bind_delete_button_action_to(delete_button_elements)

     var edit_button_elements = $('.edit-button')
       bind_edit_button_action_to(edit_button_elements)

      var up_arrows = $('.up')
      bind_up_arrow_action_to(up_arrows)

      var down_arrows = $('.down')
      bind_down_arrow_action_to(down_arrows)



      $('#new_task input[type=text]').val('');

        }
        });

    })


  


  function sort_by_urgency_index_name(a,b){
    index_a = $(a).children('.priority_urgency_index').text();
    index_b = $(b).children('.priority_urgency_index').text();
    index_c = $(a).children('.name').text();
    index_d = $(b).children('.name').text();
    
    if(index_a > index_b){
      return 1;
    }
    
    else if(index_a < index_b){
      return -1;
    } 

    else {
      if (index_c > index_d) {
        return 1;
      }
      else if (index_c < index_d) {
        return -1
      }
      else {
        return 0;
      }
    }
  }

  function sort_by_urgency_index(a,b){
    index_a = $(a).children('.priority_urgency_index').text();
    index_b = $(b).children('.priority_urgency_index').text();

    if(index_a > index_b){
      return 1;
    } else if(index_a < index_b){
      return -1;
    } else {
      return 0;
    }
  }

  $('#task_priority_link').on('click', function(e) {
    e.preventDefault();
    sorted = $('tbody tr').sort(sort_by_urgency_index);
    $('tbody').empty().append(sorted);
  });


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


  function add_node(task){
    $('tbody').append(task);

    sorted = $('tbody tr').sort(sort_by_urgency_index_name);

    $('tbody').empty().append(sorted);

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

  $('#task_name_link').on('click', function(e){
    e.preventDefault();
    sorted = $('tbody tr').sort(sort_by_name, sort_by_date);
    $('tbody').empty().append(sorted);
  });

  $('#task_duedate_link').on('click', function(e){
    e.preventDefault();
    sorted = $('tbody tr').sort(sort_by_date);
    $('tbody').empty().append(sorted);
  });

  $('#task_description_link').on('click', function(e) {
    e.preventDefault();
    sorted = $('tbody tr').sort(sort_by_desc);
    $('tbody').empty().append(sorted);
  });


  $('#submit').on('click', function(e){
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

    $.post('/tasks', settings, function(data){
      //Construct an additional row to add to the table, representing one task and its attributes
      var task = $('<tr>');
      var upArrowLink = $('<a href="#">').html('<i class="general foundicon-up-arrow"></i>').attr('data-id', data.task.id).addClass('up');   
      var downArrowLink = $('<a href="#">').html('<i class="general foundicon-down-arrow"></i>').attr('data-id', data.task.id).addClass('down');
      $('<td>').append(upArrowLink).append(downArrowLink).appendTo(task);
      $('<td class="name">').text(data.task.name).appendTo(task);
      $('<td class="desc">').text(data.task.desc).appendTo(task);
      $('<td class= "duedate">').text(data.task.duedate).appendTo(task);
      $('<td class= "priority_urgency_name">').text(data.priority_name).appendTo(task);
      $('<td class= "priority_id">').text(data.priorityid).appendTo(task);
     

      $('<td>').text(data.urgency_index).addClass('priority_urgency_index').addClass("hidden").appendTo(task);
      $(task).css('background-color', data.priority_color)
      

      var data_cell_for_options = $('<td>').addClass('options');
      var view_button = $('<a>').attr('href', '#').text('View').addClass('small button success radius')
      var delete_button = $('<a>').attr('href', '#').text('Delete').addClass('small button alert radius delete-button').attr('data-id', data.task.id)
       var edit_button = $('<a>').attr('href', '#').text('Edit').addClass('small button radius edit-button').attr('data-id', data.task.id)


      data_cell_for_options.append(view_button)
      data_cell_for_options.append(delete_button)
      data_cell_for_options.append(edit_button)
      
      task.append(data_cell_for_options)

      add_node(task);

      var delete_button_elements = $('.delete-button')
      bind_delete_button_action_to(delete_button_elements)

      var edit_button_elements = $('.edit-button')
      bind_edit_button_action_to(edit_button_elements)

      var up_arrows = $('.up')
      bind_up_arrow_action_to(up_arrows)

      var down_arrows = $('.down')
      bind_down_arrow_action_to(down_arrows)

      $('#new_task input[type=text]').val('');
    });
  });
});