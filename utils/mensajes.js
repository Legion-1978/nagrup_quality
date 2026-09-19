// utils/mensajes.js
import Toast from "react-native-toast-message";
import { Alert, Platform } from "react-native";

export function mostrarMensaje(tipo, titulo, mensaje) {
  if (Platform.OS === "web") {
    Toast.show({
      type: tipo, // "success" | "error" | "info"
      text1: titulo,
      text2: mensaje,
      position: "bottom",
    });
  } else {
    Alert.alert(titulo, mensaje);
  }
}