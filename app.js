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
// {
//   "photos": {
//     "page": 1,
//     "pages": 50,
//     "perpage": 10,
//     "total": 500,
//     "photo": [
//       {
//         "id": "30580825110",
//         "owner": "42957889@N05",
//         "secret": "3ee1e42eb9",
//         "server": "5746",
//         "farm": 6,
//         "title": "Summer Mood",
//         "ispublic": 1,
//         "isfriend": 0,
//         "isfamily": 0
//       },
//       {
//         "id": "30761380362",
//         "owner": "57866871@N03",
//         "secret": "ed0fda5d40",
//         "server": "5606",
//         "farm": 6,
//         "title": "Montenegrin sundown",
//         "ispublic": 1,
//         "isfriend": 0,
//         "isfamily": 0
//       },
//       {
//         "id": "30877849835",
//         "owner": "70788108@N08",
//         "secret": "4e18e9b5b2",
//         "server": "5579",
//         "farm": 6,
//         "title": "Sky Ballet",
//         "ispublic": 1,
//         "isfriend": 0,
//         "isfamily": 0
//       },
//       {
//         "id": "30881464855",
//         "owner": "38954353@N06",
//         "secret": "431e1a914e",
//         "server": "5504",
//         "farm": 6,
//         "title": "Calling all girls",
//         "ispublic": 1,
//         "isfriend": 0,
//         "isfamily": 0
//       },
//       {
//         "id": "30575065350",
//         "owner": "92361032@N05",
//         "secret": "d0b73d3776",
//         "server": "5343",
//         "farm": 6,
//         "title": "Passerin arc en ciel  /  orange breasted bunting / Passerina leclancherii",
//         "ispublic": 1,
//         "isfriend": 0,
//         "isfamily": 0
//       },
//       {
//         "id": "30784886571",
//         "owner": "126755884@N06",
//         "secret": "ea7e815382",
//         "server": "5761",
//         "farm": 6,
//         "title": "Flowers of Heaven",
//         "ispublic": 1,
//         "isfriend": 0,
//         "isfamily": 0
//       },
//       {
//         "id": "30844950196",
//         "owner": "94937547@N04",
//         "secret": "4c6bab3f6f",
//         "server": "5528",
//         "farm": 6,
//         "title": "Earth, Water ... and Fire!",
//         "ispublic": 1,
//         "isfriend": 0,
//         "isfamily": 0
//       },
//       {
//         "id": "30791487631",
//         "owner": "86832534@N03",
//         "secret": "b6541c94db",
//         "server": "5590",
//         "farm": 6,
//         "title": "nuclear dawn",
//         "ispublic": 1,
//         "isfriend": 0,
//         "isfamily": 0
//       },
//       {
//         "id": "30874601645",
//         "owner": "84179858@N06",
//         "secret": "4280954f2c",
//         "server": "5531",
//         "farm": 6,
//         "title": "Hert / Red deer / Cerf",
//         "ispublic": 1,
//         "isfriend": 0,
//         "isfamily": 0
//       },
//       {
//         "id": "30844762156",
//         "owner": "86424839@N08",
//         "secret": "e56c121b24",
//         "server": "5335",
//         "farm": 6,
//         "title": "You know my name",
//         "ispublic": 1,
//         "isfriend": 0,
//         "isfamily": 0
//       }
//     ]
//   },
//   "stat": "ok"
// }

var urlPhotoInfo = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo" +
  "&api_key=2641bc2fe50d6802b4c14d2b756e8d3e&photo_id=30580825110&format=json&nojsoncallback=1";
