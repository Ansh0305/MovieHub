import { useState, useEffect } from "react";
import { useDebounce } from 'react-use'
import {updateSearchCount, } from './appwrite'
import './App.css'; 

import Search from "./components/Search";
import Loader from "./components/Loader"
import MovieCard from "./components/MovieCard";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [mostWatchedMovies, setMostWatchedMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm])
  const fetchMovies = async (query = '') => {

    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "No movies found.");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

    } catch (error) {

      console.error(`Error fetching movies: ${error} `);
      setErrorMessage("Error fetching movies. Please try again later.");
      setMovieList([]);

    } finally {
      setIsLoading(false);
    }
  };

  const loadMostWatchedMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/trending/movie/day`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch trending movies.");
      }

      const data = await response.json();
      setMostWatchedMovies(data.results.slice(0, 10) || [])

    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadMostWatchedMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {mostWatchedMovies.length > 0 && (
          <section className="most-watched">
            <h2>Most Watched Movies</h2>
              <ul>
                {[...mostWatchedMovies, ...mostWatchedMovies].map((movie, index) => (
                  <li key={`${movie.id}-${index}`}>
                    <p>{(index % mostWatchedMovies.length) + 1}</p>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </li>
                ))}
              </ul>
            
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;