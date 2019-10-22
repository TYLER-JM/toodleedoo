// jQuery code for manipulating the to-do items

// // creates HTML for each to-do list
// const createListCard = function(obj) {
//   return `
//   <div class='card-deck'>
//     <div class="card">
//       <h5 class="card-header">To ${category.name}</h5>
//       <div class="card-body">
//         <ul class="list-group list-group-flush"></ul>
//       </div>
//     </div>
//   `;
// };

// AJAX DELETE - delete task item
const deleteTask = async (taskId) => {
  try {
    await $.ajax(`/todo/delete?taskId=${taskId}`, { method: 'PUT'});
  } catch (err) {
    console.error(err);
  }
};
const updateStatus = async (taskId) => {
  try {
    await $.ajax(`/todo/update?taskId=${taskId}`, {method: 'PUT'});
  } catch (err) {
    console.error(err);
  }
};

// Defines listeners for individual tasks
// const toDoBehaviour = function() {
const toDoBehaviour = function(id) {
  // Mark task item as complete
  // $('.list-group-item').click(function() {
  $('#task-' + id).click(function() {
    $(this).toggleClass('checked');
    const taskId = ($(this).attr('id')).split('-')[1];
    updateStatus(taskId);
  });

  // Mark task item as important
  // $('.list-group-item').dblclick(function() {
  //   $(this).toggleClass('important');
  // });

  // $('.list-group-item span').click(function() {
  $('#task-' + id + ' span').click(function() {
    const taskId = ($(this).parent().attr('id')).split('-')[1];
    // console.log('taskId', taskId);
    deleteTask(taskId);
    $(this).parent().remove();
  });

  //change the star img when clicked
  $('#task-' + id + ' img').click(function(event) {
    event.stopPropagation();
    let importance = $(this).attr('src');
    if (importance === '../images/not-important.png') {
      //call updateStatus with status_id = 4
      importance = '../images/important-a.png';
    } else {
      //call updateStatus with status_id = 1
      importance = '../images/not-important.png';
    }
    $(this).attr('src', importance);
  });
};

// creates list items for existing tasks
const renderTasks = function(tasks) {
  for (let task of tasks) {
    if (task.status_id === 2) {
      $('#' + task.key).append(`<li class="list-group-item checked" id="task-${task.id}" class="draggable" draggable="true" ondragstart="drag(event)">${task.title}<img class="marked-important" src="../images/not-important.png"><span>&#x2715</span></li>`);
    } else if (task.status_id === 1) {
      $('#' + task.key).append(`<li class="list-group-item" id="task-${task.id}" class="draggable" draggable="true" ondragstart="drag(event)">${task.title}<img class="marked-important" src="../images/not-important.png"><span>&#x2715</span></li>`);
    }
  }
};

// loads all tasks from database
const loadTasks = function() {
  $.get('/todo', function(tasks) {
    renderTasks(tasks);

    //new, putting into a loop
    for (let task of tasks) {
      toDoBehaviour(task.id);
    }
  });
};
$(() => {

  loadTasks();

  const getCategoryBtn = $('#getCategoryBtn');
    const inputTask = $('#inputTask');

    getCategoryBtn.on('click', (e) => {
      getCategory();
    });

    inputTask.keypress(function (e) {
      if (e.which == 13) {
        getCategory();
        return false;    //<---- Add this line
      }
    });
    // AJAX GET - Get category from server
    const getCategory = async () => {
      try {
        console.log(inputTask.val());
        const cat = await $.ajax('/category?input=' + inputTask.val(), { method: 'GET' });
        console.log(cat[0]);
        console.log('#' + cat[0].key);
        // console.log(lanes);
        $('#' + cat[0].key).append(`<li class="list-group-item" id="task-${cat[0].taskId}" class="draggable" draggable="true" ondragstart="drag(event)">${inputTask.val()}<img class="marked-important" src="../images/not-important.png"><span>&#x2715</span></li>`);
        // alert(cat[0].title);
        $('#inputTask').val('');
        // toDoBehaviour();
        toDoBehaviour(cat[0].taskId);

      } catch (err) {
        console.error(err);
      }
    };
});
