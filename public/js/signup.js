const domain = 'http://localhost:8001/';

// email validation [Reference] : https://www.w3resource.com/javascript/form/email-validation.php
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

$(document).ready(function () {
  $('.spinner-container').hide();
  $('#signup__form').submit(event => {
    event.preventDefault();

    const email = $('#InputEmail').val();
    const passwd = $('#InputPassword1').val();
    const passwdCheck = $('#InputPassword2').val();

    // email validation problem
    if (!ValidateEmail(email)) {
      alert('Your email is invalid');
    }
    // password length problem
    else if (passwd.length < 6) {
      alert(`Password's length should be more than or equal to 6`);
    }
    // password not same problem
    else if (passwd !== passwdCheck) {
      alert('Your password or password check is wrong');
    }
    // it is possible to signup
    else {
      $('.spinner-container').show();
      $.ajax({
        url: domain + 'api/signup',
        type: 'POST',
        headers: { email, passwd },
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: result => {
          alert('Your signup has been succeeded');
          $(location).attr('href', domain + 'login');
        },
        error: e => {
          alert(
            'Your signup has been failed : Your email can be already signed up'
          );
          $('.spinner-container').hide();
        },
      });
    }

    // console.log(email, passwd, passwdCheck);

    // console.log('Try to signup');
  });
});
