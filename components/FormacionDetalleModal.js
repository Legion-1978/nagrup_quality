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
import {MaterialIcons,} from "@expo/vector-icons";

export default function FormacionDetalleModal({
  visible,

  detalleFormacion,

  nuevoComentario,
  setNuevoComentario,

  agregarComentario,
  agregarEvidencia,
  eliminarEvidencia,

  editarFormacion,

  soloLectura,

  onClose,
}) {
  if (!detalleFormacion) {
    return null;
  }

  return (

  <Modal
    visible={visible}
    animationType="slide"
    transparent
  >

    <View style={styles.modalOverlay}>

      <View style={styles.modalContent}>

<ScrollView showsVerticalScrollIndicator={false}>

  {/* CABECERA */}

  <View style={styles.headerCard}>
    <Text style={styles.modalTitle}>
      {detalleFormacion.id || "FOR-001"}
    </Text>

    <Text style={styles.headerSubtitle}>
      {detalleFormacion.empleado || "-"}
      {" • "}
      {detalleFormacion.departamento || "-"}
      {" • "}
      {detalleFormacion.curso || "-"}
    </Text>

    <View style={styles.badgeContainer}>
      <View style={styles.estadoBadge}>
        <Text style={styles.badgeText}>
          {detalleFormacion.estadoFormacion ||
            "Planificada"}
        </Text>
      </View>

      <View style={styles.gravedadBadge}>
        <Text style={styles.badgeText}>
          {detalleFormacion.modalidad ||
            "Presencial"}
        </Text>
      </View>
    </View>
  </View>

  {/* INFORMACIÓN GENERAL */}

  <Text style={styles.sectionTitle}>
    📋 Información General
  </Text>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Empleado
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.empleado || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Código Empleado
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.codigoEmpleado || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Puesto
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.puesto || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Departamento
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.departamento || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Responsable
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.responsable || "-"}
    </Text>
  </View>

  {/* FORMACIÓN */}

  <Text style={styles.sectionTitle}>
    🎓 Formación
  </Text>

  <View style={styles.sectionCard}>
    <Text style={styles.sectionText}>
      {detalleFormacion.curso || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Categoría
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.categoria || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Proveedor
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.proveedor || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Horas
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.horas || "0"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Coste
    </Text>
    <Text style={styles.infoValue}>
      {Number(
        detalleFormacion.coste || 0
      ).toLocaleString("es-ES")} €
    </Text>
  </View>

  {/* FECHAS */}

  <Text style={styles.sectionTitle}>
    📅 Fechas y Renovaciones
  </Text>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Fecha Inicio
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.fechaInicio || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Fecha Fin
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.fechaFin || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Próxima Renovación
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.fechaRenovacion || "-"}
    </Text>
  </View>

  {/* EVALUACIÓN */}

  <Text style={styles.sectionTitle}>
    ✅ Evaluación
  </Text>

  <View style={styles.sectionCard}>
    <Text style={styles.sectionText}>
      Método: {detalleFormacion.metodoEvaluacion || "-"}
    </Text>

    <Text style={styles.sectionText}>
      Resultado: {detalleFormacion.resultadoEvaluacion || "-"}
    </Text>

    <Text style={styles.sectionText}>
      Nota: {detalleFormacion.nota || "-"}
    </Text>

    <Text style={styles.sectionText}>
      Competencia: {detalleFormacion.competencia || "-"}
    </Text>
  </View>

  {/* CERTIFICACIÓN */}

  <Text style={styles.sectionTitle}>
    📜 Certificación
  </Text>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Certificado
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.certificado
        ? "Sí"
        : "No"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Nº Certificado
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.numeroCertificado || "-"}
    </Text>
  </View>

  {/* ISO */}

  <Text style={styles.sectionTitle}>
    ✅ Cumplimiento ISO
  </Text>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Requisito Legal
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.requisitoLegal || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Formación Obligatoria
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.obligatoria
        ? "Sí"
        : "No"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Evidencia Disponible
    </Text>
    <Text style={styles.infoValue}>
      {detalleFormacion.evidenciaDisponible
        ? "Sí"
        : "No"}
    </Text>
  </View>

  {/* OBSERVACIONES */}

  <Text style={styles.sectionTitle}>
    📝 Observaciones
  </Text>

  <View style={styles.sectionCard}>
    <Text style={styles.sectionText}>
      {detalleFormacion.observaciones ||
        "Sin observaciones"}
    </Text>
  </View>

