var newQuestion = ' \
  <div class="create-new-question"> \
    <input type="text" class="create-question-title form-control" placeholder="Enter a question"> \
    <div class="dropdown"> \
  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> \
    Dropdown \
    <span class="caret"></span> \
  </button> \
  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1"> \
    <li><a href="#">Vertical </a></li> \
    <li><a href="#">Horizontal</a></li> \
    <li><a href="#">Range Slider</a></li> \
    <li><a href="#">Text Area</a></li> \
  </ul> \
</div> \
  </div> \
  '



$( document ).ready(function() {
  console.log('app');
  $('.create-question-container').append(newQuestion);
});


