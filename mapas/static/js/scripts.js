$(function () {
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(getCoords, getError);
	} else {
		initialize(13.30272, -87.194105);
	}

	function getCoords(position)
	{
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;

		initialize(lat, lng);
	}

	function getError(err)
	{
		initialize(13.30272, -87.194105);
	}

	function initialize(lat, lng)
	{
		var latlng = new google.maps.LatLng(lat, lng);
		var mapSettings = {
			center: latlng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		// Mapa
		map = new google.maps.Map($('#mapa').get(0), mapSettings);

		// Creacion de un marcador
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			draggable: true,
			title: "Arrastrame!"
		});

		google.maps.event.addListener(marker, 'position_changed', function(){
			getMarketCoords(marker);

		});
	}

	function getMarketCoords(marker)
	{
		var markerCoords = marker.getPosition();
		$('#id_lat').val(markerCoords.lat());
		$('#id_lng').val(markerCoords.lng());
	}
	
	$('#form_coords').submit(function(e){
		e.preventDefault();

		$.post('/coords/save', $(this).serialize(), function(data){
			if (data.ok)
			{
				$('#data').html(data.msg);
				//limpiar formulario
				$('#form_coords').each(function(){ this.reset(); });
			} else {
				alert(data.msg);
			}
		}, 'json');
	});

});