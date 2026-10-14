import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Chips, EmptyState, Screen, Section, T, s } from "@/components/ui/kit";
import { SearchForm, SearchValue } from "@/components/trips/search-form";
import { TripCard } from "@/components/trips/trip-card";
import { useDemo } from "@/hooks/use-demo";
import { searchTrips } from "@/services/mockService";
export default function Search() {
  const params = useLocalSearchParams<{
    from?: string;
    to?: string;
    date?: string;
    passengers?: string;
  }>();
  return <SearchContent key={JSON.stringify(params)} params={params} />;
}
function SearchContent({
  params,
}: {
  params: { from?: string; to?: string; date?: string; passengers?: string };
}) {
  const { trips, bookings } = useDemo();
  const [filters, setFilters] = useState<SearchValue>({
    from: params.from ?? "",
    to: params.to ?? "",
    date: params.date ?? "",
    passengers: Math.max(1, Math.min(8, Number(params.passengers) || 1)),
  });
  const [kind, setKind] = useState("All rides");
  const [sort, setSort] = useState("Earliest first");
  const [reset, setReset] = useState(0);
  const results = searchTrips(trips, bookings, { ...filters, kind, sort });
  return (
    <Screen
      title="Find your next ride"
      subtitle="Good company. A comfortable seat. A fair fare."
    >
      <SearchForm key={reset} initial={filters} onSearch={setFilters} />
      <Chips
        values={["All rides", "Carpool", "AC van", "Express bus"]}
        value={kind}
        onChange={setKind}
      />
      <Section title={`${results.length} rides available`} />
      <Chips
        values={["Earliest first", "Lowest fare"]}
        value={sort}
        onChange={setSort}
      />
      <T style={s.muted}>Sample journeys · Prices are per passenger</T>
      {results.map((t) => (
        <TripCard key={t.id} trip={t} />
      ))}
      {!results.length && (
        <EmptyState
          title="No rides along this route yet"
          description="Try another date, fewer passengers, or a nearby destination."
          action="Show all rides"
          onPress={() => {
            setFilters({ from: "", to: "", date: "", passengers: 1 });
            setKind("All rides");
            setReset((v) => v + 1);
          }}
        />
      )}
    </Screen>
  );
}

