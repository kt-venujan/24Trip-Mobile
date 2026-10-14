import { useRef, useState } from "react";
import { Pressable, View } from "react-native";
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
import { theme } from "@/constants/brand";
import { useDemo } from "@/hooks/use-demo";
import { occupiedSeats } from "@/services/mockService";
import { money, prettyDate } from "@/utils/format";
export default function SelectSeats() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const { trips, bookings, book } = useDemo();
  const trip = trips.find((t) => t.id === tripId);
  const [selected, setSelected] = useState<number[]>([]);
  const [error, setError] = useState("");
  const submitting = useRef(false);
  if (!trip)
    return (
      <Screen title="Choose seats" back>
        <EmptyState
          title="Ride not found"
          description="Please choose another ride."
        />
      </Screen>
    );
  const occupied = occupiedSeats(trip, bookings);
  function confirm() {
    if (submitting.current || !trip) return;
    submitting.current = true;
    try {
      const booking = book(trip.id, selected);
      router.replace({
        pathname: "/bookings/[id]",
        params: { id: booking.id, confirmed: "yes" },
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Please try again.");
      submitting.current = false;
    }
  }
  return (
    <Screen
      title="Pick your favourite seat"
      subtitle={`${trip.from} → ${trip.to}`}
      back
    >
      <StatusBadge
        label={`${prettyDate(trip.date)} · ${trip.time}`}
        tone="blue"
      />
      <Card>
        <Row style={{ justifyContent: "space-between" }}>
          <T style={s.heading}>{trip.vehicle}</T>
          <Icon name="car-sport-outline" />
        </Row>
        <T style={s.muted}>Front of vehicle</T>
        <View
          style={{
            alignSelf: "center",
            width: "100%",
            maxWidth: 270,
            gap: 14,
            padding: 16,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 24,
          }}
        >
          <Row style={{ justifyContent: "flex-end" }}>
            <Icon name="speedometer-outline" color={theme.colors.muted} />
          </Row>
          {Array.from({ length: Math.ceil(trip.seats / 4) }, (_, row) => (
            <Row key={row} style={{ justifyContent: "space-between", gap: 8 }}>
              {Array.from({ length: 4 }, (_, col) => {
                const seat = row * 4 + col + 1;
                if (seat > trip.seats)
                  return <View key={col} style={{ width: 44 }} />;
                const taken = occupied.includes(seat);
                const chosen = selected.includes(seat);
                return (
                  <Pressable
                    key={seat}
                    disabled={taken}
                    accessibilityRole="checkbox"
                    accessibilityLabel={`Seat ${seat}${taken ? ", unavailable" : ""}`}
                    accessibilityState={{ checked: chosen, disabled: taken }}
                    onPress={() =>
                      setSelected((prev) =>
                        chosen
                          ? prev.filter((s) => s !== seat)
                          : [...prev, seat],
                      )
                    }
                    style={{
                      minWidth: 44,
                      minHeight: 48,
                      marginLeft: col === 2 ? 8 : 0,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: chosen
                        ? theme.colors.primaryDark
                        : theme.colors.border,
                      backgroundColor: taken
                        ? theme.colors.border
                        : chosen
                          ? theme.colors.primaryDark
                          : theme.colors.white,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <T
                      style={{
                        color: chosen ? "white" : theme.colors.muted,
                        fontWeight: "700",
                      }}
                    >
                      {taken ? "×" : seat}
                    </T>
                  </Pressable>
                );
              })}
            </Row>
          ))}
        </View>
        <Row style={{ justifyContent: "center", flexWrap: "wrap" }}>
          <StatusBadge label="Available" tone="blue" />
          <StatusBadge label="Selected" />
          <T style={s.muted}>× Unavailable</T>
        </Row>
      </Card>
      <Card>
        <T style={s.heading}>Your booking summary</T>
        <Row style={{ justifyContent: "space-between" }}>
          <T>Seats</T>
          <T>
            {selected.length
              ? [...selected].sort((a, b) => a - b).join(", ")
              : "Choose above"}
          </T>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <T>
            {selected.length} × {money(trip.price)}
          </T>
          <T style={s.heading}>{money(selected.length * trip.price)}</T>
        </Row>
        <T style={s.muted}>
          Includes the demo booking fee. One bag per passenger.
        </T>
      </Card>
      <Notice text="This creates a sample booking on this device only. No seat is reserved with a real driver and no payment is taken." />
      {error && <Notice error text={error} />}
      <Button
        label={`Confirm demo booking · ${money(selected.length * trip.price)}`}
        disabled={!selected.length}
        onPress={confirm}
      />
    </Screen>
  );
}

