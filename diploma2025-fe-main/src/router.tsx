import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import Auth from "@pages/auth/ui/Auth";
import JobBoard from "@pages/vacancies/ui/JobBoard/JobBoard";
import CompanySearch from "@pages/vacancies/ui/CompanySearch/CompanySearch";
import EmployeesList from "@pages/vacancies/ui/EmployeesList/EmployeesList";
import Page from "@pages/editor";
import ProtectedRoute from "@shared/utils/ProtectedRoute";
import DefaultLayout from "./layouts/DefaultLayout";

const routes = [
  {
    path: "",
    element: <HomePage />,
    protected: true,
  },
  {
    path: "vacancies",
    element: <JobBoard />,
    protected: true,
  },
  {
    path: "companies",
    element: <CompanySearch />,
    protected: true,
  },
  {
    path: "employees-list",
    element: <EmployeesList />,
    protected: true,
  },
  {
    path: "vacancy",
    element: <Page />,
    protected: true,
  },
];

const authRoutes = [
  {
    path: "auth",
    element: <Auth />,
    protected: false,
    children: [
      {
        path: "verify-email",
        element: <Auth />,
        protected: false,
      },
    ],
  },
];

export const router = createBrowserRouter([
  {
    path: import.meta.env.VITE_REACT_APP_BASE_ROUTE || "/",
    element: <DefaultLayout />,
    children: routes.map(({ path, element }) => ({
      path,
      element: true ? <ProtectedRoute>{element}</ProtectedRoute> : element,
    })),
  },
  ...authRoutes.map(({ path, element, children }) => ({
    path,
    element,
    children: children?.map(({ path, element }) => ({
      path,
      element,
    })),
  })),
]);
