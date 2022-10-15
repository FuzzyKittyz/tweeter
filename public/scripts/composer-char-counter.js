$(document).ready(function() {
  let chars = 140;
  $("textarea").keydown(function() { //use jquery keydown to do pass the function everytime a key is pressed in the text field
    let amount = $(this).val().length;//the length of textarea value
    let counter = chars - amount;
    $(this).parent().children(".counter").text(counter);//looks at the parent elm of textarea(form) and looks for a children with the class .counter
    if (counter > 0) {
      $(this).parent().children('.counter').addClass('negative'); //accounts for if the value is less than zero it goes into the negatives
    }
  });
});