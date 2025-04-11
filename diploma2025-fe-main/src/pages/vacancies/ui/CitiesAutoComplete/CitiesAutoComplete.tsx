import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import citiesData from "../../../../../cities.json";

type City = {
  name: string;
  country: string;
  subcountry: string;
  geonameid: number;
};

export default function CityAutocomplete() {
  const [inputValue, setInputValue] = useState("");

  const kazakhstanCities = citiesData
    .filter((city) => city.country === "Kazakhstan")
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Autocomplete
      options={
        inputValue ? (citiesData as City[]) : (kazakhstanCities as City[])
      }
      getOptionLabel={(option) =>
        `${option.name}, ${option.subcountry}, ${option.country}`
      }
      filterOptions={(options, { inputValue }) =>
        options
          .filter((option) =>
            `${option.name}, ${option.subcountry}, ${option.country}`
              .toLowerCase()
              .includes(inputValue.toLowerCase())
          )
          .slice(0, 10)
      }
      inputValue={inputValue}
      onInputChange={(_, value) => setInputValue(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select a city"
          variant="outlined"
          autoComplete="false"
        />
      )}
    />
  );
}
