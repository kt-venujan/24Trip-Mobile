import { View } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Card,
  MenuItem,
  Row,
  Screen,
  s,
  StatusBadge,
  T,
} from "@/components/ui/kit";
import { theme } from "@/constants/brand";
import { useDemo } from "@/hooks/use-demo";
export default function Profile() {
  const { profile, signedIn, setSignedIn } = useDemo();
  return (
    <Screen
      title="A little about you"
      subtitle="Your travel companion, wherever you go."
    >
      <Card>
        <Row>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: theme.colors.mint,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <T
              style={{
                fontSize: 24,
                fontWeight: "800",
                color: theme.colors.primaryDark,
              }}
            >
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </T>
          </View>
          <View style={{ flex: 1 }}>
            <T style={s.heading}>{profile.name}</T>
            <T style={s.muted}>{profile.city}, Sri Lanka</T>
          </View>
        </Row>
        <StatusBadge
          label={
            signedIn ? "Demo session active" : "Exploring with a demo profile"
          }
        />
        <T style={s.muted}>{profile.email}</T>
      </Card>
      <Card>
        <MenuItem
          icon="person-outline"
          title="Edit profile"
          detail="Make it yours"
          onPress={() => router.push("/account/edit")}
        />
        <MenuItem
          icon="options-outline"
          title="Account settings"
          detail="Your preferences"
          onPress={() => router.push("/account/settings")}
        />
        <MenuItem
          icon="chatbubble-ellipses-outline"
          title="My fare requests"
          onPress={() => router.push("/account/requests")}
        />
        <MenuItem
          icon="help-circle-outline"
          title="Help & support"
          onPress={() => router.push("/account/help")}
        />
      </Card>
      <Card style={{ backgroundColor: theme.colors.cream }}>
        <MenuItem
          icon="car-sport-outline"
          title="Switch to driver mode"
          detail="Your trips, vehicles and earnings"
          onPress={() => router.push("/driver/index")}
        />
      </Card>
      {signedIn ? (
        <Button
          secondary
          label="Log out of demo"
          onPress={() => {
            setSignedIn(false);
            router.push("/welcome");
          }}
        />
      ) : (
        <Button
          label="Explore sign-in & registration"
          onPress={() => router.push("/welcome")}
        />
      )}
    </Screen>
  );
}

