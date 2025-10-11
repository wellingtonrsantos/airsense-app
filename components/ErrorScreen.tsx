import {
  AlertCircle,
  MapPinOff,
  ServerCrash,
  WifiOff,
} from "lucide-react-native";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ErrorType = "network" | "server" | "permission" | "generic";

interface ErrorScreenProps {
  message?: string;
  onRetry: () => void;
  errorType?: ErrorType;
}

export type { ErrorType };

export function ErrorScreen({
  message = "Não foi possível carregar os dados",
  onRetry,
  errorType = "generic",
}: Readonly<ErrorScreenProps>) {
  const getErrorDetails = () => {
    switch (errorType) {
      case "network":
        return {
          Icon: WifiOff,
          emoji: "📡",
          hint: "Verifique sua conexão com a internet",
        };
      case "server":
        return {
          Icon: ServerCrash,
          emoji: "🔧",
          hint: "Nossos servidores estão temporariamente indisponíveis",
        };
      case "permission":
        return {
          Icon: MapPinOff,
          emoji: "📍",
          hint: "Para usar o app, precisamos que você ative a permissão de localização nas configurações do seu celular",
        };
      default:
        return {
          Icon: AlertCircle,
          emoji: "⚠️",
          hint: "Tente novamente em alguns instantes",
        };
    }
  };

  const { Icon, emoji, hint } = getErrorDetails();

  const handleOpenSettings = () => {
    Linking.openSettings();
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon size={48} color="#FF6B35" strokeWidth={2} />
      </View>

      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>Ops!</Text>
      <Text style={styles.message}>{message}</Text>

      {errorType === "permission" ? (
        <>
          {/* Botão Principal: Abrir Configurações */}
          <TouchableOpacity
            style={[styles.buttonBase, styles.buttonPrimary]}
            onPress={handleOpenSettings}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonTextPrimary}>Abrir Configurações</Text>
          </TouchableOpacity>

          {/* Botão Secundário: Tentar Novamente */}
          <TouchableOpacity
            style={[styles.buttonBase, styles.buttonSecondary]}
            onPress={onRetry}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonTextSecondary}>Tentar Novamente</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={[styles.buttonBase, styles.buttonPrimary]}
          onPress={onRetry}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonTextPrimary}>Tentar Novamente</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.hint}>{hint}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFF0EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  hint: {
    fontSize: 13,
    color: "#999",
    marginTop: 16,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  buttonBase: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    width: "85%",
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: "#FF6B35",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonSecondary: {
    marginTop: 12,
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#FF6B35",
  },
  buttonTextPrimary: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextSecondary: {
    color: "#FF6B35",
    fontSize: 16,
    fontWeight: "600",
  },
});
