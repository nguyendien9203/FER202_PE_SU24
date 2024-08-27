import React, { useContext } from "react";
import { DataContext } from "./DataContext";
import { Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "./Search";

const Movies = () => {
  const {
    movies,
    setMovies,
    producers,
    directors,
    stars,
    selectedGenre,
    setSelectedGenre,
    selectedProducer,
    setSelectedProducer,
    selectedDirector,
    setSelectedDirector,
    filterProducers,
    setFilterProducers,
    searchTerm,
    sort,
    setSort,
  } = useContext(DataContext);

  const getProducer = (producerId) =>
    producers.find((pro) => pro.id === producerId)?.name;

  const getDirector = (directorId) => {
    const director = directors.find((dir) => dir.id === directorId);
    return director?.fullname;
  };

  const getGenres = (genresOfMovie) =>
    genresOfMovie.map((genre) => <div key={genre}>{genre}</div>);

  const getStarName = (starId) =>
    stars.find((star) => star.id === starId)?.fullname;

  const getStars = (starIdsOfMovie, movieId) =>
    starIdsOfMovie.map((starId, index) => (
      <div key={index}>
        {index + 1} - {getStarName(starId)} -{" "}
        <Link to="" onClick={() => handleDelete(movieId, starId)}>
          Remove
        </Link>
      </div>
    ));

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${Number(day)}/${Number(month)}/${year}`;
  };

  const handleSort = () => {
    setSort(sort === "asc" ? "desc" : "asc");
  };

  const filteredMovie = movies
    .filter((movie) => {
      const matchedGenre = selectedGenre
        ? movie.genres.includes(selectedGenre)
        : true;
      const matchedProducer = selectedProducer
        ? movie.producer === selectedProducer
        : true;
      const matchedDirector = selectedDirector
        ? movie.director === selectedDirector
        : true;
      const filteredProducers =
        filterProducers.length === 0 ||
        filterProducers.includes(movie.producer.toString());
      const matchedSearch = movie.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return (
        matchedGenre &&
        matchedProducer &&
        matchedDirector &&
        filteredProducers &&
        matchedSearch
      );
    })
    .sort((a, b) => {
      if (sort === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  const handleShowAllMovies = () => {
    setSelectedGenre(null);
    setSelectedProducer(null);
    setSelectedDirector(null);
    setFilterProducers([]);
  };

  const handleDelete = async (movieId, starId) => {
    const confirmDelete = window.confirm(
      "Do you want to remove the star from this movie?"
    );
    if (confirmDelete) {
      try {
        const updateMovie = movies.find((mov) => mov.id === movieId);
        const updateStar = updateMovie.stars.filter((id) => id !== starId);

        await axios.patch(`http://localhost:9999/movies/${movieId}`, {
          stars: updateStar,
        });
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === movieId ? { ...movie, stars: updateStar } : movie
          )
        );

        window.location.reload();
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  return (
    <>
      <h5 className="text-center">List of Movies</h5>
      <div className="my-2">
        <Link to="/movie" onClick={handleShowAllMovies}>
          Show all movies
        </Link>
        <Form.Select value={sort} onChange={handleSort}>
          <option value="asc">Sort title by ascending</option>
          <option value="desc">Sort title by descending</option>
        </Form.Select>
      </div>

      <div className="my-2">
        <Search />
      </div>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Release</th>
            <th>Description</th>
            <th>Producer</th>
            <th>Director</th>
            <th>Genres</th>
            <th style={{ width: "250px" }}>Stars</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovie.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{formatDate(movie.release)}</td>
              <td>{movie.description}</td>
              <td>{getProducer(movie.producer)}</td>
              <td>{getDirector(movie.director)}</td>
              <td>{getGenres(movie.genres)}</td>
              <td className="d-flex flex-column">
                <div>{getStars(movie.stars, movie.id)}</div>
                <div className="d-flex justify-content-end mt-2">
                  <Link to={`/movie/${movie.id}/add-stars`}>Add stars</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Movies;
