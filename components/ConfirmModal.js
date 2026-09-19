import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ConfirmModal({ visible, title, message, onConfirm, onCancel }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.actions}>
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.confirm]} onPress={onConfirm}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#16105A",
  },
  message: {
    fontSize: 14,
    color: "#334155",
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: "#64748B",
  },
  confirm: {
    backgroundColor: "#dc2626",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
