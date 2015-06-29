
/***** Handle the login/logout events in the DOM ********/

    // POST create new user
  $('#signup-submit').on('click', function(){
    $.ajax({
      url: apiURL+"/register",
      type: 'POST',
      //
      dataType: 'text',
      data: {credentials: {
        full_name: $('#signup-fullname').val(),
        username: $('#signup-username').val(),
        email: $('#signup-email').val(),
        password: $('#signup-password').val()
      }}
    })
    .done(function(data, textStatus) {
      if(textStatus === 'success'){
          // Successful signup!
          $('#signup-alert').html('<div id="signup-alert" class="alert alert-success role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span><span class="sr-only">Error:</span>thanks for signing up!</div>');
          setTimeout(function(){
            $('#signup-modal').modal('hide');
          }, 500);
        }else{
          console.log(textStatus)
          $('#signup-form').html('<div id="signup-alert" class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span><span class="sr-only">Error:</span> signup failed</div>');
        }
      }).fail(function(jqxhr, textStatus, errorThrown){
        $('#signup-alert').html('<div id="signup-alert" class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span><span class="sr-only">Error:</span> signup failed</div>');
        console.log(textStatus);
        console.log(errorThrown);
      });
    });


    // POST login
    $('#login-submit').on('click', function(){
      $.ajax(apiURL+'/login',{
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({
          credentials: {
            email: $('#login-email').val(),
            password: $('#login-password').val()
          }
        }),
        dataType: "json",
        method: "POST"
      }).done(function(data, textStatus) {

        if(textStatus === 'success'){
          // Successful login!
          localStorage.setItem('token', data['token']);
          localStorage.setItem('username', data['username']);
          localStorage.setItem('uid', data['uid']);
          $('.signup-link').hide();
          $('.login-link').hide();
          $('.me').show();
          $('#login-alert').html('<div id="login-alert" class="alert alert-success role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span><span class="sr-only">Error:</span> you\'re now logged in</div>');
          $('.user-identity').html(data['username'])
          setTimeout(function(){
            $('#login-modal').modal('hide');

            // RENDER USER-SPECIFIC CONTENT



          }, 500);

          }else{

            $('#login-form').html('<div id="login-alert" class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span><span class="sr-only">Error:</span> login failed</div>');
          }

        }).fail(function(jqxhr, textStatus, errorThrown){
          $('#login-alert').html('<div id="login-alert" class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span><span class="sr-only">Error:</span> login failed</div>');
          console.log(textStatus);
          console.log(errorThrown);
        });
      });
    // POST logout
    $('.logout-link').on('click', function(){
      localStorage.setItem('token', null);
      localStorage.setItem('username', null);
      localStorage.setItem('uid', null);
      authenticateDOM.updateNavBar();
      authenticateDOM.allowCreatePost();
      displayPosts.renderHandlebars();
  });
