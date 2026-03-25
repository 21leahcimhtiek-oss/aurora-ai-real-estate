import React from "react";
import { View, Text, ScrollView } from "react-native";
import { PRIMARY_COLOR, DARK_BG, CARD_BG, BORDER_COLOR, TEXT_SECONDARY } from "../../constants/config";
import { useAppStore } from "../../store";
export default function ProgressScreen() {
  const { user, chatMessages } = useAppStore();
  const stats = [{ label: "Sessions", value: chatMessages.filter(m=>m.role==="user").length.toString(), emoji: "💬" }, { label: "Plan", value: user.tier.toUpperCase(), emoji: "⭐" }, { label: "Streak", value: "7 days", emoji: "🔥" }, { label: "Score", value: "94%", emoji: "📈" }];
  return (
    <View style={{ flex: 1, backgroundColor: DARK_BG }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 56 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 28, fontWeight: "800", color: "#fff", marginBottom: 4 }}>Progress</Text>
        <Text style={{ fontSize: 14, color: TEXT_SECONDARY, marginBottom: 24 }}>Your journey so far</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          {stats.map(s => (<View key={s.label} style={{ width: "47%", backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER_COLOR, borderRadius: 14, padding: 20, alignItems: "center" }}><Text style={{ fontSize: 32, marginBottom: 8 }}>{s.emoji}</Text><Text style={{ fontSize: 24, fontWeight: "800", color: PRIMARY_COLOR }}>{s.value}</Text><Text style={{ fontSize: 12, color: TEXT_SECONDARY, marginTop: 4 }}>{s.label}</Text></View>))}
        </View>
        <View style={{ backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER_COLOR, borderRadius: 14, padding: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff", marginBottom: 16 }}>📊 Weekly Activity</Text>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => (<View key={d} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}><Text style={{ width: 36, color: TEXT_SECONDARY, fontSize: 12 }}>{d}</Text><View style={{ flex: 1, height: 8, backgroundColor: "#1E1E2E", borderRadius: 4, overflow: "hidden" }}><View style={{ width: `${[80,60,90,45,70,85,30][i]}%`, height: "100%", backgroundColor: PRIMARY_COLOR, borderRadius: 4 }} /></View></View>))}
        </View>
      </ScrollView>
    </View>
  );
}