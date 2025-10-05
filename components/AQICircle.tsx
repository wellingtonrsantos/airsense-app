import { AQIStatus } from "@/types/airQuality";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AQICircleProps {
  aqi: number;
  status: AQIStatus;
}

export const AQICircle: React.FC<AQICircleProps> = ({ aqi, status }) => {
  // Gera cores do gradiente baseado na cor principal do status
  const getGradientColors = (color: string) => {
    // Para simplificar, vamos usar variações da cor principal
    switch (color) {
      case "#4CAF50": // BOM
        return ["#66BB6A", "#4CAF50", "#388E3C"] as const;
      case "#FFC107": // MODERADO
        return ["#FFD54F", "#FFC107", "#FFA000"] as const;
      case "#FF6B35": // RUIM
        return ["#FF7A45", "#FF6B35", "#FF5722"] as const;
      case "#F44336": // MUITO RUIM
        return ["#EF5350", "#F44336", "#D32F2F"] as const;
      case "#9C27B0": // PERIGOSO
        return ["#AB47BC", "#9C27B0", "#7B1FA2"] as const;
      default:
        return ["#FF7A45", "#FF6B35", "#FF5722"] as const;
    }
  };

  return (
    <View style={styles.circleContainer}>
      <LinearGradient
        colors={getGradientColors(status.color)}
        style={styles.aqiCircle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.aqiValue}>{aqi}</Text>
        <Text style={styles.aqiStatus}>{status.status}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
