"use client"

import ReservationCard from "./ReservationCard";
import type { Booking } from "../_types/booking";
import { useOptimistic } from "react";
import { deleteReservation } from "../_lib/actions";

type ReservationListProps = {
    bookings: Booking[] 
}

export default function ReservationList({bookings}:ReservationListProps) {
  const [optimisticBookings, optimisticDelete] = useOptimistic 
    < Booking[], Booking >
      ( bookings, (curBookings, bookingId) => {
        return curBookings.filter((booking) => booking.id != bookingId);
      });

  async function handleDelete (bookingId: string) {
    optimisticDelete (bookingId)
    await deleteReservation(bookingId)
  }

  return (
    <ul className="space-y-6">
          {optimisticBookings.map((booking) => (
            <ReservationCard 
              booking={booking} 
              key={booking.id} 
              onDelete = {handleDelete}/>
          ))}
    </ul>
  )
}
