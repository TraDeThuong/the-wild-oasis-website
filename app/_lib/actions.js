"use server"

import { revalidatePath } from "next/cache"
import {auth, signIn, signOut} from "./auth"
import { supabase } from "./supabase"
import { redirect } from "next/navigation"

export async function updateGuest (formData) {

    //Auth checkd
    const session = await auth()
    if (!session) throw new Error ("You must be logged in")

    const nationalID = formData.get ("nationalID")
    if (!nationalID) throw new Error("National ID is required");

    const nationalityRaw = formData.get("nationality");
    if (!nationalityRaw) throw new Error("Nationality is required");

    const [nationality, countryFlag] = nationalityRaw.split("%");

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) 
        throw new Error ("Please provide a valid national ID") 

    const updateData = {nationalID, nationality, countryFlag}

      const { data, error } = await supabase
        .from('Guests')
        .update(updateData)
        .eq('id', session.user.guestID)
        .select()
        .single();

      if (error) {
        throw new Error('Guest could not be updated');
      }

        revalidatePath ("/account/profile")

      return data;
    
}

export async function createBooking (bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestID: session?.user?.guestID,
    numGuests: Number(formData.get ('numGuests')),
    observations: formData.get ("observations").slice(0, 1000),
    extrasPrice:0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakFast: false, 
    status: "unconfirmed"
  }

  console.log (newBooking)

  const { error } = await supabase
    .from("Bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath (`/cabins/${bookingData.cabinID}`)
  redirect("/cabins/thankyou")

}

// DELETE BOOKING
export async function deleteReservation(bookingId) {

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

//   const guestBookings = await getBookings (session.user.guestID)
//   const guestBookingsIds = guestBookings.map((booking) => booking.id)

//   if (!guestBookingsIds.includes(bookingId) )
//     throw new Error ("You must be logged in to delete this reservation")

//   const bookingId = formData.get("bookingId");

  const { error } = await supabase
    .from("Bookings")
    .delete()
    .eq("id", bookingId)
    .eq("guestID", session.user.guestID);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function signInAction () {
    await signIn ("google", {redirectTo : "/account"})
}

export async function signOutAction () {
    await signOut ({redirectTo: "/"})
}

export async function updateBooking (formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const id = Number(formData.get("bookingId"));
  if (!id) throw new Error("Missing bookingId");

  const numGuests = formData.get ("numGuests")
  if (!numGuests) throw new Error ("numGuests is required")

  const observations = formData.get ("observations").slice (0, 1000)
  
  const updateData = {numGuests, observations}

    const { data, error } = await supabase
    .from('Bookings')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  revalidatePath (`/account/reservation/edit/${id}`)
  redirect("/account/reservations");

}

