import { Tabs } from "expo-router";
import { Home } from "lucide-react-native";

function HomeIcon({ size, color }: { size: number; color: string }) {
  return <Home size={size} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none", // Hide tab bar for single screen focus
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
    </Tabs>
  );
}
