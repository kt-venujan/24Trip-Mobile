import React, { createContext, useContext, useRef, useState } from "react";
import {
  initialBookings,
  initialProfile,
  initialRequests,
  initialTrips,
  initialVehicles,
} from "@/data/mockData";
import { Booking, FareRequest, PassengerRequest, Profile, Trip, Vehicle } from "@/types/models";
import { createBooking } from "@/services/mockService";

function useDemoState() {
  const [trips, setTrips] = useState(initialTrips);
  const [bookings, setBookings] = useState(initialBookings);
  const bookingRef = useRef(bookings);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [requests, setRequests] = useState<FareRequest[]>(initialRequests);
  const [signedIn, setSignedIn] = useState(false);
  const [driverJoined, setDriverJoined] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [offers, setOffers] = useState(false);
  const [passengerRequests, setPassengerRequests] = useState<PassengerRequest[]>([{ id: 'passenger-1', tripId: 'driver-1', passenger: 'Dinesh Jayawardena', seats: [3, 4], bags: 2, status: 'Pending' }]);
  function respondToPassenger(id: string, status: 'Confirmed' | 'Declined') {
    const request = passengerRequests.find(r => r.id === id && r.status === 'Pending');
    if (!request) return;
    setPassengerRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    if (status === 'Confirmed') setTrips(prev => prev.map(t => t.id === request.tripId ? { ...t, occupied: [...new Set([...t.occupied, ...request.seats])] } : t));
  }
  function book(tripId: string, seats: number[]) {
    const trip = trips.find((t) => t.id === tripId);
    if (!trip) throw new Error("This trip is no longer available.");
    const booking = createBooking(trip, bookingRef.current, seats);
    bookingRef.current = [booking, ...bookingRef.current];
    setBookings(bookingRef.current);
    return booking;
  }
  function cancel(id: string) {
    bookingRef.current = bookingRef.current.map((b) =>
      b.id === id ? { ...b, status: "Cancelled" as Booking["status"] } : b,
    );
    setBookings(bookingRef.current);
  }
  function saveTrip(trip: Trip) {
    setTrips((prev) =>
      prev.some((t) => t.id === trip.id)
        ? prev.map((t) => (t.id === trip.id ? trip : t))
        : [trip, ...prev],
    );
  }
  return {
    passengerRequests,
    respondToPassenger,
    trips,
    bookings,
    profile,
    setProfile,
    vehicles,
    setVehicles,
    requests,
    setRequests,
    signedIn,
    setSignedIn,
    driverJoined,
    setDriverJoined,
    notifications,
    setNotifications,
    offers,
    setOffers,
    book,
    cancel,
    saveTrip,
  };
}
const DemoContext = createContext<ReturnType<typeof useDemoState> | null>(null);
export function DemoProvider({ children }: React.PropsWithChildren) {
  return (
    <DemoContext.Provider value={useDemoState()}>
      {children}
    </DemoContext.Provider>
  );
}
export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("DemoProvider is missing");
  return value;
}

