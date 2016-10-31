	function jsonFlickrApi(rsp) {
		window.rsp = rsp;
	}

	function detailInfo(item, detail) {
		//Read in the title of each photo
		//Get the url for the image.
		var photoURL = '//farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
		var htmlImageString = '<img src="' + photoURL + '" alt="' + item.title + '" />';
		var imgLink = '<a href="https://www.flickr.com/photos/culkin/' + item.id + '/in/dateposted-public/" target="_blank">View on <img src="css/flickr.jpg" class="flickr"/></a>'
		return '<div class="pop_up_image_box_text">' + '<strong>' + item.title + '</strong><br>' + detail + '<br>' + htmlImageString + '<br>' + imgLink + '</div>';
	}
	//loading the images using the Flickr API.
	function loadPhotos() {
		//Connects to the Flickr API and reads the results of the query into a JSON array. 
		var flickrCall = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=fc2bbb66b8ec6a5bc5a2c8fac8970a8d&user_id=9071746%40N06&privacy_filter=1&has_geo=1&extras=geo,tags,machine_tags&format=json&jsoncallback=?';
		$.getJSON(flickrCall, displayImages);
	}

	function flickrError() {
		alert("flick loading error");
		console.log("flick loading error");
	}