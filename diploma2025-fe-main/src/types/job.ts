export interface JobVacancy {
  id: string;
  title: string;
  company: {
    name: string;
    logo: string;
  };
  location: {
    city: string;
    country: string;
  };
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  type: "FULL-TIME" | "PART-TIME" | "CONTRACT";
  isBookmarked?: boolean;
  description: string;
  requirements: string;
  createdAt: string;
  updatedAt: string;
}
