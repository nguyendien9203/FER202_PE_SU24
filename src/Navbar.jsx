import React, { useContext } from "react";
import { DataContext } from "./DataContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { movies, setSelectedGenre } = useContext(DataContext);

  let genreSet = new Set();

  for (let movie of movies) {
    for (let genre of movie.genres) {
      genreSet.add(genre);
    }
  }

  const uniqueGenres = Array.from(genreSet);

  return (
    <div className="text-center border-top border-bottom border-success p-2">
      {uniqueGenres.map((genre, index) => (
        <Link
          to={`/movie/?genre=${genre.toUpperCase()}`}
          onClick={() => setSelectedGenre(genre)}
          key={index}
          className="p-2"
        >
          {genre.toUpperCase()}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
