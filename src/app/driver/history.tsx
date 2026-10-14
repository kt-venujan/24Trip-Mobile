import {
  Card,
  EmptyState,
  Screen,
  s,
  StatusBadge,
  T,
} from "@/components/ui/kit";
import { RouteLine } from "@/components/trips/trip-card";
import { useDemo } from "@/hooks/use-demo";
import { prettyDate } from "@/utils/format";
export default function History() {
  const { trips } = useDemo();
  const history = trips.filter((t) => t.owned && t.status !== "Published");
  return (
    <Screen
      title="Miles of memories"
      subtitle="Your completed and cancelled journeys."
      back
    >
      {history.map((trip) => (
        <Card key={trip.id}>
          <StatusBadge label={trip.status} />
          <T style={s.muted}>{prettyDate(trip.date)}</T>
          <RouteLine trip={trip} />
          <T style={s.muted}>
            {trip.occupied.length} sample passengers · {trip.vehicle}
          </T>
        </Card>
      ))}
      {!history.length && (
        <EmptyState
          title="Your story starts here"
          description="Completed trips will appear in your history."
        />
      )}
    </Screen>
  );
}

