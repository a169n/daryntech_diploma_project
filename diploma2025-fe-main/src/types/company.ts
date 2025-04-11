export interface Company {
  id: string;
  name: string;
  value: string;
  logo_urls?: {
    "90"?: string;
    "240"?: string;
    original?: string;
  };
  logo?: string;
}
