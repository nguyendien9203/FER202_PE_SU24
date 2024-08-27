import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [producers, setProducers] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [stars, setStars] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedProducer, setSelectedProducer] = useState(null);
  const [selectedDirector, setSelectedDirector] = useState(null);
  const [filterProducers, setFilterProducers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState('asc');


  useEffect(() => {
    const fetchData = async () => {
      const moviesRes = await axios.get("http://localhost:9999/movies");
      setMovies(moviesRes.data);
      const producersRes = await axios.get("http://localhost:9999/producers");
      setProducers(producersRes.data);
      setFilterProducers(producersRes.data.map(producer => producer.id.toString()));
      const directorsRes = await axios.get("http://localhost:9999/directors");
      setDirectors(directorsRes.data);
      const starsRes = await axios.get("http://localhost:9999/stars");
      setStars(starsRes.data);
    };

    fetchData();
  }, []);

  // console.log('movies', movies);
  // console.log('producers', producers);
  // console.log('directors', directors);
  // console.log('stars', stars);
  // console.log(selectedGenre);
  // console.log(selectedProducer);
  // console.log(filterProducers);

  return (
    <DataContext.Provider
      value={{
        movies,
        producers,
        directors,
        stars,
        selectedGenre,
        selectedProducer,
        selectedDirector,
        filterProducers,
        searchTerm,
        sort,
        setMovies,
        setProducers,
        setDirectors,
        setStars,
        setSelectedGenre,
        setSelectedProducer,
        setSelectedDirector,
        setFilterProducers,
        setSearchTerm,
        setSort
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
