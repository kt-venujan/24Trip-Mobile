import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  Card,
  Chips,
  CustomInput,
  EmptyState,
  Notice,
  Screen,
} from "@/components/ui/kit";
import { useDemo } from "@/hooks/use-demo";
import { dateOffset, validDate } from "@/utils/format";
export default function TripForm() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { trips, vehicles, saveTrip } = useDemo();
  const existing = trips.find((t) => t.id === id && t.owned);
  const approved = vehicles.filter((v) => v.status === "Approved");
  const [from, setFrom] = useState(existing?.from ?? "Colombo Fort");
  const [to, setTo] = useState(existing?.to ?? "");
  const [date, setDate] = useState(existing?.date ?? dateOffset(1));
  const [time, setTime] = useState(existing?.time ?? "08:00");
  const [arrival, setArrival] = useState(existing?.arrival ?? "11:00");
  const [price, setPrice] = useState(existing ? String(existing.price) : "");
  const [notes, setNotes] = useState(
    existing?.notes ?? "Air conditioning · One bag per passenger",
  );
  const [vehicleId, setVehicleId] = useState(
    approved.find((v) => v.plate === existing?.plate)?.id ??
      approved[0]?.id ??
      "",
  );
  const [error, setError] = useState("");
  const [draftId] = useState(() => `driver-${Date.now()}`);
  function save() {
    const vehicle = approved.find((v) => v.id === vehicleId);
    const fare = Number(price);
    if (
      !from.trim() ||
      !to.trim() ||
      from.trim().toLowerCase() === to.trim().toLowerCase()
    ) {
      setError("Enter two different locations.");
      return;
    }
    if (
      !validDate(date) ||
      date < dateOffset(0) ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(time) ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(arrival) ||
      new Date(`${date}T${time}`) <= new Date()
    ) {
      setError(
        "Enter a future date and departure time, using YYYY-MM-DD and HH:MM.",
      );
      return;
    }
    if (!Number.isFinite(fare) || fare <= 0 || fare > 100000 || !vehicle) {
      setError("Choose a vehicle and a fare between LKR 1 and 100,000.");
      return;
    }
    const mins = (value: string) =>
      Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
    const duration = (mins(arrival) - mins(time) + 1440) % 1440;
    if (!duration) {
      setError(
        "Arrival must differ from departure. Earlier arrival times mean the following day.",
      );
      return;
    }
    if (existing && vehicle.seats < Math.max(0, ...existing.occupied)) {
      setError("This vehicle cannot accommodate the already booked seats.");
      return;
    }
    saveTrip({
      id: existing?.id ?? draftId,
      from: from.trim(),
      to: to.trim(),
      date,
      time,
      arrival,
      duration: `${Math.floor(duration / 60)}h ${duration % 60}m`,
      price: fare,
      seats: vehicle.seats,
      occupied: existing?.occupied ?? [],
      driver: "You",
      rating: "4.9",
      vehicle: vehicle.model,
      plate: vehicle.plate,
      kind: vehicle.kind,
      owned: true,
      status: "Published",
      notes: notes.trim(),
    });
    router.dismissTo("/driver/trips");
  }
  if (id && !existing)
    return (
      <Screen title="Edit trip" back>
        <EmptyState
          title="Trip not found"
          description="Choose a trip from your published journeys."
        />
      </Screen>
    );
  if (!approved.length)
    return (
      <Screen title="Publish a trip" back>
        <EmptyState
          title="An approved vehicle is needed"
          description="Register your vehicle before scheduling a trip."
          action="Manage vehicles"
          onPress={() => router.replace("/driver/vehicles")}
        />
      </Screen>
    );
  return (
    <Screen
      title={existing ? "Fine-tune your journey" : "Where are you heading?"}
      subtitle="Share the plan. Fill the empty seats."
      back
    >
      <Card>
        <CustomInput
          label="Pickup location"
          value={from}
          onChangeText={setFrom}
        />
        <CustomInput label="Destination" value={to} onChangeText={setTo} />
        <CustomInput
          label="Departure date · YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
          keyboardType="numbers-and-punctuation"
        />
        <CustomInput
          label="Departure time · HH:MM (24-hour)"
          value={time}
          onChangeText={setTime}
          keyboardType="numbers-and-punctuation"
        />
        <CustomInput
          label="Arrival time · HH:MM (24-hour)"
          value={arrival}
          onChangeText={setArrival}
          keyboardType="numbers-and-punctuation"
        />
        <CustomInput
          label="Fare per seat (LKR)"
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
        />
        <Chips
          values={approved.map((v) => `${v.model} · ${v.plate}`)}
          value={
            approved
              .filter((v) => v.id === vehicleId)
              .map((v) => `${v.model} · ${v.plate}`)[0] ?? ""
          }
          onChange={(label) =>
            setVehicleId(
              approved.find((v) => `${v.model} · ${v.plate}` === label)?.id ??
                "",
            )
          }
        />
        <CustomInput
          label="Trip notes"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
        {error && <Notice error text={error} />}
        <Button
          label={existing ? "Save demo trip changes" : "Publish demo trip"}
          onPress={save}
        />
      </Card>
      <Notice text="This preview uses a manually entered per-seat fare. Publishing is local only; no real passengers will see the trip." />
    </Screen>
  );
}

