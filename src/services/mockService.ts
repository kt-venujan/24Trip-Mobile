import { Booking, SearchFilters, Trip } from "@/types/models";

export function occupiedSeats(trip: Trip, bookings: Booking[]) {
  return [
    ...new Set([
      ...trip.occupied,
      ...bookings
        .filter((b) => b.tripId === trip.id && b.status === "Upcoming")
        .flatMap((b) => b.seats),
    ]),
  ];
}
export function searchTrips(
  trips: Trip[],
  bookings: Booking[],
  filters: SearchFilters,
) {
  return trips
    .filter(
      (t) =>
        t.status === "Published" &&
        !t.owned &&
        t.from.toLowerCase().includes(filters.from.trim().toLowerCase()) &&
        t.to.toLowerCase().includes(filters.to.trim().toLowerCase()) &&
        (!filters.date || t.date === filters.date) &&
        (filters.kind === "All rides" || t.kind === filters.kind) &&
        t.seats - occupiedSeats(t, bookings).length >= filters.passengers,
    )
    .sort((a, b) =>
      filters.sort === "Lowest fare"
        ? a.price - b.price
        : `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`),
    );
}
export function createBooking(
  trip: Trip,
  bookings: Booking[],
  seats: number[],
): Booking {
  const occupied = occupiedSeats(trip, bookings);
  if (
    trip.status !== "Published" ||
    !seats.length ||
    new Set(seats).size !== seats.length ||
    seats.some(
      (s) =>
        !Number.isInteger(s) || s < 1 || s > trip.seats || occupied.includes(s),
    )
  )
    throw new Error("Some seats are unavailable. Please choose again.");
  return {
    id: `24T-${Date.now()}`,
    tripId: trip.id,
    seats,
    total: trip.price * seats.length,
    status: "Upcoming",
  };
}
