import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { DataContext } from "./DataContext";

const Search = () => {
  const { searchTerm, setSearchTerm } = useContext(DataContext);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <Form.Group>
        <Form.Control 
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e)}
            placeholder="Search by title"
        />
    </Form.Group>
  );
};

export default Search;
