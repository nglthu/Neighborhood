var map;

function markerBouncing(marker) {
	google.maps.event.addListener(marker, 'click', function () {
		this.setAnimation(google.maps.Animation.BOUNCE);
	});
	google.maps.event.addListener(marker, 'mouseout', function () {
		this.setAnimation(null);
	});
}
function hideMarkers(marker) {
	for (var i = 0; i < marker.length; i++) {
		marker[i].setMap(null);
	}
}
var addMarker = function (position, title, map, detail) {
	return new google.maps.Marker({
		position: position, 
		title: title, 
		detail: detail, 
		map: map, 
		draggable: true, 
		current: false
			
	});
}

function googleError() {
	alert("Map loading error");
	console.log("Map loading error");
}

function stopAnimation(marker) {
	setTimeout(function () {
		marker.setAnimation(null);
	}, 3000);
}
//THE MAIN FUNCTION THAT IS CALLED WHEN THE WEB PAGE LOADS 
function initMap() {
	var markers = [];
	var infoWindows = [];
	map = new google.maps.Map(document.getElementById("map"), {
	center: { lat: -36.85293, lng: 174.7611372},
	zoom: 13,
	scaleControl: true,
	streetViewControl: false,
	mapTypeControl: true,
	mapTypeId: google.maps.MapTypeId.ROADMAP
});
	
	$.each(model.locations, function (i, location) {
	//Read in the lat and long of each photo and stores it in a variable.
	var detail = location.detail;
	var markerLat = parseFloat(location.location.lat);
	var markerLong = parseFloat(location.location.lng);
	var photoTitle = location.title;
	var searchPhotoURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=fc2bbb66b8ec6a5bc5a2c8fac8970a8d&lat=' + markerLat + '&lon=' + markerLong + '&radius=0.05&per_page=3&format=json&nojsoncallback=1';
	$.getJSON(searchPhotoURL).done(function (item) {
		detailInfo(item);
		//Create a new info window using the Google Maps API
		var infowindow = new google.maps.InfoWindow({
			//Adds the content, which includes the html to display the image from Flickr, to the info window.
			content: '<div><strong>' + photoTitle + '</strong></div> <div>' + detail + '</div> ' + detailInfo(item),
			maxWidth: 300
		});
		//Create a new marker position using the Google Maps API
		var myLatlngMarker = new google.maps.LatLng(markerLat, markerLong);
		//Create a new marker using the Google Maps API and assign the marker to the map created below.
		var marker = addMarker(myLatlngMarker, photoTitle, map, detail);
		//info window to open if the box marker is mouseover.
		markers.push(marker);
		infoWindows.push(infowindow);
		google.maps.event.addListener(marker, 'click', function () {
			infowindow.open(map, marker);
			//Makes marker icon come to the front when clicked.
			marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
		});
		markerBouncing(marker);
		google.maps.event.addListener(marker, 'mouseout', function () {
			infowindow.close();
		});
	}).fail(function () {
		alert('fail to load photo');
		console.log('fail to load photo');
	});
});
//
//After the map is generated run the function that grabs the photo rsp
model.Query = ko.observable('');
model.textSearchPlacesLink = ko.observable();
model.searchResults = ko.computed(function () {
	$.each(infoWindows, function (j, infowindow) {
		infowindow.close();
	});
	var matches = [];
	//console.log(markers);
	var query = new RegExp(model.Query(), 'i');
	console.log("query");
	console.log(query);
	$.each(model.locations, function (j, location) {
		if (location.title.search(query) !== -1) {
			matches.push(location);
		}
		else {
			markers[j].setVisible(false);
		}
	});
	$.each(markers, function (j, marker) {
		if (marker.title.toLowerCase().search(query) !== -1) {
			marker.setVisible(true);
		}
		else marker.setVisible(false);
	});
	return matches;
});
//model.textSearchPlacesLink = ko.observable();
//when enter, textSearch Places called
model.enterSearch = function (d, e) {
	e.keyCode === 13 && model.textSearchPlacesLink(model.Query());
	return true;
};
model.textSearchPlacesLink = function (data) {
	if (typeof (data) === 'string') {
		var string = model.Query().toLowerCase();
		console.log("test object called");
	}
	else {
		string = data.title.toLowerCase();
		console.log("test vao day ko" + data.title);
	}
	$.each(infoWindows, function (j, infowindow) {
		infowindow.close();
	});
	$.each(markers, function (j, marker) {
		if (marker.title.toLowerCase().search(string) !== -1) {
			//marker.setVisible(true);
			//google.maps.event.trigger(marker, 'click');
			marker.setAnimation(google.maps.Animation.BOUNCE);
			stopAnimation(marker);
			infoWindows[j].open(map, marker);
			console.log("co vao day ko");
		}
		//console.log(data);
	});
};
model.textSearchPlaces = function () {
	$.each(infoWindows, function (j, infowindow) {
		infowindow.close();
	});
	var data = model.Query();
	model.textSearchPlacesLink(data);
};
ko.applyBindings(model);
}