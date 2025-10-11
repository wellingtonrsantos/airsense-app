import { WeatherData } from "@/types/airQuality";
import { Droplets, Thermometer } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export const WeatherInfo: React.FC<WeatherData> = ({
  temperature,
  humidity,
}) => {
  return (
    <View style={styles.weatherContainer}>
      <View style={styles.weatherItem}>
        <Thermometer size={20} color="#666" strokeWidth={2} />
        <Text style={styles.weatherValue}>{temperature}°C</Text>
        <Text style={styles.weatherLabel}>Temperatura</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.weatherItem}>
        <Droplets size={20} color="#666" strokeWidth={2} />
        <Text style={styles.weatherValue}>{humidity}%</Text>
        <Text style={styles.weatherLabel}>Umidade</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherItem: {
    alignItems: "center",
    flex: 1,
  },
  weatherValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginTop: 8,
    marginBottom: 4,
  },
  weatherLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
    textAlign: "center",
  },
  separator: {
    width: 1,
    height: 40,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 20,
  },
});