// {
//   "photo": {
//     "id": "30580825110",
//     "secret": "3ee1e42eb9",
//     "server": "5746",
//     "farm": 6,
//     "dateuploaded": "1478715285",
//     "isfavorite": 0,
//     "license": "0",
//     "safety_level": "0",
//     "rotation": 0,
//     "originalsecret": "4296f2bfec",
//     "originalformat": "jpg",
//     "owner": {
//       "nsid": "42957889@N05",
//       "username": "icemanphotos",
//       "realname": "",
//       "location": "",
//       "iconserver": "7719",
//       "iconfarm": 8,
//       "path_alias": "icemanphotos"
//     },
//     "title": {
//       "_content": "Summer Mood"
//     },
//     "description": {
//       "_content": "<b>Share my photos anywhere you wanted, just link back to my image/page!\n\n<a href=\"http://www.gettyimages.com/search/photographer?excludenudity=true&amp;family=creative&amp;photographer=levente bodo&amp;sort=best\" rel=\"nofollow\">Getty Images</a> || <a href=\"https://twitter.com/icemanphotos\" rel=\"nofollow\">Twitter</a>\n\nThanks for all visits, comments &amp; Favs!\n<i>NO images//awards//graphics please!</i>\n© 2016, All Rights Reserved. Do not use without a permission, please.\n</b>"
//     },
//     "visibility": {
//       "ispublic": 1,
//       "isfriend": 0,
//       "isfamily": 0
//     },
//     "dates": {
//       "posted": "1478715285",
//       "taken": "2015-12-16 09:51:46",
//       "takengranularity": "0",
//       "takenunknown": "0",
//       "lastupdate": "1478793320"
//     },
//     "views": "29150",
//     "editability": {
//       "cancomment": 0,
//       "canaddmeta": 0
//     },
//     "publiceditability": {
//       "cancomment": 1,
//       "canaddmeta": 1
//     },
//     "usage": {
//       "candownload": 1,
//       "canblog": 0,
//       "canprint": 0,
//       "canshare": 1
//     },
//     "comments": {
//       "_content": "133"
//     },
//     "notes": {
//       "note": [
//         {
//           "id": "72157674881318871",
//           "author": "41313722@N04",
//           "authorname": "Shelby's Trail",
//           "authorrealname": "Shelby",
//           "authorispro": 1,
//           "x": "378",
//           "y": "115",
//           "w": "28",
//           "h": "28",
//           "_content": "heart cut out  ;)"
//         }
//       ]
//     },
//     "people": {
//       "haspeople": 0
//     },
//     "tags": {
//       "tag": [
//         {
//           "id": "42952549-30580825110-121",
//           "author": "42957889@N05",
//           "authorname": "icemanphotos",
//           "raw": "travel",
//           "_content": "travel",
//           "machine_tag": 0
//         },
//         {
//           "id": "42952549-30580825110-282",
//           "author": "42957889@N05",
//           "authorname": "icemanphotos",
//           "raw": "sky",
//           "_content": "sky",
//           "machine_tag": 0
//         },
//         {
//           "id": "42952549-30580825110-441",
//           "author": "42957889@N05",
//           "authorname": "icemanphotos",
//           "raw": "seascape",
//           "_content": "seascape",
//           "machine_tag": 0
//         },
//         {
//           "id": "42952549-30580825110-418844",
//           "author": "42957889@N05",
//           "authorname": "icemanphotos",
//           "raw": "loungers",
//           "_content": "loungers",
//           "machine_tag": 0
//         },
//         {
//           "id": "42952549-30580825110-685378",
//           "author": "42957889@N05",
//           "authorname": "icemanphotos",
//           "raw": "sunbeds",
//           "_content": "sunbeds",
//           "machine_tag": 0
//         },
//         {
//           "id": "42952549-30580825110-3337",
//           "author": "42957889@N05",
//           "authorname": "icemanphotos",
//           "raw": "solitude",
//           "_content": "solitude",
//           "machine_tag": 0
//         }
//       ]
//     },
//     "location": {
//       "latitude": "3.502026",
//       "longitude": "72.899436",
//       "accuracy": "16",
//       "context": "0",
//       "locality": {
//         "_content": "Male",
//         "place_id": "AXtOfupTULyWt9gh",
//         "woeid": "2268295"
//       },
//       "region": {
//         "_content": "Maale",
//         "place_id": "8OuQsv9TUrprpfkXtQ",
//         "woeid": "20070331"
//       },
//       "country": {
//         "_content": "Maldives",
//         "place_id": "7ZUIADRTUb5knKMfSg",
//         "woeid": "23424899"
//       },
//       "place_id": "AXtOfupTULyWt9gh",
//       "woeid": "2268295"
//     },
//     "geoperms": {
//       "ispublic": 1,
//       "iscontact": 0,
//       "isfriend": 0,
//       "isfamily": 0
//     },
//     "urls": {
//       "url": [
//         {
//           "type": "photopage",
//           "_content": "https://www.flickr.com/photos/icemanphotos/30580825110/"
//         }
//       ]
//     },
//     "media": "photo"
//   },
//   "stat": "ok"
// }

