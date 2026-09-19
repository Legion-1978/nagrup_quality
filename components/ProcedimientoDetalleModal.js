import React from "react";

import {
  MaterialIcons,
} from "@expo/vector-icons";

import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import styles from "../styles/DetalleModalStyles";

export default function ProcedimientoDetalleModal({
  visible,
  detalleProcedimiento,

  nuevoComentario,
  setNuevoComentario,

  agregarComentario,

  agregarEvidencia,
  eliminarEvidencia,

  editarProcedimiento,

  soloLectura,

  onClose,
}) {

  if (!detalleProcedimiento) {
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
              {detalleProcedimiento.id}
            </Text>

            <Text style={styles.headerSubtitle}>
              {detalleProcedimiento.titulo}
            </Text>

            <View style={styles.badgeContainer}>

              <View style={styles.estadoBadge}>
                <Text style={styles.badgeText}>
                  {detalleProcedimiento.estado}
                </Text>
              </View>

              <View style={styles.gravedadBadge}>
                <Text style={styles.badgeText}>
                  {detalleProcedimiento.version || "V1"}
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
              Responsable
            </Text>

            <Text style={styles.infoValue}>
              {detalleProcedimiento.responsable || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Departamento
            </Text>

            <Text style={styles.infoValue}>
              {detalleProcedimiento.departamento || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Tipo
            </Text>

            <Text style={styles.infoValue}>
              {detalleProcedimiento.tipo || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Categoría
            </Text>

            <Text style={styles.infoValue}>
              {detalleProcedimiento.categoria || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Versión
            </Text>

            <Text style={styles.infoValue}>
              {detalleProcedimiento.version || "-"}
            </Text>
          </View>

          {/* CONTROL DOCUMENTAL (ISO 9001 - 7.5) */}

          <Text style={styles.sectionTitle}>
            Control Documental (ISO 9001 - 7.5)
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Propietario del proceso
            </Text>

            <Text style={styles.infoValue}>
              {detalleProcedimiento.propietarioProceso || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Aprobador
            </Text>

            <Text style={styles.infoValue}>
              {detalleProcedimiento.aprobador || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Criticidad
            </Text>

            <Text style={styles.infoValue}>
              {detalleProcedimiento.criticidad || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Frecuencia de revisión
            </Text>

            <Text style={styles.infoValue}>
              {detalleProcedimiento.frecuenciaRevision || "-"}
            </Text>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.infoLabel}>
              Riesgo asociado
            </Text>

            <Text style={styles.sectionText}>
              {detalleProcedimiento.riesgo || "-"}
            </Text>
          </View>

          {/* FECHAS */}

          <Text style={styles.sectionTitle}>
            Fechas
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Fecha Emisión
            </Text>

            <Text style={styles.infoValue}>
              {detalleProcedimiento.fechaEmision || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Fecha Revisión
            </Text>

            <Text style={styles.infoValue}>
              {detalleProcedimiento.fechaRevision || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Próxima Revisión
            </Text>

            <Text style={styles.infoValue}>
              {detalleProcedimiento.fechaProximaRevision || "-"}
            </Text>
          </View>

          {/* DESCRIPCIÓN */}

          <Text style={styles.sectionTitle}>
            Descripción
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleProcedimiento.descripcion || "-"}
            </Text>
          </View>

          {/* OBJETIVO */}

          <Text style={styles.sectionTitle}>
            Objetivo
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleProcedimiento.objetivo || "-"}
            </Text>
          </View>

          {/* ALCANCE */}

          <Text style={styles.sectionTitle}>
            Alcance
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleProcedimiento.alcance || "-"}
            </Text>
          </View>

          {/* PROCESO */}

          <Text style={styles.sectionTitle}>
            Proceso
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleProcedimiento.proceso || "-"}
            </Text>
          </View>

          {/* OBSERVACIONES */}

          <Text style={styles.sectionTitle}>
            Observaciones
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleProcedimiento.observaciones || "-"}
            </Text>
          </View>

{/* EVIDENCIAS */}

<Text style={styles.commentsTitle}>
  Evidencias
</Text>

{(detalleProcedimiento.evidencias || [])
  .length === 0 ? (

  <View style={styles.emptyStateCard}>
    <Text>
      No existen evidencias
    </Text>
  </View>

) : (

  detalleProcedimiento.evidencias.map(
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
            📄{" "}
            {evidencia.nombre ||
              evidencia}
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
            style={
              styles.deleteButton
            }
            onPress={() =>
              eliminarEvidencia(
                evidencia.id
              )
            }
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
        detalleProcedimiento
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

{/* HISTORIAL */}

<Text style={styles.commentsTitle}>
  📜 Historial
</Text>

{(detalleProcedimiento.historial || [])
  .length === 0 ? (

  <View style={styles.emptyStateCard}>
    <Text>
      No existe historial
    </Text>
  </View>

) : (

  detalleProcedimiento.historial.map(
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
                onPress={() =>
                  editarProcedimiento(
                    detalleProcedimiento
                  )
                }
                style={styles.editButton}
              >
                <Text
                  style={styles.primaryButtonText}
                >
                  Editar Procedimiento
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
            >
              <Text
                style={styles.primaryButtonText}
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