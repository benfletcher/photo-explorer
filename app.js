
// state object
var state = {
  anchorIds: [],
  anchorUrls: [], 
  thumbnailsIds: [],
  thumbnailUrls: []
  
};


// other info - where to store this?
// - url to the photo itself
// -



// functions that modify state

function saveAnchorIds (apiData) {
    var photosLength = apiData.photos.photo.length;
    var index = 0; 
    var ids; 

    while (index < photosLength){
      ids = apiData.photos.photo[index].id; 
      state.anchorIds.push(ids); 
      index++; 
    }
}

function saveImgUrls (apiData) {
  // console.log(apiData)
    state.anchorUrls.push(apiData.sizes.size[7].source);
    console.log(state.anchorUrls);
    displayAnchorImage(state);
}

  //function saves priorAnchorImg
    //takes anchorImage and reassigns it to priorAnchor

  //function that saves thumbnails

var baseUrl = "https://api.flickr.com/services/rest/";

//API calls

function getApiInterestingness(callback) {
  var query = {
    method: 'flickr.interestingness.getList',
    format: 'json',
    api_key: 'a823f772bc1e921b92a2658325ceaeb2',
    per_page: 50,
    nojsoncallback: 1
  }

  $.getJSON(baseUrl, query).done(callback);

}

function getApiPhotoInfo (callback) {
   var query = {
    method: 'flickr.photos.getInfo',
    format: 'json',
    api_key: 'a823f772bc1e921b92a2658325ceaeb2'
  }

  $.getJSON(baseUrl, query).done(callback);
}

function getUrlSizes1 (callback) {
  var index = 0;
  var photosLength = state.anchorIds.length; 

    var query = {
      method: 'flickr.photos.getSizes',
      format: 'json',
      api_key: 'a823f772bc1e921b92a2658325ceaeb2',
      nojsoncallback: 1,
      photo_id: '30262244943'
    }

   $.getJSON(baseUrl, query).done(callback);
}

function getUrlSizes2 (callback) {
  var index = 0;
  var photosLength = state.anchorIds.length; 

    var query = {
      method: 'flickr.photos.getSizes',
      format: 'json',
      api_key: 'a823f772bc1e921b92a2658325ceaeb2',
      nojsoncallback: 1,
      photo_id: '30859113426'
    }

   $.getJSON(baseUrl, query).done(callback);
}

function getUrlSizes3 (callback) {
  var index = 0;
  var photosLength = state.anchorIds.length; 

    var query = {
      method: 'flickr.photos.getSizes',
      format: 'json',
      api_key: 'a823f772bc1e921b92a2658325ceaeb2',
      nojsoncallback: 1,
      photo_id: '30263975014'
    }

   $.getJSON(baseUrl, query).done(callback);
}

function getUrlSizes4 (callback) {
  var index = 0;
  var photosLength = state.anchorIds.length; 

    var query = {
      method: 'flickr.photos.getSizes',
      format: 'json',
      api_key: 'a823f772bc1e921b92a2658325ceaeb2',
      nojsoncallback: 1,
      photo_id: '30889829525'
    }

   $.getJSON(baseUrl, query).done(callback);
}

function getUrlSizes5 (callback) {
  var index = 0;
  var photosLength = state.anchorIds.length; 

    var query = {
      method: 'flickr.photos.getSizes',
      format: 'json',
      api_key: 'a823f772bc1e921b92a2658325ceaeb2',
      nojsoncallback: 1,
      photo_id: '30262447373'
    }

   $.getJSON(baseUrl, query).done(callback);
}

function getUrlSizes6 (callback) {
  var index = 0;
  var photosLength = state.anchorIds.length; 

    var query = {
      method: 'flickr.photos.getSizes',
      format: 'json',
      api_key: 'a823f772bc1e921b92a2658325ceaeb2',
      nojsoncallback: 1,
      photo_id: '30896089725'
    }

   $.getJSON(baseUrl, query).done(callback);
}

var urlInteresting = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=2641bc2fe50d6802b4c14d2b756e8d3e&format=json&per_page=4";

var urlPhotoInfo = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo" +
  "&api_key=2641bc2fe50d6802b4c14d2b756e8d3e&photo_id=30580825110&format=json&nojsoncallback=1";

var urlGetSizes = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes" +
  "&api_key=a823f772bc1e921b92a2658325ceaeb2&photo_id=30580825110&format=json&nojsoncallback=1";

// functions that render state
function displayAnchorImage(state) {
  var index = 0,
    results = "",
    anchorUrl; 

  while (index < state.anchorUrls.length) {
    if (state.anchorUrls.length === 6) {
      anchorUrl = state.anchorUrls[index];
      // results += '<div class="grid-item"><img src="' + anchorUrl + '"/></div>';
      results += '<div class="grid-item">' + '<a href="' + anchorUrl + '" data-lightbox="image-1" data-title="My caption"><img src="' + anchorUrl + '"/></a>' + '</div>';
      $('.grid').append(results);
      results = "";
    }
    index++; 
  }
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
  getApiInterestingness(saveAnchorIds);
  // getApiPhotoInfo();

  getUrlSizes1(saveImgUrls);
  getUrlSizes2(saveImgUrls);
  getUrlSizes3(saveImgUrls);
  getUrlSizes4(saveImgUrls);
  getUrlSizes5(saveImgUrls);
  getUrlSizes6(saveImgUrls)

 // displayAnchorImage(state);



});
// events

$('.js-enter-button').on('click', function(event) {
  $('.intro-page').addClass('hidden');
  var $grid = $('.grid').imagesLoaded( function() {
    $('.grid').removeClass('no-show')
  $grid.masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
  }); 
});
})
  // listen for clicks on anchor photo
  // listen for clicks on camera icon
  // listen for clicks on thumbnails (1-3...)
  // listen for mouseover on icons (might be multiple)
  // listen for back button
