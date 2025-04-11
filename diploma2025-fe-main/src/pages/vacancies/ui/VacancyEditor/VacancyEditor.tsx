import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { memo, useState } from "react";
import type React from "react";
import { JobVacancy } from "src/types/job";
import CompanySearch from "../CompanySearch/CompanySearch";
import MDXEditor from "../MDXEditor/MDXEditor";
import CityAutocomplete from "../CitiesAutoComplete/CitiesAutoComplete";

interface VacancyEditorProps {
  initialVacancy?: Partial<JobVacancy>;
  onSave: (vacancy: Omit<JobVacancy, "id" | "createdAt" | "updatedAt">) => void;
}

function VacancyEditor({ initialVacancy, onSave }: VacancyEditorProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [markdown, setMarkdown] = useState("");
  const [markdown2, setMarkdown2] = useState("");
  const [formData, setFormData] = useState({
    title: initialVacancy?.title || "",
    companyName: initialVacancy?.company?.name || "",
    companyLogo: initialVacancy?.company?.logo || "",
    salaryMin: initialVacancy?.salary?.min || "",
    salaryMax: initialVacancy?.salary?.max || "",
    salaryCurrency: initialVacancy?.salary?.currency || "USD",
    locationCity: initialVacancy?.location?.city || "",
    locationCountry: initialVacancy?.location?.country || "",
    description: initialVacancy?.description || "",
    requirements: initialVacancy?.requirements || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: formData.title,
      company: {
        name: formData.companyName,
        logo: formData.companyLogo,
      },
      salary: {
        min: Number(formData.salaryMin),
        max: Number(formData.salaryMax),
        currency: formData.salaryCurrency,
      },
      location: {
        city: formData.locationCity,
        country: formData.locationCountry,
      },
      description: formData.description,
      requirements: formData.requirements,
      type: initialVacancy?.type || "FULL-TIME",
    });
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: isMobile ? 2 : 4, m: 0, width: "100%", borderRadius: 4 }}
    >
      <Typography variant="h5" gutterBottom>
        Vacancy Editing
      </Typography>

      <Grid container spacing={3} padding={0}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Job Title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <CompanySearch />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Minimum Salary"
            type="number"
            value={formData.salaryMin}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, salaryMin: e.target.value }))
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Maximum Salary"
            type="number"
            value={formData.salaryMax}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, salaryMax: e.target.value }))
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <CityAutocomplete />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Job Description (Markdown)
          </Typography>
          <MDXEditor markdown={markdown} setMarkdown={setMarkdown} />
        </Grid>

        <Grid item xs={12} sx={{ width: "100%" }}>
          <Typography variant="subtitle1" gutterBottom>
            Requirements (Markdown)
          </Typography>
          <MDXEditor markdown={markdown2} setMarkdown={setMarkdown2} />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#27272E",
                "&:hover": { bgcolor: "grey.800" },
                textTransform: "none",
                px: 4,
                color: "white",
                borderRadius: 2,
                width: isMobile ? "100%" : "auto",
              }}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default memo(VacancyEditor);
