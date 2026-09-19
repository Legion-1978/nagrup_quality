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

export default function MejoraDetalleModal({
  visible,
  detalleMejora,

  nuevoComentario,
  setNuevoComentario,

  agregarComentario,
  agregarEvidencia,

  editarMejora,

  onClose,

  aprobarMejora,
  cerrarMejora,
  reabrirMejora,

  eliminarEvidencia,

  soloLectura,
}) {
  if (!detalleMejora) {
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
              {detalleMejora.id}
            </Text>

            <Text style={styles.headerSubtitle}>
              {detalleMejora.titulo}
            </Text>

            <View style={styles.badgeContainer}>

              <View style={styles.estadoBadge}>
                <Text style={styles.badgeText}>
                  {detalleMejora.estado}
                </Text>
              </View>

              <View style={styles.gravedadBadge}>
                <Text style={styles.badgeText}>
                  {detalleMejora.prioridad || "Media"}
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
    Código
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.id || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Título
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.titulo || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Área
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.area || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Proceso
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.proceso || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Departamento
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.departamento || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Centro Logístico
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.centroLogistico || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Responsable
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.responsable || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Patrocinador
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.patrocinador || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Tipo de Mejora
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.tipo || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Clasificación
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.clasificacion ||
      "Mejora Continua"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Origen
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.origen || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Categoría
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.categoria || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Prioridad
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.prioridad || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Estado
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.estado || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Impacto
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.impacto || "-"}
  </Text>
</View>

{/* ISO */}

<Text style={styles.sectionTitle}>
  ✅ Cumplimiento ISO
</Text>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Norma Aplicable
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.norma ||
      "ISO 9001"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Riesgo Asociado
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.riesgo || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Oportunidad Asociada
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.oportunidad || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    KPI Impactado
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.kpi || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Objetivo
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.objetivo || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Auditor Responsable
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.auditor || "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Estado Auditoría
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.estadoAuditoria ||
      "-"}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Aprobación Dirección
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.aprobacionDireccion
      ? "Aprobada"
      : "Pendiente"}
  </Text>
</View>



          {/* DESCRIPCIÓN */}

          <Text style={styles.sectionTitle}>
            Descripción
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleMejora.descripcion || "-"}
            </Text>
          </View>

          {/* CAUSA ORIGEN */}

          <Text style={styles.sectionTitle}>
            Causa de Origen
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleMejora.causaOrigen || "-"}
            </Text>
          </View>

          {/* ACCIÓN PROPUESTA */}

          <Text style={styles.sectionTitle}>
            Acción de Mejora
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleMejora.accionPropuesta || "-"}
            </Text>
          </View>

{/* IMPACTO Y BENEFICIOS */}

<Text style={styles.sectionTitle}>
  💰 Impacto y Beneficios
</Text>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Beneficio Económico
  </Text>

  <Text style={styles.infoValue}>
    {Number(
      detalleMejora.beneficio || 0
    ).toLocaleString("es-ES")} €
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Coste Proyecto
  </Text>

  <Text style={styles.infoValue}>
    {Number(
      detalleMejora.costeProyecto || 0
    ).toLocaleString("es-ES")} €
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Ahorro Estimado
  </Text>

  <Text style={styles.infoValue}>
    {Number(
      detalleMejora.ahorroEstimado || 0
    ).toLocaleString("es-ES")} €
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Ahorro Real
  </Text>

  <Text style={styles.infoValue}>
    {Number(
      detalleMejora.ahorroReal || 0
    ).toLocaleString("es-ES")} €
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.infoLabel}>
    Beneficio Cualitativo
  </Text>

  <Text style={styles.infoValue}>
    {detalleMejora.beneficioCualitativo ||
      "-"}
  </Text>
