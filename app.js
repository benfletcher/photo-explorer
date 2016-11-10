//                   ||
//      pos0         ||      pos1
//                   ||
// cam th1 th2 th3   ||
// =======================================
//
//      pos2         ||      pos3
//


// state object
var state = {
  anchorImage: "30580825110",
  thumbnailsIds: [],
  priorAnchor: "324324234234",
  thumbnailUrls: {},
  anchorUrls: {}
  
};

//state.thumbnailURLs[thumbnailIds[0]] = url;
// other info - where to store this?
// - url to the photo itself
// -



// functions that modify state

function saveCurrentAnchorImg (apiData) {
    state.anchorImage = apiData.photos.photo[0].id;
    
}

function saveImgUrls (apiData) {
    state.thumbnailUrls[state.anchorImage] = apiData.sizes.size[0].source;
    state.anchorUrls[state.anchorImage] = apiData.sizes.size[7].source;
    displayAnchorImage(state);
}


  //function savesCurrentAnchorImg
  //function saves priorAnchorImg
    //takes anchorImage and reassigns it to priorAnchor

  //function that saves thumbnails

var baseUrl = "https://api.flickr.com/services/rest/";

//API calls

function getApiInterestingness(callback) {
  var query = {
    method: 'flickr.interestingness.getList',
    format: 'json',
    api_key: '2641bc2fe50d6802b4c14d2b756e8d3e',
    per_page: 1,
    nojsoncallback: 1
  }

  $.getJSON(baseUrl, query).done(callback);

}

function getApiPhotoInfo (callback) {
   var query = {
    method: 'flickr.photos.getInfo',
    format: 'json',
    api_key: '2641bc2fe50d6802b4c14d2b756e8d3e'
  }

  $.getJSON(baseUrl, query).done(callback);
}

function getUrlSizes (callback) {
   var query = {
    method: 'flickr.photos.getSizes',
    format: 'json',
    api_key: '2641bc2fe50d6802b4c14d2b756e8d3e',
    nojsoncallback: 1,
    photo_id: state.anchorImage
  }
  
  $.getJSON(baseUrl, query).done(callback);

}

var urlInteresting = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=2641bc2fe50d6802b4c14d2b756e8d3e&format=json&per_page=4";

var urlPhotoInfo = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo" +
  "&api_key=2641bc2fe50d6802b4c14d2b756e8d3e&photo_id=30580825110&format=json&nojsoncallback=1";

var urlGetSizes = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes" +
  "&api_key=2641bc2fe50d6802b4c14d2b756e8d3e&photo_id=30580825110&format=json&nojsoncallback=1";

// functions that render state
function displayAnchorImage(state) {
  var anchorUrl = state.anchorUrls[state.anchorImage];
  $('.js-anchor-image > img').attr('src', anchorUrl);
  // var elem = $('.js-anchor-image').children().clone();
  // elem.find('img').attr('src', anchorUrl);
  // $('.js-anchor-image').append(elem);
  
}



//   var resultElement = '';
//   if (data.Search) {
//     data.Search.forEach(function(item) {
//      resultElement += '<p>' + item.Title + '</p>';
//     });
//   }
//   else {
//     resultElement += '<p>No results</p>';
//   }
  
//   $('.js-search-results').html(resultElement);
// }


  // function that gets anchor photo info and posts to page
  // function that gets thumbnail info and posts to page
  // function allowing clicking on camera icon to grab photog photos

$(function() {
  getApiInterestingness(saveCurrentAnchorImg);
  // getApiPhotoInfo();

  getUrlSizes(saveImgUrls);

 // displayAnchorImage(state);


});
// events

  // listen for clicks on anchor photo
  // listen for clicks on camera icon
  // listen for clicks on thumbnails (1-3...)
  // listen for mouseover on icons (might be multiple)
  // listen for back button
