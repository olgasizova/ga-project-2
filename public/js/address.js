// document load event
$(document).ready(doOnLoad);

//document onload event handler
function doOnLoad(){
//Take id from query string
    $._id = $.urlParam('_id');
// added click event to button and attached validateAddress function
    $('#button-validate').click(validateAddress);


// plugin function credit http://snipplr.com/view/26662/get-url-parameters-with-jquery--improved/
$.urlParam = function(name) {
        url = window.location.href;
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
        if (!results) {return undefined;}
        return unescape(results[1]) || undefined;
}


// event handler for button click
function validateAddress(){
// create query address object to submit to web service api
    let oQueryAddress = {};
// attach AddressLine1 and AddressLine2 from corresponding inputs
    oQueryAddress.AddressLine1 = $('#address-line-1').val();
    oQueryAddress.AddressLine2 = $('#address-line-2').val();

// submit
    $.ajax({
      url: '/address/validate',
// attach AddressLine1 and AddressLine2 to AJAX request
      data: oQueryAddress,
      method: 'GET',
      dataType: 'json',
      contentType: 'application/json'
    })
// success callback
  .done((data)=>{
      let msg = data.ErrorMessage || 'OK';

      $('#address-validate').val(msg);
      $('#address-line-1').val(data.AddressLine1);
      $('#address-line-2').val(data.AddressLine2);

      // saveAddress(data);
  })
  .fail((err,status)=>{
    $('div.error').html(err.responseText);
  });
}

function saveAddress(objAddress){
    //add ObjectIDto save address
    objAddress._id = $._id;

    $.ajax({
      url: '/address/save',
      data: JSON.stringify(objOrigAddress),
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json'
    })
// success callback
  .done((data)=>{
      $('#address-validate').val(data);
      $('div.error').text("Address Saved");
  })
  .fail((err,status)=>{
    $('div.error').html(err.responseText);
  })
}
