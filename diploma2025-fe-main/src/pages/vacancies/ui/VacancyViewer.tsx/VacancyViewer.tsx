import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import ReactMarkdown from "react-markdown";
import { JobVacancy } from "src/types/job";
import { memo } from "react";

interface VacancyViewerProps {
  vacancy: JobVacancy;
}

function VacancyViewer({ vacancy }: VacancyViewerProps) {
  const formatSalary = (min: number, max: number, currency: string) => {
    console.log(currency);
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  return (
    <Paper
      sx={{
        mx: "auto",
        p: { xs: 2, sm: 4 },
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          mb: 4,
        }}
      >
        <Avatar
          src={vacancy.company.logo}
          variant="rounded"
          sx={{ width: 64, height: 64, mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        />
        <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
          <Typography variant="h4" gutterBottom>
            {vacancy.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {vacancy.company.name}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#27272E",
            "&:hover": {
              bgcolor: "grey.800",
            },
            textTransform: "none",
            px: 4,
            color: "white",
            borderRadius: 2,
            mt: { xs: 2, sm: 0 },
          }}
        >
          Apply
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr auto 1fr" },
          gap: 4,
          mb: 4,
          p: 3,
          borderColor: "#E7F0FA",
          borderWidth: 3,
          borderStyle: "solid",
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Salary (USD)
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#0BA02C",
              fontWeight: "medium",
              fontSize: "1.5rem",
              mb: 1,
            }}
          >
            {formatSalary(
              vacancy.salary.min,
              vacancy.salary.max,
              vacancy.salary.currency
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            salary
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", sm: "2px" },
            height: { xs: "2px", sm: "auto" },
            bgcolor: "#E7F0FA",
            my: { xs: 2, sm: 0 },
          }}
        />
        <Box sx={{ textAlign: "center" }}>
          <Box
            component={MapIcon}
            sx={{
              color: "#0A65CC",
              fontSize: "3rem",
              mb: 1,
            }}
          />
          <Typography variant="subtitle2" gutterBottom>
            Job Location
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {vacancy.location.city}, {vacancy.location.country}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom>
        Job Description
      </Typography>
      <Box sx={{ mb: 4 }}>
        <ReactMarkdown>{vacancy.description}</ReactMarkdown>
      </Box>

      <Typography variant="h6" gutterBottom>
        Requirements
      </Typography>
      <Box>
        <ReactMarkdown>{vacancy.requirements}</ReactMarkdown>
      </Box>
    </Paper>
  );
}

export default memo(VacancyViewer);
