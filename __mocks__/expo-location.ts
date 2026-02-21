export const requestForegroundPermissionsAsync = jest.fn().mockResolvedValue({ status: "granted" });
export const getCurrentPositionAsync = jest.fn().mockResolvedValue({
  coords: {
    latitude: 0,
    longitude: 0,
  }
});
export const getLastKnownPositionAsync = jest.fn().mockResolvedValue({
  coords: {
    latitude: 0,
    longitude: 0,
  },
  timestamp: Date.now()
});
export const reverseGeocodeAsync = jest.fn().mockResolvedValue([{
  city: "Test City",
  region: "Test Region"
}]);
