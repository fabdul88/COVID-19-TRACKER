import React, { useState, useEffect } from "react";
import "./App.css";
import { Card, CardContent } from "@material-ui/core";
import Dropdown from "./Components/Dropdown/Dropdown";
import InfoBox from "./Components/InfoBox/InfoBox";
import Map from "./Components/Map/Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  // Fetching all cases worldwide on initial load
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  // Fetching Countries for dropdown
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

  // Handling change linked to dropdown, to display the right info in infoBoxs based on field selected
  const onCountryChange = async (event) => {
    // set dropdown to country selected
    const countryCode = event.target.value;
    setCountry(countryCode);

    // conditionally rendering the fetch method infoBoxs, based on the dropdown field selected
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // update input dropdown
        setCountry(countryCode);
        // storing the whole countryInfo
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <Dropdown
            countries={countries}
            country={country}
            onCountryChange={onCountryChange}
          />
        </div>

        <div className="app__stats">
          {/* infoBoxs */}
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />

          {/* infoBoxs */}
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />

          {/* infoBoxs */}
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
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
