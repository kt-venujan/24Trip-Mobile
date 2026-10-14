import { Tabs } from "expo-router";
import { Icon } from "@/components/ui/kit";
import { theme } from "@/constants/brand";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primaryDark,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: theme.colors.border,
          paddingTop: 7,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarHideOnKeyboard: true,
      }}
    >
      {(
        [
          ["index", "Home", "home-outline"],
          ["search", "Find Rides", "search-outline"],
          ["bookings", "My Bookings", "ticket-outline"],
          ["profile", "Profile", "person-outline"],
        ] as const
      ).map(([name, title, icon]) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => (
              <Icon name={icon} color={color} size={22} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

