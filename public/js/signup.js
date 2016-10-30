$(document).ready(()=>{
  $('#signupbutton').click(doOnClick);
  }
)

function doOnClick(){
    let newUser = {};

    newUser.email = $('#email').val();
    newUser.pwd1 = $('#pwd1').val();
    newUser.pwd2 = $('#pwd2').val();
    let $error = $('div.error').text("");

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

function insertUser(newUser){

    $.ajax({
    url: '/signup/adduser',
    data:newUser,
    method: 'POST',
    dataType: 'json'
  })
  .done(data =>{
    $(location).attr('href','./login');
  })
  .fail((err,status)=>{
    $('div.error').text(err.responseText);
  });

};

