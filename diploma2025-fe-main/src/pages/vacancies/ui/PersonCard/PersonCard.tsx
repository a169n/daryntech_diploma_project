import {
  Avatar,
  Box,
  Button,
  Typography,
  useMediaQuery,
  Theme,
} from "@mui/material";

interface Person {
  avatar: string;
  name: string;
  title: string;
  company: {
    logo?: string | null | undefined;
    name: string;
  };
}

interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        gap: 2,
        p: "12px",
        borderRadius: 4,
        backgroundColor: "#F2F2F780",
        width: "100%",
      }}
    >
      <Avatar src={person.avatar} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight="medium">
          {person.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {person.title}
          </Typography>
          <Box
            sx={{
              width: 4,
              height: 4,
              bgcolor: "text.secondary",
              borderRadius: "50%",
            }}
          />
          {person.company?.logo ? (
            <Box
              component="img"
              src={person.company?.logo}
              sx={{
                width: 16,
                height: 16,
                objectFit: "contain",
              }}
              alt=""
            />
          ) : (
            <Avatar
              sx={{
                width: 16,
                height: 16,
                bgcolor: "grey.400",
              }}
            />
          )}
          <Typography variant="body2" color="text.secondary">
            {person.company.name}
          </Typography>
        </Box>
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
          alignSelf: isMobile ? "stretch" : "center",
        }}
      >
        Send CV
      </Button>
    </Box>
  );
}
