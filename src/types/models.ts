export type Trip = {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  arrival: string;
  duration: string;
  price: number;
  seats: number;
  occupied: number[];
  driver: string;
  rating: string;
  vehicle: string;
  plate: string;
  kind: "Carpool" | "AC van" | "Express bus";
  owned?: boolean;
  status: "Published" | "Completed" | "Cancelled";
  notes: string;
};
export type Booking = {
  id: string;
  tripId: string;
  seats: number[];
  total: number;
  status: "Upcoming" | "Completed" | "Cancelled";
};
export type Vehicle = {
  id: string;
  model: string;
  plate: string;
  seats: number;
  status: "Approved" | "Pending review";
  kind: Trip["kind"];
};
export type Profile = {
  name: string;
  email: string;
  phone: string;
  city: string;
};
export type FareRequest = {
  id: string;
  tripId: string;
  passenger: string;
  amount: number;
  status: "Pending" | "Accepted" | "Declined";
  own?: boolean;
};
export type SearchFilters = {
  from: string;
  to: string;
  date: string;
  passengers: number;
  kind: string;
  sort: string;
};
export type PassengerRequest = { id: string; tripId: string; passenger: string; seats: number[]; bags: number; status: 'Pending' | 'Confirmed' | 'Declined' };
