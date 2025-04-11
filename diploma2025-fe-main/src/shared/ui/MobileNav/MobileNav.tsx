import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home, Subscriptions, School, Work } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const links = [
  { href: "/home", icon: <Home />, label: "Главная" },
  { href: "/subscriptions", icon: <Subscriptions />, label: "Подписки" },
  { href: "/training", icon: <School />, label: "Обучение" },
  { href: "/vacancies", icon: <Work />, label: "Вакансии" },
];

export const AppMobilebar = () => {
  const location = useLocation();

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 2000 }}
    >
      <BottomNavigation showLabels value={location.pathname}>
        {links.map(({ href, icon, label }) => (
          <BottomNavigationAction
            key={href}
            component={Link}
            to={href}
            value={href}
            icon={icon}
            label={label}
            sx={{
              color: location.pathname === href ? "primary.main" : "inherit",
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
