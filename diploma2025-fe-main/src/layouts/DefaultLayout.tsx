import { Container, Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AppHeader from "@shared/ui/header/Header";
import { AppMobilebar } from "@shared/ui/MobileNav/MobileNav";
import { AppSidebar } from "@shared/ui/AppSidebar/AppSidebar";
import { Outlet } from "react-router-dom";
import UserAvatar from "@shared/ui/Avatar/Avatart";
import { KeyboardBackspace } from "@mui/icons-material";
import { memo } from "react";

function DefaultLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: {
          xs: "auto 1fr",
          md: "auto 1fr auto",
        },
        gridTemplateRows: "auto 1fr",
        minHeight: "100svh",
        color: "white",
        p: 2,
        overflow: "hidden",
        mx: "auto",
        "@media (max-width: 900px)": {
          rowGap: 2,
        },
      }}
    >
      <Box
        sx={{
          gridColumn: "1 / 2",
          gridRow: "1 / 2",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppHeader />
        <Box>
          <AppSidebar />
        </Box>
      </Box>
      <Box
        sx={{
          gridColumn: { xs: "1 / 3", md: "2 / 3" },
          gridRow: { xs: "2 / 3", md: "1 / 3" },
          height: "100%",
          p: 0,
        }}
      >
        <Container
          sx={{ height: "100%", width: "100%", p: 0, maxWidth: "100%" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 2,
            }}
          >
            {pathname !== "/" && (
              <Button
                type="submit"
                variant="contained"
                onClick={() => navigate(-1)}
                sx={{
                  bgcolor: "white",
                  "&:hover": { bgcolor: "grey.100" },
                  textTransform: "none",
                  px: 4,
                  color: "black",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <KeyboardBackspace />
                Back
              </Button>
            )}
            <Typography variant="h6" component="div">
              Page Title
            </Typography>
            <Box sx={{ width: "40px" }} />
          </Box>
          <Outlet />
        </Container>
      </Box>
      <Box
        sx={{
          gridColumn: { xs: "1 / 3", md: "3 / 4" },
          gridRow: "1 / 2",
          display: "flex",
          alignItems: "start",
          justifyContent: { xs: "flex-end", md: "center" },
          gap: 3,
          "@media (max-width: 900px)": {
            gap: 1,
          },
        }}
      >
        <UserAvatar imageUrl="path_to_user_image.jpg" />
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "#1C1C1D",
          zIndex: 2000,
          display: { xs: "block", md: "none" },
        }}
      >
        <AppMobilebar />
      </Box>
    </Box>
  );
}

export default memo(DefaultLayout);
