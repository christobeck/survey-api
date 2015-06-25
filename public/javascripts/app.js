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
//       <li><a class="choose-answer-format" data-answer-format="vertical">Vertical </a></li> \
//       <li><a class="choose-answer-format" data-answer-format="horizontal">Horizontal</a></li> \
//       <li><a class="choose-answer-format" data-answer-format="range">Range Slider</a></li> \
//       <li><a class="choose-answer-format" data-answer-format="text">Text Area</a></li> \
//     </ul> \
//   </div> \
// </div> \
//   ';

var questionCount = 0;
var templates = {
    question: function(id){
      return' \
        <div data-question-id="'+ id +'" class="create-question"> \
          <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
            <div class="form-group"> \
              <input type="text" class="create-question-title form-control" placeholder="Enter a question"> \
            </div> \
          <div class="dropdown"> \
              <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> \
                Answer Format \
                <span class="caret"></span> \
              </button> \
            <ul class="dropdown-menu" aria-labelledby="submit-new-question"> \
              <li><a class="choose-answer-format" data-answer-format="vertical">Vertical </a></li> \
              <li><a class="choose-answer-format" data-answer-format="horizontal">Horizontal</a></li> \
              <li><a class="choose-answer-format" data-answer-format="range">Range Slider</a></li> \
              <li><a class="choose-answer-format" data-answer-format="text">Text Area</a></li> \
            </ul> \
          </div> \
          <div data-question-id="'+id+'" class="answers-container"></div> \
        </div> \
          ';
        },

        verticalAnswer: function(){
          return ' \
          <div class="create-answer"></div> \
          <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        }
  }

var newVertical = ' \
 <div class="form-group"> \
      <input type="text" class="create-answer form-control" placeholder="Enter an answer"> \
    </div> \
';
var newHorizontal = '';
var newRange = '';
var newText = ''

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

$(document).on('click', '.choose-answer-format', function(){
    questionCount++
    console.log(questionCount)
    // questionCount = questionCount++
    // $('.answers-container').append(templates.question(questionCount));
});


$('.choose-answer-format').on('click', function(){
  $(this).data('answer-format')
});


