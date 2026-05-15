export type Cabin = {
  id: number;
  created_at?: string; // timestamptz → ISO string
  name: string | null;
  maxCapacity: number | null;
  regularPrice: number | null;
  discount: number | null;
  description?: string | null;
  image: string | null;
};