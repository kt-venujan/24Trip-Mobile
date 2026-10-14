import { useState } from "react";
import { router } from "expo-router";
import {
  Button,
  Card,
  Chips,
  CustomInput,
  Notice,
  Screen,
  StatusBadge,
} from "@/components/ui/kit";
import { useDemo } from "@/hooks/use-demo";
import { Trip } from "@/types/models";
export default function VehicleForm() {
  const { vehicles, setVehicles } = useDemo();
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [seats, setSeats] = useState("");
  const [kind, setKind] = useState("AC van");
  const [error, setError] = useState("");
  return (
    <Screen
      title="Meet your vehicle"
      subtitle="Add the details passengers need to know."
      back
    >
      <StatusBadge label="VEHICLE REGISTRATION" tone="amber" />
      <Card>
        <CustomInput
          label="Make & model"
          value={model}
          onChangeText={setModel}
          placeholder="Toyota Hiace"
        />
        <CustomInput
          label="Registration plate"
          value={plate}
          onChangeText={setPlate}
          autoCapitalize="characters"
          placeholder="WP CAB 1234"
        />
        <CustomInput
          label="Passenger seats (excluding driver)"
          value={seats}
          onChangeText={setSeats}
          keyboardType="number-pad"
        />
        <Chips
          values={["Carpool", "AC van", "Express bus"]}
          value={kind}
          onChange={setKind}
        />
        {error && <Notice error text={error} />}
        <Button
          label="Save demo vehicle"
          onPress={() => {
            const count = Number(seats);
            if (
              model.trim().length < 3 ||
              plate.trim().length < 5 ||
              !Number.isInteger(count) ||
              count < 1 ||
              count > 60
            ) {
              setError("Enter a make/model, plate and 1–60 passenger seats.");
              return;
            }
            if (
              vehicles.some(
                (v) =>
                  v.plate.replace(/\s/g, "").toLowerCase() ===
                  plate.replace(/\s/g, "").toLowerCase(),
              )
            ) {
              setError("This plate is already registered in the demo.");
              return;
            }
            setVehicles((prev) => [
              ...prev,
              {
                id: `vehicle-${Date.now()}`,
                model: model.trim(),
                plate: plate.trim().toUpperCase(),
                seats: count,
                kind: kind as Trip["kind"],
                status: "Pending review",
              },
            ]);
            router.replace("/driver/vehicles");
          }}
        />
      </Card>
      <Notice text="Document and photo uploads are not connected. This local vehicle will show Pending review; no verification is submitted." />
    </Screen>
  );
}

