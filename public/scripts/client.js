
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  
  const createTweetElement = function(tweet) {
    let $tweet = $('<article>')

    let htmlMarkup = `
    <div class="tweet-header">
      <img src='${tweet.user.avatars}' class="fa-user">
      ${tweet.user.name}
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
    </div>`

    $tweet.append(htmlMarkup);
    return $tweet;
  }

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet)
      $('#tweet-container').prepend($tweet)
    }
  };



  const loadtweets = function(){
    $.ajax('/tweets', {method: 'GET'}).then(function(loadedtweets){
      renderTweets(loadedtweets)
    })
  }
  loadtweets()

 $('#tweet-form').submit(function(event){
      event.preventDefault();
      let hide =document.getElementById('show-hide').style.display = 'none';
    

      if ($('#tweet-form').children('.counter').val() < 0){
        document.getElementById('show-hide').style.display = 'block'
        setTimeout(() => {
          document.getElementById('show-hide').style.display = 'none';
        }, "3000")
        document.getElementById('tweet-form').reset()
        return 
      }

      if($('#tweet-form').serialize() === 'text='){
        return alert('No Tweet has been typed!')
      }


      if($('#tweet-form').serialize() === 'text=%0D%0A'){
        return alert('No Tweet has been typed!')
      }
      let ser = ($('#tweet-form').serialize())
      console.log(ser)
      $.post('/tweets',ser, function(){
        loadtweets()
      })
      document.getElementById('tweet-form').reset();
      });
    
});







