var response;

$(document).ready(function() {

  $('.submit-survey-response').on('click', function(event) {
    var response_id_array = [];
    var survey_id = $('.ques-group').data('val');
    var userName = $('.email-id').val();
    $('.text-answer').each(function(question, answer) {
      var response_store = {
        question_id: answer.name,
        answers: {
          answer_id: $(answer).data('ansval'),
          answer_type: answer.value
        }
      }
      response_id_array.push(response_store);
    });
    $('input[type=radio]').each(function(question, answer) {
      if (answer.checked) {
        var response_store = {
          question_id: answer.name,
          answers: {
            answer_id: answer.value,
            answer_type: true
          }
        }
        response_id_array.push(response_store);
      }
    });
    var response_data = [userName, response_id_array]
    $.ajax({
      type: 'PATCH',
      url: "http://localhost:3000/surveys/" + survey_id,
      data: {
        questions: JSON.stringify({
          response_data
        })
      },

      dataType: "json",
    }).done(function(response) {
      console.log(response);
      // alert("success!");
      // }).fail(function() {
      //   alert("please login");
    });
    response = response_id_array;
  });

})
