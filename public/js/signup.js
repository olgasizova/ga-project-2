// document ready event
$(document).ready(()=>{
  $('#signupbutton').click(doOnClick);
  }
)

//document ready event handler
function doOnClick(){
    let newUser = {};

//capture form values
    newUser.email = $('#email').val();
    newUser.pwd1 = $('#pwd1').val();
    newUser.pwd2 = $('#pwd2').val();
    let $error = $('div.error').text("");

//validation and checking if passwords match
    if(!newUser.email){
      $error.html($error.html() + "<br>Email is empty");
    }
    if(!newUser.pwd1){
      $error.html($error.html() + "<br>Password is empty");
    }
    if(newUser.pwd1 != newUser.pwd2){
      $error.html($error.html() + "<br>Password doesn't match");
    }
    if(!$error.html()){
      insertUser(newUser);
    }


}

// take newUser object and send it to the server
function insertUser(newUser){

    $.ajax({
    url: '/signup/adduser',
    data: JSON.stringify(newUser),
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json'


  })
// success callback and send query string to the profile page to capture the user profile
  .done(data =>{
    let newUsrId = data[0]._id;
    $(location).attr('href','./profile?_id='+ newUsrId);
  })
// error callback
  .fail((err,status)=>{
    $('div.error').text(err.responseText);
  });

};

