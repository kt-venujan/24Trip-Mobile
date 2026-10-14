import { useState } from "react";
import { router } from "expo-router";
import {
  Brand,
  Button,
  Card,
  CustomInput,
  Notice,
  Screen,
} from "@/components/ui/kit";
import { useDemo } from "@/hooks/use-demo";
import { validEmail } from "@/utils/format";
export function AuthForm({ mode }: { mode: "login" | "register" | "forgot" }) {
  const { setSignedIn, setProfile } = useDemo();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  function submit() {
    if (mode === "register" && name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!validEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (mode !== "forgot" && password.length < 8) {
      setError("Use at least 8 characters for the demo password.");
      return;
    }
    if (mode === "register" && confirm !== password) {
      setError("Your passwords do not match.");
      return;
    }
    setError("");
    if (mode === "forgot") {
      setSent(true);
      return;
    }
    setProfile((prev) => ({
      ...prev,
      email: email.trim(),
      ...(mode === "register" ? { name: name.trim() } : {}),
    }));
    setSignedIn(true);
    setPassword("");
    setConfirm("");
    router.replace("/profile");
  }
  return (
    <Screen
      title={
        mode === "login"
          ? "Welcome back"
          : mode === "register"
            ? "Your journey starts here"
            : "Forgot your password?"
      }
      subtitle={
        mode === "forgot"
          ? "Try the password reset form."
          : "A shared journey is a better journey."
      }
      back
    >
      <Brand />
      <Notice text="Frontend demo only. Use made-up credentials. Nothing is authenticated, stored on a server, or sent by email." />
      <Card>
        {mode === "register" && (
          <CustomInput
            label="Full name"
            value={name}
            onChangeText={setName}
            autoComplete="name"
          />
        )}
        <CustomInput
          label="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        {mode !== "forgot" && (
          <>
            <CustomInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!show}
              autoCapitalize="none"
              autoComplete="off"
            />
            {mode === "register" && (
              <CustomInput
                label="Confirm password"
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={!show}
                autoCapitalize="none"
              />
            )}
            <Button
              secondary
              label={show ? "Hide password" : "Show password"}
              onPress={() => setShow(!show)}
            />
          </>
        )}
        {error && <Notice error text={error} />}
        {sent && (
          <Notice text="Demo reset requested. No email was sent. Return to sign-in to continue with any sample password of 8+ characters." />
        )}
        <Button
          label={
            mode === "login"
              ? "Sign in to demo"
              : mode === "register"
                ? "Create demo profile"
                : "Preview reset request"
          }
          onPress={submit}
        />
      </Card>
      {mode === "login" && (
        <>
          <Button
            secondary
            label="Forgot password?"
            onPress={() => router.push("/forgot-password")}
          />
          <Button
            secondary
            label="Create an account"
            onPress={() => router.push("/register")}
          />
        </>
      )}
      {mode !== "login" && (
        <Button
          secondary
          label="Back to sign in"
          onPress={() => router.replace("/login")}
        />
      )}
    </Screen>
  );
}

