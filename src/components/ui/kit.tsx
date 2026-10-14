import React from "react";
import {
  ColorValue,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewProps,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { assets, theme } from "@/constants/brand";
const c = theme.colors;
export type IconName = React.ComponentProps<typeof Ionicons>["name"];
export function Icon({
  name,
  color = c.primary,
  size = 22,
}: {
  name: IconName;
  color?: ColorValue;
  size?: number;
}) {
  return <Ionicons name={name} color={color} size={size} />;
}
export function T({ style, ...props }: TextProps) {
  return <Text {...props} style={[s.text, style]} />;
}
export function Row({ style, ...props }: ViewProps) {
  return <View {...props} style={[s.row, style]} />;
}
export function Card({ style, ...props }: ViewProps) {
  return <View {...props} style={[s.card, style]} />;
}
export function Screen({
  children,
  title,
  subtitle,
  back = false,
}: React.PropsWithChildren<{
  title?: string;
  subtitle?: string;
  back?: boolean;
}>) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={s.safe} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[s.page, { paddingBottom: 30 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          {title && (
            <ScreenHeader title={title} subtitle={subtitle} back={back} />
          )}
          {children}
          <T style={s.demo}>24 TRIP DEMO · No real bookings or payments</T>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export function ScreenHeader({
  title,
  subtitle,
  back,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
}) {
  return (
    <View style={s.header}>
      {back && (
        <IconButton
          name="arrow-back"
          label="Go back"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/index")
          }
        />
      )}
      <T accessibilityRole="header" style={s.title}>
        {title}
      </T>
      {subtitle && <T style={s.muted}>{subtitle}</T>}
    </View>
  );
}
export function Brand() {
  return (
    <Row>
      <Image
        source={assets.logo}
        style={{ width: 46, height: 46 }}
        resizeMode="contain"
        accessibilityLabel="24 Trip logo"
      />
      <View>
        <T style={{ fontSize: 23, fontWeight: "900", letterSpacing: -1 }}>
          24
          <T style={{ color: c.primary, fontSize: 23, fontWeight: "900" }}>
            Trip
          </T>
        </T>
        <T style={{ fontSize: 9, letterSpacing: 2, color: c.muted }}>
          SHARE THE JOURNEY
        </T>
      </View>
    </Row>
  );
}
export function Button({
  label,
  onPress,
  secondary = false,
  disabled = false,
  icon,
}: {
  label: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
  icon?: IconName;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        secondary && s.secondary,
        disabled && { opacity: 0.45 },
        pressed && { opacity: 0.8, transform: [{ scale: 0.99 }] },
      ]}
    >
      <T style={[s.buttonText, secondary && { color: c.ink }]}>{label}</T>
      {icon && (
        <Icon name={icon} color={secondary ? c.primary : c.white} size={19} />
      )}
    </Pressable>
  );
}
export const PrimaryButton = Button;
export function SecondaryButton(props: React.ComponentProps<typeof Button>) {
  return <Button {...props} secondary />;
}
export function IconButton({
  name,
  label,
  onPress,
}: {
  name: IconName;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [s.iconButton, { opacity: pressed ? 0.6 : 1 }]}
    >
      <Icon name={name} color={c.ink} />
    </Pressable>
  );
}
export function CustomInput({
  label,
  error,
  style,
  ...props
}: TextInputProps & { label: string; error?: string }) {
  return (
    <View style={{ gap: 7, flexGrow: 1 }}>
      <T style={s.label}>{label}</T>
      <TextInput
        placeholderTextColor={c.muted}
        accessibilityLabel={label}
        {...props}
        style={[s.input, error && { borderColor: c.danger }, style]}
      />
      {error && <Notice error text={error} />}
    </View>
  );
}
export const SearchBar = CustomInput;
export function Section({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <Row style={{ justifyContent: "space-between", marginTop: 8 }}>
      <T accessibilityRole="header" style={s.heading}>
        {title}
      </T>
      {action && (
        <Pressable
          accessibilityRole="button"
          onPress={onPress}
          style={{ minHeight: 44, justifyContent: "center" }}
        >
          <T style={s.link}>{action}</T>
        </Pressable>
      )}
    </Row>
  );
}
export function StatusBadge({
  label,
  tone = "green",
}: {
  label: string;
  tone?: "green" | "blue" | "amber" | "red";
}) {
  const colors = {
    green: [c.mint, c.primaryDark],
    blue: [c.sky, c.blue],
    amber: [c.cream, c.amber],
    red: [c.rose, c.danger],
  }[tone];
  return (
    <View style={[s.badge, { backgroundColor: colors[0] }]}>
      <T style={{ color: colors[1], fontWeight: "700", fontSize: 11 }}>
        {label}
      </T>
    </View>
  );
}
export function Chips({
  values,
  value,
  onChange,
}: {
  values: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}
    >
      {values.map((item) => (
        <Pressable
          key={item}
          accessibilityRole="button"
          accessibilityState={{ selected: item === value }}
          onPress={() => onChange(item)}
          style={[
            s.chip,
            value === item && { backgroundColor: c.ink, borderColor: c.ink },
          ]}
        >
          <T
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: value === item ? c.white : c.muted,
            }}
          >
            {item}
          </T>
        </Pressable>
      ))}
    </ScrollView>
  );
}
export function Notice({
  text,
  error = false,
}: {
  text: string;
  error?: boolean;
}) {
  return (
    <View
      accessibilityLiveRegion="polite"
      style={[s.notice, error && { backgroundColor: c.rose }]}
    >
      <Icon
        name={error ? "alert-circle-outline" : "information-circle-outline"}
        color={error ? c.danger : c.blue}
        size={19}
      />
      <T style={{ flex: 1, fontSize: 13, color: error ? c.danger : c.blue }}>
        {text}
      </T>
    </View>
  );
}
export function EmptyState({
  title,
  description,
  action,
  onPress,
}: {
  title: string;
  description: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <Card style={{ alignItems: "center", paddingVertical: 36 }}>
      <Icon name="compass-outline" size={44} />
      <T style={s.heading}>{title}</T>
      <T style={[s.muted, { textAlign: "center" }]}>{description}</T>
      {action && onPress && (
        <Button label={action} onPress={onPress} secondary />
      )}
    </Card>
  );
}
export function LoadingSkeleton() {
  return (
    <Card accessibilityLabel="Loading rides" accessibilityRole="progressbar">
      {[80, 100, 60].map((width) => (
        <View
          key={width}
          style={{
            height: 18,
            borderRadius: 6,
            width: `${width}%`,
            backgroundColor: c.border,
          }}
        />
      ))}
    </Card>
  );
}
export function MenuItem({
  icon,
  title,
  detail,
  onPress,
}: {
  icon: IconName;
  title: string;
  detail?: string;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={s.menu}>
      <View style={s.menuIcon}>
        <Icon name={icon} />
      </View>
      <View style={{ flex: 1 }}>
        <T style={{ fontWeight: "700" }}>{title}</T>
        {detail && <T style={[s.muted, { fontSize: 12 }]}>{detail}</T>}
      </View>
      <Icon name="chevron-forward" color={c.muted} size={18} />
    </Pressable>
  );
}
export const s = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: c.canvas },
  page: {
    padding: 20,
    gap: 18,
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
    paddingBottom: 38,
  },
  text: { color: c.ink, fontSize: theme.type.body, lineHeight: 22 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  card: {
    backgroundColor: c.white,
    padding: 18,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: c.border,
    gap: 14,
    ...theme.shadow,
  },
  header: { gap: 8, paddingVertical: 4 },
  title: {
    fontSize: theme.type.title,
    fontWeight: "800",
    lineHeight: 34,
    letterSpacing: -0.8,
  },
  heading: {
    fontSize: theme.type.heading,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  muted: { color: c.muted, fontSize: 14, lineHeight: 22 },
  label: { color: "#475569", fontSize: 12, fontWeight: "700" },
  input: {
    backgroundColor: c.canvas,
    borderColor: c.border,
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: c.ink,
    fontSize: 15,
  },
  button: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: c.primaryDark,
    paddingHorizontal: 18,
    paddingVertical: 13,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  secondary: {
    backgroundColor: c.white,
    borderWidth: 1,
    borderColor: c.border,
  },
  buttonText: { fontWeight: "700", color: c.white, textAlign: "center" },
  iconButton: {
    width: 46,
    height: 46,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: 15,
    backgroundColor: c.white,
    alignItems: "center",
    justifyContent: "center",
  },
  link: { color: c.primaryDark, fontSize: 13, fontWeight: "700" },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 7,
  },
  chip: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.white,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  notice: {
    backgroundColor: c.sky,
    borderRadius: 12,
    padding: 13,
    flexDirection: "row",
    gap: 9,
    alignItems: "flex-start",
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
    minHeight: 64,
  },
  menuIcon: { backgroundColor: c.mint, borderRadius: 12, padding: 11 },
  demo: {
    textAlign: "center",
    color: c.muted,
    fontSize: 10,
    marginTop: 16,
    letterSpacing: 0.5,
  },
  divider: { height: 1, backgroundColor: c.border },
});

