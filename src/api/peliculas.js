const API_KEY = import.meta.env.VITE_API_KEY_API
const BASE_URL = import.meta.env.VITE_URL_BASE_API

export async function obtenerPeliculasPopulares() {
    const response = await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=es-MX`)

    const data = await response.json()
    return data
}

export async function buscarPeliculasPorTitulo(titulo) {
    const response = await fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${encodeURIComponent(titulo)}&language=es-MX`)
    const data = await response.json()
    return data
}