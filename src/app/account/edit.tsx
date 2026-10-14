import { useState } from "react";
import { Button, Card, CustomInput, Notice, Screen } from "@/components/ui/kit";
import { useDemo } from "@/hooks/use-demo";
import { validEmail } from "@/utils/format";
export default function EditProfile() {
  const { profile, setProfile } = useDemo();
  const [draft, setDraft] = useState(profile);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  return (
    <Screen
      title="Make yourself at home"
      subtitle="Your profile, your details."
      back
    >
      <Card>
        {(["name", "email", "phone", "city"] as const).map((key) => (
          <CustomInput
            key={key}
            label={
              {
                name: "Full name",
                email: "Email address",
                phone: "Phone number",
                city: "Home city",
              }[key]
            }
            value={draft[key]}
            onChangeText={(value) => {
              setDraft({ ...draft, [key]: value });
              setSaved(false);
            }}
            keyboardType={
              key === "email"
                ? "email-address"
                : key === "phone"
                  ? "phone-pad"
                  : "default"
            }
            autoCapitalize={key === "email" ? "none" : "words"}
          />
        ))}
        {error && <Notice error text={error} />}
        {saved && (
          <Notice text="Your demo profile has been updated. Changes last until the app reloads." />
        )}
        <Button
          label="Save profile"
          onPress={() => {
            if (
              draft.name.trim().length < 2 ||
              !draft.city.trim() ||
              !validEmail(draft.email) ||
              draft.phone.replace(/\D/g, "").length < 9
            ) {
              setError(
                "Enter a name, valid email, phone number (at least 9 digits), and city.",
              );
              return;
            }
            setProfile({
              ...draft,
              name: draft.name.trim(),
              email: draft.email.trim(),
              city: draft.city.trim(),
            });
            setError("");
            setSaved(true);
          }}
        />
      </Card>
    </Screen>
  );
}

