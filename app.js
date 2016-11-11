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
    urlThumb: "",
  }
}

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
    urlAnchor: photo.url_z,
    urlThumb: photo.url_sq,
  };
  console.log(imageData);
  console.log(state);

  displayAnchorImage(state);
}

// function saveImgUrls (apiData) {
//     state.thumbnailUrls[state.anchorImage] = apiData.sizes.size[0].source;
//     state.anchorUrls[state.anchorImage] = apiData.sizes.size[7].source;
//     displayAnchorImage(state);
// }

function saveImageInfo(apiData) {
  var photo = apiData.photo;

  imageData.imageInfo[state.currId] = {
    ownerId: photo.owner.nsid,
    ownername: photo.owner.username,
    title: photo.title._content,
    tags: tags
  }

  console.log(imageData.imageInfo[state.currId]);

}

//API calls

var baseUrl = "https://api.flickr.com/services/rest/";
var api_key = "6ea02d3c79fe0ece6a497ea8a10db3eb";

function getApiInterestingness(callback) {
  var query = {
    method: 'flickr.interestingness.getList',
    extras: 'tags,views,url_sq,url_z',  // save an extra API call
    format: 'json',
    api_key: api_key,
    per_page: 10,  // grab a random 1 of all returned
    nojsoncallback: 1
  };

  $.getJSON(baseUrl, query, callback);
}

function getApiSearchTag(tag, callback) {
  var query = {
    method: 'flickr.photos.search',
    api_key: api_key,
    extras: 'tags,views,url_sq,url_z',  // save an extra API call
    sort: 'interestingness-desc',
    media: 'photos',
    content_type: 1,
    format: 'json',
    nojsoncallback: 1,
    per_page: 1
  };

  query.tags = imageData[state.anchorImage].tags[0];

  $.getJSON(baseUrl, query, callback);
}

function getApiPhotoInfo (callback) {
  if (imageData[state.currId]) {
    return;    // we've already seen this photo, so skip API call
  }

  var query = {
    method: 'flickr.photos.getInfo',
    api_key: api_key,
    photo_id: state.anchorImage,
    format: 'json',
    nojsoncallback: 1
  }

  $.getJSON(baseUrl, query).done(callback);
}

// flickr.tags.getListPhoto
// Don't need to use since getInfo method also includes tags
// can delete this function later once we're sure we don't need
// sample call: https://api.flickr.com/services/rest/?method=flickr.tags.getListPhoto&api_key=dc30338763de300a6d42e206fb8298a3&photo_id=30580825110&format=json&nojsoncallback=1
function getApiPhotoTags (callback) {
   var query = {
    method: 'flickr.tags.getListPhoto',
    api_key: api_key,
    photo_id: state.anchorImage,
    format: 'json',
    nojsoncallback: 1
  }

  $.getJSON(baseUrl, query).done(callback);
}

function getUrlSizes (callback) {
   var query = {
    method: 'flickr.photos.getSizes',
    format: 'json',
    api_key: api_key,
    nojsoncallback: 1,
    photo_id: state.anchorImage
  }

  $.getJSON(baseUrl, query).done(callback);
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
  // displayAnchorImage(state);
  // getApiPhotoInfo(saveImageInfo);
  // getUrlSizes(saveImgUrls);

  // displayAnchorImage(state);


});
// events

  // listen for clicks on anchor photo
  // listen for clicks on camera icon
  // listen for clicks on thumbnails (1-3...)
  // listen for mouseover on icons (might be multiple)
  // listen for back button
