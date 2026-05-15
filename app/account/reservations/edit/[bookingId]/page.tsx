
import UpdateReservationForm from "@/app/_components/UpdateReservationForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";


type PageProps = {
  params: {
    bookingId: string;
  };
};

export async function generateMetadata ({params} : PageProps) {
    const { bookingId: rawBookingId } = await params; 
    const {id} = await getBooking (rawBookingId)
    return {title: `Edit reservation ${id}`}
}

export default async function Page({params} : PageProps) {

  const { bookingId: rawBookingId } = await params; 
  const {id, cabinID, numGuests, observations} = await getBooking (rawBookingId)
  const booking = getBooking(id)
  const {maxCapacity} = await getCabin(cabinID)


  console.log (params)
  
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{id}
      </h2>

      <UpdateReservationForm 
        bookingId = {id} 
        maxCapacity = {maxCapacity}
        numGuests = {numGuests}
        observations = {observations}/>
    </div>
  );
}
