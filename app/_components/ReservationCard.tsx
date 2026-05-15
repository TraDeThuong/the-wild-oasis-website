import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import DeleteReservation from './DeleteReservation';
import type { Booking } from '../_types/booking';
import type { Cabin } from '../_types/cabin'; 
import Image from "next/image";
import EditReservation from './EditReservation';




export type BookingWithCabin = Booking & {
  cabins: Pick<Cabin, "name" | "image">;
};

type ReservationCardProps = {
  booking: BookingWithCabin;
  onDelete: (id: Booking["id"]) => void;
};


export const formatDistanceFromNow = (dateStr: string) => {
  if (!dateStr) return "";
  return formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");
};

function ReservationCard({ booking, onDelete } : ReservationCardProps) {
  const {
    id,
    guestID,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins,
  } = booking;

  const { name, image } = cabins || {};
  

  return (
    <div className='flex border border-primary-800'>
      <div className='relative h-32 aspect-square'>
        <Image
          src={image || "/placeholder-cabin.jpg"}
          alt={`Cabin ${name}`}
          fill
          className='object-cover border-r border-primary-800'
        />
      </div>

      <div className='grow px-6 py-3 flex flex-col'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-semibold'>
            {numNights} nights in Cabin {name || "Unknown"}
          </h3>
          {isPast(new Date(startDate!)) ? (
            <span className='bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
              past
            </span>
          ) : (
            <span className='bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
              upcoming
            </span>
          )}
        </div>

        <p className='text-lg text-primary-300'>
          {format(new Date(startDate!), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate!))
            ? 'Today'
            : formatDistanceFromNow(startDate!)}
          ) &mdash; {format(new Date(endDate!), 'EEE, MMM dd yyyy')}
        </p>

        <div className='flex gap-5 mt-auto items-baseline'>
          <p className='text-xl font-semibold text-accent-400'>${totalPrice}</p>
          <p className='text-primary-300'>&bull;</p>
          <p className='text-lg text-primary-300'>
            {numGuests} guest{numGuests! > 1 && 's'}
          </p>
          <p className='ml-auto text-sm text-primary-400'>
            Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
          </p>
        </div>
      </div>

      <div className='flex flex-col border-l border-primary-800 w-25'>

      {!isPast(new Date(startDate!)) && (
        <>
          <EditReservation id = {id}/>
          <DeleteReservation 
            bookingId={id} 
            onDelete = {onDelete} />
        </>
      )}

      </div>
    </div>
  );
}

export default ReservationCard;
