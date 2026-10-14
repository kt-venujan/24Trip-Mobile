import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { router } from "expo-router";
import {
  Brand,
  Button,
  Card,
  Icon,
  IconButton,
  Row,
  Screen,
  Section,
  s,
  StatusBadge,
  T,
} from "@/components/ui/kit";
import { SearchForm } from "@/components/trips/search-form";
import { TripCard } from "@/components/trips/trip-card";
import { assets, theme } from "@/constants/brand";
import { useDemo } from "@/hooks/use-demo";
import { money } from "@/utils/format";
export default function Home() {
  const { profile, trips } = useDemo();
  return (
    <Screen>
      <Row style={{ justifyContent: "space-between" }}>
        <Brand />
        <IconButton
          name="person-outline"
          label="Open profile"
          onPress={() => router.push("/profile")}
        />
      </Row>
      <View style={{ gap: 5, marginTop: 8 }}>
        <T style={s.muted}>Ayubowan, {profile.name.split(" ")[0]}!</T>
        <T
          style={{
            fontSize: 33,
            lineHeight: 40,
            letterSpacing: -1.3,
            fontWeight: "800",
          }}
        >
          Your next journey,{"\n"}
          <T
            style={{
              fontSize: 33,
              lineHeight: 40,
              color: theme.colors.primaryDark,
              fontWeight: "800",
            }}
          >
            better together.
          </T>
        </T>
        <T style={s.muted}>
          Find your seat. Share the road. Explore Sri Lanka.
        </T>
      </View>
      <SearchForm
        onSearch={(values) =>
          router.push({
            pathname: "/search",
            params: { ...values, passengers: String(values.passengers) },
          })
        }
      />
      <Row style={{ justifyContent: "space-around", flexWrap: "wrap" }}>
        {(
          ["Verified drivers", "Flexible fares", "Shared journeys"] as const
        ).map((label, i) => (
          <Row key={label} style={{ gap: 5 }}>
            <Icon
              name={
                (
                  [
                    "shield-checkmark-outline",
                    "pricetag-outline",
                    "leaf-outline",
                  ] as const
                )[i]
              }
              size={15}
            />
            <T
              style={{
                fontSize: 10,
                color: theme.colors.primaryDark,
                fontWeight: "600",
              }}
            >
              {label}
            </T>
          </Row>
        ))}
      </Row>
      <Section
        title="Where will you go?"
        action="Explore all"
        onPress={() => router.push("/search")}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 14 }}
      >
        {[
          {
            name: "Kandy",
            to: "Kandy City",
            image: assets.kandy,
            price: 1800,
            caption: "Into the hill country",
          },
          {
            name: "Galle",
            to: "Galle Fort",
            image: assets.galle,
            price: 1600,
            caption: "A little coastal escape",
          },
          {
            name: "Jaffna",
            to: "Jaffna Town",
            image: assets.jaffna,
            price: 3200,
            caption: "Discover the north",
          },
        ].map((route) => (
          <Pressable
            key={route.name}
            accessibilityRole="button"
            accessibilityLabel={`Find rides to ${route.name}`}
            onPress={() =>
              router.push({
                pathname: "/search",
                params: { from: "Colombo Fort", to: route.to },
              })
            }
            style={{
              width: 205,
              borderRadius: 18,
              backgroundColor: "white",
              overflow: "hidden",
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Image
              source={route.image}
              style={{ width: "100%", height: 125 }}
              resizeMode="cover"
            />
            <View style={{ padding: 13, gap: 3 }}>
              <T style={s.heading}>{route.name}</T>
              <T style={{ fontSize: 12, color: theme.colors.muted }}>
                {route.caption}
              </T>
              <T
                style={{
                  fontSize: 12,
                  color: theme.colors.primaryDark,
                  fontWeight: "700",
                }}
              >
                From {money(route.price)}
              </T>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Section
        title="A seat worth sharing"
        action="See all"
        onPress={() => router.push("/search")}
      />
      {trips
        .filter((t) => !t.owned && t.status === "Published")
        .slice(0, 2)
        .map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      <ImageBackground
        source={assets.ella}
        imageStyle={{ borderRadius: 20 }}
        style={{ minHeight: 190, justifyContent: "flex-end" }}
      >
        <View
          style={{
            padding: 20,
            gap: 5,
            borderRadius: 20,
            backgroundColor: "#0f172a99",
          }}
        >
          <StatusBadge label="MORE JOURNEYS. FEWER EMPTY SEATS." />
          <T
            style={{
              color: "white",
              fontSize: 26,
              lineHeight: 32,
              fontWeight: "800",
            }}
          >
            A small island.{"\n"}Endless possibilities.
          </T>
          <T style={{ color: "white", fontSize: 13 }}>
            Travel Sri Lanka, one shared ride at a time.
          </T>
        </View>
      </ImageBackground>
      <Card style={{ backgroundColor: theme.colors.cream }}>
        <Row>
          <Icon name="car-sport-outline" color={theme.colors.amber} size={30} />
          <View style={{ flex: 1 }}>
            <T style={s.heading}>Going somewhere?</T>
            <T style={s.muted}>Share your empty seats and travel costs.</T>
          </View>
        </Row>
        <Button
          secondary
          label="Explore driver mode"
          icon="arrow-forward"
          onPress={() => router.push("/driver/index")}
        />
      </Card>
    </Screen>
  );
}

