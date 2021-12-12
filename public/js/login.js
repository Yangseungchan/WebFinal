const domain = 'http://localhost:8001/';

// email validation [Reference] : https://www.w3resource.com/javascript/form/email-validation.php
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

$(document).ready(function () {
  $('.btn-signup').click(() => {
    $(location).attr('href', `${domain}signup`);
  });

  $('#login__form').submit(event => {
    event.preventDefault();
    const email = $('#InputEmail').val();
    const passwd = $('#InputPassword').val();

    // email is invalid
    if (!ValidateEmail(email)) {
      alert('Your email is invalid');
    }
    // password length is short
    else if (passwd.length < 6) {
      alert(`Password's length should be more than or equal to 6`);
    }
    // login trial
    else {
      $.ajax({
        url: domain + 'api/login',
        type: 'GET',
        headers: { email: email, passwd: passwd },
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: response => {
          // login success
          // const { UId } = response; // UId 받아오기;
          // Cookies.set('UId', UId, { expires: 7, path: '/' }); // 쿠키저장
          console.log('login success');
          alert('Login has been successful');
          $(location).attr('href', `${domain}`);
        },
        error: e => {
          // password error
          alert('Your password is wrong');
          // console.log(e);
        },
      });
    }
  });
});
