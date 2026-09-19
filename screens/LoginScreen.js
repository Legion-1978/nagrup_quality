import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";

import { useAuth } from "../context/AuthContext";
import { mostrarMensaje } from "../utils/mensajes";

export default function LoginScreen({ onLogin }) {
  const { login: loginContext } = useAuth();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Login
  const login = async () => {
    if (!usuario.trim() || !password.trim()) {
      mostrarMensaje("info", "Validación", "Introduce usuario y contraseña");
      return;
    }

    try {
      setLoading(true);

      const result = await loginContext(usuario.trim(), password);

      if (result?.ok) {
        onLogin();
        return;
      }

      // 🔹 Mensajes según motivo
      switch (result?.reason) {
        case "missing-fields":
          mostrarMensaje("info", "Validación", "Introduce usuario y contraseña");
          break;
        case "wrong-password":
          mostrarMensaje("error", "Error", "La contraseña no es correcta");
          break;
        case "user-not-found":
          mostrarMensaje("error", "Error", "El usuario no existe");
          break;
        case "inactive":
          mostrarMensaje("error", "Error", "Tu cuenta está desactivada");
          break;
        case "profile-error":
          mostrarMensaje("error", "Error", "No se pudo recuperar tu perfil");
          break;
        case "user-mismatch":
          mostrarMensaje("error", "Error", "El usuario autenticado no coincide con el perfil");
          break;
        case "unexpected-error":
          mostrarMensaje("error", "Error", "Ocurrió un error inesperado");
          break;
        default:
          mostrarMensaje("error", "Error", "No se pudo iniciar sesión");
      }
    } catch (error) {
      console.log(error);
      mostrarMensaje("error", "Error", "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

const { enviarCorreoResetPassword } = useAuth();

const handleReset = async () => {
  const resultado = await enviarCorreoResetPassword(usuario);
  if (resultado.ok) {
    mostrarMensaje(
      "success",
      "Correo enviado",
      "📧 Te hemos enviado un correo con instrucciones para restablecer tu contraseña."
    );
  } else {
    mostrarMensaje(
      "error",
      "Error",
      "❌ No se pudo enviar el correo de restablecimiento"
    );
  }
};

  return (
    <ImageBackground
      source={require("../assets/fondo_nagrup.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Operational Excellence</Text>
          <Text style={styles.subtitle}>Calidad · Mejora Continua · Servicio</Text>

          <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor="#94A3B8"
            autoCapitalize="none"
            autoCorrect={false}
            value={usuario}
            onChangeText={setUsuario}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} disabled={loading} onPress={login}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          {/* 🔹 Botón para restablecer contraseña */}
<TouchableOpacity onPress={handleReset} style={{ marginTop: 12 }}>
  <Text style={{ color: "#16105A", textAlign: "center" }}>
    ¿Olvidaste tu contraseña?
  </Text>
</TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: 420,
    maxWidth: "95%",
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 24,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  logo: {
    width: 220,
    height: 110,
    alignSelf: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#16105A",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 30,
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
});