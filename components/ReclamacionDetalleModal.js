import React from "react";

import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import styles from "../styles/DetalleModalStyles";

export default function ReclamacionDetalleModal({
  visible,
  detalleReclamacion,
  nuevoComentario,
  setNuevoComentario,
  agregarComentario,
  editarReclamacion,
  gestionarEvidencias,
  soloLectura,
  onClose,
}) {

  if (!detalleReclamacion) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >

      <View style={styles.modalOverlay}>

        <View style={styles.modalContent}>

          <Text style={styles.modalTitle}>
            📦 {detalleReclamacion.id}
          </Text>

          <Text
            style={{
              color: "#64748b",
              marginBottom: 15,
            }}
          >
            {detalleReclamacion.cliente}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >

            <View
              style={{
                backgroundColor: "#eff6ff",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 10,
              }}
            >
              <Text>
                👤 {detalleReclamacion.responsable || "-"}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#fef3c7",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 10,
              }}
            >
              <Text>
                📌 {detalleReclamacion.estado}
              </Text>
            </View>

          </View>

<ScrollView
  showsVerticalScrollIndicator={false}
>

  {/* CABECERA */}

  <View style={styles.headerCard}>

    <Text style={styles.modalTitle}>
      {detalleReclamacion.id}
    </Text>

    <Text style={styles.headerSubtitle}>
      {detalleReclamacion.cliente}
    </Text>

    <View style={styles.badgeContainer}>

      <View style={styles.estadoBadge}>
        <Text style={styles.badgeText}>
          {detalleReclamacion.estado}
        </Text>
      </View>

      <View style={styles.gravedadBadge}>
        <Text style={styles.badgeText}>
          {detalleReclamacion.gravedad}
        </Text>
      </View>

    </View>

  </View>

  {/* INFORMACIÓN GENERAL */}

  <Text style={styles.sectionTitle}>
    Información General
  </Text>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Cliente
    </Text>

    <Text style={styles.infoValue}>
      {detalleReclamacion.cliente}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Fecha
    </Text>

    <Text style={styles.infoValue}>
      {detalleReclamacion.fecha}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Responsable
    </Text>

    <Text style={styles.infoValue}>
      {detalleReclamacion.responsable || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Días Resolución
    </Text>

    <Text style={styles.infoValue}>
      {detalleReclamacion.diasResolucion || 0}
    </Text>
  </View>

  {/* DESCRIPCIÓN */}

  <Text style={styles.sectionTitle}>
    Descripción
  </Text>

  <View style={styles.sectionCard}>
    <Text style={styles.sectionText}>
      {detalleReclamacion.descripcion}
    </Text>
  </View>

  {/* IMPACTO ECONÓMICO */}

  <Text style={styles.sectionTitle}>
    Impacto Económico
  </Text>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Coste
    </Text>

    <Text style={styles.infoValue}>
      {(detalleReclamacion.coste || 0)
        .toLocaleString("es-ES")} €
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Compensación
    </Text>

    <Text style={styles.infoValue}>
      {(detalleReclamacion.compensacion || 0)
        .toLocaleString("es-ES")} €
    </Text>
  </View>

  {/* EVIDENCIAS */}

  <Text style={styles.commentsTitle}>
    Evidencias
  </Text>

  {(detalleReclamacion.evidencias || [])
    .length === 0 ? (

      <View style={styles.emptyStateCard}>
        <Text>
          No existen evidencias
        </Text>
      </View>

  ) : (

    detalleReclamacion.evidencias.map(
      (evidencia, index) => (
        <View
          key={index}
          style={styles.evidenciaCard}
        >
          <Text>
            📄 {evidencia.nombre || evidencia}
          </Text>
        </View>
      )
    )

  )}

  {!soloLectura && (
    <TouchableOpacity
      onPress={() =>
        gestionarEvidencias(
          detalleReclamacion
        )
      }
      style={styles.secondaryButton}
    >

      <Text
        style={
          styles.primaryButtonText
        }
      >
        Gestionar Evidencias
      </Text>

    </TouchableOpacity>
  )}

  {/* COMENTARIOS */}

  <Text style={styles.commentsTitle}>
    Comentarios
  </Text>

  {(detalleReclamacion.comentarios || [])
    .length === 0 ? (

      <View style={styles.emptyStateCard}>
        <Text>
          No existen comentarios
        </Text>
      </View>

  ) : (

    detalleReclamacion.comentarios.map(
      (comentario, index) => (

        <View
          key={index}
          style={styles.commentCard}
        >

          <Text
            style={
              styles.commentAuthor
            }
          >
            {comentario.autor || "Usuario"}
          </Text>

          <Text>
            {comentario.texto}
          </Text>

          <Text
            style={
              styles.commentDate
            }
          >
            {comentario.fecha}
          </Text>

        </View>

      )
    )

  )}

  <TextInput
    placeholder="Añadir comentario..."
    value={nuevoComentario}
    onChangeText={
      setNuevoComentario
    }
    style={styles.input}
    multiline
  />

  {!soloLectura && (
    <TouchableOpacity
      onPress={agregarComentario}
      style={styles.primaryButton}
    >
      <Text
        style={
          styles.primaryButtonText
        }
      >
        Añadir Comentario
      </Text>
    </TouchableOpacity>
  )}

  {/* HISTORIAL */}

  <Text style={styles.commentsTitle}>
    📜 Historial
  </Text>

  {(detalleReclamacion.historial || [])
    .length === 0 ? (

    <View
      style={styles.emptyStateCard}
    >
      <Text>
        No existe historial registrado
      </Text>
    </View>

  ) : (

    detalleReclamacion.historial.map(
      (item, index) => (

        <View
          key={index}
          style={styles.commentCard}
        >

          <Text>
            {item.accion}
          </Text>

          <Text
            style={
              styles.commentDate
            }
          >
            {item.fecha}
          </Text>

        </View>

      )
    )

  )}

  {/* ACCIONES */}

  <View style={styles.buttonRow}>

    {!soloLectura && (
      <TouchableOpacity
        onPress={() => {
          onClose();
          editarReclamacion(
            detalleReclamacion
          );
        }}
        style={styles.editButton}
      >
        <Text
          style={
            styles.primaryButtonText
          }
        >
          Editar Reclamación
        </Text>
      </TouchableOpacity>
    )}

    <TouchableOpacity
      onPress={onClose}
      style={styles.closeButton}
    >
      <Text
        style={
          styles.primaryButtonText
        }
      >
        Cerrar
      </Text>
    </TouchableOpacity>

  </View>

</ScrollView>
        </View>

      </View>

    </Modal>
  );
}