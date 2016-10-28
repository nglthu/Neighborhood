	function jsonFlickrApi(rsp) {
		window.rsp = rsp;
		// http://farm{id}.static.flickr.com/{server-id}/{id}_{secret}_[mstb].jpg
		// http://www.flickr.com/photos/{user-id}/{photo-id}
		if (rsp.stat != "ok") {
			$('#light').prepend("Sorry Key expired, can not retrieve Flickr photo");
			return;
		}
		for (var i = 0; i < rsp.photos.photo.length; i++) {
			var photo = rsp.photos.photo[i];
			// http://farm{id}.static.flickr.com/{server-id}/{id}_{secret}_[mstb].jpg
			var flickr = document.getElementById('flickr');
			console.log(flickr);
			$('#light').prepend('<img src="http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + 't.jpg" height="auto" width="50%"/>');
		}
	}