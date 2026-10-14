import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { Card, Icon, Row, s, StatusBadge, T } from "@/components/ui/kit";
import { theme } from "@/constants/brand";
import { Trip, Vehicle } from "@/types/models";
import { money, prettyDate } from "@/utils/format";
import { occupiedSeats } from "@/services/mockService";
import { useDemo } from "@/hooks/use-demo";
export function TripCard({ trip }: { trip: Trip }) {
  const { bookings } = useDemo();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${trip.from} to ${trip.to}, ${money(trip.price)}, view ride`}
      onPress={() =>
        router.push({ pathname: "/trips/[id]", params: { id: trip.id } })
      }
    >
      <Card>
        <Row style={{ justifyContent: "space-between" }}>
          <StatusBadge label={trip.kind} tone="blue" />
          <T style={{ fontSize: 12, color: theme.colors.muted }}>
            {prettyDate(trip.date)}
          </T>
        </Row>
        <RouteLine trip={trip} />
        <View style={s.divider} />
        <Row>
          <View style={{ flex: 1 }}>
            <T style={{ fontSize: 13, fontWeight: "700" }}>
              {trip.driver}{" "}
              <T style={{ fontSize: 12, color: theme.colors.amber }}>
                ★ {trip.rating}
              </T>
            </T>
            <T style={{ fontSize: 11, color: theme.colors.muted }}>
              {trip.vehicle} ·{" "}
              {trip.seats - occupiedSeats(trip, bookings).length} seats left
            </T>
          </View>
          <View>
            <T
              style={{
                fontSize: 19,
                fontWeight: "800",
                color: theme.colors.primaryDark,
              }}
            >
              {money(trip.price)}
            </T>
            <T
              style={{
                fontSize: 11,
                color: theme.colors.muted,
                textAlign: "right",
              }}
            >
              per person
            </T>
          </View>
        </Row>
      </Card>
    </Pressable>
  );
}
export function RouteLine({ trip }: { trip: Trip }) {
  return (
    <View style={{ gap: 8 }}>
      <Row>
        <Icon name="radio-button-on-outline" size={16} />
        <T style={{ fontWeight: "800", width: 48 }}>{trip.time}</T>
        <T style={{ flex: 1, fontWeight: "600" }}>{trip.from}</T>
      </Row>
      <Row>
        <View
          style={{
            borderLeftWidth: 1,
            borderStyle: "dashed",
            borderColor: theme.colors.border,
            height: 18,
            marginLeft: 7,
            width: 9,
          }}
        />
        <T style={{ fontSize: 11, color: theme.colors.muted, marginLeft: 60 }}>
          {trip.duration} · Direct ride
        </T>
      </Row>
      <Row>
        <Icon name="location-outline" size={16} />
        <T style={{ fontWeight: "800", width: 48 }}>{trip.arrival}</T>
        <T style={{ flex: 1, fontWeight: "600" }}>{trip.to}</T>
      </Row>
    </View>
  );
}
export function DriverCard({ trip }: { trip: Trip }) {
  return (
    <Card>
      <Row>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: theme.colors.mint,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <T
            style={{
              color: theme.colors.primaryDark,
              fontWeight: "800",
              fontSize: 18,
            }}
          >
            {trip.driver
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </T>
        </View>
        <View style={{ flex: 1 }}>
          <T style={s.heading}>{trip.driver}</T>
          <T style={s.muted}>★ {trip.rating} · 128 shared journeys</T>
        </View>
      </Row>
      <StatusBadge label="Verified driver · Demo profile" />
      <T style={s.muted}>
        “A comfortable journey and a friendly welcome, every time.”
      </T>
    </Card>
  );
}
export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Card>
      <Row>
        <Icon name="car-sport-outline" size={32} />
        <View style={{ flex: 1 }}>
          <T style={s.heading}>{vehicle.model}</T>
          <T style={s.muted}>
            {vehicle.plate} · {vehicle.seats} seats
          </T>
        </View>
      </Row>
      <StatusBadge
        label={vehicle.status}
        tone={vehicle.status === "Approved" ? "green" : "amber"}
      />
    </Card>
  );
}

