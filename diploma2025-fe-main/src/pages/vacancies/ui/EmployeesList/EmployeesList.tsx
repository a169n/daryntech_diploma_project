import { Box, Paper, Typography } from "@mui/material";
import { Person } from "src/types/person";
import { PersonCard } from "../PersonCard/PersonCard";
import { memo } from "react";

const MOCK_DATA: Person[] = [
  {
    id: "1",
    name: "Adilet Degitayev",
    title: "Chief Product Officer",
    company: {
      name: "Альфа-Банк",
      logo: "https://cdn.prod.website-files.com/6290ea3f9b8f16e3ab1e2eb3/64a59be8352ed0f40019e8a0_logo-alfabank.svg",
    },
    avatar:
      "https://imagedelivery.net/LBWXYQ-XnKSYxbZ-NuYGqQ/8fe09985-71b5-47f4-211f-d6361b917600/avatarhd",
  },
  {
    id: "2",
    name: "Yerlan Meirbek",
    title: "Product manager",
    company: {
      name: "KAZPOST JSC",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Kazpost_Logo.svg/2560px-Kazpost_Logo.svg.png",
    },
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeuu5KEbfN_1yJp_UyALG-5q3CjocrbQPOrg&s",
  },
];

function EmployeesList() {
  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, mt: 4, borderRadius: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Люди, кто может помочь податься в данную компанию
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {MOCK_DATA.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </Box>
    </Paper>
  );
}

export default memo(EmployeesList);