{/* EVIDENCIAS */}

<Text style={styles.commentsTitle}>
  Evidencias
</Text>

{(detalleFormacion.evidencias || []).length === 0 ? (

  <View style={styles.emptyStateCard}>
    <Text>
      No existen evidencias
    </Text>
  </View>

) : (

  detalleFormacion.evidencias.map(
    (evidencia, index) => (

      <View
        key={
          evidencia?.id || index
        }
        style={styles.evidenciaCard}
      >

        <View
          style={{
            flex: 1,
          }}
        >

          <Text
            style={{
              fontWeight: "600",
            }}
          >
            📎 {evidencia.nombre || evidencia}
          </Text>

          {evidencia.fecha && (
            <Text
              style={styles.commentDate}
            >
              {evidencia.fecha}
            </Text>
          )}

        </View>

        {!soloLectura && (
          <TouchableOpacity
            onPress={() =>
              eliminarEvidencia(
                evidencia.id
              )
            }
            style={{
              padding: 6,
            }}
          >
            <MaterialIcons
              name="delete"
              size={24}
              color="#dc2626"
            />
          </TouchableOpacity>
        )}

      </View>

    )
  )

)}

{!soloLectura && (
  <TouchableOpacity
    onPress={() =>
      agregarEvidencia(
        detalleFormacion
      )
    }
    style={styles.secondaryButton}
  >

    <MaterialIcons
      name="attach-file"
      size={18}
      color="#fff"
    />

    <Text
      style={styles.primaryButtonText}
    >
      Añadir Evidencia
    </Text>

  </TouchableOpacity>
)}

{/* COMENTARIOS */}

<Text style={styles.commentsTitle}>
  Comentarios
</Text>

{(detalleFormacion.comentarios || [])
  .length === 0 ? (

  <View style={styles.emptyStateCard}>
    <Text>
      No existen comentarios
    </Text>
  </View>

) : (

  detalleFormacion.comentarios.map(
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
          {comentario.autor ||
            "Usuario"}
        </Text>

        <Text>
          {comentario.texto}
        </Text>

        <Text
          style={styles.commentDate}
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
  onChangeText={setNuevoComentario}
  style={styles.input}
  multiline
/>

{!soloLectura && (
  <TouchableOpacity
    onPress={agregarComentario}
    style={styles.primaryButton}
  >
    <Text
      style={styles.primaryButtonText}
    >
      Añadir Comentario
    </Text>
  </TouchableOpacity>
)}

{/* HISTORIAL */}

<Text style={styles.commentsTitle}>
  📜 Historial
</Text>

{(detalleFormacion.historial || [])
  .length === 0 ? (

  <View style={styles.emptyStateCard}>
    <Text>
      No existe historial
    </Text>
  </View>

) : (

  detalleFormacion.historial.map(
    (item, index) => (

      <View
        key={index}
        style={styles.commentCard}
      >

        <Text>
          {item.accion}
        </Text>

        <Text
          style={styles.commentDate}
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
        style={styles.editButton}
        onPress={() =>
          editarFormacion(detalleFormacion)
        }
      >
        <Text style={styles.primaryButtonText}>
          Editar Formación
        </Text>
      </TouchableOpacity>
    )}

    <TouchableOpacity
      style={styles.closeButton}
      onPress={onClose}
    >
      <Text style={styles.primaryButtonText}>
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