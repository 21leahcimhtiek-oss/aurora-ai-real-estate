import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { CARD_BG, PRIMARY_COLOR } from "../../constants/config";
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: CARD_BG, borderTopColor: "#1E1E2E", height: 64, paddingBottom: 8 }, tabBarActiveTintColor: PRIMARY_COLOR, tabBarInactiveTintColor: "#555", tabBarLabelStyle: { fontSize: 11, fontWeight: "600" } }}>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="features" options={{ title: "Features", tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="progress" options={{ title: "Progress", tabBarIcon: ({ color, size }) => <Ionicons name="trending-up-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
    </Tabs>
  );
}