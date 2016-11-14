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
  var anchors = [ ];
  var thumbs = [ ];
  var photos = { };

  function setAnchor(id) {
    if (id !== anchor()) {
      anchors.push(id);
      resetThumbs();
    }
  }

  function anchor() {
    return anchors[anchors.length - 1];
  }

  function tags() {
    return photos[anchor()].tags;
  }

  function addThumb(id) {
    thumbs.push(id);
  }

  function resetThumbs() {
    thumbs = [ ];
  }

  function goBack() {
    if (anchors.length > 1) {
      anchorHistory.pop();
      renderNewAnchor();
      resetThumbs();
    }
  }

  function canGoBack() {
    return anchors.length > 1;
  }

  function isUniqueId(id) {
    return !(id === anchor() || ~thumbs.indexOf(id));
  }

  function isUnique(photo) {
    return isUniqueId(photo.id);
  }

  function addPhoto(photo) {
    if (!photos[photo.id]) {
      photos[photo.id] = {
        owner: photo.owner,
        title: photo.title,
        views: Number(photo.views),
        tags: photo.tags.split(" "),
        urlAnchor: photo[ANCHORSIZE],
        urlThumb: photo[THUMBSIZE]
      };
    }
  }

  function thumbId() {
    return thumbs[thumbs.length - 1];
  }

  function thumbUrl(id) {
    id = id || thumbs[thumbs.length - 1];
    return photos[id].urlThumb;
  }

  function anchorUrl() {
    return photos[anchor()].urlAnchor;
  }

  return {
    thumbs,
    anchor,
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
  renderNewAnchor();
  getNewThumbs(newThumb);
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

  function generateQuery(options) {
    var base = {
      api_key: "6ea02d3c79fe0ece6a497ea8a10db3eb",
      extras: ["tags", "views", THUMBSIZE, ANCHORSIZE].join(","),
      format: 'json',
      nojsoncallback: 1,
    };

    for (var key in options) {
      base[key] = options[key];
    }

    return base;
  }

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

  tags.forEach(function forEachTag(tag) {
    console.log(tag);
    query.tags = tag;
    $.getJSON(flickr.url, query, callback);
  });
}

// functions that render state
function renderNewAnchor() {
  $('.js-thumbnails').empty();
  $('.js-anchor-image > img').attr('src', state.anchorUrl());
}

function renderLatestThumb() {
  var results = '<li><img class="thumbnails" id="'+ state.thumbId() +
    '" src="' + state.thumbUrl() + '"/></li>';
  $('.js-thumbnails').append(results);
}

function renderRemoveThumbs() {

}

$(function() {
  getNewAnchor(getRandomAnchor);
});

// events

// finish intro page
$('.js-enter-button').on('click', function enterSite(event) {
  $('.intro-page').addClass('hidden');
  $('.js-anchor-image').removeClass('hidden');
  $('.js-thumbnails').removeClass('hidden');
  $('.fa').removeClass('hidden');
})

// click on a thumb
$('.js-thumbnails').on('click', 'img', function thumbClick(event) {
  state.setAnchor($(event.target).attr('id'));
  renderNewAnchor();
  getNewThumbs(newThumb);
});

$('#back').click(function backClick(event) {
  if (state.canGoBack()) {
    state.goBack();

  }
});

// listener on back icon
// enable hover response if canGoBack()
