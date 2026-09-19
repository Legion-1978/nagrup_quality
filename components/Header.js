import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
} from "react-native";

export default function Header({ usuario, cargo, onLogout }) {
  const [showModal, setShowModal] = useState(false);

  const confirmarLogout = () => {
    setShowModal(true);
  };

  const handleLogout = () => {
    setShowModal(false);
    onLogout?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.title}>Quality Dashboard</Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.rightTop}>
          <View>
            <Text style={styles.user}>{usuario || "Invitado"}</Text>
            <Text style={styles.userRole}>{cargo || "Usuario"}</Text>
          </View>

          {onLogout && (
            <Pressable onPress={confirmarLogout} style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Salir</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>● Sistema Activo</Text>
        </View>
      </View>

      {/* Modal de confirmación */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cerrar sesión</Text>
            <Text style={styles.modalMessage}>¿Cerrar la sesión actual?</Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleLogout}
              >
                <Text style={styles.confirmText}>Cerrar sesión</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 55,
    height: 55,
    marginRight: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#16163b",
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  rightTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButton: {
    marginLeft: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#FEE2E2",
  },
  logoutButtonText: {
    color: "#DC2626",
    fontSize: 12,
    fontWeight: "700",
  },
  user: {
    fontSize: 15,
    fontWeight: "700",
    color: "#16163b",
  },
  userRole: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  statusBadge: {
    marginTop: 6,
    backgroundColor: "#dcfce7",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    color: "#16a34a",
    fontSize: 11,
    fontWeight: "700",
  },
  // Estilos del modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#16163b",
  },
  modalMessage: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  modalButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#f3f4f6",
  },
  confirmButton: {
    backgroundColor: "#DC2626",
  },
  cancelText: {
    color: "#374151",
    fontWeight: "600",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "700",
  },
});