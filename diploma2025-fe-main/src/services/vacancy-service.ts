import { Company } from "src/types/company";

// Mock data
const companies: Company[] = [
  {
    id: "1",
    name: "BTS Digital",
    value: "bts-digital",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t6aeFYWwTRI4h0ZRZKNlZCj4PJ9hA0.png",
  },
  {
    id: "2",
    name: "Kaspi.kz",
    value: "kaspi",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t6aeFYWwTRI4h0ZRZKNlZCj4PJ9hA0.png",
  },
  {
    id: "3",
    name: "Google",
    value: "google",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t6aeFYWwTRI4h0ZRZKNlZCj4PJ9hA0.png",
  },
  {
    id: "4",
    name: "Microsoft",
    value: "microsoft",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t6aeFYWwTRI4h0ZRZKNlZCj4PJ9hA0.png",
  },
  {
    id: "5",
    name: "Apple",
    value: "apple",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t6aeFYWwTRI4h0ZRZKNlZCj4PJ9hA0.png",
  },
  {
    id: "6",
    name: "Amazon",
    value: "amazon",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t6aeFYWwTRI4h0ZRZKNlZCj4PJ9hA0.png",
  },
  {
    id: "7",
    name: "Facebook",
    value: "facebook",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t6aeFYWwTRI4h0ZRZKNlZCj4PJ9hA0.png",
  },
  {
    id: "8",
    name: "Netflix",
    value: "netflix",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t6aeFYWwTRI4h0ZRZKNlZCj4PJ9hA0.png",
  },
  {
    id: "9",
    name: "Tesla",
    value: "tesla",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t6aeFYWwTRI4h0ZRZKNlZCj4PJ9hA0.png",
  },
  {
    id: "10",
    name: "Twitter",
    value: "twitter",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t6aeFYWwTRI4h0ZRZKNlZCj4PJ9hA0.png",
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const companyService = {
  // Get initial companies
  getInitialCompanies: async (): Promise<Company[]> => {
    await delay(1000); // Simulate network delay
    return companies.slice(0, 10);
  },

  // Search companies
  searchCompanies: async (query: string): Promise<Company[]> => {
    await delay(500); // Simulate network delay
    return companies.filter((company) =>
      company.name.toLowerCase().includes(query.toLowerCase())
    );
  },
};
