var response;

$(document).ready(function() {

  $('.submit-survey-response').on('click', function(event) {
    var response_id_array = [];
    var survey_id = $('.ques-group').data('val');
    var userName = $('.email-id').val();

    $('input[type=radio]').each(function(question, answer) {
      if (answer.checked) {
        response_store = {
          question_id: answer.name,
          answers: {
            answer_id: answer.value
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
    }).done(function() {
      alert("success!");
      // }).fail(function() {
      //   alert("please login");
    });
    response = response_id_array;
  });

})
