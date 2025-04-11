import { memo, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  Box,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { JobVacancy } from "src/types/job";
import JobCard from "../JobCard/JobCard";

const SAMPLE_JOBS: JobVacancy[] = [
  {
    id: "1",
    title: "Product Manager",
    company: {
      name: "BTS Digital",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyUbVUwm-LinGrkDRLK57SEv-2Qpd8Au4MEQ&s",
    },
    location: {
      city: "Dhaka",
      country: "Bangladesh",
    },
    salary: {
      min: 20000,
      max: 25000,
      currency: "USD",
    },
    type: "FULL-TIME",
    isBookmarked: false,
    description: "",
    requirements: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    title: "Chief Product Officer",
    company: {
      name: "Kaspi.kz",
      logo: "https://upload.wikimedia.org/wikipedia/ru/a/aa/Logo_of_Kaspi_bank.png",
    },
    location: {
      city: "Dhaka",
      country: "Bangladesh",
    },
    salary: {
      min: 20000,
      max: 25000,
      currency: "USD",
    },
    type: "FULL-TIME",
    isBookmarked: false,
    description: "",
    requirements: "",
    createdAt: "",
    updatedAt: "",
  },
];

function JobBoard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs] = useState<JobVacancy[]>(SAMPLE_JOBS);

  return (
    <Container sx={{ p: 0 }}>
      <Typography variant="h1" component="h1" gutterBottom>
        Вакансии
      </Typography>

      <Card
        sx={{
          borderRadius: 4,
          width: "100%",
          mb: 4,
          display: "flex",
          gap: 2,
        }}
      >
        <CardContent sx={{ display: "flex", gap: 2, width: "100%" }}>
          <TextField
            fullWidth
            placeholder="Поиск по названию профессии, поиск по названию компании"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                "& .MuiInputBase-input": {
                  color: "#6A7186",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#6A7186",
                },
                opacity: 1,
              },
            }}
            sx={{
              bgcolor: "#F6F7F9",
              width: "100%",
              borderColor: "#E8E9EE",
            }}
          />
          <Button
            variant="contained"
            sx={{
              px: 4,
              color: "white",
              bgcolor: "grey.900",
              fontSize: 14,
              fontWeight: "500",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "grey.800",
              },
            }}
          >
            Поиск
          </Button>
        </CardContent>
      </Card>
      <Box>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </Box>
    </Container>
  );
}

export default memo(JobBoard);
