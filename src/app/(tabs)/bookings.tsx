import { useState } from "react";
import { router } from "expo-router";
import { Chips, EmptyState, Screen } from "@/components/ui/kit";
import { BookingCard } from "@/components/bookings/booking-card";
import { useDemo } from "@/hooks/use-demo";
export default function Bookings() {
  const { bookings } = useDemo();
  const [tab, setTab] = useState("Upcoming");
  const visible = bookings.filter((b) => b.status === tab);
  return (
    <Screen
      title="Your journeys"
      subtitle="Every shared ride, all in one place."
    >
      <Chips
        values={["Upcoming", "Completed", "Cancelled"]}
        value={tab}
        onChange={setTab}
      />
      {visible.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
      {!visible.length && (
        <EmptyState
          title={`No ${tab.toLowerCase()} bookings`}
          description="Your next adventure is just a ride away."
          action="Find a ride"
          onPress={() => router.push("/search")}
        />
      )}
    </Screen>
  );
}

