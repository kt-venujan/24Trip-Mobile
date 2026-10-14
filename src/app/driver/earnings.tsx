import { View } from "react-native";
import { Card, Notice, Row, Screen, Section, s, T } from "@/components/ui/kit";
import { theme } from "@/constants/brand";
import { useDemo } from "@/hooks/use-demo";
import { money, prettyDate } from "@/utils/format";
export default function Earnings() {
  const { trips } = useDemo();
  const completed = trips.filter((t) => t.owned && t.status === "Completed");
  const total = completed.reduce(
    (sum, t) => sum + t.price * t.occupied.length,
    0,
  );
  return (
    <Screen
      title="Every mile adds up"
      subtitle="An overview of your sample trip fares."
      back
    >
      <Card style={{ backgroundColor: theme.colors.ink }}>
        <T style={{ color: "#cbd5e1" }}>TOTAL DEMO FARES</T>
        <T
          style={{
            fontSize: 36,
            lineHeight: 44,
            fontWeight: "800",
            color: "white",
          }}
        >
          {money(total)}
        </T>
        <T style={{ color: "#cbd5e1" }}>
          {completed.length} completed journeys
        </T>
      </Card>
      <Section title="Trip breakdown" />
      {completed.map((t) => (
        <Card key={t.id}>
          <T style={s.heading}>
            {t.from} → {t.to}
          </T>
          <T style={s.muted}>{prettyDate(t.date)}</T>
          <Row style={{ justifyContent: "space-between" }}>
            <T>
              {t.occupied.length} × {money(t.price)}
            </T>
            <T style={{ fontWeight: "800" }}>
              {money(t.occupied.length * t.price)}
            </T>
          </Row>
          <View
            style={{
              height: 8,
              borderRadius: 4,
              backgroundColor: theme.colors.mint,
            }}
          >
            <View
              style={{
                height: 8,
                borderRadius: 4,
                backgroundColor: theme.colors.primary,
                width: `${total ? ((t.occupied.length * t.price) / total) * 100 : 0}%`,
              }}
            />
          </View>
        </Card>
      ))}
      <Notice text="Illustrative gross fares only, calculated from occupied seats on completed demo trips. No wallet, commission calculation, payout or bank connection is active." />
    </Screen>
  );
}

