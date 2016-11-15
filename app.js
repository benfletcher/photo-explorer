"use strict";
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

var THUMBSIZE = "url_q";
var ANCHORSIZE = "url_c";

// state object
// could add randomizeAnchor(): sets anchor = random photo from photoData
var state = (function generateState() {
  let anchors = [ ];
  let photos = { };

  let setAnchor = id => anchors.push(id);

  let anchorId = () => anchors[anchors.length - 1];

  let anchor = () => photos[anchorId()];

  let anchorPhoto = () => photos[anchorId()];

  let tags = () => anchorPhoto().tags;

  let addThumb = id => anchorPhoto().thumbs.push(id);

  let goBack = () => {
    if (canGoBack()) {
      anchors.pop();
    }
  };

  let canGoBack = () => anchors.length > 1;

  let isAThumb = id => anchor().thumbs.indexOf(id) >= 0;

  let isUniqueId = id => !(id === anchorId() || isAThumb(id));

  let isUnique = photo => isUniqueId(photo.id);

  let addPhoto = photo => {
    if (!photos[photo.id]) {
      photos[photo.id] = {
        owner: photo.owner,
        title: photo.title,
        views: Number(photo.views),
        tags: photo.tags.split(" "),
        urlAnchor: photo[ANCHORSIZE],
        urlThumb: photo[THUMBSIZE],
        thumbs: [ ]
      };
    }
  }

  let thumbId = () => anchor().thumbs[anchor().thumbs.length - 1];

  let thumbUrl = () => photos[thumbId()].urlThumb;

  let anchorUrl = () => photos[anchorId()].urlAnchor;

  return {
    tags,
    setAnchor,
    addThumb,
    goBack,
    canGoBack,
    isUnique,
    addPhoto,
    thumbUrl,
    thumbId,
    anchorUrl
  };
}());

// functions that modify state

function getRandomAnchor(apiData) {
  var rand = Math.ceil(Math.random() * apiData.photos.photo.length);
  var photo = apiData.photos.photo[rand];

  state.addPhoto(photo);
  state.setAnchor(photo.id);
  renderAnchor();
}

function newThumb(apiData) {
  var photo = apiData.photos.photo.find(state.isUnique);

  if (photo) {
    state.addPhoto(photo);
    state.addThumb(photo.id);
    renderLatestThumb();
  }
}

//API calls

var flickr = (function flickrApi() {
  var url = "https://api.flickr.com/services/rest/";
  var base = {
    api_key: "6ea02d3c79fe0ece6a497ea8a10db3eb",
    extras: ["tags", "views", THUMBSIZE, ANCHORSIZE].join(","),
    format: 'json',
    nojsoncallback: 1,
  };

  let generateQuery = options => Object.assign({}, base, options);

  function interestingness(count) {
    return generateQuery({
      method: "flickr.interestingness.getList",
      per_page: count || 10
    });
  }

  function search(count, sort) {
    return generateQuery({
      method: "flickr.photos.search",
      sort: sort || 'relevance',
      media: 'photos',
      content_type: 1,
      per_page: count || 10
    });
  }

  return {
    url,
    interestingness,
    search
  };
}());

function getNewAnchor(callback) {

  $.getJSON(flickr.url, flickr.interestingness(), callback);

}

function getNewThumbs(callback) {

  var query = flickr.search();
  var tags = state.tags();

  tags.forEach(tag => {
    console.info(tag);

    query.tags = tag;

    $.getJSON(flickr.url, query, callback);
  });

}

// functions that render state

function renderAnchor() {

  $('.js-thumbnails').empty();
  $('.js-anchor-image > img').attr('src', state.anchorUrl());

}

function renderLatestThumb() {

  var results = '<li><img class="thumbnails" id="'+ state.thumbId() +
    '" src="' + state.thumbUrl() + '"/></li>';
  $('.js-thumbnails').append(results);

}

$(function() {

  $('img.anchor').on('load', () => getNewThumbs(newThumb));

  getNewAnchor(getRandomAnchor);

});

// events

// finish intro page
$('.js-enter-button').on('click', function enterSite(event) {
  $('.intro-page').addClass('hidden');
  $('.js-anchor-image').removeClass('hidden');
  $('.js-thumbnails').removeClass('hidden');
  $('.fa').removeClass('hidden');
});

// click on a thumb
$('.js-thumbnails').on('click', 'img', function thumbClick(event) {
  state.setAnchor($(event.target).attr('id'));
  renderAnchor();
  getNewThumbs(newThumb);
});

// go back one anchor
$('i#back').click(function backClick(event) {
  console.log('back it up...');
  if (state.canGoBack()) {
    state.goBack();
    renderAnchor();
  }
});

// enable hover response if canGoBack()


// add to favorites button


// view favorites button
