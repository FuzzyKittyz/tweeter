$(document).ready(function() {
  let chars = 140;
  $("textarea").keydown(function() { //use jquery keydown to pass the function everytime a key is pressed on the keboard in the text field
    let amount = $(this).val().length;//the length of whats typed in textarea 
    let counter = chars - amount; // the actual value that will show up when you type (the 140 that you start with minus the length of you typing)
    $(this).parent().children('.bottem-text').children(".counter").text(counter);//looks at the parent elm of textarea(form) and looks for a children with the class .counter
    if (counter > 0) {
      $(this).parent().children('.counter').addClass('negative'); //accounts for if the value is less than zero it goes into the negatives
    }
  });
});