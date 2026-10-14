import { router } from "expo-router";
import { Button, Card, Row, s, StatusBadge, T } from "@/components/ui/kit";
import { RouteLine } from "@/components/trips/trip-card";
import { useDemo } from "@/hooks/use-demo";
import { Booking } from "@/types/models";
import { money, prettyDate } from "@/utils/format";
export function BookingCard({ booking }: { booking: Booking }) {
  const { trips } = useDemo();
  const trip = trips.find((t) => t.id === booking.tripId);
  if (!trip) return null;
  return (
    <Card>
      <Row style={{ justifyContent: "space-between" }}>
        <StatusBadge
          label={booking.status}
          tone={
            booking.status === "Cancelled"
              ? "red"
              : booking.status === "Completed"
                ? "blue"
                : "green"
          }
        />
        <T style={{ fontSize: 12 }}>{prettyDate(trip.date)}</T>
      </Row>
      <RouteLine trip={trip} />
      <T style={s.muted}>
        Seat {booking.seats.join(", ")} · {money(booking.total)}
      </T>
      <Button
        secondary
        label="View booking"
        onPress={() =>
          router.push({
            pathname: "/bookings/[id]",
            params: { id: booking.id },
          })
        }
      />
    </Card>
  );
}

