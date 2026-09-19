// App.js
import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

import { AppProviders } from "./context/AppProviders";
import { useAuth } from "./context/AuthContext";

import Sidebar from "./components/SidebarDrawer";

import LoginScreen from "./screens/LoginScreen";
import CambiarPasswordObligatorioScreen from "./screens/CambiarPasswordObligatorioScreen";
import DashboardScreen from "./screens/DashboardScreen";
import OTIFScreen from "./screens/OTIFScreen";
import IncidenciasScreen from "./screens/IncidenciasScreen";
import ReclamacionesScreen from "./screens/ReclamacionesScreen";
import ProveedoresScreen from "./screens/ProveedoresScreen";
import AuditoriasScreen from "./screens/AuditoriasScreen";
import SatisfaccionScreen from "./screens/SatisfaccionScreen";
import ProcedimientosScreen from "./screens/ProcedimientosScreen";
import MejorasScreen from "./screens/MejorasScreen";
import FormacionScreen from "./screens/FormacionScreen";
import CosteNoCalidadScreen from "./screens/CosteNoCalidadScreen";
import ConfiguracionScreen from "./screens/ConfiguracionScreen";

import Toast from "react-native-toast-message"; 
import { toastConfig } from "./utils/toastConfig"; // 🔹 Importa tu configuración personalizada

const screens = {
  Dashboard: DashboardScreen,
  OTIF: OTIFScreen,
  Incidencias: IncidenciasScreen,
  Reclamaciones: ReclamacionesScreen,
  Proveedores: ProveedoresScreen,
  Auditorias: AuditoriasScreen,
  Satisfaccion: SatisfaccionScreen,
  Procedimientos: ProcedimientosScreen,
  Mejoras: MejorasScreen,
  Formacion: FormacionScreen,
  CosteNoCalidad: CosteNoCalidadScreen,
  Configuracion: ConfiguracionScreen,
};

const permisoRequerido = {
  Dashboard: "dashboard",
  OTIF: "otif",
  Incidencias: "incidencias",
  Reclamaciones: "reclamaciones",
  Proveedores: "proveedores",
  Auditorias: "auditorias",
  Satisfaccion: "satisfaccion",
  Procedimientos: "procedimientos",
  Mejoras: "mejoras",
  Formacion: "formacion",
  CosteNoCalidad: "costes",
  Configuracion: "configuracion",
};

const TIEMPO_INACTIVIDAD_MS = 20 * 60 * 1000; // 20 minutos

function tienePermiso(usuarioActual, screen) {
  if (!usuarioActual) return false;
  if (usuarioActual.rol === "Administrador") return true;
  const clave = permisoRequerido[screen];
  if (!clave) return true;
  return Boolean(usuarioActual.permisos?.[clave]);
}

function AppContent() {
  const { loading, usuarioActual, logout } = useAuth();
  const [screen, setScreen] = useState("Dashboard");
  const timeoutRef = useRef(null);

  const reiniciarInactividad = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (usuarioActual) {
      timeoutRef.current = setTimeout(() => {
        logout();
        Toast.show({
          type: "info",
          text1: "Sesión cerrada",
          text2: "Has estado inactivo durante 20 minutos",
        });
      }, TIEMPO_INACTIVIDAD_MS);
    }
  }, [usuarioActual, logout]);

  useEffect(() => {
    reiniciarInactividad();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [reiniciarInactividad]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16105A" />
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  if (!usuarioActual) {
    return <LoginScreen onLogin={() => setScreen("Dashboard")} />;
  }

  if (usuarioActual.debeCambiarPassword) {
    return <CambiarPasswordObligatorioScreen />;
  }

  const screenPermitida = tienePermiso(usuarioActual, screen);
  const ActiveScreen = screenPermitida ? screens[screen] || DashboardScreen : null;

  return (
    <View
      style={styles.container}
      onStartShouldSetResponderCapture={() => {
        reiniciarInactividad();
        return false;
      }}
    >
      <Sidebar currentScreen={screen} navigate={setScreen} />
      <View style={styles.content}>
        {screenPermitida ? (
          <ActiveScreen />
        ) : (
          <View style={styles.deniedContainer} accessibilityRole="alert">
            <Text style={styles.deniedTitle}>🔒 Acceso restringido</Text>
            <Text style={styles.deniedText}>
              Tu usuario no tiene permiso para ver esta sección.
              Contacta con un administrador si crees que es un error.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <AppProviders>
      <AppContent />
      {/* 🔹 Contenedor global de Toast con tema personalizado */}
      <Toast config={toastConfig} />
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
  },
  content: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
  },
  loadingText: {
    marginTop: 12,
    color: "#64748B",
    fontSize: 14,
  },
  deniedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  deniedTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 10,
  },
  deniedText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    maxWidth: 420,
  },
});