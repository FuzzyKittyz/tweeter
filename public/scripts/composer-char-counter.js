$(document).ready(function() {
  let chars = 140;
  $("textarea").keydown(function() {
    let amount = $(this).val().length;
    let counter = chars - amount;
  
    $(this).parent().children(".counter").text(counter);

    if (counter > 0) {
      $(this).parent().children(".counter").addClass('negative')
    }

    
  })
});