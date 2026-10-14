import { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Card,
  CustomInput,
  IconButton,
  Notice,
  Row,
  T,
  s,
} from "@/components/ui/kit";
import { dateOffset, validDate } from "@/utils/format";
export type SearchValue = {
  from: string;
  to: string;
  date: string;
  passengers: number;
};
export function SearchForm({
  initial,
  onSearch,
}: {
  initial?: Partial<SearchValue>;
  onSearch: (values: SearchValue) => void;
}) {
  const [from, setFrom] = useState(initial?.from ?? "Colombo Fort");
  const [to, setTo] = useState(initial?.to ?? "Kandy City");
  const [date, setDate] = useState(initial?.date ?? dateOffset(1));
  const [passengers, setPassengers] = useState(initial?.passengers ?? 1);
  const [error, setError] = useState("");
  function search() {
    if (date && (!validDate(date) || date < dateOffset(0))) {
      setError("Choose today or a future date in YYYY-MM-DD format.");
      return;
    }
    if (from.trim() && from.trim().toLowerCase() === to.trim().toLowerCase()) {
      setError("Pickup and destination must be different.");
      return;
    }
    setError("");
    onSearch({ from, to, date, passengers });
  }
  return (
    <Card>
      <Row>
        <View style={{ flex: 1, gap: 12 }}>
          <CustomInput
            label="PICKUP LOCATION"
            value={from}
            onChangeText={setFrom}
            placeholder="Any pickup"
          />
          <CustomInput
            label="DESTINATION"
            value={to}
            onChangeText={setTo}
            placeholder="Where are you heading?"
          />
        </View>
        <IconButton
          name="swap-vertical"
          label="Swap pickup and destination"
          onPress={() => {
            setFrom(to);
            setTo(from);
          }}
        />
      </Row>
      <CustomInput
        label="TRAVEL DATE · YYYY-MM-DD (blank for any date)"
        value={date}
        onChangeText={setDate}
        maxLength={10}
        placeholder="YYYY-MM-DD"
        keyboardType="numbers-and-punctuation"
      />
      <Row style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <View>
          <T style={s.label}>PASSENGERS</T>
          <T style={s.muted}>A seat for everyone</T>
        </View>
        <Row>
          <IconButton
            name="remove"
            label="Fewer passengers"
            onPress={() => setPassengers(Math.max(1, passengers - 1))}
          />
          <T>{passengers}</T>
          <IconButton
            name="add"
            label="More passengers"
            onPress={() => setPassengers(Math.min(8, passengers + 1))}
          />
        </Row>
      </Row>
      {error !== "" && <Notice error text={error} />}
      <Button label="Find my ride" icon="search-outline" onPress={search} />
    </Card>
  );
}

