import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  Card,
  EmptyState,
  Icon,
  Notice,
  Row,
  Screen,
  s,
  StatusBadge,
  T,
} from "@/components/ui/kit";
import { RouteLine } from "@/components/trips/trip-card";
import { useDemo } from "@/hooks/use-demo";
import { money, prettyDate } from "@/utils/format";
export default function BookingDetails() {
  const { id, confirmed } = useLocalSearchParams<{
    id: string;
    confirmed?: string;
  }>();
  const { bookings, trips, cancel } = useDemo();
  const [cancelPrompt, setCancelPrompt] = useState(false);
  const booking = bookings.find((b) => b.id === id);
  const trip = trips.find((t) => t.id === booking?.tripId);
  if (!booking || !trip)
    return (
      <Screen title="Booking" back>
        <EmptyState
          title="Booking not found"
          description="Demo bookings reset when the app reloads."
          action="My bookings"
          onPress={() => router.replace("/bookings")}
        />
      </Screen>
    );
  return (
    <Screen
      title={confirmed === "yes" ? "You’re ready to explore!" : "Your booking"}
      subtitle={
        confirmed === "yes"
          ? "Your sample journey is confirmed."
          : "All the little details for your journey."
      }
      back
    >
      {confirmed === "yes" && (
        <Card style={{ alignItems: "center" }}>
          <Icon name="checkmark-circle" size={64} />
          <T style={s.heading}>Demo booking confirmed</T>
          <T style={s.muted}>Enjoy the journey, together.</T>
        </Card>
      )}
      <Card>
        <StatusBadge
          label={booking.status}
          tone={booking.status === "Cancelled" ? "red" : "green"}
        />
        <T style={s.muted}>{prettyDate(trip.date)}</T>
        <RouteLine trip={trip} />
        <T style={s.muted}>
          {trip.vehicle} · {trip.driver}
        </T>
        <Row style={{ justifyContent: "space-between" }}>
          <T>Seat {booking.seats.join(", ")}</T>
          <T style={s.heading}>{money(booking.total)}</T>
        </Row>
        <T style={{ fontSize: 12 }}>Reference: {booking.id}</T>
      </Card>
      <Notice text="Sample confirmation only. No actual reservation, ticket, payment or refund has been issued." />
      <Button
        label="View my bookings"
        onPress={() => router.replace("/bookings")}
      />
      {booking.status === "Upcoming" &&
        (cancelPrompt ? (
          <Card>
            <T style={s.heading}>Cancel this demo booking?</T>
            <T style={s.muted}>
              Your selected seats will become available again.
            </T>
            <Button
              label="Yes, cancel demo booking"
              onPress={() => {
                cancel(booking.id);
                setCancelPrompt(false);
              }}
            />
            <Button
              secondary
              label="Keep my booking"
              onPress={() => setCancelPrompt(false)}
            />
          </Card>
        ) : (
          <Button
            secondary
            label="Cancel booking"
            onPress={() => setCancelPrompt(true)}
          />
        ))}
    </Screen>
  );
}
