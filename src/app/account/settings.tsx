import { Switch, View } from "react-native";
import { Card, Notice, Row, Screen, s, T } from "@/components/ui/kit";
import { useDemo } from "@/hooks/use-demo";
import { theme } from "@/constants/brand";
export default function Settings() {
  const { notifications, setNotifications, offers, setOffers } = useDemo();
  return (
    <Screen
      title="Your preferences"
      subtitle="A little more control over your journey."
      back
    >
      <Card>
        <Row>
          <View style={{ flex: 1 }}>
            <T style={s.heading}>Trip reminders</T>
            <T style={s.muted}>Keep your next journey in mind</T>
          </View>
          <Switch
            accessibilityLabel="Trip reminders"
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ true: theme.colors.primary }}
          />
        </Row>
        <Row>
          <View style={{ flex: 1 }}>
            <T style={s.heading}>Travel inspiration</T>
            <T style={s.muted}>Offers and places to explore</T>
          </View>
          <Switch
            accessibilityLabel="Travel inspiration"
            value={offers}
            onValueChange={setOffers}
            trackColor={{ true: theme.colors.primary }}
          />
        </Row>
      </Card>
      <Card>
        <T style={s.heading}>Language & currency</T>
        <T style={s.muted}>English · Sri Lankan Rupee (LKR)</T>
      </Card>
      <Notice text="Preferences apply to this demo session only. Push notifications and marketing messages are not connected." />
    </Screen>
  );
}

