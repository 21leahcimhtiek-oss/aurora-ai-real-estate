import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAppStore } from "../../store";
import { PRIMARY_COLOR, DARK_BG, CARD_BG, BORDER_COLOR, TEXT_SECONDARY } from "../../constants/config";
import { aiService } from "../../services/ai";
const PROMPTS = ["Create a plan for me", "What should I focus on today?", "Give me your top tips", "Help me get started", "Analyze my situation", "What mistakes to avoid?"];
export default function HomeScreen() {
  const { user, chatMessages, addChatMessage, setLoading, isLoading } = useAppStore();
  const router = useRouter();
  const [input, setInput] = useState("");
  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isLoading) return;
    if (user.tier === "free" && user.usageCount >= user.freeLimit) { router.push("/subscription"); return; }
    setInput("");
    addChatMessage({ id: Date.now().toString(), role: "user", content: msg, timestamp: new Date().toISOString() });
    setLoading(true);
    try {
      const reply = await aiService.chat(msg, chatMessages.slice(-6).map(m => ({ role: m.role, content: m.content })));
      addChatMessage({ id: (Date.now()+1).toString(), role: "assistant", content: reply, timestamp: new Date().toISOString() });
    } finally { setLoading(false); }
  };
  return (
    <View style={{ flex: 1, backgroundColor: DARK_BG }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, paddingTop: 56 }}>
        <View><Text style={{ fontSize: 22, fontWeight: "700", color: "#fff" }}>Hello, {user.name || "there"} 🏠</Text><Text style={{ fontSize: 13, color: TEXT_SECONDARY }}>AI Assistant</Text></View>
        <TouchableOpacity onPress={() => router.push("/subscription")} style={{ backgroundColor: PRIMARY_COLOR + "22", borderWidth: 1, borderColor: PRIMARY_COLOR, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 }}><Text style={{ color: PRIMARY_COLOR, fontSize: 12, fontWeight: "700" }}>{user.tier === "free" ? "⚡ Upgrade" : "✨ " + user.tier.toUpperCase()}</Text></TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1, padding: 16 }} showsVerticalScrollIndicator={false}>
        {chatMessages.length === 0 && (
          <View style={{ alignItems: "center", paddingTop: 40 }}>
            <Text style={{ fontSize: 64, marginBottom: 16 }}>🏠</Text>
            <Text style={{ fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 8 }}>Ask me anything</Text>
            <Text style={{ fontSize: 14, color: TEXT_SECONDARY, textAlign: "center", marginBottom: 32 }}>Your personal AI coach is ready</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {PROMPTS.map(p => (<TouchableOpacity key={p} onPress={() => send(p)} style={{ backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER_COLOR, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8 }}><Text style={{ color: "#ccc", fontSize: 13 }}>{p}</Text></TouchableOpacity>))}
            </View>
          </View>
        )}
        {chatMessages.map(m => (<View key={m.id} style={{ padding: 14, borderRadius: 16, marginBottom: 10, maxWidth: "88%", alignSelf: m.role === "user" ? "flex-end" : "flex-start", backgroundColor: m.role === "user" ? PRIMARY_COLOR : CARD_BG, borderWidth: m.role === "assistant" ? 1 : 0, borderColor: BORDER_COLOR }}>{m.role === "assistant" && <Text style={{ fontSize: 11, color: TEXT_SECONDARY, marginBottom: 4 }}>🏠 AI</Text>}<Text style={{ color: "#fff", fontSize: 15, lineHeight: 22 }}>{m.content}</Text></View>))}
        {isLoading && <View style={{ padding: 14, borderRadius: 16, marginBottom: 10, maxWidth: "60%", backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER_COLOR }}><Text style={{ color: TEXT_SECONDARY }}>🏠 Thinking...</Text></View>}
      </ScrollView>
      <View style={{ flexDirection: "row", padding: 16, paddingBottom: 32, gap: 10, borderTopWidth: 1, borderTopColor: BORDER_COLOR }}>
        <TextInput style={{ flex: 1, backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER_COLOR, borderRadius: 24, paddingHorizontal: 18, paddingVertical: 12, color: "#fff", fontSize: 15 }} placeholder="Ask your AI coach..." placeholderTextColor="#555" value={input} onChangeText={setInput} />
        <TouchableOpacity onPress={() => send()} style={{ backgroundColor: PRIMARY_COLOR, width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" }}><Ionicons name="send" size={20} color="#fff" /></TouchableOpacity>
      </View>
    </View>
  );
}