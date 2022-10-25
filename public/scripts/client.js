
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//start pf jquery
$(document).ready(function() {
//cross site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //function that takes object values and makes html elements to display on the website (the tweets)
  const createTweetElement = function(tweet) {
    //setting up data var which will encompass all of the html markup in an article elm
    let tweetData = $('<article>');
    //html markup to display on the site
    let htmlMarkup = `
    <div class="tweet-header">
      <img src='${tweet.user.avatars}' class="fa-user">
      <p> ${tweet.user.name}</p>
      <p class="username">${tweet.user.handle}</p>
    </div>
    <div class='tweet'>
    <p>${tweet.content.text}</p>
    </div>
    <p class="date">${timeago.format(tweet.created_at)}</p>
    <div class="bottem-tweet"> 
      <i class="fa-solid fa-flag" class="flag"></i>
      <i class="fa-solid fa-retweet" class="retweet"></i>
      <i class="fa-solid fa-heart" class="heart"></i>
    </div>`;
    //appening html markup to data (article element)
    tweetData.append(htmlMarkup);
    return tweetData;
  };
  //function that loops the tweets object to get the individual tweets and their keys and vlaues
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('#tweet-container').prepend(createTweetElement(tweet)); //calls the createtweetelement function on each tweet in the tweets object and prepends it to the tweet container section
    }
  };


  //function that loads the tweets using render tweets and using the information gathered from the /tweets page
  const loadtweets = function() {
    $.ajax('/tweets', {method: 'GET'})
     .then(function(loadedtweets) {
      renderTweets(loadedtweets);
    })
    .catch((err) => {// catches any errors from get request
      console.log('Error', err);
    });
   };
  
  loadtweets();// this loads the initial tweets 

  //jquery to handle the submit from the text area on the site
  $('#tweet-form').submit(function(event) {
    event.preventDefault(); //prevents it from doing the default behaviour (loading another page etc)
     
    //if statement checking that the char counter does not pass into the neg
    //if it does it shows the h3 that says there are too many char
    if ($('#tweet-form').children('.bottem-text').children('.counter').val() < 0) {
      document.getElementById('show-hide1').style.display = 'block';
      setTimeout(() => {
        document.getElementById('show-hide1').style.display = 'none'; //hides the element after 3s using set timeout
      }, "3000");
      
      return; //returns from the function
    }
    //if statments checking if the text feild is empty
    //shows message if it is and hides it using timeout
    if ($('#tweet-form').serialize() === 'text=') {
      document.getElementById('show-hide2').style.display = 'block';
      setTimeout(() => {
        document.getElementById('show-hide2').style.display = 'none';
      }, "3000");
      document.getElementById('tweet-form').reset();
      return;
    }

    //if statments checking if the text feild is empty
    //shows message if it is and hides it using timeout
    if ($('#tweet-form').serialize() === 'text=%0D%0A') {
      document.getElementById('show-hide2').style.display = 'block';
      setTimeout(() => {
        document.getElementById('show-hide2').style.display = 'none';
      }, "3000");
      document.getElementById('tweet-form').reset();
      return;
    }

    $( "article" ).remove(); //was reloading all the tweets again so everytime remove the article element and reload the tweets obj. Not a great fix but a fix
    
    let serialize = ($('#tweet-form').serialize()); //serializes the form text 
    $.post('/tweets',serialize, function() { // takes the serialized tweet and sends it to /tweets
      loadtweets(); //loads the tweet from /tweet
    })
    .catch((err) => { //catches any errors from post request
      console.log('Error', err);
    });
    document.getElementById('tweet-form').reset();//resets the form after the process is over
    $('.counter').text(140);//resets the char counter
  });
});







