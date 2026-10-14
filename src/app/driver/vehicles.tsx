import { router } from "expo-router";
import { Button, EmptyState, Notice, Screen } from "@/components/ui/kit";
import { VehicleCard } from "@/components/trips/trip-card";
import { useDemo } from "@/hooks/use-demo";
export default function Vehicles() {
  const { vehicles } = useDemo();
  return (
    <Screen
      title="Your vehicles"
      subtitle="A comfortable ride starts here."
      back
    >
      <Button
        label="Register a vehicle"
        icon="add"
        onPress={() => router.push("/driver/vehicle-form")}
      />
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
      {!vehicles.length && (
        <EmptyState
          title="Your garage is empty"
          description="Add your first vehicle to get started."
        />
      )}
      <Notice text="New vehicles remain pending review in this demo. The sample approved vehicle can be used to preview trip publishing." />
    </Screen>
  );
}

