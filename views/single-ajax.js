$(document).ready(function() {
  var response_id_array = [];
  $('.submit-survey-response').on('submit', function(event) {

    $('.selected-answer').each(function(e) {
      if ($(input[type = 'radio']: checked)) {
        var selected = $(this).val;
        response_id_array.push(selected);
      }

    })

  });
});
