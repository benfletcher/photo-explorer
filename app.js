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
  tumbnailsIds: [ ],
  priorAnchors: [ ],
//  anchorUrls: { },
//  imageTags: { },
//  photogs: { }
};

var imageData = {
  "123456": {
    ownerId: "",
//    ownername: "",  // probably don't need
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

  state.anchorImage = apiData.photos.photo[rand].id;
}

function saveImgUrls (apiData) {
    state.thumbnailUrls[state.anchorImage] = apiData.sizes.size[0].source;
    state.anchorUrls[state.anchorImage] = apiData.sizes.size[7].source;
    displayAnchorImage(state);
}

function saveImageInfo(apiData) {
  var tags = [ ];
  apiData.photo.tags.tag.forEach(function (imgTag) {
    tags.push(imgTag._content);
  });

  var photo = apiData.photo;

  imageData.imageInfo[state.currId] = {
    ownerId: photo.owner.nsid,
    ownername: photo.owner.username,
    title: photo.title._content,
    tags: tags
  }

  console.log(imageData.imageInfo[state.currId]);

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
    per_page: 50,
    nojsoncallback: 1
  }

  $.getJSON(baseUrl, query).done(callback);

}

function getApiPhotoInfo (callback) {
  if (imageData.imageInfo[state.currId]) {
    return;    // already have data, so skip API call
  }

   var query = {
    method: 'flickr.photos.getInfo',
    api_key: '2641bc2fe50d6802b4c14d2b756e8d3e',
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
    api_key: '2641bc2fe50d6802b4c14d2b756e8d3e',
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
    api_key: '2641bc2fe50d6802b4c14d2b756e8d3e',
    nojsoncallback: 1,
    photo_id: state.anchorImage
  }

  $.getJSON(baseUrl, query).done(callback);
}

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
  getApiPhotoInfo(saveImageInfo);
  getUrlSizes(saveImgUrls);

 // displayAnchorImage(state);


});
// events

  // listen for clicks on anchor photo
  // listen for clicks on camera icon
  // listen for clicks on thumbnails (1-3...)
  // listen for mouseover on icons (might be multiple)
  // listen for back button
