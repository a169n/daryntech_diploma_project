import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useCompanySearch } from "@pages/vacancies/hooks/useCompanySearch";
import { Company } from "src/types/company";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { memo } from "react";

function CompanySearch() {
  const { companies, loading, error, inputValue, setInputValue } =
    useCompanySearch();

  return (
    <Box
      sx={{
        p: 0,
      }}
    >
      <Autocomplete
        id="company-search"
        options={companies}
        loading={loading}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        getOptionLabel={(option: Company) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        includeInputInList
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Companies"
            error={!!error}
            helperText={error}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box
            component="li"
            {...props}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
            }}
          >
            {option?.logo_urls?.original ? (
              <Box
                component="img"
                src={option?.logo_urls?.original}
                alt={`${option.name} logo`}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  objectFit: "contain",
                }}
              />
            ) : (
              <ApartmentIcon />
            )}
            <Box>
              <Typography variant="body1">{option.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {option.value}
              </Typography>
            </Box>
          </Box>
        )}
      />
    </Box>
  );
}

export default memo(CompanySearch);
