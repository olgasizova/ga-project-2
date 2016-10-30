$(document).ready(()=>{
  $('#sign-in-btn').click(doOnClick);
  }
)

function doOnClick(){
    let findUser = {};

    findUser.email = $('#email').val();
    findUser.pwd1 = $('#pwd').val();
    let $error = $('div.error').text("");

    if(!findUser.email){
      $error.html($error.html() + "<br>Email is empty");
    }
    if(!findUser.pwd1){
      $error.html($error.html() + "<br>Password is empty");
    }

    if(!$error.html()){
      loginUser(findUser);
    }


}

function loginUser(findUser){

    $.ajax({
    url: '/login/find',
    data: JSON.stringify(findUser),
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json'


  })
  .done(data =>{
    let findUsrId = data[0]._id;
    $(location).attr('href','./dashboard?_id='+ findUsrId);
  })
  .fail((err,status)=>{
    $('div.error').text(err.responseText);
  });

};

