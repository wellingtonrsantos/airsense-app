import { AQIStatus, Pollutant } from "@/types/airQuality";
import { getPollutantName } from "@/utils/statusMapper";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PollutantCardProps {
  pollutant: Pollutant;
  isHighlighted?: boolean;
  aqiStatus?: AQIStatus;
}

export const PollutantCard: React.FC<PollutantCardProps> = ({
  pollutant,
  isHighlighted = false,
  aqiStatus,
}) => {
  const highlightColor = aqiStatus?.color || "#FF6B35";

  return (
    <View
      style={[
        styles.pollutantCard,
        isHighlighted && { backgroundColor: highlightColor },
      ]}
    >
      <Text
        style={[
          styles.pollutantValue,
          isHighlighted && styles.pollutantValueHighlighted,
        ]}
      >
        {pollutant.value}{" "}
        <Text style={styles.pollutantUnit}>{pollutant.unit}</Text>
      </Text>
      <Text
        style={[
          styles.pollutantLabel,
          isHighlighted && styles.pollutantLabelHighlighted,
        ]}
      >
        {getPollutantName(pollutant.id)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
    minWidth: 100,
  },
  pollutantValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
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
    textAlign: "center",
  },
  pollutantLabelHighlighted: {
    color: "#FFFFFF",
  },
});
