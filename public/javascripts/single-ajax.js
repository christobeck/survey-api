var response;

$(document).ready(function() {

  $('.submit-survey-response').on('click', function(event) {
    var response_id_array = [];
    var survey_id = $('.ques-group').data('val');
    $('input[type=radio]').each(function(question, answer) {
      // if (answer.checked) {
      //   response_id_hash[answer.name] = [
      //     answer.value, true
      //   ]
      // }
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

    $.ajax({
      type: 'POST',
      url: "http://localhost:3000/surveys/" + survey_id,
      // header: localStorage.token,
      data: {
        survey_id: survey_id,
        questions: response_id_array
      }
    }).done(function() {
      alert("success!");
    }).fail(function() {
      alert("please login");
    });

  });
  response = response_id_array;
})
