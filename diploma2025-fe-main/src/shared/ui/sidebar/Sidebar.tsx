import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  Box,
  Link,
} from "@mui/material";
import { Archive, GridView, People, PieChart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const AppLeftSheet = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const links = [
    { href: "/home/map", icon: <GridView />, text: "Филиалы" },
    {
      href: "/home/people",
      icon: <People />,
      text: "Панель управления кадрами",
    },
    { href: "/home/budget", icon: <PieChart />, text: "Бюджет" },
    { href: "/home/warehouse", icon: <Archive />, text: "Склад" },
  ];

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        variant="outlined"
        sx={{ display: { md: "none" } }}
      >
        Open Menu
      </Button>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#1C1C1D",
            color: "white",
          },
        }}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <Avatar src="https://github.com/shadcn.png" alt="User Avatar" />
            <Link href="#">Morty Smith</Link>
          </Box>
          <List>
            {links.map(({ href, icon, text }) => (
              <ListItem key={href} disablePadding>
                <ListItemButton onClick={() => navigate(href)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
