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


    const bookedDatesISO = bookedDates.map((d) => d.toISOString());

  return (
    <div className = "border border-primary-800 min-h-100">
          <DateSelectorClient 
            settings = {settings}
            bookedDates = {bookedDatesISO}
            cabin = {cabin}/>
          {session?.user ? <ReservationForm cabin = {cabin} user = {session.user}/> : <LoginMessage/>}
    </div>
  )
}
