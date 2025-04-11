import { memo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import { BookmarkBorder, Bookmark, LocationOn } from "@mui/icons-material";
import type { JobVacancy } from "src/types/job";
import { Link } from "react-router-dom";

interface JobCardProps {
  job: JobVacancy;
}

function JobCard({ job }: JobCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked);

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 4,
        "&:hover": {
          boxShadow: 3,
          transition: "box-shadow 0.2s",
        },
      }}
    >
      <Link
        to={`/jobs/${job.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardContent sx={{ position: "relative" }}>
          {/* Bookmark Icon */}
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsBookmarked(!isBookmarked);
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "primary.main",
              p: 0.5,
              cursor: "default",
            }}
          >
            {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>

          {/* Job Title */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              mb: 1,
              pr: 4, // Space for bookmark icon
            }}
          >
            {job.title}
          </Typography>

          {/* Job Type and Salary */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Chip
              label={job.type}
              size="small"
              sx={{
                bgcolor: "#e6f7ed",
                color: "#006644",
                fontWeight: "medium",
                height: "24px",
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Salary: ${job.salary.min.toLocaleString()} - $
              {job.salary.max.toLocaleString()}
            </Typography>
          </Box>

          {/* Company Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component="img"
              src={job.company.logo}
              alt={`${job.company.name} logo`}
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1,
                objectFit: "cover",
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                fontSize={16}
                color="black"
                fontWeight="500"
              >
                {job.company.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <LocationOn sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  {job.location.city}, {job.location.country}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
}

export default memo(JobCard);
