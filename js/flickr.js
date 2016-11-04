	
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
	