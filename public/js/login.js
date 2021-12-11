$(document).ready(function () {
  $('.btn-signup').click(() => {
    $(location).attr('href', 'http://localhost:8001/signup');
  });

  $('#login__form').submit(event => {
    event.preventDefault();
    const email = $('#InputEmail').val();
    const passwd = $('#InputPassword').val();

    console.log(email, passwd);

    const formData = {
      email: email,
      passwd: passwd,
    };

    $.ajax({
      url: 'http://localhost:8001/' + 'api/login',
      type: 'GET',
      headers: { email: email, passwd: passwd },
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: result => {
        console.log('success');
        // console.log(result);
      },
      error: e => {
        console.log('error');
        // console.log(e);
      },
    });
  });
});
