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


$(() => {
  // creates list items for existing tasks


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
        $('#' + cat[0].key).append(`<li class="list-group-item">${inputTask.val()}<span>&#x2715</span></li>`);
        // alert(cat[0].title);
        $('#inputTask').val('');
        $('.list-group-item').click(function() {
          $(this).toggleClass('checked');
        });

        $('.list-group-item').dblclick(function() {
          $(this).toggleClass('important');
        });

        $('.list-group-item span').click(function() {
          $.ajax('/todo/delete', { method: 'PUT'})
          $(this).parent().remove();
        });
      } catch (err) {
        console.error(err);
      }
    };
});
