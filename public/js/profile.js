// document ready event
$(document).ready(()=>{
  $('#button-save').click(doOnClick);
  // capture id url parameter to get initial profile information from database
  const _id = $.urlParam('_id');
  $('#employee-id').val(_id);
// display photo after photo url is ready
  $('#photo-url').on('blur',showPhoto);

  showPhoto();

});

// plugin function from http://snipplr.com/view/26662/get-url-parameters-with-jquery--improved/
$.urlParam = function(name) {
     url = window.location.href;
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    if (!results) {return undefined;}
    return unescape(results[1]) || undefined;
}

function showPhoto(){
  $('#photo').css('backgroundImage','url('+$('#photo-url').val()+')');
}


// on click capture user profile
function doOnClick(){
    let upEmp = {};

    upEmp.userName = $('#username').val();
    upEmp._id = $('#employee-id').val();
    upEmp.title = $('#title').val();
    upEmp.admin = $('#admin').val();
    upEmp.phone = $('#phone').val();
    upEmp.photoUrl = $('#photo-url').val();
    upEmp.address = $('#address-line-1').val().trim() + ' ' + $('#address-line-2').val().trim();

    let $error = $('div.error').text("");


    if(!$error.html()){
      updateUser(upEmp);
    }


}

// update user profile using ajax
function updateUser(upEmp){

    $.ajax({
    url: '/profile/update',
    data: JSON.stringify(upEmp),
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json'


  })
// success callback - navigate to dashboard with user id
  .done(data =>{
    let usrId = data._id;
    //$('div.error').text("Successfully updated Employee");
    $(location).attr('href','./dashboard?_id='+ usrId);
  })
// error callback - display error in error box
  .fail((err,status)=>{
    $('div.error').text(err.responseText);
  });

};
