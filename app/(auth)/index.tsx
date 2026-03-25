import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAppStore } from "../../store";
import { PRIMARY_COLOR, DARK_BG, CARD_BG, BORDER_COLOR, TEXT_SECONDARY, APP_NAME, APP_DOMAIN } from "../../constants/config";
export default function AuthScreen() {
  const router = useRouter();
  const { setUser } = useAppStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <View style={{ flex: 1, backgroundColor: DARK_BG }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 80, alignItems: "center" }}>
        <Text style={{ fontSize: 72, marginBottom: 16 }}>🏠</Text>
        <Text style={{ fontSize: 30, fontWeight: "800", color: "#fff", textAlign: "center", marginBottom: 8 }}>{APP_NAME}</Text>
        <Text style={{ fontSize: 15, color: TEXT_SECONDARY, textAlign: "center", marginBottom: 32 }}>Your AI-powered assistant</Text>
        {step === 0 ? (
          <TouchableOpacity style={{ backgroundColor: PRIMARY_COLOR, padding: 18, borderRadius: 14, alignItems: "center", width: "100%" }} onPress={() => setStep(1)}>
            <Text style={{ color: "#fff", fontSize: 17, fontWeight: "700" }}>Get Started Free ✨</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: "100%" }}>
            <TextInput style={{ backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER_COLOR, borderRadius: 12, padding: 16, color: "#fff", marginBottom: 12, fontSize: 16 }} placeholder="Your name" placeholderTextColor="#555" value={name} onChangeText={setName} autoFocus />
            <TextInput style={{ backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER_COLOR, borderRadius: 12, padding: 16, color: "#fff", fontSize: 16 }} placeholder="Email address" placeholderTextColor="#555" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TouchableOpacity style={{ backgroundColor: PRIMARY_COLOR, padding: 18, borderRadius: 14, alignItems: "center", marginTop: 20 }} onPress={() => { if (name && email) { setUser({ name, email, isAuthenticated: true }); router.replace("/(tabs)"); } }}>
              <Text style={{ color: "#fff", fontSize: 17, fontWeight: "700" }}>Start Free Trial 🚀</Text>
            </TouchableOpacity>
          </View>
        )}
        <Text style={{ color: "#444", fontSize: 11, textAlign: "center", marginTop: 24 }}>Terms and Privacy Policy | {APP_DOMAIN}</Text>
      </ScrollView>
    </View>
  );
}