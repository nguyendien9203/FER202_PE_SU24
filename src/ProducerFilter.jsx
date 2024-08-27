import React, { useContext } from "react";
import { DataContext } from "./DataContext";
import { Form } from "react-bootstrap";

const ProducerFilter = () => {
  const { producers, filterProducers, setFilterProducers } =
    useContext(DataContext);

  const handleChange = (producerId) => {
    setFilterProducers((prevProducer) => {
      if (prevProducer.includes(producerId)) {
        return prevProducer.filter((id) => id !== producerId);
      } else {
        return [...prevProducer, producerId];
      }
    });
  };

  return (
    <>
      <h5>Producer Filter</h5>
      {producers.map((producer) => (
        <Form.Check
          key={producer.id}
          type="checkbox"
          label={`${producer.id} - ${producer.name}`}
          value={producer.id}
          checked={filterProducers.includes(producer.id.toString())}
          onChange={(e) => handleChange(e.target.value)}
        />
      ))}
    </>
  );
};

export default ProducerFilter;
