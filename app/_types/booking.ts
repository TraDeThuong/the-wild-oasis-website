export type Booking = {
  id: number;
  created_at: string; // timestamptz

  startDate: string | null; // timestamp
  endDate: string | null;   // timestamp

  numNights: number | null;
  numGuests: number | null;

  cabinPrice: number | null;  // float4
  extrasPrice: number | null; // float4
  totalPrice: number | null;  // float4

  status: string | null;

  hasBreakFast: boolean | null;
  isPaid: boolean | null;

  observations: string | null;

  cabinID: number | null; // foreign key
  guestID: number | null; // foreign key
};

export type BookingWithCabin = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestID: number;
  cabinID: number;
  cabins: {
    name: string;
    image: string;
  };
};