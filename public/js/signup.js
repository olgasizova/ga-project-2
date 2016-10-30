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
    data: JSON.stringify(newUser),
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json'


  })
  .done(data =>{
    let newUsrId = data[0]._id;
    $(location).attr('href','./profile?_id='+ newUsrId);
  })
  .fail((err,status)=>{
    $('div.error').text(err.responseText);
  });

};

