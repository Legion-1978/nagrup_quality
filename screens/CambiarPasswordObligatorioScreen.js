import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { useAuth } from "../context/AuthContext";
import { mostrarMensaje } from "../utils/mensajes";

// Pantalla intermedia: se muestra en vez del resto de la app cuando
// usuarioActual.debeCambiarPassword es true (por defecto, tras el
// primer login del admin con la contraseña de fábrica).
export default function CambiarPasswordObligatorioScreen() {
  const { cambiarPasswordPropia, logout } = useAuth();

  const [passwordNueva, setPasswordNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [guardando, setGuardando] = useState(false);

  const guardar = async () => {
    if (passwordNueva.length < 6) {
      mostrarMensaje("info", "Validación", "La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (passwordNueva !== confirmar) {
      mostrarMensaje("info", "Validación", "Las contraseñas no coinciden");
      return;
    }

    setGuardando(true);

    const ok = await cambiarPasswordPropia(passwordNueva);

    setGuardando(false);

    if (!ok) {
      mostrarMensaje("error", "Error", "No se pudo actualizar la contraseña");
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Cambia tu contraseña</Text>

        <Text style={styles.subtitle}>
          Por seguridad, antes de continuar debes sustituir la
          contraseña por defecto por una propia.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          value={passwordNueva}
          onChangeText={setPasswordNueva}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          value={confirmar}
          onChangeText={setConfirmar}
        />

        <TouchableOpacity
          style={styles.button}
          disabled={guardando}
          onPress={guardar}
        >
          {guardando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Guardar y continuar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={logout}>
          <Text style={styles.logoutLink}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: 420,
    maxWidth: "95%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#16105A",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#16105A",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  logoutLink: {
    color: "#64748B",
    textAlign: "center",
    marginTop: 18,
    fontSize: 13,
  },
});
