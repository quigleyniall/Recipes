$(document).ready(function(){
  let article = document.querySelector('article')
  $('#youtube').hide()

document.getElementById('recipes').addEventListener('click', function(){
  $('#row').show()
  $('#article').hide()
  $('#youtube').hide()
})


window.onload = onClientLoad

  // Load and inialize the API, then run the onYouTubeApiLoad() function once this is done
  function onClientLoad() {
   gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
  }
  // Attach your key to the API
  function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyAp7IkhH1eRssZ5ZNsvAl_SwJweighr7bk');
    // searchForm.addEventListener('submit', search);
      document.getElementById('perfect-burger').addEventListener('click', function(){
  $('#row').hide()
  $('#youtube').show()
  $('#article').show()
  search('perfect burger')
    })

    document.getElementById('perfect-steak').addEventListener('click',function(){
  $('#row').hide()
  $('#youtube').show()
  $('#article').show()
  search('perfect steak')
    })
    document.getElementById('how-to').addEventListener('click',function(){
      let youtubesearch = document.getElementById('youtubesearch')
      let youtubesearchterm = document.getElementById('youtubesearchterm').value
    $('#row').hide()
    $('#article').hide()
    $('#youtube').show()
    youtubesearch.addEventListener('click',function(){
      youtubesearchterm = document.getElementById('youtubesearchterm').value
      search(youtubesearchterm)
        $('#article').show()
    })

    })
  }

  function search(searchterm){
    // let searchterm = 'burger'
    let num = document.getElementById('select').value
    let request = gapi.client.youtube.search.list({
      // set what kind of data the response will include
      part: 'snippet',
      // set the number of results that will be returned
      maxResults: num,
      // set the search query to search for
      q: searchterm
    });
    request.execute(onSearchResponse);
  }
  function onSearchResponse(response) {
    // Empty the <section> element
    while (article.firstChild) {
        article.removeChild(article.firstChild);
    }
    // Store the actual results of the search in a variable
    var results = response.items;
    console.log(results)
    // loop through the results and run displayVideo() on each
    for(var i = 0; i < results.length; i++) {
      displayVideo(results[i], i);
    }
  }


function displayVideo(result){
let iframe = document.createElement('iframe');
iframe.src = 'https://www.youtube.com/embed/' +result.id.videoId;
iframe.width = '40%';
iframe.height = '500px';
iframe.frameBorder = '0';
iframe.setAttribute('allowFullScreen', '')
article.appendChild(iframe);
}
});
