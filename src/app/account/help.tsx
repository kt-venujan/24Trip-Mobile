import { useState } from "react";
import { Pressable } from "react-native";
import {
  Button,
  Card,
  CustomInput,
  Notice,
  Screen,
  s,
  T,
} from "@/components/ui/kit";
export default function Help() {
  const [open, setOpen] = useState(-1);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  return (
    <Screen
      title="A helping hand"
      subtitle="Let’s make your journey a little easier."
      back
    >
      {[
        [
          "How do I book a seat?",
          "Find a ride, open its details, choose available seats and confirm your demo booking.",
        ],
        [
          "Can I cancel my booking?",
          "Open My Bookings, view an upcoming booking, and choose Cancel booking. In this demo, your seats become available immediately.",
        ],
        [
          "How do fare requests work?",
          "Open a ride and choose Request a different fare. Your sample offer appears under Profile → My fare requests.",
        ],
        [
          "Is this a real reservation?",
          "No. All trips, driver profiles, prices and confirmations are examples. No payment is taken.",
        ],
      ].map(([question, answer], i) => (
        <Card key={question}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: open === i }}
            onPress={() => setOpen(open === i ? -1 : i)}
            style={{ minHeight: 44, justifyContent: "center" }}
          >
            <T style={{ fontWeight: "700" }}>
              {question} {open === i ? "−" : "+"}
            </T>
          </Pressable>
          {open === i && <T style={s.muted}>{answer}</T>}
        </Card>
      ))}
      <Card>
        <T style={s.heading}>Leave a demo support message</T>
        <CustomInput
          label="How can we help?"
          multiline
          value={message}
          onChangeText={setMessage}
          style={{ minHeight: 110, textAlignVertical: "top" }}
        />
        {notice && <Notice text={notice} />}
        <Button
          label="Preview support request"
          onPress={() =>
            setNotice(
              message.trim().length < 10
                ? "Please describe your question in at least 10 characters."
                : "Your demo request is ready. No message has been sent to a support team.",
            )
          }
        />
      </Card>
    </Screen>
  );
}

