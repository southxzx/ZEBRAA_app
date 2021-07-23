const checkDeviceForHardware = async () => {
  let compatible = await LocalAuthentication.hasHardwareAsync();
  return compatible;
}
const checkForBiometrics = async () => {
  let biometricRecords = await LocalAuthentication.isEnrolledAsync();
  return biometricRecords;
};
export const checkFingerprintAvailable = () => {
  const compatible = checkDeviceForHardware();
  const recorded = checkForBiometrics();
  return (compatible && recorded)
}
export const LocalAuthenticationOptions = {
  promptMessage: "Login for Zebraa"
}
