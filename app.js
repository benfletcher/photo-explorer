//  ___________________
// | <--             o |
// |                   |
// | <     image     > |
// |                   |
// |___________________|
//  t1  t2  cam  t3  t4
//
// key:
// <--  back button
// <, >  scroll through more images from current tag Search
// o  open new tab on flickr site of current image

// app constants
var baseUrl = "https://api.flickr.com/services/rest/";
var api_key = "6ea02d3c79fe0ece6a497ea8a10db3eb";
var thumbSize = "url_sq";
var anchorSize = "url_z";

// state object
var state = {
  anchorImage: "",
  thumbnailsIds: [ ],
  priorAnchors: [ ]
};

var imageData = {
  "123456": {
    ownerId: "",
    title: "",
    tags: [ ],
    urlAnchor: "",
    urlThumb: ""
  }
};

// functions that modify state

function saveCurrentAnchorImg (apiData) {
  // grabs a random photo based on # of photos returned
  var rand = Math.ceil(Math.random() * apiData.photos.photo.length);

  var photo = apiData.photos.photo[rand];
  state.anchorImage = photo.id;

  if (imageData[photo.id]) {
    return; // image already in DB
  }

  imageData[photo.id] = {
    ownerId: photo.owner,
    title: photo.title,
    tags: photo.tags.split(" "),
    urlAnchor: photo[anchorSize],
    urlThumb: photo[thumbSize]
  };
  console.log(imageData);
  console.log(state);

  displayAnchorImage(state);

  getApiSearchTag(saveThumbIds);

}

function saveThumbIds(apiData) {
  // console.log(apiData);
  state.thumbnailsIds.push(apiData.photos.photo[0].id);
  console.log('render thumbnail called');
  console.log('state', state);
  console.log('imageData', imageData);
}

//API calls
var apiExtras = "tags,views," + thumbSize + "," + anchorSize;
var apiInterestingness = "flickr.interestingness.getList";
var apiSearch = "flickr.photos.search";

function getApiInterestingness(callback) {
  var query = {
    method: apiInterestingness,
    extras: apiExtras,    // save an extra API call
    format: 'json',
    api_key: api_key,
    per_page: 10,  // grab a random 1 of all returned
    nojsoncallback: 1
  };

  $.getJSON(baseUrl, query, callback); // .done(cb)
  
  // code from Chris re: future approach:
  //$.getJSON(baseUrl, query).done(callback).done(displayAnchorImage);
}

function getApiSearchTag(callback) {
  var query = {
    method: apiSearch,
    api_key: api_key,
    extras: apiExtras,
    sort: 'interestingness-desc',
    media: 'photos',
    content_type: 1,
    format: 'json',
    nojsoncallback: 1,
    per_page: 1
  };

  for (var i = 0; i < 3 && i < imageData[state.anchorImage].tags.length; i++) {
    query.tags = imageData[state.anchorImage].tags[i];
    console.log(query.tags);
    $.getJSON(baseUrl, query, callback);
  }

}

// functions that render state
function displayAnchorImage(state) {
  var anchorUrl = imageData[state.anchorImage].urlAnchor;
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

});
// events

  // listen for clicks on anchor photo
  // listen for clicks on camera icon
  // listen for clicks on thumbnails (1-3...)
  // listen for mouseover on icons (might be multiple)
  // listen for back button
