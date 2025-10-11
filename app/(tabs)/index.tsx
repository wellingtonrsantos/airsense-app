import { AQICircle } from "@/components/AQICircle";
import { ErrorScreen } from "@/components/ErrorScreen";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PollutantCard } from "@/components/PollutantCard";
import { WeatherInfo } from "@/components/WeatherInfo";
import { fetchAirQualityData } from "@/services/airQualityService";
import { AirQualityData, getAQIStatus } from "@/types/airQuality";
import { getErrorMessage } from "@/utils/apiErrorHandler";
import { useEffect, useMemo, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Formatar data de atualização
const formatLastUpdate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
};

export default function AirQualityScreen() {
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setError(null);
      const data = await fetchAirQualityData();
      setAirQualityData(data);
    } catch (error: unknown) {
      const friendlyMessage = getErrorMessage(error);
      setError(friendlyMessage);
      console.error("Erro capturado na tela:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
  };

  const onRetry = async () => {
    setLoading(true);
    setError(null);
    await loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const pollutantRows = useMemo(() => {
    if (!airQualityData?.pollutants) return [];

    const rows = [];
    for (let i = 0; i < airQualityData.pollutants.length; i += 3) {
      rows.push(airQualityData.pollutants.slice(i, i + 3));
    }
    return rows;
  }, [airQualityData]);

  // Loading inicial
  if (loading) {
    return <LoadingScreen />;
  }

  // Tela de erro
  if (error) {
    return <ErrorScreen message={error} onRetry={onRetry} />;
  }

  // Fallback
  if (!airQualityData) {
    return <ErrorScreen message="Dados não disponíveis" onRetry={onRetry} />;
  }

  const aqiStatus = getAQIStatus(airQualityData.aqi);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Qualidade do Ar em:{"\n"}
            {airQualityData.location}
          </Text>
        </View>

        {/* Main AQI Indicator */}
        <View style={styles.mainSection}>
          <AQICircle aqi={airQualityData.aqi} status={aqiStatus} />
        </View>

        {/* Status and Recommendation */}
        <View style={styles.statusSection}>
          <Text style={styles.recommendationText}>
            {aqiStatus.recommendation}
          </Text>
        </View>

        {/* Weather Information */}
        <WeatherInfo
          temperature={airQualityData.weather.temperature}
          humidity={airQualityData.weather.humidity}
        />

        {/* Pollutants Section */}
        <View style={styles.pollutantsSection}>
          {pollutantRows.map((row) => {
            const rowKey = row.map((pollutant) => pollutant.id).join("-");

            return (
              <View key={rowKey} style={styles.pollutantsRow}>
                {row.map((pollutant) => (
                  <PollutantCard
                    key={pollutant.id}
                    pollutant={pollutant}
                    isHighlighted={
                      pollutant.id === airQualityData.dominantPollutant
                    }
                    aqiStatus={aqiStatus}
                  />
                ))}
              </View>
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Dados atualizados em {formatLastUpdate(airQualityData.lastUpdate)}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 50,
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

  // Status Section Styles
  statusSection: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  statusText: {
    fontSize: 24,
    fontWeight: "700",
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
    marginBottom: 12,
  },

  // Footer Styles
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
});
