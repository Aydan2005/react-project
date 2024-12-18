import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../../redux/favoriteSlice";
import Section1Css from "./Section1.module.css";

export default function Section1() {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("harry");
  const dispatch = useDispatch();
  
  const disabledButtons = useSelector(
    (state) => state.favoriteMovies.disabledButtons
  );
  const isSaved = useSelector((state) => state.favoriteMovies.isSaved);

  useEffect(() => {
    fetchForMovie("home alone");
  }, []);

  const fetchForMovie = (query) => {
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=3f19a676`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.Search || []);
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  const search = (e) => {
    setMovieName(e.target.value);
  };

  const searchbutton = () => {
    if (movieName.trim().length > 0) {
      fetchForMovie(movieName);
    } else {
      alert("Search input is empty!");
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={search}
        placeholder="Enter a movie name..."
        className={Section1Css.input}
      />
      <button onClick={searchbutton} className={Section1Css.button1}>
        SEARCH
      </button>
      <br />
      <br />
      <div className={Section1Css.movies}>
        {movies.map((movie) => (
          <div className={Section1Css.movie} key={movie.imdbID}>
            <div>
              <img
                src={movie.Poster}
                alt={movie.Title}
                className={Section1Css.img}
              />
            </div>
            <div>
              <h1>Name: {movie.Title}</h1>
              <h2>Year: {movie.Year}</h2>
              <button
                className={Section1Css.button2}
                disabled={disabledButtons[movie.imdbID] || isSaved}
                onClick={() => dispatch(addToFavorites(movie))}
              >
                {disabledButtons[movie.imdbID] === true
                  ? "Added"
                  : "Add to favorite list"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
