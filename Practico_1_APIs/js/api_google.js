(function(){
	$(document).ready(function(){
	
		var mapa, marca;
		
		google.maps.event.addDomListener(window, 'load', function(){
			var mapaProps = {
			  center:new google.maps.LatLng(-31.3987552,-64.1868587),
			  zoom:14,
			  mapTypeId:google.maps.MapTypeId.ROADMAP
			};
			mapa = new google.maps.Map($("#contenedorMapa").get(0), mapaProps);
		});
		
		$("#btnBuscarUbicacion").click(function(){
		console.log("s");
			var geocoder = new google.maps.Geocoder();
			var ubicacionTexto = $("#txtUbicacion").val().trim();
			if(ubicacionTexto.length > 0){
				geocoder.geocode({'address': ubicacionTexto}, function(results, status) {
					console.log(status);
					if (status == google.maps.GeocoderStatus.OK) {
						console.log(results);
						marcar(new google.maps.LatLng(results[0].geometry.location.k, results[0].geometry.location.D));
					} else {
						console.log("Problemas al tratar de buscar la direcci�n...");
					}
				});
			}
		});
		
		function marcar(ubicacion){
			if(marca === undefined){
				marca = new google.maps.Marker({
					position: ubicacion,
					map: mapa
				});
			}else{
				marca.setPosition(ubicacion);
			}
			mapa.setCenter(ubicacion);
		}
	});
})();