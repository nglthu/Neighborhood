var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: -36.85293
			, lng: 174.7611372
		}
		, zoom: 13
		, mapTypeControl: false
	});
	var markers = [];
	var bounds = new google.maps.LatLngBounds();
	var largeInfowindow = new google.maps.InfoWindow();
	//Marker with its information
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
		//Marker bouncing when active
	function markerBouncing(marker) {
		google.maps.event.addListener(marker, 'mouseover', function () {
			this.setAnimation(google.maps.Animation.BOUNCE);
		});
		google.maps.event.addListener(marker, 'mouseout', function () {
			this.setAnimation(null);
		});
	}
	for (i = 0; i < viewModel.locations.length; i++) {
		var position = viewModel.locations[i].location;
		var title = viewModel.locations[i].title;
		var detail = viewModel.locations[i].detail;
		var marker = addMarker(position, title, map, detail);
		markers.push(marker);
		bounds.extend(marker.position);
		marker.addListener('mouseover', function () {
			populateInfoWindow(this, largeInfowindow);
		});
		markerBouncing(marker);
	}
	for (i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
		bounds.extend(markers[i].position);
	}
	//Pop up window info
	function populateInfoWindow(marker, infowindow) {
		// Check to make sure the infowindow is not already opened on this marker.
		if (infowindow.marker != marker) {
			// Clear the infowindow content to give the streetview time to load.
			infowindow.setContent('');
			infowindow.marker = marker;
			// Make sure the marker property is cleared if the infowindow is closed.
			infowindow.addListener('closeclick', function () {
				infowindow.marker = null;
			});
			var streetViewService = new google.maps.StreetViewService();
			var radius = 50;
			// panorama from that and set the options
			function getStreetView(data, status) {
				if (status == google.maps.StreetViewStatus.OK) {
					var nearStreetViewLocation = data.location.latLng;
					var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
					infowindow.setContent('<div><strong>' + marker.title + '</strong></div><div>' + marker.detail + '<div id="pano"></div></div>');
					var panoramaOptions = {
						position: nearStreetViewLocation
						, pov: {
							heading: heading
							, pitch: 30
						}
					};
					var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
				}
				else {
					infowindow.setContent('<div>' + marker.title + '</div>' + '<div>No Street View Found</div>');
				}
			}
			streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
			// Open the infowindow on the correct marker.
			infowindow.open(map, marker);
		}
	}
	//when mapping with text search result
	viewModel.textSearchPlaces = function () {
		console.log("query:" + viewModel.Query());
		var selectedChoice = viewModel.Query();
		display(selectedChoice);
	}
	viewModel.textSearchPlacesLink = function (data) {
		console.log(data);
		var selectedChoice = data.title;
		display(selectedChoice);
	}
	//Display maker and info window with selected choice
	function display(selectedChoice) {
		hideMarkers(markers);
		var marker2 = new google.maps.Marker();
		marker2.setMap(null);
		var largeInfowindow = new google.maps.InfoWindow();
		var bounds = new google.maps.LatLngBounds()
		for (var i = 0; i < viewModel.locations.length; i++) {
			if (viewModel.locations[i].title.toLowerCase() == selectedChoice.toLowerCase()) {
				var position = viewModel.locations[i].location;
				var title = viewModel.locations[i].title;
				var detail = viewModel.locations[i].detail;
				console.log("Positon:" + position);
				console.log("title" + title);
				//createMarkersForPlaces(locations()[i]);
				marker2 = addMarker(position, title, map, detail);
				bounds.extend(marker2.position);
				markers.push(marker2);
				map.setCenter(bounds.getCenter());
				map.fitBounds(bounds);
				var listener = google.maps.event.addListener(map, "idle", function () {
					if (map.getZoom() > 15) map.setZoom(16);
					google.maps.event.removeListener(listener);
				});
				markerBouncing(marker2);
				marker2.setMap(map);
				populateInfoWindow(marker2, largeInfowindow);
			}
		}
	}
	//Create marker for places
	function createMarkersForPlaces(places) {
		var bounds = new google.maps.LatLngBounds();
		// Create a marker for each place.
		var marker = new google.maps.Marker({
			map: map
			, title: places.title
			, position: places.location
		});
		
		map.fitBounds(bounds);
	}
	//Hide all marker
	function hideMarkers(markers) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
	}
}