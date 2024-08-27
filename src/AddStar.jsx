import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "./DataContext";
import axios from "axios";

const AddStar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies, stars, setMovies } = useContext(DataContext);
  const movie = movies.find((mov) => (mov.id === parseInt(id)));
  const [selectedStars, setSelectedStars] = useState(movie ? movie.stars : []);

  const handleChange = (starId) => {
    setSelectedStars(prevState => (
        prevState.includes(starId) ? prevState.filter(id => id !== starId) : [...prevState, starId]
    ));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.patch(`http://localhost:9999/movies/${movie.id}`, { stars: selectedStars });

      if (response.status === 200) {
        setMovies((prevMovies) =>
          prevMovies.map((mov) => (mov.id === movie.id ? { ...mov, stars: selectedStars } : mov))
        );
  
        alert("Add the Stars success");
        navigate("/movie");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  console.log(selectedStars)
  return (
    <Form className="px-5" onSubmit={handleSubmit}>
      <h1 className="text-center">Add stars to the movie</h1>
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Movie title</Form.Label>
        <Form.Control type="text" value={movie.title} disabled />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Stars</Form.Label>
        <div className="d-flex">
          {stars.map((star) => (
            <Form.Check
            key={star.id}
              type="checkbox"
              label={star.fullname}
              checked={selectedStars.includes(star.id)}
              onChange={() => handleChange(star.id)}
              style={{ marginRight: "10px" }}
            />
          ))}
        </div>
      </Form.Group>

      <Button type="submit" variant="success">Add Stars</Button>
    </Form>
  );
};

export default AddStar;
