import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  Card,
  CustomInput,
  EmptyState,
  Notice,
  Screen,
  s,
  T,
} from "@/components/ui/kit";
import { useDemo } from "@/hooks/use-demo";
import { money } from "@/utils/format";
export default function Offer() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const { trips, setRequests, profile } = useDemo();
  const trip = trips.find((t) => t.id === tripId);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  if (!trip)
    return (
      <Screen title="Fare request" back>
        <EmptyState
          title="Ride not found"
          description="Choose a ride to request a fare."
        />
      </Screen>
    );
  return (
    <Screen
      title="A fare that works for you"
      subtitle="Try the website’s fare negotiation flow."
      back
    >
      <Card>
        <T style={s.heading}>
          {trip.from} → {trip.to}
        </T>
        <T style={s.muted}>Listed fare: {money(trip.price)} per seat</T>
        <CustomInput
          label="Your offer per seat (LKR)"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="e.g. 1500"
        />
        {error && <Notice error text={error} />}
        <Button
          label="Save demo fare request"
          onPress={() => {
            const value = Number(amount);
            if (!Number.isFinite(value) || value <= 0 || value > trip.price) {
              setError(
                "Enter an amount above zero and no higher than the listed fare.",
              );
              return;
            }
            setRequests((prev) => [
              {
                id: `offer-${Date.now()}`,
                tripId: trip.id,
                passenger: profile.name,
                amount: value,
                status: "Pending",
                own: true,
              },
              ...prev,
            ]);
            router.replace("/account/requests");
          }}
        />
      </Card>
      <Notice text="Your offer stays in this demo. It is not sent to a driver." />
    </Screen>
  );
}

