// document event
$(document).ready(()=>{

// document ready handler. Take id from query string
  let _id = $.urlParam('_id');
//using id load user profile
  loadPersonArr({'_id': _id }, showGreeting);
// load all employees
  loadPersonArr({},loadTable);


});

// plugin function from http://snipplr.com/view/26662/get-url-parameters-with-jquery--improved/
$.urlParam = function(name) {
     url = window.location.href;
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    if (!results) {return undefined;}
    return unescape(results[1]) || undefined;
}

function loadPersonArr(findFilter, doneCallback){
    $.ajax({
      url: '/dashboard/get',
      data: findFilter,
      method: 'GET',
      dataType: 'json',
      contentType: 'application/json'
    })
// success callback
  .done(doneCallback)
  .fail((err,status)=>{
    $('div.error').text(err.responseText);
  });

}

// callback function shows greeting
function showGreeting(data){
    let usr= data[0];
    $('.user-greeting').text('Welcome on board ' + usr.userName + '!');
    dispEmployee(usr);

}

// callback loads table
function loadTable(data){
    
    $('table.emp-list tbody').empty();

    for(let i=0; i<data.length; i++){
      var newRow = $('<tr>').attr('id',data[i]._id);
      var tdName = $('<td>').text(data[i].userName);
      var tdTitle = $('<td>').text(data[i].title);

      if(data[i].userName && data[i].title){
        newRow.append(tdName).append(tdTitle);
        $('table.emp-list tbody').append(newRow);

        newRow.click(()=>{ dispEmployee(data[i]) });

      }
    }
}

// event handler row on click event to display data on the right side from click event
function dispEmployee(empData){
  $('#photo').css('backgroundImage','url('+empData.photoUrl+')');
  $('#ui-title').text(empData.title);
  $('#ui-email').text(empData.email);
  $('#ui-phone').text(empData.phone);
  $('#ui-address').text(empData.address);
  $('#ui-name').text(empData.userName);



}

