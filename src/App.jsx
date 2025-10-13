import { useState, useEffect } from "react";
import Search from "./components/Search";

const API_BASE_URL = "http://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (query) => {
    if (!query) return; // Skip fetch if searchTerm empty

    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = `${API_BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "No movies found.");
        setMovieList([]);
        return;
      }

      setMovieList(data.Search || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
      setMovieList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      fetchMovies(searchTerm);
    }
  }, [searchTerm]);

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

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <li key={movie.imdbID} className="text-white">
                  <p>{movie.Title}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;


{/* <li key={`${movie.imdbID}-${index}`}>
  <h3>{movie.Title}</h3>
  <p>{movie.Year}</p>
  {movie.Poster !== "N/A" && <img src={movie.Poster} alt={movie.Title} />}
</li> */}