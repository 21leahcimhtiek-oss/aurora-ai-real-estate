import { Redirect } from "expo-router";
import { useAppStore } from "../store";
export default function Index() {
  const { user } = useAppStore();
  return user.isAuthenticated ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)" />;
}