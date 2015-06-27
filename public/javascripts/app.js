var questionCount = 0;
var newSurvey = {};

var templates = {
    question: function(id){
      return' \
        <div class="create-question" data-question-id="'+id+'"> \
          <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
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
            answerCreator = '<div class="form-group answer-creator"><input type="text" class="create-answer form-control" placeholder="enter an answer choice" data-question-id="'+answerType+'"></div>';
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




$(document).on('click', '.submit-new-survey', function(){

  // $('input').each(function(i){
  //   newSurvey.questions.push
  //   $(this).val();
  // });

  newSurvey.title = $('#survey-title-input').val();
  newSurvey.url = $('#survey-url-input').val();

// iterate over each question creator container
  var questions = $('.create-question').map(function() {
    var thisQuestion = {};
    var thisID = $(this).data('question-id');
    var thisInterfaceType = $(this).find('.active a').data('answer-type');

    var answers = $(this).find('.answer-creator').map(function(){
      thisAnswer = {};


      if( $(this).hasClass('range-settings') ){
        thisAnswer.min = $(this).find('input .range-min').val();
        thisAnswer.max = $(this).find('input .range-max').val();
        return thisAnswer;
      } else {
        thisAnswer.answer = $(this).find('input').val();
        return thisAnswer;
      }
    });

    thisQuestion.question = $(this).find('.create-question-title').val();
    thisQuestion.answers = answers;
    thisQuestion.id = thisID;
    thisQuestion.interfaceType = thisInterfaceType;

    return thisQuestion
    // return $(this).attr('data-download');
  });

  newSurvey.questions = questions;
  console.log(newSurvey);

  $.ajax({
    url: '/create',
    type: 'POST',
    data: {survey: newSurvey},
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });


});





// for each .create-question
//   ul
//     this data-question-id
//       if li has class active
//         this li data-answer-type
//   if (multiple) .answers-container