</View>

          {/* INDICADORES */}

          <Text style={styles.sectionTitle}>
            Indicadores de Eficacia
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Indicador
            </Text>

            <Text style={styles.infoValue}>
              {detalleMejora.indicador || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Unidad
            </Text>

            <Text style={styles.infoValue}>
              {detalleMejora.unidadIndicador || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Valor Inicial
            </Text>

            <Text style={styles.infoValue}>
              {detalleMejora.valorInicial || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Valor Objetivo
            </Text>

            <Text style={styles.infoValue}>
              {detalleMejora.valorObjetivo || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Valor Actual
            </Text>

            <Text style={styles.infoValue}>
              {detalleMejora.valorActual || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Avance
            </Text>

            <Text style={styles.infoValue}>
              {detalleMejora.porcentajeAvance || 0}%
            </Text>
          </View>

          {/* SEGUIMIENTO */}

          <Text style={styles.sectionTitle}>
            Seguimiento
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Fecha Creación
            </Text>

            <Text style={styles.infoValue}>
              {detalleMejora.fechaCreacion || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Fecha Inicio
            </Text>

            <Text style={styles.infoValue}>
              {detalleMejora.fechaInicio || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Fecha Objetivo
            </Text>

            <Text style={styles.infoValue}>
              {detalleMejora.fechaObjetivo || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Fecha Implantación
            </Text>

            <Text style={styles.infoValue}>
              {detalleMejora.fechaImplantacion || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Fecha Validación
            </Text>

            <Text style={styles.infoValue}>
              {detalleMejora.fechaValidacion || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Fecha Cierre
            </Text>

            <Text style={styles.infoValue}>
              {detalleMejora.fechaCierre || "-"}
            </Text>
          </View>

          {/* VALIDACIÓN EFICACIA */}

          <Text style={styles.sectionTitle}>
            Validación de Eficacia
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleMejora.validacionEficacia || "-"}
            </Text>
          </View>

          {/* RESULTADO */}

          <Text style={styles.sectionTitle}>
            Resultado Obtenido
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleMejora.resultado || "-"}
            </Text>
          </View>

          {/* OBSERVACIONES */}

          <Text style={styles.sectionTitle}>
            Observaciones
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleMejora.observaciones || "-"}
            </Text>
          </View>

          {/* COMENTARIOS */}

          <Text style={styles.commentsTitle}>
            Comentarios
          </Text>

          {(detalleMejora.comentarios || [])
            .length === 0 ? (

            <View
              style={styles.emptyStateCard}
            >
              <Text>
                No existen comentarios
              </Text>
            </View>

          ) : (

            detalleMejora.comentarios.map(
              (comentario, index) => (

                <View
                  key={index}
                  style={styles.commentCard}
                >

                  <Text
                    style={styles.commentAuthor}
                  >
                    {comentario.autor || "Usuario"}
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

          {/* EVIDENCIAS */}

          <Text style={styles.commentsTitle}>
            Evidencias
          </Text>

          {(detalleMejora.evidencias || [])
            .length === 0 ? (

            <View
              style={styles.emptyStateCard}
            >
              <Text>
                No existen evidencias
              </Text>
            </View>

          ) : (

            detalleMejora.evidencias.map(
              (evidencia, index) => (

                <View
                  key={
                    evidencia.id || index
                  }
                  style={styles.evidenciaCard}
                >

                  <Text>
                    📎{" "}
                    {evidencia.nombre ||
                      evidencia}
                  </Text>

                  {evidencia.fecha && (
                    <Text
                      style={
                        styles.commentDate
                      }
                    >
                      {evidencia.fecha}
                    </Text>
                  )}

                  {!soloLectura && evidencia.id && eliminarEvidencia && (
                    <TouchableOpacity
                      onPress={() =>
                        eliminarEvidencia(
                          evidencia.id
                        )
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

          {!soloLectura && (
            <TouchableOpacity
              onPress={() =>
                agregarEvidencia(
                  detalleMejora
                )
              }
              style={styles.secondaryButton}
            >
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

          {(detalleMejora.historial || [])
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

            detalleMejora.historial.map(
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

          {/* ACCIONES DE ESTADO (CAPA / ISO) */}

          {!soloLectura && (
            <View style={styles.buttonRow}>

              {detalleMejora.estado !== "Aprobada" &&
                detalleMejora.estado !== "Cerrada" &&
                aprobarMejora && (
                  <TouchableOpacity
                    onPress={aprobarMejora}
                    style={styles.primaryButton}
                  >
                    <Text style={styles.primaryButtonText}>
                      ✅ Aprobar
                    </Text>
                  </TouchableOpacity>
                )}

              {detalleMejora.estado !== "Cerrada" &&
                cerrarMejora && (
                  <TouchableOpacity
                    onPress={cerrarMejora}
                    style={styles.secondaryButton}
                  >
                    <Text style={styles.primaryButtonText}>
                      🔒 Cerrar
                    </Text>
                  </TouchableOpacity>
                )}

              {detalleMejora.estado === "Cerrada" &&
                reabrirMejora && (
                  <TouchableOpacity
                    onPress={reabrirMejora}
                    style={styles.secondaryButton}
                  >
                    <Text style={styles.primaryButtonText}>
                      🔓 Reabrir
                    </Text>
                  </TouchableOpacity>
                )}

            </View>
          )}

          {/* ACCIONES */}

          <View
            style={styles.buttonRow}
          >

            {!soloLectura && (
              <TouchableOpacity
                onPress={() =>
                  editarMejora(
                    detalleMejora
                  )
                }
                style={styles.editButton}
              >
                <Text
                  style={
                    styles.primaryButtonText
                  }
                >
                  Editar Mejora
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