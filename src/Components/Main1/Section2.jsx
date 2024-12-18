import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites, saveList } from "../../redux/favoriteSlice";
import Section2Css from "./Section2.module.css";
// import { NavLink, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import Main2Section1 from "../Main2/Main2Section1";

const Section2 = () => {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector((state) => state.favoriteMovies.favoriteMovies);
  const [listName, setListName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [listId, setListId] = useState(null);  // Track the generated list ID

  const isSaveDisabled = favoriteMovies.length === 0 || listName.trim() === "";

  const handleSaveList = () => {
    if (!isSaveDisabled) {
      const newListId = Date.now().toString();  // Generate a unique ID for the list
      setListId(newListId);
      setIsSaved(true);
      const newList = {
        listName,
        movies: favoriteMovies,
        id: newListId,
      };
      dispatch(saveList(newList));
    }
  };

  return (
    <div>
      <div className={Section2Css.container}>
        <input
          type="text"
          placeholder="Enter a list name..."
          className={Section2Css.input}
          value={listName}
          onChange={(e) => {
            setListName(e.target.value);
            setIsSaved(false);
          }}
          disabled={isSaved}
        />
        <div className={Section2Css.names}>
          <h3 className={Section2Css.h3}>Favorite Movies:</h3>
          <div>
            {favoriteMovies.map((movie) => (
              <div key={movie.imdbID} className={Section2Css.listItem}>
                {movie.Title}
                {!isSaved && (
                  <button
                    className={Section2Css.removeButton}
                    onClick={() => dispatch(removeFromFavorites(movie.imdbID))}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          className={Section2Css.button}
          onClick={handleSaveList}
          disabled={isSaveDisabled}
        >
          Save List
        </button>
        <div
          className={Section2Css.links}
          style={{ display: isSaved ? "flex" : "none" }}
        >
          <NavLink to="/" className={Section2Css.navLink}>Home</NavLink>
          <NavLink to={`/GoToFavoriteList/${listId}`} className={Section2Css.navLink}>
            Go To Favorite List
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Section2;
