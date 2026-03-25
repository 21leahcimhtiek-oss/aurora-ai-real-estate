import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAppStore } from "../store";
import { PRIMARY_COLOR, DARK_BG, CARD_BG, BORDER_COLOR, TEXT_SECONDARY, SUBSCRIPTION_PLANS, APP_DOMAIN } from "../constants/config";
export default function SubscriptionScreen() {
  const router = useRouter();
  const { setUser } = useAppStore();
  const [annual, setAnnual] = useState(false);
  const [selected, setSelected] = useState("premium");
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === selected)!;
  const price = (annual ? plan.annualPrice : plan.monthlyPrice).toFixed(2);
  return (
    <View style={{ flex: 1, backgroundColor: DARK_BG }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={{ alignItems: "center", padding: 24, paddingTop: 56 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ position: "absolute", top: 16, right: 16 }}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
          <Text style={{ fontSize: 56, marginBottom: 12 }}>🏠</Text>
          <Text style={{ fontSize: 28, fontWeight: "800", color: "#fff", textAlign: "center" }}>Go Premium</Text>
          <Text style={{ fontSize: 15, color: TEXT_SECONDARY, marginTop: 8 }}>Unlock unlimited AI access</Text>
        </View>
        <View style={{ flexDirection: "row", backgroundColor: CARD_BG, margin: 16, borderRadius: 12, padding: 4 }}>
          <TouchableOpacity onPress={() => setAnnual(false)} style={{ flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10, backgroundColor: !annual ? PRIMARY_COLOR : "transparent" }}><Text style={{ color: "#fff", fontWeight: "600" }}>Monthly</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setAnnual(true)} style={{ flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10, backgroundColor: annual ? PRIMARY_COLOR : "transparent", flexDirection: "row", justifyContent: "center", gap: 6 }}><Text style={{ color: "#fff", fontWeight: "600" }}>Annual</Text><View style={{ backgroundColor: "#10B981", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 }}><Text style={{ color: "#fff", fontSize: 10, fontWeight: "700" }}>-25%</Text></View></TouchableOpacity>
        </View>
        {SUBSCRIPTION_PLANS.map(p => (
          <TouchableOpacity key={p.id} onPress={() => setSelected(p.id)} style={{ margin: 16, marginTop: 8, backgroundColor: CARD_BG, borderWidth: 2, borderColor: selected === p.id ? PRIMARY_COLOR : BORDER_COLOR, borderRadius: 16, padding: 20 }}>
            {p.popular && <View style={{ backgroundColor: PRIMARY_COLOR, alignSelf: "flex-start", borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 12 }}><Text style={{ color: "#fff", fontSize: 11, fontWeight: "800" }}>MOST POPULAR</Text></View>}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <View><Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}>{p.name}</Text><Text style={{ fontSize: 22, fontWeight: "800", color: PRIMARY_COLOR }}>${(annual ? p.annualPrice : p.monthlyPrice).toFixed(2)}/mo</Text></View>
              <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: selected === p.id ? PRIMARY_COLOR : "#555", alignItems: "center", justifyContent: "center" }}>{selected === p.id && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: PRIMARY_COLOR }} />}</View>
            </View>
          </TouchableOpacity>
        ))}
        <Text style={{ textAlign: "center", color: "#6B7280", fontSize: 12, padding: 16 }}>🔒 Secure • Cancel anytime • {APP_DOMAIN}</Text>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 32, backgroundColor: DARK_BG, borderTopWidth: 1, borderTopColor: BORDER_COLOR }}>
        <TouchableOpacity onPress={() => { setUser({ tier: selected as any, freeLimit: 9999 }); router.back(); }} style={{ backgroundColor: PRIMARY_COLOR, paddingVertical: 18, borderRadius: 14, alignItems: "center" }}><Text style={{ color: "#fff", fontSize: 17, fontWeight: "800" }}>Start Free Trial — ${price}/mo</Text></TouchableOpacity>
        <Text style={{ color: "#6B7280", fontSize: 11, textAlign: "center", marginTop: 8 }}>7-day free trial, then ${price}/mo. Cancel anytime.</Text>
      </View>
    </View>
  );
}