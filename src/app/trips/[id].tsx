import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  Card,
  EmptyState,
  Row,
  Screen,
  Section,
  s,
  StatusBadge,
  T,
} from "@/components/ui/kit";
import { DriverCard, RouteLine } from "@/components/trips/trip-card";
import { useDemo } from "@/hooks/use-demo";
import { occupiedSeats } from "@/services/mockService";
import { money, prettyDate } from "@/utils/format";
export default function TripDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { trips, bookings } = useDemo();
  const trip = trips.find((t) => t.id === id);
  if (!trip)
    return (
      <Screen title="Ride details" back>
        <EmptyState
          title="Ride not found"
          description="This sample ride is unavailable."
          action="Find a ride"
          onPress={() => router.replace("/search")}
        />
      </Screen>
    );
  const available = trip.seats - occupiedSeats(trip, bookings).length;
  return (
    <Screen
      title="Your journey, in detail"
      subtitle={prettyDate(trip.date)}
      back
    >
      <Card>
        <StatusBadge label={trip.kind} tone="blue" />
        <RouteLine trip={trip} />
        <T style={s.muted}>
          Pickup: {trip.from} main entrance{"\n"}Drop-off: {trip.to} town centre
        </T>
      </Card>
      <Section title="Meet your driver" />
      <DriverCard trip={trip} />
      <Section title="Travel in comfort" />
      <Card>
        <T style={s.heading}>{trip.vehicle}</T>
        <T style={s.muted}>
          {trip.plate} · {available} seats available
        </T>
        <T style={s.muted}>{trip.notes}</T>
        <StatusBadge label="Air conditioned · Luggage included" />
      </Card>
      <Section title="A clear, simple fare" />
      <Card>
        <Row style={{ justifyContent: "space-between" }}>
          <T>Fare per seat</T>
          <T style={s.heading}>{money(trip.price)}</T>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <T style={s.muted}>Booking fee (demo)</T>
          <T>Included</T>
        </Row>
        <T style={s.muted}>
          Choose your seats next to see your total. No payment will be
          collected.
        </T>
      </Card>
      <Button
        label="Choose your seats"
        icon="arrow-forward"
        disabled={!available || trip.status !== "Published"}
        onPress={() =>
          router.push({
            pathname: "/bookings/select",
            params: { tripId: trip.id },
          })
        }
      />
      <Button
        secondary
        label="Request a different fare"
        disabled={trip.status !== "Published"}
        onPress={() =>
          router.push({ pathname: "/trips/offer", params: { tripId: trip.id } })
        }
      />
    </Screen>
  );
}
