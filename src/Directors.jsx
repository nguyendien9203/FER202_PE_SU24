import React, { useContext } from "react";
import { DataContext } from "./DataContext";
import { Link } from "react-router-dom";

const Directors = () => {
  const { directors, setSelectedDirector } = useContext(DataContext);

  return (
    <>
      <h5>Directors</h5>
      <ul>
        {directors.map((dir) => (
          <Link
            key={dir.id}
            to={`/movie/?director-id=${dir.id}`}
            onClick={() => setSelectedDirector(dir.id)}
          >
            <li>{dir.fullname}</li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Directors;
