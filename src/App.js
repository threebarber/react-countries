import React, { useState, useEffect } from "react";
import axios from "axios";

const UserInput = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input onChange={props.onChange} type="text" />
    </div>
  );
};

const App = () => {
  /*setting states*/
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setNewSearch(event.target.value);
  };

  useEffect(() => {
    console.log("Starting effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <UserInput label="Search" onChange={handleSearchChange} />
      <ul>
        {countries.map((country) => (
          <li>{country.name.common}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;