var urlGetSizes = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes" +
  "&api_key=2641bc2fe50d6802b4c14d2b756e8d3e&photo_id=30580825110&format=json&nojsoncallback=1";
// {
//   "sizes": {
//     "canblog": 0,
//     "canprint": 0,
//     "candownload": 1,
//     "size": [
//       {
//         "label": "Square",
//         "width": 75,
//         "height": 75,
//         "source": "https://farm6.staticflickr.com/5746/30580825110_3ee1e42eb9_s.jpg",
//         "url": "https://www.flickr.com/photos/icemanphotos/30580825110/sizes/sq/",
//         "media": "photo"
//       },
//       {
//         "label": "Large Square",
//         "width": "150",
//         "height": "150",
//         "source": "https://farm6.staticflickr.com/5746/30580825110_3ee1e42eb9_q.jpg",
//         "url": "https://www.flickr.com/photos/icemanphotos/30580825110/sizes/q/",
//         "media": "photo"
//       },
//       {
//         "label": "Thumbnail",
//         "width": "100",
//         "height": "67",
//         "source": "https://farm6.staticflickr.com/5746/30580825110_3ee1e42eb9_t.jpg",
//         "url": "https://www.flickr.com/photos/icemanphotos/30580825110/sizes/t/",
//         "media": "photo"
//       },
//       {
//         "label": "Small",
//         "width": "240",
//         "height": "160",
//         "source": "https://farm6.staticflickr.com/5746/30580825110_3ee1e42eb9_m.jpg",
//         "url": "https://www.flickr.com/photos/icemanphotos/30580825110/sizes/s/",
//         "media": "photo"
//       },
//       {
//         "label": "Small 320",
//         "width": "320",
//         "height": 213,
//         "source": "https://farm6.staticflickr.com/5746/30580825110_3ee1e42eb9_n.jpg",
//         "url": "https://www.flickr.com/photos/icemanphotos/30580825110/sizes/n/",
//         "media": "photo"
//       },
//       {
//         "label": "Medium",
//         "width": "500",
//         "height": "333",
//         "source": "https://farm6.staticflickr.com/5746/30580825110_3ee1e42eb9.jpg",
//         "url": "https://www.flickr.com/photos/icemanphotos/30580825110/sizes/m/",
//         "media": "photo"
//       },
//       {
//         "label": "Medium 640",
//         "width": "640",
//         "height": "427",
//         "source": "https://farm6.staticflickr.com/5746/30580825110_3ee1e42eb9_z.jpg",
//         "url": "https://www.flickr.com/photos/icemanphotos/30580825110/sizes/z/",
//         "media": "photo"
//       },
//       {
//         "label": "Medium 800",
//         "width": "800",
//         "height": 534,
//         "source": "https://farm6.staticflickr.com/5746/30580825110_3ee1e42eb9_c.jpg",
//         "url": "https://www.flickr.com/photos/icemanphotos/30580825110/sizes/c/",
//         "media": "photo"
//       },
//       {
//         "label": "Large",
//         "width": "1024",
//         "height": "683",
//         "source": "https://farm6.staticflickr.com/5746/30580825110_3ee1e42eb9_b.jpg",
//         "url": "https://www.flickr.com/photos/icemanphotos/30580825110/sizes/l/",
//         "media": "photo"
//       },
//       {
//         "label": "Large 1600",
//         "width": "1600",
//         "height": 1067,
//         "source": "https://farm6.staticflickr.com/5746/30580825110_b77418816c_h.jpg",
//         "url": "https://www.flickr.com/photos/icemanphotos/30580825110/sizes/h/",
//         "media": "photo"
//       },
//       {
//         "label": "Original",
//         "width": "1600",
//         "height": "1067",
//         "source": "https://farm6.staticflickr.com/5746/30580825110_4296f2bfec_o.jpg",
//         "url": "https://www.flickr.com/photos/icemanphotos/30580825110/sizes/o/",
//         "media": "photo"
//       }
//     ]
//   },
//   "stat": "ok"
// }

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




// Use for responsive display
// <div class="col-xs-12 col-sm-6">