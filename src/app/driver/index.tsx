import { router } from "expo-router";
import {
  Button,
  Card,
  Icon,
  MenuItem,
  Notice,
  Row,
  Screen,
  Section,
  s,
  StatusBadge,
  T,
} from "@/components/ui/kit";
import { theme } from "@/constants/brand";
import { useDemo } from "@/hooks/use-demo";
import { money } from "@/utils/format";
export default function DriverDashboard() {
  const { trips, requests, driverJoined } = useDemo();
  const published = trips.filter((t) => t.owned && t.status === "Published");
  const earned = trips
    .filter((t) => t.owned && t.status === "Completed")
    .reduce((sum, t) => sum + t.occupied.length * t.price, 0);
  return (
    <Screen
      title="Your driver dashboard"
      subtitle="Good journeys start with you."
      back
    >
      <StatusBadge label="DRIVER MODE · DEMO" tone="amber" />
      <Card
        style={{ backgroundColor: theme.colors.cream, borderColor: "#fde68a" }}
      >
        <Icon name="sunny-outline" color={theme.colors.amber} size={32} />
        <T style={s.title}>Every empty seat{"\n"}is an opportunity.</T>
        <T style={s.muted}>
          Share your route. Welcome a passenger. Make the miles count.
        </T>
        <Button
          label="Publish a trip"
          icon="add"
          onPress={() => router.push("/driver/trip-form")}
        />
      </Card>
      <Row>
        <Card style={{ flex: 1 }}>
          <T style={s.muted}>Published trips</T>
          <T style={s.title}>{published.length}</T>
        </Card>
        <Card style={{ flex: 1 }}>
          <T style={s.muted}>Demo earnings</T>
          <T style={s.heading}>{money(earned)}</T>
        </Card>
      </Row>
      {!driverJoined && (
        <Notice text="Explore with a sample approved vehicle, or complete the driver onboarding preview." />
      )}
      <Section title="Your driver toolkit" />
      <Card>
        <MenuItem
          icon="map-outline"
          title="My published trips"
          detail={`${published.length} upcoming journeys`}
          onPress={() => router.push("/driver/trips")}
        />
        <MenuItem
          icon="car-sport-outline"
          title="My vehicles"
          detail="Registration and verification"
          onPress={() => router.push("/driver/vehicles")}
        />
        <MenuItem
          icon="people-outline"
          title="Passenger requests"
          detail={`${requests.filter((r) => !r.own && r.status === "Pending").length} fare requests to review`}
          onPress={() => router.push("/driver/requests")}
        />
        <MenuItem
          icon="time-outline"
          title="Trip history"
          onPress={() => router.push("/driver/history")}
        />
        <MenuItem
          icon="wallet-outline"
          title="Earnings overview"
          onPress={() => router.push("/driver/earnings")}
        />
        <MenuItem
          icon="shield-checkmark-outline"
          title="Driver onboarding"
          detail={
            driverJoined
              ? "Demo profile completed"
              : "Set up your driver profile"
          }
          onPress={() => router.push("/driver/onboarding")}
        />
      </Card>
      <Button
        secondary
        label="Back to passenger home"
          onPress={() => router.replace("/index")}
      />
    </Screen>
  );
}

