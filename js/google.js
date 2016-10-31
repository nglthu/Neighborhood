	var map;
	var infowindow = [];
	var marker = [];

	function displayImages(rsp) {
		console.log(rsp);
		//Loop through the results in the JSON array. The 'rsp.photos.photo' and viewModel.locations.
		$.each(rsp.photos.photo, function (i, item) {
			$.each(viewModel.locations, function (j, location) {
				//Read in the lat and long of each photo and stores it in a variable.
				if (item.title == location.title) {
					var detail = location.detail;
					var markerLat = item.latitude;
					var markerLong = item.longitude;
					var photoTitle = item.title;
					detailInfo(item);
					//Create a new info window using the Google Maps API
					infowindow[i] = new google.maps.InfoWindow({
						//Adds the content, which includes the html to display the image from Flickr, to the info window.
						content: detailInfo(item, detail)
					});
					//Create a new marker position using the Google Maps API
					var myLatlngMarker = new google.maps.LatLng(markerLat, markerLong);
					//Create a new marker using the Google Maps API and assign the marker to the map created below.
					marker[i] = addMarker(myLatlngMarker, photoTitle, map)
						//info window to open if the box marker is mouseover.
					google.maps.event.addListener(marker[i], 'mouseover', function () {
						infowindow[i].open(map, marker[i]);
						//Makes marker icon come to the front when clicked.
						marker[i].setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
					});
					google.maps.event.addListener(marker[i], 'mouseout', function () {
						infowindow[i].close();
					});
					markerBouncing(marker[i]);
				}
			});
			
		});
	}

	function markerBouncing(marker) {
		google.maps.event.addListener(marker, 'mouseover', function () {
			this.setAnimation(google.maps.Animation.BOUNCE);
		});
		google.maps.event.addListener(marker, 'mouseout', function () {
			this.setAnimation(null);
		});
	}

	function display(selectedChoice) {
		console.log("selected choice:" + selectedChoice);
		console.log("Display called");
		hideMarkers(marker);
		var marker2 = new google.maps.Marker();
		marker2.setMap(null);
		console.log(rsp);
		$.each(rsp.photos.photo, function (i, item) {
			$.each(viewModel.locations, function (j, location) {
				if (item.title.toLowerCase() == selectedChoice.toLowerCase()) {
					if (location.title.toLowerCase() == selectedChoice.toLowerCase()) {
						var markerLat = item.latitude;
						var markerLong = item.longitude;
						var photoTitle = item.title;
						var detail = location.detail;
						console.log(detail);
						detailInfo(item);
						infowindow = new google.maps.InfoWindow({
							//Adds the content, which includes image from Flickr,  and detail from locations to the info window.
							content: detailInfo(item, detail)
						});
						//Create a new marker position using the Google Maps API
						var myLatlngMarker = new google.maps.LatLng(markerLat, markerLong);
						//Create a new marker using the Google Maps API and assign the marker to the map created below.
						marker2 = addMarker(myLatlngMarker, photoTitle, map, detail)
						markerBouncing(marker2);
						marker.push(marker2);
						//window info
						infowindow.open(map, marker2);
						//Makes marker icon come to the front when clicked.
						marker2.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
					}
				}
			});
		});
	}

	function hideMarkers(marker) {
		for (var i = 0; i < marker.length; i++) {
			marker[i].setMap(null);
		}
	}
	var addMarker = function (position, title, map, detail) {
		return new google.maps.Marker({
			position: position
			, title: title
			, detail: detail
			, map: map
			, draggable: true
			, animation: google.maps.Animation.DROP
		});
	}

	function googleError() {
		alert("Map loading error");
		console.log("Map loading error");
	}
	//THE MAIN FUNCTION THAT IS CALLED WHEN THE WEB PAGE LOADS 
	function initMap() {
		map = new google.maps.Map(document.getElementById("map"), {
			center: {
				lat: -36.85293
				, lng: 174.7611372
			}
			, zoom: 13
			, scaleControl: true
			, streetViewControl: false
			, mapTypeControl: true
			, mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		//After the map is generated run the function that grabs the photo rsp
		viewModel.textSearchPlaces = function () {
			console.log("textSearchPlaces called");
			var selectedChoice = viewModel.Query();
			display(selectedChoice);
			console.log("query:" + viewModel.Query());
		};
		viewModel.textSearchPlacesLink = function (data) {
			console.log("textSearchPlacesLink called");
			var selectedChoice = data.title;
			console.log("data link: " + selectedChoice);
			display(selectedChoice);
		};
		loadPhotos();
	}