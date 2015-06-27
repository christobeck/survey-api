$(document).ready(function() {

    $('.login-button').on('click', function(event) {
        event.preventDefault();
        var login_info = {
          username: $('.input-name').val,
          password: $('.input-pwd').val

        }

        $.ajax({
          type: 'POST',
          url: "http://localhost:3000/surveys/login",
          // header: localStorage.token,
          data: JSON.stringify({
            credentials: login_info
          }),
          dataType: "json"
        }).done(function(data, textstatus) {
          localStorage.setItem('userId', data.id);
          alert("success!");
        }).fail(function() {
          alert("please login");
        });
