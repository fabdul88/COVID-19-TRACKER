import React, { useState, useEffect } from "react";
import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    // Fetching using async await method, calling API https://disease.sh/v3/covid-19/countries
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        // getting json object
        .then((response) => response.json())
        // breaking down json object
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>

          {/* Title + select input dropdown field */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          {/* infoBoxs */}
          <InfoBox title="Coronavirus Cases" cases="+ 2000" total="1.2M" />

          {/* infoBoxs */}
          <InfoBox title="Recovered" cases="+ 1000" total="1.2M" />

          {/* infoBoxs */}
          <InfoBox title="Deaths" cases="+ 200" total="1.2M" />
        </div>

        {/* Map */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <h3>Worldwide New Cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
