$('#hide').on('click', function (event) {
	$('.options-box').toggle('hide');
	$('#mapPart').removeClass("map-div").addClass("map2");
});
$('#show').on('click', function (event) {
	$('.options-box').toggle('show');
	$('#mapPart').removeClass("map2").addClass("map-div");
});
var model = {
	locations: [{
				title: 'Auckland Town Hall',
				location: {lat: -36.8529, lng: 174.7633},
				detail: 'It is a historic building on Queen Street<br> in downtown Auckland, New Zealand, <br>known both for its original and ongoing <br>use for administrative functions, <br>as well as for its famed Great Hall and <br>its separate Concert Chamber.'
			}, 
			{
				title: 'AUT', 
				location: {lat: -36.8532, lng: 174.7673}, 
				detail: 'The University for The Changing World'
			}, 
			{
				title: 'Auckland War Memorial Museum', 
				location: {lat: -36.8604, lng: 174.7778}, 
				detail: 'The Auckland War Memorial Museum <br>is one of New Zealand&#39; most important museums and war memorials. <br>Its collections concentrate on New Zealand history, <br> natural history, as well as military history.'
			}, 
			{
				title: 'Britomart Transport Centre', 
				location: {lat: -36.8441, lng: 174.7674}, 
				detail: 'Britomart Transport Centre is the public transport hub in the central business district of Auckland, New Zealand, and the northern terminus of the North Island Main Trunk railway line'
			}, 
			{
				title: 'The Auckland Harbour Bridge', 
				location: {lat: -36.8309, lng: 174.7455}, 
				detail: 'The Auckland Harbour Bridge is an eight-lane box truss motorway bridge over the Waitemata Harbour, joining St Marys Bay in Auckland with Northcote in the former North Shore City, New Zealand.'
			}, 
			{
				title: 'Auckland Zoo', 
				location: {lat: -36.8641, lng: 174.7197}, 
				detail: '16.35-hectare zoological garden in Auckland'
			}, 
			{
				title: 'Eden Park', 
				location: {	lat: -36.8750, lng: 174.7448}, 
				detail: 'Eden Park is New Zealand &#39;s largest stadium.<br> Located in central Auckland, NZ &#39; s largest city,<br> it is three kilometres southwest of the CBD, <br>on the boundary between the suburbs <br>of Mount Eden and Kingsland'
				},

			{
				title: 'Silo Park',
				location: {lat: -36.8403, lng: 174.7554}, 
				detail: 'A Community of Good Times'
			}]
};