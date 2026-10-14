import { useState } from "react";
import { Switch } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Card,
  CustomInput,
  Notice,
  Row,
  Screen,
  s,
  StatusBadge,
  T,
} from "@/components/ui/kit";
import { useDemo } from "@/hooks/use-demo";
export default function Onboarding() {
  const { profile, setDriverJoined } = useDemo();
  const [name, setName] = useState(profile.name);
  const [license, setLicense] = useState("");
  const [years, setYears] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  return (
    <Screen
      title="Take the wheel"
      subtitle="A few details before your first shared journey."
      back
    >
      <StatusBadge label="STEP 1 OF 2 · DRIVER PROFILE" tone="amber" />
      <Notice text="Use sample details only. No identity documents are uploaded and no real verification takes place." />
      <Card>
        <CustomInput label="Driver name" value={name} onChangeText={setName} />
        <CustomInput
          label="Sample driving licence number"
          value={license}
          onChangeText={setLicense}
          placeholder="DEMO-123456"
        />
        <CustomInput
          label="Years of driving experience"
          value={years}
          onChangeText={setYears}
          keyboardType="number-pad"
        />
        <Row>
          <Switch
            accessibilityLabel="Agree to safe and respectful journeys"
            value={agree}
            onValueChange={setAgree}
          />
          <T style={[s.muted, { flex: 1 }]}>
            I agree to offer safe, respectful shared journeys.
          </T>
        </Row>
        {error && <Notice error text={error} />}
        <Button
          label="Continue to vehicle registration"
          onPress={() => {
            if (
              name.trim().length < 2 ||
              license.trim().length < 6 ||
              !years.trim() ||
              !Number.isInteger(Number(years)) ||
              Number(years) < 0 ||
              Number(years) > 70 ||
              !agree
            ) {
              setError(
                "Complete all fields with valid sample details and accept the journey guidelines.",
              );
              return;
            }
            setDriverJoined(true);
            router.push("/driver/vehicle-form");
          }}
        />
      </Card>
    </Screen>
  );
}

