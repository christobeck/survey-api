var siteURL = 'http://localhost:3000/surveys';


// keep track of each question that gets created to associate it's nested properties and answers
var questionCount = 0;

// the object that we will pack the form data into and send in the POST request
var newSurvey = {};

// DOM junk
var templates = {
    question: function(id){
      return' \
        <div class="create-question" data-question-id="'+id+'"> \
          <button type="button" class="close rm-question" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
            <div class="form-group"> \
              <input type="text" class="create-question-title form-control" placeholder="Enter a question" data-question-id="'+id+'"> \
            </div> \
            <label>Answer Format</label> \
            <ul class="nav nav-tabs answer-type-list" data-question-id="'+id+'" > \
              <li role="presentation"><a href="#" class="choose-answer-type" data-answer-type="multiple">Multiple Choice</a></li> \
              <li role="presentation"><a href="#" class="choose-answer-type" data-answer-type="range">Range Slider</a></li> \
              <li role="presentation"><a href="#" class="choose-answer-type" data-answer-type="text" >Text Field</a></li> \
            </ul> \
          <div data-question-id="'+id+'" class="answers-container"></div> \
        </div> \
          ';
        },

        answer: function(answerType) {
          var answerCreator = '';
          if(answerType === 'multiple'){
            answerCreator = '<div class="form-group answer-creator"> \
            <button type="button" class="close rm-question" aria-label="Close"> \
              <span aria-hidden="true">&times;</span> \
            </button> \
            <input type="text" class="create-answer form-control" placeholder="enter an answer choice" data-question-id="'+answerType+'"></div>';
          }else if(answerType === 'range'){
            answerCreator = '<div class="form-group answer-creator range-settings"><p>Users rate your question on a scale from </p><input type="number" class="create-answer range-min form-control"  min="0" max="1" data-question-id="'+answerType+'"><span> to </span><input type="number" class="create-answer range-max form-control"  min="1" max="100" data-question-id="'+answerType+'"></div>'
          }else if(answerType === 'text'){
            answerCreator = '<div class="answer-creator"><span>Users will be given a text field to leave an answer</span></div>';
          }
         return answerCreator;
        },

        newAnswerButton: function(questionID){

          return '<button class="btn btn-default btn-sm  add-another-answer" data-question-id="'+questionID+'">add another answer</button>';
        }
  }

$( document ).ready(function() {
  $('.questions-container').append(templates.question);
  $('.url-prefix').html(siteURL);
});


$(document).on('click', '.add-new-question', function(){
    questionCount++
    // questionCount = questionCount++
    $('.questions-container').append(templates.question(questionCount));
});

$(document).on('click', '.choose-answer-type', function(){
    var thisQuestion = $(this).closest('.create-question');
    var thisQuestionID = thisQuestion.data('question-id');

    var thisType = $(this).data('answer-type');
    // $('.answers-container').append(templates.answer(thisType));

    $(thisQuestion).find('.answers-container').html('');
    $(thisQuestion).find('.answers-container').append(templates.answer(thisType));
    $(thisQuestion).find('.answer-type-list li').removeClass('active');
    $(this).parent().addClass('active');

    if(thisType === 'multiple'){
      $(thisQuestion).find('.answers-container').append(templates.newAnswerButton(thisQuestionID));
    }
});

$(document).on('click', '.add-another-answer', function(){
  var thisQuestion = $(this).closest('.create-question');
  var thisQuestionID = thisQuestion.data('question-id');
  var thisNewAnswerButton = $(thisQuestion).find('.add-another-answer');

  $(templates.answer('multiple')).insertBefore(thisNewAnswerButton);
});


$(document).on('click', '.close', function(){
  $(this).parent().remove();
});




$(document).on('click', '.submit-new-survey', function(){
  $('.alert').hide();

  newSurvey.title = $('#survey-title-input').val();
  newSurvey.url = $('#survey-url-input').val();

// iterate over each question creator container
  var questions = []
  $('.create-question').map(function() {
    var thisQuestion = {};
    var thisID = $(this).data('question-id');
    var thisInterfaceType = $(this).find('.active a').data('answer-type');

    var answers = []
    $(this).find('.answer-creator').map(function(){
      thisAnswer = {};

      if( $(this).hasClass('range-settings') ){
        thisAnswer.min = $(this).find('input .range-min').val();
        thisAnswer.max = $(this).find('input .range-max').val();
        return thisAnswer;
      } else {
        thisAnswer.answer = $(this).find('input').val();
        answers.push(thisAnswer);
      }
    });
// pack the input values into the survey object
    thisQuestion.question = $(this).find('.create-question-title').val();
    thisQuestion.answers = answers;
    thisQuestion.id = thisID;
    thisQuestion.interfaceType = thisInterfaceType;

     questions.push(thisQuestion)
    // return $(this).attr('data-download');
  });

  newSurvey.questions = questions;
  // console.log(newSurvey);

  $.ajax({
    url: siteURL,
    type: 'POST',
    data: JSON.stringify(newSurvey),
    contentType: "application/json; charset=utf-8"
  })
  .done(function(res) {

    window.location.href = siteURL+'/'+res.url;
  })
  .fail(function(response) {
    $('.alert').show();
    $('.alert-msg').html(response.responseText);
    // console.log(response);
  });
});








/***** create url string from title, check for uniqueness *****/

$(document).on('keyup', '#survey-title-input', function(){
  var url = $(this).val().toLowerCase();
  url = url.replace(/[^\w\s]/gi, '') //remove non alphanumeric
  url = url.replace(/(\s)+/g, '-'); //spaces to dashes
  $('#survey-url-input').val(url);
});


var checkAvailableURL = function(){
  var url = $('#survey-url-input').val();
  // get handler at /validate/:url returns true or false
  $.get(siteURL+'/validate/'+url, function(res){
    // console.log("get res" + res);
  })
  .done(function(res){
    console.log(res.available);
    if(res.available){
      $('.survey-url-group .alert').hide();
    } else{
      // $('.survey-url-group').addClass('.invalid-input');
      $('.survey-url-group .alert').show();
    }
  })
  .fail(function(res){
    console.log(res);
  });
}

// events that check if the input url is already taken
$(document).on('blur', '#survey-title-input', checkAvailableURL );
$(document).on('blur', '#survey-url-input', checkAvailableURL);
$(document).on('keyup', '#survey-url-input', checkAvailableURL);



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
