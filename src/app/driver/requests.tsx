import { useState } from "react";
import {
  Button,
  Card,
  Chips,
  EmptyState,
  Notice,
  Screen,
  s,
  StatusBadge,
  T,
} from "@/components/ui/kit";
import { useDemo } from "@/hooks/use-demo";
import { money } from "@/utils/format";
export default function DriverRequests() {
  const { requests, setRequests, trips, passengerRequests, respondToPassenger } = useDemo();
  const [tab, setTab] = useState("Fare requests");
  const incoming = requests.filter((r) => !r.own);
  return (
    <Screen
      title="Your passengers"
      subtitle="Make room for a shared journey."
      back
    >
      <Chips
        values={["Fare requests", "Booking requests"]}
        value={tab}
        onChange={setTab}
      />
      {tab === "Fare requests" ? (
        incoming.map((request) => (
          <Card key={request.id}>
            <StatusBadge
              label={request.status}
              tone={
                request.status === "Declined"
                  ? "red"
                  : request.status === "Accepted"
                    ? "green"
                    : "amber"
              }
            />
            <T style={s.heading}>{request.passenger}</T>
            <T style={s.muted}>
              {trips.find((t) => t.id === request.tripId)?.from} →{" "}
              {trips.find((t) => t.id === request.tripId)?.to}
            </T>
            <T>Offered {money(request.amount)} per seat</T>
            {request.status === "Pending" && (
              <>
                <Button
                  label="Accept demo offer"
                  onPress={() =>
                    setRequests((prev) =>
                      prev.map((r) =>
                        r.id === request.id ? { ...r, status: "Accepted" } : r,
                      ),
                    )
                  }
                />
                <Button
                  secondary
                  label="Decline offer"
                  onPress={() =>
                    setRequests((prev) =>
                      prev.map((r) =>
                        r.id === request.id ? { ...r, status: "Declined" } : r,
                      ),
                    )
                  }
                />
              </>
            )}
          </Card>
        ))
      ) : (
        passengerRequests.map(request => <Card key={request.id}>
          <StatusBadge label={request.status} tone={request.status === 'Confirmed' ? 'green' : request.status === 'Declined' ? 'red' : 'amber'} />
          <T style={s.heading}>{request.passenger}</T>
          <T style={s.muted}>{trips.find(t => t.id === request.tripId)?.from} ? {trips.find(t => t.id === request.tripId)?.to}</T>
          <T>Seats {request.seats.join(', ')} ? {request.bags} small bags</T>
          <T>{money((trips.find(t => t.id === request.tripId)?.price ?? 0) * request.seats.length)} total ? Sample request</T>
          {request.status === 'Pending' && <>
            <Button label="Confirm demo request" onPress={() => respondToPassenger(request.id, 'Confirmed')} />
            <Button secondary label="Decline request" onPress={() => respondToPassenger(request.id, 'Declined')} />
          </>}
        </Card>)
      )}
      {tab === "Fare requests" && !incoming.length && (
        <EmptyState
          title="All caught up"
          description="Fare requests from passengers will appear here."
        />
      )}
      <Notice text="Responses are simulated. No passenger is notified and no money changes hands." />
    </Screen>
  );
}

