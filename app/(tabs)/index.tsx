import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AQICircle = ({ value, status }: { value: number; status: string }) => {
  return (
    <View style={styles.circleContainer}>
      <LinearGradient
        colors={["#FF7A45", "#FF6B35", "#FF5722"]}
        style={styles.aqiCircle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.aqiValue}>{value}</Text>
        <Text style={styles.aqiStatus}>{status}</Text>
      </LinearGradient>
    </View>
  );
};

const PollutantCard = ({
  pollutant,
  value,
  unit,
  isHighlighted = false,
}: {
  pollutant: string;
  value: number;
  unit: string;
  isHighlighted?: boolean;
}) => {
  return (
    <View
      style={[
        styles.pollutantCard,
        isHighlighted && styles.pollutantCardHighlighted,
      ]}
    >
      <Text
        style={[
          styles.pollutantValue,
          isHighlighted && styles.pollutantValueHighlighted,
        ]}
      >
        {value} <Text style={styles.pollutantUnit}>{unit}</Text>
      </Text>
      <Text
        style={[
          styles.pollutantLabel,
          isHighlighted && styles.pollutantLabelHighlighted,
        ]}
      >
        {pollutant}
      </Text>
    </View>
  );
};

export default function AirQualityScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Qualidade do Ar em:{"\n"}Pinheiros, São Paulo
        </Text>
      </View>

      {/* Main AQI Indicator */}
      <View style={styles.statusSection}>
        <AQICircle value={102} status="RUIM" />
      </View>

      {/* Status and Recommendation */}
      <View style={styles.statusSection}>
        <Text style={styles.statusText}>RUIM</Text>
        <Text style={styles.recommendationText}>
          Pessoas sensíveis devem limitar{"\n"}atividades ao ar livre.
        </Text>
      </View>

      {/* Pollutants Section */}
      <View style={styles.pollutantsSection}>
        <View style={styles.pollutantsRow}>
          <PollutantCard
            pollutant="PM2.5"
            value={36}
            unit="μg/m³"
            isHighlighted={true}
          />
          <PollutantCard pollutant="PM10" value={55} unit="μg/m³" />
          <PollutantCard pollutant="O3" value={90} unit="μg/m³" />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Dados atualizados em 2025-09-30 | 19:50 BRT
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  // Header Styles
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    lineHeight: 24,
  },

  // Main Section Styles
  mainSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  circleContainer: {
    shadowColor: "#FF6B35",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  aqiCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  aqiValue: {
    fontSize: 64,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 70,
  },
  aqiStatus: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: -5,
  },

  // Status Section Styles
  statusSection: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  statusText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },

  // Pollutants Section Styles
  pollutantsSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  pollutantsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  pollutantCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pollutantCardHighlighted: {
    backgroundColor: "#FF6B35",
  },
  pollutantValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  pollutantValueHighlighted: {
    color: "#FFFFFF",
  },
  pollutantUnit: {
    fontSize: 14,
    fontWeight: "400",
  },
  pollutantLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  pollutantLabelHighlighted: {
    color: "#FFFFFF",
  },

  // Footer Styles
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
});
