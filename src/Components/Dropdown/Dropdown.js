import React from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";

const Dropdown = ({ country, countries, onCountryChange }) => {
  return (
    //  {/* Select input dropdown field */}
    <FormControl className="app__dropdown">
      <Select variant="outlined" value={country} onChange={onCountryChange}>
        <MenuItem value="worldwide">Worldwide</MenuItem>
        {countries.map((country) => (
          <MenuItem value={country.value}>{country.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
