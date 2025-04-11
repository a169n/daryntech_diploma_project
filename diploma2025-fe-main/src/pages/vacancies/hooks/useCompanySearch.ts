import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Company } from "src/types/company";

const fetchEmployers = async (
  searchText: string,
  page: number = 0,
  perPage: number = 100
) => {
  const response = await axios.get("https://api.hh.kz/employers", {
    params: {
      per_page: perPage,
      page,
      text: searchText,
    },
  });
  return response.data;
};

export function useCompanySearch() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["employers", debouncedValue, page],
    queryFn: () => fetchEmployers(debouncedValue, page),
    enabled: !!debouncedValue,
  });

  const companies: Company[] = debouncedValue ? data?.items || [] : [];
  const error = isError ? "Failed to fetch companies" : null;

  return {
    companies,
    loading: isLoading,
    error,
    inputValue,
    setInputValue,
    page,
    setPage,
  };
}
