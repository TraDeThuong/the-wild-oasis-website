import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelectorClient from "./DateSelectorClient";
import ReservationForm from "./ReservationForm";
import type { Cabin } from "../_types/cabin";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

type ReservationProps = {
  cabin: Cabin;
};

export default async function Reservation({cabin} : ReservationProps) {

    const [settings, bookedDates] = await Promise.all ([
      getSettings(),
      getBookedDatesByCabinId (cabin.id)
    ])

    const session = await auth()

    const safeUser = session?.user
      ? {
        name: session.user.name ?? "Guest",
        image: session.user.image ?? "/default-user.jpg",
      }
    : null;


    const bookedDatesISO = bookedDates.map((d) => d.toISOString());

  return (
    <div className = "border border-primary-800 min-h-100">
          <DateSelectorClient 
            settings = {settings}
            bookedDates = {bookedDatesISO}
            cabin = {cabin}/>
          {safeUser ? <ReservationForm cabin = {cabin} user = {safeUser}/> : <LoginMessage/>}
    </div>
  )
}
