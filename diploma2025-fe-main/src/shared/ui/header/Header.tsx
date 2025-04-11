"use client";

import { Box, Link, Typography } from "@mui/material";
import Logo from "@assets/icons/logo.svg";

export default function AppHeader() {
  return (
    <Box
      sx={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Link
        href="/"
        sx={{
          flexShrink: 0,
          display: { xs: "none", md: "flex", gap: 10, alignItems: "center" },
          textDecoration: "none",
          color: "black",
        }}
      >
        <img alt="logo" src={Logo} style={{ width: "44px", height: "44px" }} />
        <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
          JobConnect
        </Typography>
      </Link>
    </Box>
  );
}
