export interface Person {
  id: string;
  name: string;
  title: string;
  company: {
    name: string;
    logo?: string;
  };
  avatar: string;
}
