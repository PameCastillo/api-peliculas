import { obtenerPeliculasPopulares, buscarPeliculasPorTitulo } from './api/peliculas';
import './style.css'

const peliculas = await obtenerPeliculasPopulares()
console.log(peliculas)

const buscarPelicula = await buscarPeliculasPorTitulo("Terminator")
console.log(buscarPelicula)

// Llamando elementos del HTML
const resultados = document.querySelector("#resultados")
const mensaje = document.querySelector("#mensaje")
const inputBuscar = document.querySelector("#inputBuscar")
const btnBuscar = document.querySelector("#btnBuscar")
const btnPopulares = document.querySelector("#btnPopulares")

// Metodo solo para capturar la informacion de cada pelicula
function mostrarPeliculas(peliculas) {
    resultados.innerHTML = "";

    peliculas.map((pelicula) => {
        const anio = pelicula.release_date ? pelicula.release_date.slice(0, 4) : "Sin fecha";
        const sinopsis = pelicula.overview || "Sin sinopsis disponible.";

        const poster = pelicula.poster_path
            ? `https://image.tmdb.org/t/p/w300${pelicula.poster_path}`
            : "https://placehold.co/300x450?text=Sin+imagen";

        resultados.innerHTML += `
      <div class="tarjeta">
        <img src="${poster}" alt="${pelicula.title}" />
        <h3>${pelicula.title}</h3>
        <p class="anio">${anio}</p>
        <p class="sinopsis">${sinopsis}</p>
      </div>
    `;
    });
}


// Metodo para cargar las Peliculas Populares
async function cargarPopulares() {
    mensaje.textContent = "Cargando...";
    try {
        // Llamamos el metodo de la API
        const data = await obtenerPeliculasPopulares();
        mensaje.textContent = "";
        // Obtenemos los datos
        mostrarPeliculas(data.results);
    } catch (error) {
        resultados.innerHTML = "";
        mensaje.textContent = "Error de conexión. Intenta de nuevo más tarde.";
    }
}



// Buscar una película
async function buscar() {
    const texto = inputBuscar.value.trim();

    if (texto === "") {
        mensaje.textContent = "Escribe el nombre de una película.";
        return;
    }

    mensaje.textContent = "Cargando...";
    try {
        const data = await buscarPeliculasPorTitulo(texto);

        if (data.results.length === 0) {
            resultados.innerHTML = "";
            mensaje.textContent = "Película no encontrada";
            return;
        }

        mensaje.textContent = "";
        mostrarPeliculas(data.results);
    } catch (error) {
        resultados.innerHTML = "";
        mensaje.textContent = "Error de conexión. Intenta de nuevo más tarde.";
    }
}

// llamando el metodo de cargar peliculas
cargarPopulares()

// llamando botones
btnBuscar.addEventListener("click", buscar)
btnPopulares.addEventListener("click", cargarPopulares)
