import { Image, View } from "react-native";
import { router } from "expo-router";
import {
  Brand,
  Button,
  Card,
  Icon,
  Row,
  Screen,
  s,
  T,
} from "@/components/ui/kit";
import { assets, theme } from "@/constants/brand";
export default function Welcome() {
  return (
    <Screen>
      <Brand />
      <Image
        source={assets.ella}
        style={{ width: "100%", height: 280, borderRadius: 28 }}
        accessibilityLabel="Nine Arch Bridge in Sri Lanka"
      />
      <T
        style={{
          fontSize: 36,
          lineHeight: 43,
          fontWeight: "800",
          letterSpacing: -1,
        }}
      >
        Share the road.{"\n"}
        <T
          style={{
            fontSize: 36,
            lineHeight: 43,
            fontWeight: "800",
            color: theme.colors.primaryDark,
          }}
        >
          Make the journey.
        </T>
      </T>
      <T style={s.muted}>
        From familiar places to new adventures. Find a ride and travel Sri Lanka
        together.
      </T>
      <Card>
        {[
          ["shield-checkmark-outline", "Travel with verified drivers"],
          ["pricetag-outline", "Find a fare that feels right"],
          ["people-outline", "A seat and a little good company"],
        ].map(([icon, label]) => (
          <Row key={label}>
            <Icon name={icon as "people-outline"} />
            <View style={{ flex: 1 }}>
              <T>{label}</T>
            </View>
          </Row>
        ))}
      </Card>
      <Button
        label="Get started"
        icon="arrow-forward"
        onPress={() => router.push("/register")}
      />
      <Button
        secondary
        label="I already have an account"
        onPress={() => router.push("/login")}
      />
      <Button
        secondary
        label="Keep exploring the demo"
        onPress={() => router.replace("/index")}
      />
    </Screen>
  );
}

