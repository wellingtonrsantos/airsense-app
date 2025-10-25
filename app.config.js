const dotenv = require("dotenv");
dotenv.config();

const HOST_IP = process.env.HOST_IP_ADDRESS;
const HOST_PORT = 3000;

const BASE_URL_MOBILE = `http://${HOST_IP}:${HOST_PORT}`;
const BASE_URL_DOCKER_INTERNAL = `http://host.docker.internal:${HOST_PORT}`;

module.exports = {
  expo: {
    name: "airsense-app",
    slug: "airsense-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/airsense-logo.jpg",
    scheme: "airsenseapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    extra: {
      HOST_API_URL: BASE_URL_MOBILE,
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true,
        },
        NSLocationWhenInUseUsageDescription:
          "Precisamos da sua localização para fornecer dados precisos sobre a qualidade do ar na sua região.",
      },
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      permissions: [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
      ],
    },
    web: {
      output: "static",
      bundler: "metro",
      proxy: {
        "/air-quality": BASE_URL_DOCKER_INTERNAL,
      },
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Permitir que o app use sua localização para obter dados da qualidade do ar.",
        },
      ],
      "expo-web-browser",
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};
