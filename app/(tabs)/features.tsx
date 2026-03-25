import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PRIMARY_COLOR, DARK_BG, CARD_BG, BORDER_COLOR, TEXT_SECONDARY } from "../../constants/config";
export default function FeaturesScreen() {
  const router = useRouter();
  const items = [{ icon: "star", title: "AI-Powered Intelligence", desc: "GPT-4o AI provides personalized recommendations" }, { icon: "flash", title: "Instant Results", desc: "Get actionable insights in seconds" }, { icon: "shield-checkmark", title: "Privacy First", desc: "Your data is encrypted and never shared" }, { icon: "trending-up", title: "Track Progress", desc: "Visual dashboards to monitor your growth" }, { icon: "infinite", title: "Always Available", desc: "24/7 AI support whenever you need it" }];
  return (
    <View style={{ flex: 1, backgroundColor: DARK_BG }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 56 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 28, fontWeight: "800", color: "#fff", marginBottom: 4 }}>Features</Text>
        <Text style={{ fontSize: 14, color: TEXT_SECONDARY, marginBottom: 24 }}>Powered by GPT-4o AI</Text>
        {items.map((item, i) => (<View key={i} style={{ flexDirection: "row", alignItems: "center", backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER_COLOR, borderRadius: 14, padding: 16, marginBottom: 12 }}><View style={{ backgroundColor: PRIMARY_COLOR + "22", width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", marginRight: 16 }}><Ionicons name={item.icon as any} size={22} color={PRIMARY_COLOR} /></View><View style={{ flex: 1 }}><Text style={{ fontSize: 16, fontWeight: "700", color: "#fff", marginBottom: 4 }}>{item.title}</Text><Text style={{ fontSize: 13, color: TEXT_SECONDARY }}>{item.desc}</Text></View></View>))}
        <TouchableOpacity onPress={() => router.push("/subscription")} style={{ backgroundColor: PRIMARY_COLOR, padding: 18, borderRadius: 14, alignItems: "center", marginTop: 8 }}><Text style={{ color: "#fff", fontSize: 17, fontWeight: "700" }}>Unlock Premium 🚀</Text></TouchableOpacity>
      </ScrollView>
    </View>
  );
}