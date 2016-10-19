
//TP08
/*	Mejorar el modulo IMDB
Crear un formulario que tenga los campos titulo, descripcion y uno donde poder ingresar un link a la imagen. YA
Este formulario tendra que tener un boton ("agregar"), el cual Debera permitir al modulo IMDB agregar una pelicula. YA
Este formulario Debera tener tambien un boton ("mostrar todos"), el cual Debera permitir al modulo IMDB mostrar todas las peliculas
Incluir otros botones para poder ordenar por AZ ZA e ID y mostrarlos. YA
En caso de encontrarse peliculas persistidas tendran que volver a renderizarse. 
*/


function Pelicula (id, titulo, descripcion, imagen) {

	this.id = id;
	this.titulo = titulo;
	this.descripcion = descripcion;
	this.imagen = imagen;

}

var IMDB = (function (){

	//Atributos privados

	var peliculas = [] //Hacer privado del módulo
	var claveLocalStorage = 'peliculas';

	

	//Metodos

	//Funcion para precargar peliculas por local storage
    
    var precargarPelicula = function () {
        
        var datos = localStorage.getItem(claveLocalStorage);

        if (datos !== null && datos !== '') {

            pelicula = JSON.parse(datos);
            
            for (i = 0; i < peliculas.length; i++) {
                
                dibujarPelicula(peliculas[i]);
                
            }

        }

    }


	// Funcion para persistir peliculas en el local storage

	var guardarPelicula = function(){

		var datos = JSON.stringify(peliculas);
		localStorage.setItem(claveLocalStorage, datos);
	}



	/*
		Agrega el texto al elemento utilizando un nodoTexto
		Retorna el elemento con el nodoTexto agregado
	 */
    var agregarTexto = function (elemento, texto) {

        var nodo = document.createTextNode(texto);
        elemento.appendChild(nodo);

        return elemento;

    }


	//Funcion para ordenar peliculas por ID

	
	var compararId = function (peliculaA,peliculaB) {

		var resultado;

		if(peliculaA.id < peliculaB.id){

			resultado = -1;

		}

		if(peliculaB.id === peliculaB.id){

			resultado = 0;
			
		}

		if(peliculaA.id > peliculaB.id){

			resultado = 1;
			
		}

		return resultado;

	}


	var ordenarId = function() {

		peliculas.sort(compararId);

	}


	//Funcion para ordenar peliculas de AZ

	
	var compararAz = function (peliculaA,peliculaB) {

		var resultado;

		if(peliculaA.titulo < peliculaB.titulo){

			resultado = 1;

		}

		if(peliculaB.titulo === peliculaB.titulo){

			resultado = 0;
			
		}

		if(peliculaA.titulo > peliculaB.titulo){

			resultado = -1;
			
		}

		return resultado;

	}


	var ordenarAz = function() {

		peliculas.sort(compararAz);

	}


	//Funcion para ordenar peliculas de ZA

	
	var compararZA = function (peliculaA,peliculaB) {

		var resultado;

		if(peliculaA.titulo < peliculaB.titulo){

			resultado = -1;

		}

		if(peliculaB.titulo === peliculaB.titulo){

			resultado = 0;
			
		}

		if(peliculaA.titulo > peliculaB.titulo){

			resultado = 1;
			
		}

		return resultado;

	}


	var ordenarZa = function() {

		peliculas.sort(compararZa);

	}


	//Dibujar peliculas en el DOM

	var dibujarPelicula = function(pelicula){

		var div = document.getElementById("peliculas");

		var li = document.createElement('li');
		var h2 = document.createElement('h2');
		var p = document.createElement('p');
		var img = document.createElement('img');

		
		li.setAttribute('id', pelicula.id);
		li.setAttribute('class', 'list-group-item');


		h2 = agregarTexto(h2, pelicula.titulo);
		p = agregarTexto(p, pelicula.descripcion);


		// img.setAttribute('src', pelicula.imagen);


		li.appendChild(h2);
		li.appendChild(p);
		li.appendChild(img);
		
		div.appendChild(li);

	}

	
	//Borrar peliculas del DOM

	var borrarPeliculaDOM = function (pelicula) {

		var div = document.getElementById("peliculas");
		var li = document.getElementById(pelicula.titulo);

		div.removeChild(li);

	}




	//Funcion para agregar la pelicula

	var agregarPelicula = function (pelicula){


			peliculas.push(pelicula);

			guardarPelicula();

			dibujarPelicula(pelicula);

	}



	//Funcion para eliminar una pelicula por ID


	var eliminarPelicula = function (pelicula){
		

			peliculas.splice(pos, 1);

			guardarPelicula();

			dibujarPelicula(pelicula);


	}

	//

	var limpiarDOM = function () {

        peliculas = []
        localStorage.removeItem(claveLocalStorage);
        
        var peliculasDOM = document.getElementById("peliculas");
        
        while (peliculasDOM.firstChild) {
            peliculasDOM.removeChild(peliculasDOM.firstChild);
        }
        
    }

    var generarNuevoId = function (){

    	var id = 0;

		if (peliculas.length !== 0) {
			
			var copiaPeliculas = peliculas;

			copiaPeliculas.sort(ordenarId);

			id = copiaPeliculas[0].id + 1;

		}

		return id;
    }


    var vincularFormulario = function (){

    	var boton = document.getElementById('boton')

    	boton.onclick = crearPelicula;
    }

    var crearPelicula = function (){

    	var id = generarNuevoId();
    	var titulo = document.getElementById('titulo').value;
    	var descripcion = document.getElementById('descripcion').value;
    	var imagen = document.getElementById('imagen').value;

    	var pelicula = new Pelicula (id, titulo, descripcion, imagen);

    	agregarPelicula(pelicula);
    }


    var vincularOrdenamientos = function () {

    	var id = document.getElementById('id');
    	var az = document.getElementById('az');
    	var za = document.getElementById('za');

    	id.onclick = ordenarId;
    	az.onclick = ordenarAz;
    	za.onclick = ordenarZa;
    }



    var iniciar = function () {
    	
    	precargarPelicula();
    	vincularFormulario();
    	vincularOrdenamientos();
    	
    }
    


	return {

		iniciar:iniciar,

	};

})()

window.onload = IMDB.iniciar;