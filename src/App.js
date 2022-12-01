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

const CountryDisplay = (props) => {
  return <li>{props.countryName}</li>;
};

const CountryInfo = (props) => {
  return (
    <div>
      <p>{"Capital: " + props.capital}</p>
      <p>{"Area: " + props.area}</p>
      <img src={props.image} />
    </div>
  )
};

const App = () => {
  /*setting states*/
  const [countries, setCountries] = useState([]);
  const [filteredCountries,setFilteredCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setNewSearch(event.target.value);
    setFilteredCountries(
      countries.filter((country) =>
          country.name.common.toLowerCase().includes(newSearch.toLowerCase())
        )
    )
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
        {filteredCountries.length <= 10 ? (
          filteredCountries.map((filteredCountry) => (
              <CountryDisplay countryName={filteredCountry.name.common} />
            ))
        ) : (
          <p>Too many results (10+)</p>
        )}
      </ul>

      {filteredCountries.length == 1 &&
    <CountryInfo capital={filteredCountries[0].capital} area={filteredCountries[0].area} image={filteredCountries[0].flags.png} languages={filteredCountries[0].languages} />
      }

    </div>
  );
};

export default App;
