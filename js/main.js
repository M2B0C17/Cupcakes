// Crearemos la funcion para arrastrar
function drag(ev){
  console.log(ev.target.src); // verificamos en consola lo que va ocurriendo
  // indicamos el tipo de dato que vamos a insertar
  ev.dataTransfer.setData('text', ev.target.id); // generamos la acción con setData
}

// inicializamos Drop
function finalDrop(ev){
  // evitamos que el navegador manipule nuestros datos
  ev.preventDefault(); // es importante que siempre usemos el evento ev.preventDefault();, para controlar que el navegador no manipule nuestros datos.
}

// creamos una variable para obtener el elemento con getData.
function drop(ev){
  ev.preventDefault();
  // tomamos el dato que hemos arrastrado
  var id_foto = ev.dataTransfer.getData('text');
  // agregamos el elemento arrastrado al elemento en el que se produjo el evento ondrop.
  ev.target.appendChild(document.getElementById(id_foto)); // hacemos que se haga parte del contenedor padre con appendChild.

}


/* MAPA */

/*Función initMap, con ella inicializamos nuestro mapa, mostrándolo en el div con id map
	*ZOOM representa el nivel de profundidad de nuestro mapa, entre más zoom más localizado se verá.
	*CENTER contiene la longitud y altitud en que queremos que se muestre nuestro mapa.
*/

function initMap(){

    /*RUTA*/
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: -9.1191427, lng: -77.0349046},
  });
  directionsDisplay.setMap(map);


	/*Dentro de la función initMap(), agregamos la funcion buscar()
		*.getCurrentPosition -> permite al usuario obtener su ubicación actual, el parámetro funcionExito,
		se ejecuta solo cuando el usuario comparte su ubicación, mientras que funcionError se ejecuta
		cuando se produce un error en la geolocalización.
	*/
	function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}
	document.getElementById("encuentrame").addEventListener("click", buscar);
	var latitud,longitud;

	/*Agregaremos las variables funcionExito, con el que obtendremos nuestra latitud
	o longituf y además crearemos un marcador de nuestra ubicación*/

	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

	var miUbicacion = new google.maps.Marker({
		position: {lat: latitud, lng:longitud},
		animation: google.maps.Animation.BOUNCE, // para que salte el monito
		map: map,
    icon: 'img/moto.png', // icnono
	});

	/*Aumentaremos la profundidad de visualización de nuestro mapa con map.setZoom y le asignaremos
	un nuevo centro con map.setCenter.
	También añadimos funcionError con un mensaje para el usuario, en caso de que nuestra geolocalización
	falle.
	*/

		map.setZoom(17);
		map.setCenter({lat: latitud,lng: longitud});
	}

	var funcionError = function (error){
		alert("Tenemos un problema con encontrar tu ubicación");
	}

  /* Autocomplete */
  var inicio = (document.getElementById('origen'));
  var autocomplete = new google.maps.places.Autocomplete(inicio);
  autocomplete.bindTo('bounds', map);

  var final = (document.getElementById('destino'));
  var autocomplete = new google.maps.places.Autocomplete(final);
  autocomplete.bindTo('bounds', map);


  document.getElementById('ruta').addEventListener('click', function(){
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });


  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
    origin: document.getElementById('origen').value,
    destination: document.getElementById('destino').value,
    travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
  }

}
