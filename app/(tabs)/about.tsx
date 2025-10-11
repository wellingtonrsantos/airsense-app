import {
  AlertTriangle,
  BarChart3,
  Globe,
  Info,
  Layers,
} from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Info size={28} color="#FF6B35" strokeWidth={2} />
          </View>
          <Text style={styles.headerTitle}>Sobre o AirSense</Text>
        </View>

        {/* Sistema Distribuído Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Layers size={20} color="#FF6B35" strokeWidth={2} />
            <Text style={styles.sectionTitle}>
              Sistema Distribuído AirSense
            </Text>
          </View>
          <Text style={styles.sectionText}>
            O aplicativo AirSense foi desenvolvido como um projeto de Atividades
            Práticas Supervisionadas (APS) para a disciplina de Desenvolvimento
            de Sistemas Distribuídos (DSD).
          </Text>
          <Text style={styles.sectionText}>
            Seu objetivo é gerenciar e exibir informações ambientais urbanas
            sobre a qualidade do ar em tempo real, fornecendo alertas de saúde
            para o usuário.
          </Text>
        </View>

        {/* Arquitetura Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={20} color="#FF6B35" strokeWidth={2} />
            <Text style={styles.sectionTitle}>Arquitetura de Três Camadas</Text>
          </View>

          <View style={styles.layerCard}>
            <Text style={styles.layerTitle}>1. Interface Mobile (Cliente)</Text>
            <Text style={styles.layerText}>
              Desenvolvida em React Native, coleta a localização do usuário
              (latitude e longitude).
            </Text>
          </View>

          <View style={styles.layerCard}>
            <Text style={styles.layerTitle}>
              2. API Mobile (Gateway Intermediário)
            </Text>
            <Text style={styles.layerText}>
              Backend em Node.js (Express/TypeScript) que atua como proxy,
              processando e formatando os dados.
            </Text>
          </View>

          <View style={styles.layerCard}>
            <Text style={styles.layerTitle}>3. Web Service API Destino</Text>
            <Text style={styles.layerText}>
              Dados consumidos da World Air Quality Index (WAQI), incluindo
              medições da CETESB.
            </Text>
          </View>
        </View>

        {/* AQI Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Globe size={20} color="#FF6B35" strokeWidth={2} />
            <Text style={styles.sectionTitle}>
              Índice de Qualidade do Ar (AQI)
            </Text>
          </View>
          <Text style={styles.sectionText}>
            O valor AQI é calculado com base no padrão da US-EPA (Agência de
            Proteção Ambiental dos Estados Unidos), internacionalmente
            reconhecido.
          </Text>
          <Text style={styles.sectionText}>
            Nossa classificação (BOM, MODERADO, RUIM, etc.) segue a escala
            US-EPA 2016 para maior rigor em alertas de saúde.
          </Text>
        </View>

        {/* Aviso Section */}
        <View style={styles.warningSection}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={20} color="#FFC107" strokeWidth={2} />
            <Text style={styles.sectionTitle}>Aviso Importante</Text>
          </View>
          <Text style={styles.sectionText}>
            Em alguns casos, o valor AQI pode resultar em um status de risco
            diferente do órgão local. Essa diferença se deve ao padrão de
            cálculo US-EPA, que prioriza alertas de saúde mais rigorosos.
          </Text>
        </View>

        {/* Dados Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={20} color="#FF6B35" strokeWidth={2} />
            <Text style={styles.sectionTitle}>Dados Exibidos</Text>
          </View>

          <View style={styles.dataCard}>
            <Text style={styles.dataTitle}>Poluentes</Text>
            <Text style={styles.dataText}>
              Exibimos dinamicamente todos os poluentes reportados, incluindo
              PM2.5, CO, PM10 e Ozônio (O3), destacando o Poluente Dominante.
            </Text>
          </View>

          <View style={styles.dataCard}>
            <Text style={styles.dataTitle}>Recomendações</Text>
            <Text style={styles.dataText}>
              As frases de alerta são baseadas nas diretrizes de saúde do
              US-EPA, auxiliando na tomada de decisões sobre atividades ao ar
              livre.
            </Text>
          </View>
        </View>

        {/* Footer spacing */}
        <View style={styles.footer} />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerIcon: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  warningSection: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: "#FFF9E6",
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#FFC107",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#666",
    marginBottom: 12,
  },
  layerCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#FF6B35",
  },
  layerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  layerText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
  },
  dataCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B35",
    marginBottom: 8,
  },
  dataText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
  },
  footer: {
    height: 20,
  },
});
