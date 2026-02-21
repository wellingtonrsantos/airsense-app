import "@testing-library/jest-native/extend-expect";

// Mocking LinearGradient since it's a native component
jest.mock("expo-linear-gradient", () => {
  const React = require("react");
  const { View } = require("react-native");
  
  return {
    LinearGradient: ({ children, ...props }) => {
      // Retorna View ao invés do gradiente nativo que quebra no node env test
      return <View testID="linear-gradient" {...props}>{children}</View>;
    },
  };
});

// Mocking Lucide Icons that depend on react-native-svg
jest.mock("lucide-react-native", () => ({
  AlertCircle: "AlertCircle",
  MapPinOff: "MapPinOff",
  ServerCrash: "ServerCrash",
  WifiOff: "WifiOff"
}));

// Mocking expo-modules-core core features
jest.mock("expo-modules-core", () => {
  return {
    NativeModulesProxy: {},
    EventEmitter: class EventEmitter {
      addListener() {}
      removeListener() {}
      removeAllListeners() {}
    },
    LegacyEventEmitter: class LegacyEventEmitter {
      addListener() {}
      removeListener() {}
      removeAllListeners() {}
    },
    requireNativeViewManager: jest.fn(),
    requireNativeModule: jest.fn(),
    requireOptionalNativeModule: jest.fn(),
  };
});

