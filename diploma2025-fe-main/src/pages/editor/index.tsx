import { Box } from "@mui/material";
import VacancyEditor from "@pages/vacancies/ui/VacancyEditor/VacancyEditor";
import VacancyViewer from "@pages/vacancies/ui/VacancyViewer.tsx/VacancyViewer";
import { JobVacancy } from "src/types/job";
import { useState } from "react";
import EmployeesList from "@pages/vacancies/ui/EmployeesList/EmployeesList";

const mockVacancy: JobVacancy = {
  id: "1",
  title: "Senior UX Designer",
  company: {
    name: "Альфа-Банк",
    logo: "https://cdn.prod.website-files.com/6290ea3f9b8f16e3ab1e2eb3/64a59be8352ed0f40019e8a0_logo-alfabank.svg",
  },
  type: "FULL-TIME",
  salary: {
    min: 100000,
    max: 120000,
    currency: "USD",
  },
  location: {
    city: "Dhaka",
    country: "Bangladesh",
  },
  description: `Velstar is a Shopify Plus agency, and we partner with brands to help them grow, we also do the same with our people!

Here at Velstar, we don't just make websites, we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and creators work together to push brands to the next level. From Platform Migration, User Experience & User Interface Design, to Digital Marketing, we have a proven track record in delivering outstanding eCommerce solutions and driving sales for our clients.`,
  requirements: `- Great troubleshooting and analytical skills
- Ability to tackle technical challenges head-on
- Experience with modern web technologies
- Strong communication skills`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function Page() {
  const [vacancy, setVacancy] = useState<JobVacancy>(mockVacancy);
  const [isEditing, setIsEditing] = useState(false);

  console.log(isEditing);

  const handleSave = (
    newVacancy: Omit<JobVacancy, "id" | "createdAt" | "updatedAt">
  ) => {
    setVacancy({
      ...newVacancy,
      id: vacancy.id,
      createdAt: vacancy.createdAt,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };
  return (
    <Box sx={{ width: "100%", p: 0 }}>
      {true ? (
        <>
          <VacancyEditor initialVacancy={vacancy} onSave={handleSave} />
        </>
      ) : (
        <>
          <VacancyViewer vacancy={vacancy} />
          <EmployeesList />
        </>
      )}
    </Box>
  );
}
