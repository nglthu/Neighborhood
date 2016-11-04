	function detailInfo(item) {
		//Get the url for the image.		//'https://farm{farm_id}.staticflickr.com/{server_id}/{photo_id}_{secret}_{size}.jpg';
		var imageString = [];
		$.each(item.photos.photo, function (i, item) {
			var photoURL = 'https://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
			var htmlImageString = '<img src="' + photoURL + '"alt=" " class="image"/>';
			imageString.push(htmlImageString);
		});
		return '<div>' + imageString + '<br></div>';
	}

	function getPhotos(markerLat, markerLong) {
		var stringURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=fc2bbb66b8ec6a5bc5a2c8fac8970a8d&lat=' + markerLat + '&lon=' + markerLong + '&radius=0.05&per_page=3&format=json&nojsoncallback=1';
		return stringURL;
	}