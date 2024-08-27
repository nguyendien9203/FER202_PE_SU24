import React, { useContext } from "react";
import { DataContext } from "./DataContext";
import { Link } from "react-router-dom";

const Producers = () => {
  const { producers, setSelectedProducer } = useContext(DataContext);

  return (
    <>
      <h5>Producers</h5>
      <ul>
        {producers.map((pro) => (
          <Link
            key={pro.id}
            to={`/movie/?producer-id=${pro.id}`}
            onClick={() => setSelectedProducer(pro.id)}
          >
            <li>{pro.name}</li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Producers;
