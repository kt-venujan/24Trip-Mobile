import { router } from "expo-router";
import {
  Card,
  EmptyState,
  Screen,
  s,
  StatusBadge,
  T,
} from "@/components/ui/kit";
import { useDemo } from "@/hooks/use-demo";
import { money } from "@/utils/format";
export default function Requests() {
  const { requests, trips } = useDemo();
  const mine = requests.filter((r) => r.own);
  return (
    <Screen
      title="Your fare requests"
      subtitle="A little flexibility for your next trip."
      back
    >
      {mine.map((r) => (
        <Card key={r.id}>
          <StatusBadge label={r.status} tone="amber" />
          <T style={s.heading}>
            {trips.find((t) => t.id === r.tripId)?.from} →{" "}
            {trips.find((t) => t.id === r.tripId)?.to}
          </T>
          <T>Your offer: {money(r.amount)} per seat</T>
          <T style={s.muted}>Saved locally · Not sent to a driver</T>
        </Card>
      ))}
      {!mine.length && (
        <EmptyState
          title="No fare requests yet"
          description="Find a ride and suggest a fare that works for you."
          action="Find a ride"
          onPress={() => router.push("/search")}
        />
      )}
    </Screen>
  );
}

