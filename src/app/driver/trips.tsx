import { router } from "expo-router";
import {
  Button,
  Card,
  EmptyState,
  Screen,
  s,
  StatusBadge,
  T,
} from "@/components/ui/kit";
import { RouteLine } from "@/components/trips/trip-card";
import { useDemo } from "@/hooks/use-demo";
import { money, prettyDate } from "@/utils/format";
export default function DriverTrips() {
  const { trips, saveTrip } = useDemo();
  const owned = trips.filter((t) => t.owned && t.status === "Published");
  return (
    <Screen
      title="Your published trips"
      subtitle="The road ahead, all organised."
      back
    >
      <Button
        label="Schedule a new trip"
        icon="add"
        onPress={() => router.push("/driver/trip-form")}
      />
      {owned.map((trip) => (
        <Card key={trip.id}>
          <StatusBadge label={trip.status} tone="amber" />
          <T style={s.muted}>
            {prettyDate(trip.date)} · {money(trip.price)} per seat
          </T>
          <RouteLine trip={trip} />
          <Button
            secondary
            label="Edit trip"
            onPress={() =>
              router.push({
                pathname: "/driver/trip-form",
                params: { id: trip.id },
              })
            }
          />
          <Button
            secondary
            label="Mark demo trip completed"
            onPress={() => saveTrip({ ...trip, status: "Completed" })}
          />
        </Card>
      ))}
      {!owned.length && (
        <EmptyState
          title="Open roads ahead"
          description="Publish a trip to welcome your first passengers."
        />
      )}
    </Screen>
  );
}

