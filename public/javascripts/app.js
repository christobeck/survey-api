var questionCount = 0;

// var newQuestionTemplate = ' \
// <div id="'+questionCount+'" class="create-question-container"> \
//     <div class="form-group"> \
//       <input type="text" class="create-question-title form-control" placeholder="Enter a question"> \
//     </div> \
//   <div class="dropdown"> \
//       <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> \
//         Answer Format \
//         <span class="caret"></span> \
//       </button> \
//     <ul class="dropdown-menu" aria-labelledby="submit-new-question"> \
//       <li><a class="choose-answer-type" data-answer-type="vertical">Vertical </a></li> \
//       <li><a class="choose-answer-type" data-answer-type="horizontal">Horizontal</a></li> \
//       <li><a class="choose-answer-type" data-answer-type="range">Range Slider</a></li> \
//       <li><a class="choose-answer-type" data-answer-type="text">Text Area</a></li> \
//     </ul> \
//   </div> \
// </div> \
//   ';

var questionCount = 0;
var templates = {
    question: function(id){
      return' \
        <div class="create-question"> \
          <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
            <div class="form-group"> \
              <input type="text" class="create-question-title form-control" placeholder="Enter a question"> \
            </div> \
            <label>Answer Format</label> \
            <ul class="nav nav-tabs answer-type-list"> \
              <li role="presentation"><a href="#" class="choose-answer-type" data-answer-type="multiple">Multiple Choice</a></li> \
              <li role="presentation"><a href="#" class="choose-answer-type" data-answer-type="range">Range Slider</a></li> \
              <li role="presentation"><a href="#" class="choose-answer-type" data-answer-type="text" >Text Field</a></li> \
            </ul> \
          <div data-question-id="'+id+'" class="answers-container"></div> \
        </div> \
          ';
        },



        answer: function(id) {
          var answerCreator = '';
          console.log(id);
          if(id === 'multiple'){
            answerCreator = '<div class="form-group answer-creator multi-settings"><input type="text" class="create-answer form-control" placeholder="enter an answer choice"></div>';
          }else if(id === 'range'){
            answerCreator = '<div class="form-group answer-creator range-settings"><p>Users rate your question on a scale from </p><input type="number" class="create-answer form-control"  min="0" max="1"><span> to </span><input type="number" class="create-answer form-control"  min="1" max="100"></div>'
          }else if(id === 'text'){
            answerCreator = '<div class="answer-creator"><span>Users will be given a text field to leave an answer</span></div>';
          }
         return answerCreator;
        }



  }


// var newQuestion = {
//     question : [{answrs}, {answrs}]
//   }
// };


$( document ).ready(function() {
  $('.questions-container').append(templates.question);
});


$(document).on('click', '.add-new-question', function(){
    questionCount++
    console.log(questionCount)
    // questionCount = questionCount++
    $('.questions-container').append(templates.question(questionCount));
});

$(document).on('click', '.choose-answer-type', function(){
    var thisType = $(this).data('answer-type');
    // $('.answers-container').append(templates.answer(thisType));

    $('.answers-container').html('');
    $('.answers-container').append(templates.answer(thisType));
    $('.answer-type-list li').removeClass('active');
    $(this).parent().addClass('active');

    if(thisType === 'multiple')


});


