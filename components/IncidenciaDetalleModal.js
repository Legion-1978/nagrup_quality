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

export default function IncidenciaDetalleModal({
  visible,
  detalleIncidencia,

  nuevoComentario,
  setNuevoComentario,

  agregarComentario,
  agregarEvidencia,

  editarIncidencia,

  soloLectura,

  onClose,
}) {

  if (!detalleIncidencia) {
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
            <Text
              style={styles.modalTitle}
            >
              {detalleIncidencia.id}
            </Text>

            <Text
              style={styles.headerSubtitle}
            >
              {detalleIncidencia.area ||
                "-"}
              {" • "}
              {detalleIncidencia.proceso ||
                "-"}
              {" • "}
              {detalleIncidencia.categoria ||
                "-"}
            </Text>

            <View
              style={styles.badgeContainer}
            >
              <View
                style={styles.estadoBadge}
              >
                <Text
                  style={
                    styles.badgeText
                  }
                >
                  {
                    detalleIncidencia.estado
                  }
                </Text>
              </View>

              <View
                style={
                  styles.gravedadBadge
                }
              >
                <Text
                  style={
                    styles.badgeText
                  }
                >
                  {
                    detalleIncidencia.gravedad
                  }
                </Text>
              </View>
            </View>
          </View>

          {/* INFORMACIÓN GENERAL */}

          <Text
            style={styles.sectionTitle}
          >
            Información General
          </Text>

          <View
            style={styles.infoCard}
          >
            <Text
              style={styles.infoLabel}
            >
              Fecha
            </Text>

            <Text
              style={styles.infoValue}
            >
              {
                detalleIncidencia.fecha
              }
            </Text>
          </View>

          <View
            style={styles.infoCard}
          >
            <Text
              style={styles.infoLabel}
            >
              Área
            </Text>

            <Text
              style={styles.infoValue}
            >
              {
                detalleIncidencia.area ||
                "-"
              }
            </Text>
          </View>

          <View
            style={styles.infoCard}
          >
            <Text
              style={styles.infoLabel}
            >
              Proceso
            </Text>

            <Text
              style={styles.infoValue}
            >
              {
                detalleIncidencia.proceso ||
                "-"
              }
            </Text>
          </View>

          <View
            style={styles.infoCard}
          >
            <Text
              style={styles.infoLabel}
            >
              Turno
            </Text>

            <Text
              style={styles.infoValue}
            >
              {
                detalleIncidencia.turno ||
                "-"
              }
            </Text>
          </View>

          <View
            style={styles.infoCard}
          >
            <Text
              style={styles.infoLabel}
            >
              Ubicación
            </Text>

            <Text
              style={styles.infoValue}
            >
              {
                detalleIncidencia.ubicacion ||
                "-"
              }
            </Text>
          </View>

          <View
            style={styles.infoCard}
          >
            <Text
              style={styles.infoLabel}
            >
              Categoría
            </Text>

            <Text
              style={styles.infoValue}
            >
              {
                detalleIncidencia.categoria ||
                "-"
              }
            </Text>
          </View>

          <View
            style={styles.infoCard}
          >
            <Text
              style={styles.infoLabel}
            >
              Subcategoría
            </Text>

            <Text
              style={styles.infoValue}
            >
              {
                detalleIncidencia.subcategoria ||
                "-"
              }
            </Text>
          </View>

          <View
            style={styles.infoCard}
          >
            <Text
              style={styles.infoLabel}
            >
              SKU
            </Text>

            <Text
              style={styles.infoValue}
            >
              {
                detalleIncidencia.sku ||
                "-"
              }
            </Text>
          </View>

          <View
            style={styles.infoCard}
          >
            <Text
              style={styles.infoLabel}
            >
              Cantidad Afectada
            </Text>

            <Text
              style={styles.infoValue}
            >
              {
                detalleIncidencia.cantidadAfectada ||
                0
              }
            </Text>
          </View>

          <View
            style={styles.infoCard}
          >
            <Text
              style={styles.infoLabel}
            >
              Responsable
            </Text>

            <Text
              style={styles.infoValue}
            >
              {
                detalleIncidencia.responsable ||
                "-"
              }
            </Text>
          </View>

          <View
            style={styles.infoCard}
          >
            <Text
              style={styles.infoLabel}
            >
              Fecha Compromiso
            </Text>

            <Text
              style={styles.infoValue}
            >
              {
                detalleIncidencia.fechaCompromiso ||
                "-"
              }
            </Text>
          </View>

          <View
            style={styles.infoCard}
          >
            <Text
              style={styles.infoLabel}
            >
              Impacto Económico
            </Text>

            <Text
              style={styles.infoValue}
            >
              {Number(
                detalleIncidencia.impactoEconomico ||
                  0
              ).toLocaleString(
                "es-ES"
              )} €
            </Text>
          </View>

          {/* PROBLEMA */}

          <Text
            style={styles.sectionTitle}
          >
            Problema Detectado
          </Text>

          <View
            style={styles.sectionCard}
          >
            <Text
              style={
                styles.sectionText
              }
            >
              {
                detalleIncidencia.problema
              }
            </Text>
          </View>

          {/* CAUSA RAÍZ */}

          <Text
            style={styles.sectionTitle}
          >
            Causa Raíz
          </Text>

          <View
            style={styles.sectionCard}
          >
            <Text
              style={
                styles.sectionText
              }
            >
              {
                detalleIncidencia.causaRaiz ||
                "Pendiente de análisis"
              }
            </Text>
          </View>

          {/* ACCIÓN INMEDIATA */}

          <Text
            style={styles.sectionTitle}
          >
            Acción Inmediata
          </Text>

          <View
            style={styles.sectionCard}
          >
            <Text
              style={
                styles.sectionText
              }
            >
              {
                detalleIncidencia.accionInmediata ||
                "No definida"
              }
            </Text>
          </View>

          {/* ACCIÓN CORRECTIVA */}

          <Text
            style={styles.sectionTitle}
          >
            Acción Correctiva
          </Text>

          <View
            style={styles.sectionCard}
          >
            <Text
              style={
                styles.sectionText
              }
            >
              {
                detalleIncidencia.accionCorrectiva ||
                "No definida"
              }
            </Text>
          </View>

          {/* ACCIÓN PREVENTIVA */}

          <Text
            style={styles.sectionTitle}
          >
            Acción Preventiva
          </Text>

          <View
            style={styles.sectionCard}
          >
            <Text
              style={
                styles.sectionText
              }
            >
              {
                detalleIncidencia.accionPreventiva ||
                "No definida"
              }
            </Text>
          </View>

          {/* SEGUIMIENTO CAPA */}

          <Text
            style={styles.sectionTitle}
          >
            Seguimiento CAPA
          </Text>

          <View
            style={styles.sectionCard}
          >
            <Text
              style={
                styles.sectionText
              }
            >
              Estado actual:{" "}
              {
                detalleIncidencia.estado
              }
            </Text>

            <Text
              style={
                styles.sectionText
              }
            >
              Acciones abiertas:{" "}
              {
                detalleIncidencia.accionesAbiertas ||
                0
              }
            </Text>

            <Text
              style={
                styles.sectionText
              }
            >
              Días de resolución:{" "}
              {
                detalleIncidencia.diasResolucion ||
                0
              }
            </Text>

            <Text
              style={
                styles.sectionText
              }
            >
              Incidencia recurrente:{" "}
              {detalleIncidencia.recurrencia
                ? "Sí"
                : "No"}
            </Text>
          </View>

          {/* COMENTARIOS */}

          <Text
            style={styles.commentsTitle}
          >
            Comentarios
          </Text>

          {(detalleIncidencia.comentarios ||
            []).length === 0 ? (
            <View
              style={
                styles.emptyStateCard
              }
            >
              <Text>
                No existen comentarios
              </Text>
            </View>
          ) : (
            detalleIncidencia.comentarios.map(
              (
                comentario,
                index
              ) => (
                <View
                  key={index}
                  style={
                    styles.commentCard
                  }
                >
                  <Text
                    style={
                      styles.commentAuthor
                    }
                  >
                    {
                      comentario.autor
                    }
                  </Text>

                  <Text>
                    {
                      comentario.texto
                    }
                  </Text>

                  <Text
                    style={
                      styles.commentDate
                    }
                  >
                    {
                      comentario.fecha
                    }
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
              onPress={
                agregarComentario
              }
              style={
                styles.primaryButton
              }
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

          {/* EVIDENCIAS */}

          <Text
            style={styles.commentsTitle}
          >
            Evidencias
          </Text>

          {(detalleIncidencia.evidencias ||
            []).length === 0 ? (
            <View
              style={
                styles.emptyStateCard
              }
            >
              <Text>
                No existen evidencias
              </Text>
            </View>
          ) : (
            detalleIncidencia.evidencias.map(
              evidencia => (
                <View
                  key={evidencia.id}
                  style={
                    styles.evidenciaCard
                  }
                >
                  <Text>
                    📎{" "}
                    {
                      evidencia.nombre
                    }
                  </Text>
                </View>
              )
            )
          )}

          {!soloLectura && (
            <TouchableOpacity
              onPress={() =>
                agregarEvidencia(
                  detalleIncidencia
                )
              }
              style={
                styles.secondaryButton
              }
            >
              <Text
                style={
                  styles.primaryButtonText
                }
              >
                Añadir Evidencia
              </Text>
            </TouchableOpacity>
          )}

{/* HISTORIAL */}

<Text
  style={styles.commentsTitle}
>
  📜 Historial
</Text>

{(detalleIncidencia.historial ||
  []).length === 0 ? (

  <View
    style={
      styles.emptyStateCard
    }
  >
    <Text>
      No existe historial
      registrado
    </Text>
  </View>

) : (

  detalleIncidencia.historial.map(
    (item, index) => (

      <View
        key={index}
        style={
          styles.commentCard
        }
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

          <View
            style={styles.buttonRow}
          >
            {!soloLectura && (
              <TouchableOpacity
                onPress={() =>
                  editarIncidencia(
                    detalleIncidencia
                  )
                }
                style={
                  styles.editButton
                }
              >
                <Text
                  style={
                    styles.primaryButtonText
                  }
                >
                  Editar Incidencia
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={onClose}
              style={
                styles.closeButton
              }
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