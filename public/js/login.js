// document ready event
$(document).ready(()=>{
  $('#sign-in-btn').click(doOnClick);
  }
)

// document on ready event handler
function doOnClick(){
    let findUser = {};

// capture form input
    findUser.email = $('#email').val();
    findUser.pwd1 = $('#pwd').val();
    let $error = $('div.error').text("");

// validate
    if(!findUser.email){
      $error.html($error.html() + "<br>Email is empty");
    }
    if(!findUser.pwd1){
      $error.html($error.html() + "<br>Password is empty");
    }
// send object data from the form to server
    if(!$error.html()){
      loginUser(findUser);
    }


}

// send user data to the server as a string
function loginUser(findUser){

    $.ajax({
    url: '/login/find',
    data: JSON.stringify(findUser),
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json'


  })
// success callback and capture id of inserted record and send it to dashboard as query string
  .done(data =>{
    let findUsrId = data[0]._id;
    $(location).attr('href','./dashboard?_id='+ findUsrId);
  })
// error callback, diplay error message
  .fail((err,status)=>{
    $('div.error').text(err.responseText);
  });

};

