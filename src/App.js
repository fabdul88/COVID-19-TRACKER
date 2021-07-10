import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Paper,
  Typography,
  Switch,
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { sortData, prettyPrintStat } from "./util";
import Dropdown from "./Components/Dropdown/Dropdown";
import InfoBox from "./Components/InfoBox/InfoBox";
import Map from "./Components/Map/Map";
import Table from "./Components/Table/Table";
import LineGraph from "./Components/LineGraph/LineGraph";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  const storedDarkMode = localStorage.getItem("DARK_MODE");

  const [darkMode, setDarkMode] = useState(storedDarkMode);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([23.65221, -39.781947]);
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  // Light and Dark mode theme
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });
  console.log(theme);

  // Persisting Dark and Light mode
  useEffect(() => {
    localStorage.setItem("DARK_MODE", darkMode);
  }, [darkMode]);

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
          // sorting data in the table using utils.js
          const sortedData = sortData(data);
          setMapCountries(data);
          setTableData(sortedData);
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

        countryCode === "worldwide"
          ? setMapCenter([23.65221, -39.781947])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(3);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper className="app">
        <div className="app__left">
          {/* Header */}
          <div className="app__header">
            <Typography className="app__name">COVID-19 TRACKER</Typography>
            <Switch
              checked={darkMode ? true : false}
              onChange={() => setDarkMode(!darkMode)}
            />
            <Dropdown
              countries={countries}
              country={country}
              onCountryChange={onCountryChange}
            />
          </div>

          <div className="app__stats">
            {/* infoBoxs */}
            <InfoBox
              isRed
              active={casesType === "cases"}
              onClick={(e) => setCasesType("cases")}
              title="Coronavirus Cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintStat(countryInfo.cases)}
            />

            {/* infoBoxs */}
            <InfoBox
              active={casesType === "recovered"}
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintStat(countryInfo.recovered)}
            />

            {/* infoBoxs */}
            <InfoBox
              isGrey
              active={casesType === "deaths"}
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={prettyPrintStat(countryInfo.deaths)}
            />
          </div>

          {/* Map */}
          <Map
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
            countries={mapCountries}
            darkMode={darkMode}
          />
        </div>

        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            {/* Table */}
            <Table countries={tableData} />
            <h3>Worldwide New Cases {casesType}</h3>
            {/* Graph */}
            <LineGraph className="app__graph" casesType={casesType} />
          </CardContent>
        </Card>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
