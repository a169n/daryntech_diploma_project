import { useState, useEffect } from "react";
import { Box, Drawer, IconButton, Tabs, Tab } from "@mui/material";
import { Home, Subscriptions, School, Work, Menu } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const links = [
  { href: "/", icon: <Home />, label: "Главная" },
  { href: "/subscriptions", icon: <Subscriptions />, label: "Подписки" },
  { href: "/training", icon: <School />, label: "Обучение" },
  { href: "/vacancies", icon: <Work />, label: "Вакансии" },
];

export const AppSidebar = () => {
  const { pathname } = useLocation();
  const [value, setValue] = useState(pathname);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(event);
    setValue(newValue);
    navigate(newValue);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ display: { xs: "block", md: "none", color: "black" } }}
      >
        <Menu />
      </IconButton>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box
          sx={{
            height: "100%",
            width: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            pt: "48px",
            pl: 2,
            gap: 1,
          }}
        >
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            sx={{ width: "100%", display: "flex" }}
          >
            {links.map(({ href, icon, label }) => (
              <Tab
                key={href}
                value={href}
                icon={icon}
                label={label}
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "start",
                  gap: 1,
                  color: pathname === href ? "black" : "grey.800",
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Drawer>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "start",
          gap: 2,
          pt: "48px",
        }}
      >
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          sx={{ width: "100%", display: "flex" }}
        >
          {links.map(({ href, icon, label }) => (
            <Tab
              key={href}
              value={href}
              icon={icon}
              label={label}
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "start",
                gap: 1,
                color: pathname === href ? "black" : "grey.800",
              }}
            />
          ))}
        </Tabs>
      </Box>
    </>
  );
};
