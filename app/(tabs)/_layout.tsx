import { Tabs } from "expo-router";
import { Home, Info } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function HomeIcon({ size, color }: { size: number; color: string }) {
  return <Home size={size} color={color} />;
}

function InfoIcon({ size, color }: { size: number; color: string }) {
  return <Info size={size} color={color} />;
}

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF6B35",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E0E0E0",
          paddingTop: 8,
          paddingBottom: bottom + 8,
          height: 60 + bottom,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Qualidade do Ar",
          tabBarIcon: HomeIcon,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "Sobre",
          tabBarIcon: InfoIcon,
        }}
      />
    </Tabs>
  );
}
