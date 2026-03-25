import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PRIMARY_COLOR, DARK_BG, CARD_BG, BORDER_COLOR, TEXT_SECONDARY, APP_DOMAIN, SUPPORT_EMAIL } from "../../constants/config";
import { useAppStore } from "../../store";
export default function ProfileScreen() {
  const { user, logout } = useAppStore() as any;
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: DARK_BG }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 56 }} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <View style={{ width: 88, height: 88, borderRadius: 44, backgroundColor: PRIMARY_COLOR + "33", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><Text style={{ fontSize: 40 }}>🏠</Text></View>
          <Text style={{ fontSize: 22, fontWeight: "700", color: "#fff" }}>{user.name || "User"}</Text>
          <Text style={{ color: TEXT_SECONDARY, marginTop: 4 }}>{user.email}</Text>
          <View style={{ backgroundColor: PRIMARY_COLOR + "22", borderWidth: 1, borderColor: PRIMARY_COLOR, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, marginTop: 10 }}><Text style={{ color: PRIMARY_COLOR, fontWeight: "700" }}>{user.tier.toUpperCase()} PLAN</Text></View>
        </View>
        {[{ icon: "diamond", label: "Upgrade to Premium", h: true, action: () => router.push("/subscription") }, { icon: "notifications-outline", label: "Notifications", h: false, action: () => {} }, { icon: "lock-closed-outline", label: "Privacy Policy", h: false, action: () => {} }, { icon: "help-circle-outline", label: "Help & Support", h: false, action: () => {} }, { icon: "star-outline", label: "Rate the App", h: false, action: () => {} }, { icon: "log-out-outline", label: "Sign Out", h: false, action: () => { if(typeof logout==="function") logout(); router.replace("/(auth)"); } }].map(item => (
          <TouchableOpacity key={item.label} onPress={item.action} style={{ flexDirection: "row", alignItems: "center", backgroundColor: item.h ? PRIMARY_COLOR + "22" : CARD_BG, borderWidth: 1, borderColor: item.h ? PRIMARY_COLOR : BORDER_COLOR, borderRadius: 12, padding: 16, marginBottom: 10 }}>
            <Ionicons name={item.icon as any} size={20} color={item.h ? PRIMARY_COLOR : TEXT_SECONDARY} style={{ marginRight: 14 }} />
            <Text style={{ flex: 1, color: item.h ? PRIMARY_COLOR : "#fff", fontWeight: item.h ? "700" : "400" }}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={16} color="#555" />
          </TouchableOpacity>
        ))}
        <Text style={{ textAlign: "center", color: "#444", fontSize: 11, marginTop: 16 }}>v1.0.0 | {APP_DOMAIN}</Text>
      </ScrollView>
    </View>
  );
}