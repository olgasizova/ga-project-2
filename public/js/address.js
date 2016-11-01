// document load event
$(document).ready(doOnLoad);

//document onload event handler
function doOnLoad(){
    //Take id from query string
    $._id = $.urlParam('_id');
    $('#button-validate').click(validateAddress);

}



// plugin function from http://snipplr.com/view/26662/get-url-parameters-with-jquery--improved/
$.urlParam = function(name) {
        url = window.location.href;
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
        if (!results) {return undefined;}
        return unescape(results[1]) || undefined;
}

function validateAddress(){
    // create query address object to submit to web service api
    let oQueryAddress = {};
    oQueryAddress.AddressLine1 = $('#address-line-1').val();
    oQueryAddress.AddressLine2 = $('#address-line-2').val();

    // submit
    $.ajax({
      url: '/address/validate',
      data: JSON.stringify(oQueryAddress),
      method: 'GET',
      dataType: 'json',
      contentType: 'application/json'
    })
// success callback
  .done((data)=>{
      $('#address-validate').val(data);
      $('#address-line-1').val(data.AddressLine1);
      $('#address-line-2').val(data.AddressLine2);

      saveAddress(data);
  })
  .fail((err,status)=>{
    $('div.error').html(err.responseText);
  });
}

function saveAddress(objAddress){
    //add ObjectIDto save address
    objAddress._id = $_id;
    
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
  });
}