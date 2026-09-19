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

export default function AuditoriaDetalleModal({
  visible,
  detalleAuditoria,

  nuevoComentario,
  setNuevoComentario,

  agregarComentario,
  agregarEvidencia,

  nuevoHallazgo,
  setNuevoHallazgo,
  tipoHallazgo,
  setTipoHallazgo,
  agregarHallazgo,
  eliminarHallazgo,

  nuevaNoConformidad,
  setNuevaNoConformidad,
  clausulaNC,
  setClausulaNC,
  agregarNoConformidad,
  cambiarEstadoNoConformidad,

  nuevaAccion,
  setNuevaAccion,
  responsableAccion,
  setResponsableAccion,
  fechaLimiteAccion,
  setFechaLimiteAccion,
  agregarAccion,
  cambiarEstadoAccion,

  editarAuditoria,

  soloLectura,

  onClose,
}) {

  if (!detalleAuditoria) {
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

<ScrollView
  showsVerticalScrollIndicator={false}
>

  {/* CABECERA */}

  <View style={styles.headerCard}>

    <Text style={styles.modalTitle}>
      {detalleAuditoria.id}
    </Text>

    <Text style={styles.headerSubtitle}>
      {detalleAuditoria.tipo || "-"}
      {" • "}
      {detalleAuditoria.norma || "-"}
    </Text>

    <View style={styles.badgeContainer}>

      <View style={styles.estadoBadge}>
        <Text style={styles.badgeText}>
          {detalleAuditoria.estado}
        </Text>
      </View>

      <View style={styles.gravedadBadge}>
        <Text style={styles.badgeText}>
          {detalleAuditoria.norma || "-"}
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
      Auditor
    </Text>

    <Text style={styles.infoValue}>
      {detalleAuditoria.auditor || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Responsable Auditado
    </Text>

    <Text style={styles.infoValue}>
      {detalleAuditoria.responsableAuditado || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Alcance
    </Text>

    <Text style={styles.infoValue}>
      {detalleAuditoria.alcance || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Criterio Auditoría
    </Text>

    <Text style={styles.infoValue}>
      {detalleAuditoria.criterioAuditoria || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Fecha Auditoría
    </Text>

    <Text style={styles.infoValue}>
      {detalleAuditoria.fecha || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Fecha Creación
    </Text>

    <Text style={styles.infoValue}>
      {detalleAuditoria.fechaCreacion || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Fecha Cierre
    </Text>

    <Text style={styles.infoValue}>
      {detalleAuditoria.fechaCierre || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Estado
    </Text>

    <Text style={styles.infoValue}>
      {detalleAuditoria.estado || "-"}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      Acciones Abiertas
    </Text>

    <Text style={styles.infoValue}>
      {detalleAuditoria.accionesAbiertas || 0}
    </Text>
  </View>

  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>
      NC Abiertas
    </Text>

    <Text style={styles.infoValue}>
      {detalleAuditoria.ncAbiertas || 0}
    </Text>
  </View>

  {/* RESULTADO */}

  <Text style={styles.sectionTitle}>
    Resultado Auditoría
  </Text>

  <View style={styles.sectionCard}>
    <Text style={styles.sectionText}>
      {detalleAuditoria.resultado || "-"}
    </Text>
  </View>

  {/* CONCLUSIÓN */}

  <Text style={styles.sectionTitle}>
    Conclusión
  </Text>

  <View style={styles.sectionCard}>
    <Text style={styles.sectionText}>
      {detalleAuditoria.conclusion || "-"}
    </Text>
  </View>

  {/* HALLAZGOS */}

  <Text style={styles.commentsTitle}>
    📋 Hallazgos
  </Text>

  {(detalleAuditoria.hallazgos || [])
    .length === 0 ? (

    <View style={styles.emptyStateCard}>
      <Text>
        No existen hallazgos
      </Text>
    </View>

  ) : (

    detalleAuditoria.hallazgos.map(
      (hallazgo, index) => (

        <View
          key={hallazgo.id || index}
          style={styles.commentCard}
        >
          <Text style={{ fontWeight: "700", marginBottom: 2 }}>
            {hallazgo.tipo || "Observación"}
          </Text>

          <Text>
            {hallazgo.descripcion ||
              hallazgo.texto ||
              "-"}
          </Text>

          {hallazgo.fecha && (
            <Text style={styles.commentDate}>
              {hallazgo.fecha}
            </Text>
          )}

          {!soloLectura && hallazgo.id && eliminarHallazgo && (
            <TouchableOpacity
              onPress={() =>
                eliminarHallazgo(hallazgo.id)
              }
            >
              <Text
                style={{
                  color: "#DC2626",
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                Eliminar
              </Text>
            </TouchableOpacity>
          )}
        </View>

      )
    )

  )}

  {!soloLectura && agregarHallazgo && (
    <View style={styles.commentBox}>
      <TextInput
        style={styles.input}
        placeholder="Describir hallazgo..."
        value={nuevoHallazgo}
        onChangeText={setNuevoHallazgo}
        multiline
      />

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          marginVertical: 8,
        }}
      >
        {[
          "Observación",
          "No Conformidad Menor",
          "No Conformidad Mayor",
        ].map((op) => (
          <TouchableOpacity
            key={op}
            onPress={() => setTipoHallazgo(op)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
              backgroundColor:
                tipoHallazgo === op
                  ? "#1D4ED8"
                  : "#E2E8F0",
            }}
          >
            <Text
              style={{
                color:
                  tipoHallazgo === op
                    ? "#FFFFFF"
                    : "#334155",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {op}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={agregarHallazgo}
      >
        <Text style={styles.primaryButtonText}>
          Añadir Hallazgo
        </Text>
      </TouchableOpacity>
    </View>
  )}

  {/* NO CONFORMIDADES */}

  <Text style={styles.commentsTitle}>
    ⚠️ No Conformidades
  </Text>

  {(detalleAuditoria.noConformidades || [])
    .length === 0 ? (

    <View style={styles.emptyStateCard}>
      <Text>
        No existen no conformidades
      </Text>
    </View>

  ) : (

    detalleAuditoria.noConformidades.map(
      (nc, index) => (

        <View
          key={nc.id || index}
          style={styles.commentCard}
        >
          <Text>
            {nc.descripcion ||
              nc.texto ||
              "-"}
          </Text>

          {nc.clausula && (
            <Text style={styles.commentDate}>
              Cláusula: {nc.clausula}
            </Text>
          )}

          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              marginTop: 4,
              color:
                nc.estado === "Cerrada"
                  ? "#16A34A"
                  : "#DC2626",
            }}
          >
            {nc.estado || "Abierta"}
            {nc.fechaCierre
              ? ` (${nc.fechaCierre})`
              : ""}
          </Text>

          {!soloLectura && nc.id && cambiarEstadoNoConformidad && (
            <TouchableOpacity
              onPress={() =>
                cambiarEstadoNoConformidad(nc.id)
              }
            >
              <Text
                style={{
                  color: "#2563EB",
                  fontSize: 12,
                  marginTop: 4,
                  fontWeight: "600",
                }}
              >
                {nc.estado === "Cerrada"
                  ? "Reabrir"
                  : "Marcar como cerrada"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

      )
    )

  )}

  {!soloLectura && agregarNoConformidad && (
    <View style={styles.commentBox}>
      <TextInput
        style={styles.input}
        placeholder="Describir no conformidad..."
        value={nuevaNoConformidad}
        onChangeText={setNuevaNoConformidad}
        multiline
      />

      <TextInput
        style={[styles.input, { marginTop: 8 }]}
        placeholder="Cláusula ISO afectada (ej: 8.7)"
        value={clausulaNC}
        onChangeText={setClausulaNC}
      />

      <TouchableOpacity
        style={[styles.primaryButton, { marginTop: 8 }]}
        onPress={agregarNoConformidad}
      >
        <Text style={styles.primaryButtonText}>
          Registrar No Conformidad
        </Text>
      </TouchableOpacity>
    </View>
  )}

  {/* ACCIONES DE SEGUIMIENTO */}

  <Text style={styles.commentsTitle}>
    🛠️ Acciones de Seguimiento
  </Text>

  {(detalleAuditoria.acciones || [])
    .length === 0 ? (

    <View style={styles.emptyStateCard}>
      <Text>
        No existen acciones de seguimiento
      </Text>
    </View>

  ) : (

    detalleAuditoria.acciones.map(
      (accion, index) => (

        <View
          key={accion.id || index}
          style={styles.commentCard}
        >
          <Text>
            {accion.descripcion || "-"}
          </Text>

          {accion.responsable && (
            <Text style={styles.commentDate}>
              Responsable: {accion.responsable}
            </Text>
          )}

          {accion.fechaLimite && (
            <Text style={styles.commentDate}>
              Fecha límite: {accion.fechaLimite}
            </Text>
          )}

          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              marginTop: 4,
              color:
                accion.estado === "Completada"
                  ? "#16A34A"
                  : "#F59E0B",
            }}
          >
            {accion.estado || "Pendiente"}
          </Text>

          {!soloLectura && accion.id && cambiarEstadoAccion && (
            <TouchableOpacity
              onPress={() =>
                cambiarEstadoAccion(accion.id)
              }
            >
              <Text
                style={{
                  color: "#2563EB",
                  fontSize: 12,
                  marginTop: 4,
                  fontWeight: "600",
                }}
              >
                {accion.estado === "Completada"
                  ? "Reabrir"
                  : "Marcar como completada"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

      )
    )

  )}

  {!soloLectura && agregarAccion && (
    <View style={styles.commentBox}>
      <TextInput
        style={styles.input}
        placeholder="Describir la acción..."
        value={nuevaAccion}
        onChangeText={setNuevaAccion}
        multiline
      />

      <TextInput
        style={[styles.input, { marginTop: 8 }]}
        placeholder="Responsable"
        value={responsableAccion}
        onChangeText={setResponsableAccion}
      />

      <TextInput
        style={[styles.input, { marginTop: 8 }]}
        placeholder="Fecha límite (DD-MM-YYYY)"
        value={fechaLimiteAccion}
        onChangeText={setFechaLimiteAccion}
      />

      <TouchableOpacity
        style={[styles.primaryButton, { marginTop: 8 }]}
        onPress={agregarAccion}
      >
        <Text style={styles.primaryButtonText}>
          Añadir Acción
        </Text>
      </TouchableOpacity>
    </View>
  )}


  {/* COMENTARIOS */}

  <Text style={styles.commentsTitle}>
    💬 Comentarios
  </Text>

  {(detalleAuditoria.comentarios || [])
    .length === 0 ? (

    <View style={styles.emptyStateCard}>
      <Text>
        No existen comentarios
      </Text>
    </View>

  ) : (

    detalleAuditoria.comentarios.map(
      (comentario, index) => (

        <View
          key={index}
          style={styles.commentCard}
        >

          <Text style={styles.commentAuthor}>
            {comentario.autor}
          </Text>

          <Text>
            {comentario.texto}
          </Text>

          <Text style={styles.commentDate}>
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
      <Text style={styles.primaryButtonText}>
        Añadir Comentario
      </Text>
    </TouchableOpacity>
  )}

  {/* EVIDENCIAS */}

  <Text style={styles.commentsTitle}>
    📎 Evidencias
  </Text>

  {(detalleAuditoria.evidencias || [])
    .length === 0 ? (

    <View style={styles.emptyStateCard}>
      <Text>
        No existen evidencias
      </Text>
    </View>

  ) : (

    detalleAuditoria.evidencias.map(
      evidencia => (

        <View
          key={evidencia.id}
          style={styles.evidenciaCard}
        >

          <Text>
            📎 {evidencia.nombre}
          </Text>

          {evidencia.fecha && (
            <Text style={styles.commentDate}>
              {evidencia.fecha}
            </Text>
          )}

        </View>

      )
    )

  )}

  {!soloLectura && (
    <TouchableOpacity
      onPress={() =>
        agregarEvidencia(
          detalleAuditoria
        )
      }
      style={styles.secondaryButton}
    >
      <Text style={styles.primaryButtonText}>
        Añadir Evidencia
      </Text>
    </TouchableOpacity>
  )}

 {/* HISTORIAL */}

<Text style={styles.commentsTitle}>
  📜 Historial
</Text>

{(detalleAuditoria.historial || [])
  .length === 0 ? (

  <View
    style={styles.emptyStateCard}
  >
    <Text>
      No existe historial
      registrado
    </Text>
  </View>

) : (

  detalleAuditoria.historial.map(
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

<View
  style={styles.buttonRow}
>

  {!soloLectura && (
    <TouchableOpacity
      onPress={() =>
        editarAuditoria(
          detalleAuditoria
        )
      }
      style={styles.editButton}
    >

      <Text
        style={
          styles.primaryButtonText
        }
      >
        Editar Auditoría
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