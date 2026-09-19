// utils/toastConfig.js
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#22C55E", backgroundColor: "#F0FDF4" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        color: "#166534",
      }}
      text2Style={{
        fontSize: 14,
        color: "#14532D",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#EF4444", backgroundColor: "#FEF2F2" }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        color: "#991B1B",
      }}
      text2Style={{
        fontSize: 14,
        color: "#7F1D1D",
      }}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#3B82F6", backgroundColor: "#EFF6FF" }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        color: "#1E3A8A",
      }}
      text2Style={{
        fontSize: 14,
        color: "#1E40AF",
      }}
    />
  ),
};
