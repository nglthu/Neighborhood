	function jsonFlickrApi(rsp) {
			window.rsp = rsp;
		}
	function detailInfo(item) {
		//Read in the title of each photo
		//Get the url for the image.
		//'https://farm{farm_id}.staticflickr.com/{server_id}/{photo_id}_{secret}_{size}.jpg';
		var imageString=[];
		$.each(item.photos.photo, function (i, item){
		var photoURL = 'https://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
		var htmlImageString = '<img src="' + photoURL + '"alt=" " class="image"/>';
		/*var imgLink = '<a href="https://www.flickr.com/photos/culkin/' + item.id + '/in/dateposted-public/" target="_blank">View on <img src="css/flickr.jpg" class="flickr"/></a>'*/
			imageString.push(htmlImageString);
		});
		//console.log("imageString:");
		//console.log(imageString);
		return '<div>' + imageString + '<br></div>';
	}
	//loading the images using the Flickr API.
	function loadPhotos() {
		//Connects to the Flickr API and reads the results of the query into a JSON array. 
		var flickrCall = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=fc2bbb66b8ec6a5bc5a2c8fac8970a8d&user_id=9071746%40N06&privacy_filter=1&has_geo=1&extras=geo,tags,machine_tags&format=json&jsoncallback=?';
		
		$.getJSON(flickrCall, displayImages).fail(function () {
			alert('fail to load photo');
			console.log('fail to load photo');
		});
	}

	function searchFlickrImage(markerLat, markerLong) {
	
	
	var searchPhotoURL='https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=fc2bbb66b8ec6a5bc5a2c8fac8970a8d&lat='+markerLat+'&lon='+markerLong+'&radius=0.05&per_page=5&format=json&nojsoncallback=1';
		
	$.getJSON(searchPhotoURL, function(data){
		mydata=data;
	}).fail(function () {
			alert('fail to load photo');
			console.log('fail to load photo');
		});;
}

	
	// This function is exposed to the app. It uses the Flickr API to search
	// for photos that match the latitude and longitude arguments. Once it
	// finds matching photos, it uses the Flickr API to obtain more info about
	// the photos, such as their "photo page URL." As soon as all the data
	// has been retrieved, the callback function is invoked.
	function getPhotos (lat, lng) {
		//console.log(searchPhotoURL);
		var data= searchFlickrImage(lat, lng);
		//console.log("data in getPhotos:");
		 var obj = JSON.parse(data.responseText);
		//console.log(obj.features[0].indicator);
		
		/*$.each(data.photos.photo, function (i, item){
			if((item.latitude=lat)&&(item.longtitude==lng)){
				return item;
			    console.log('item:');
				console.log(item)
		
		$.getJSON(item, displayImages).fail(function () {
			alert('fail to load photo');
			console.log('fail to load photo');
		});
			}
		});*/
	};
	