import { supabase } from "./supabase";
import type { Booking } from "../_types/booking";
import type { Cabin } from "../_types/cabin";


export type BookingSummary = Pick<Booking,
  "id" | "created_at" | "startDate" | "endDate" |
  "numNights" | "numGuests" | "totalPrice" | "guestID" | "cabinID"
> & {
  cabins: Pick<Cabin, "name" | "image"> | null; 
};

export async function getBookings(guestId: number): Promise<BookingSummary[]> {
  const { data, error } = await supabase
    .from("Bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestID, cabinID, cabins:Cabins(name, image)",
    )
    .eq("guestID", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw error;
  }

  return data as unknown as BookingSummary[];
}