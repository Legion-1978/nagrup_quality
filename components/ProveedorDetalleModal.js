import React from "react";

import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";

import styles from "../styles/DetalleModalStyles";

export default function ProveedorDetalleModal({
  visible,
  detalleNC,
  nuevoComentario,
  setNuevoComentario,
  agregarComentario,
  agregarEvidencia,
  editarNC,
  soloLectura,
  onClose,
}) {

  if (!detalleNC) {
    return null;
  }

return (
  <Modal
    visible={visible}
    animationType="slide"
    transparent={true}
    onRequestClose={onClose}
  >

    <View style={styles.modalOverlay}>

      <View style={styles.modalContent}>

        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          {/* ===================================================== */}
          {/* CABECERA NC */}
          {/* ===================================================== */}

          <View style={styles.headerCard}>

            <Text style={styles.modalTitle}>
              {detalleNC.id}
            </Text>

            <Text style={styles.headerSubtitle}>
              {detalleNC.proveedor}
            </Text>

            <View style={styles.badgeContainer}>

              <View style={styles.estadoBadge}>
                <Text style={styles.badgeText}>
                  {detalleNC.estado}
                </Text>
              </View>

              <View style={styles.gravedadBadge}>
                <Text style={styles.badgeText}>
                  {detalleNC.gravedad || "Media"}
                </Text>
              </View>

            </View>

          </View>

          {/* ===================================================== */}
          {/* INFORMACIÓN GENERAL */}
          {/* ===================================================== */}

          <Text style={styles.sectionTitle}>
            📌 Información General
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Fecha Registro
            </Text>
            <Text style={styles.infoValue}>
              {detalleNC.fecha}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Responsable
            </Text>
            <Text style={styles.infoValue}>
              {detalleNC.responsable || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Evaluador
            </Text>
            <Text style={styles.infoValue}>
              {detalleNC.evaluador || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Tipo NC
            </Text>
            <Text style={styles.infoValue}>
              {detalleNC.tipoNC || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Producto
            </Text>
            <Text style={styles.infoValue}>
              {detalleNC.codigoProducto || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Lote
            </Text>
            <Text style={styles.infoValue}>
              {detalleNC.lote || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Pedido Compra
            </Text>
            <Text style={styles.infoValue}>
              {detalleNC.pedidoCompra || "-"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Impacto
            </Text>
            <Text style={styles.infoValue}>
              {detalleNC.impacto || "Medio"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Días Resolución
            </Text>
            <Text style={styles.infoValue}>
              {detalleNC.diasResolucion || 0}
            </Text>
          </View>

          {/* ===================================================== */}
          {/* DESCRIPCIÓN NO CONFORMIDAD */}
          {/* ===================================================== */}

          <Text style={styles.sectionTitle}>
            ⚠️ Problema Detectado
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleNC.problema || "-"}
            </Text>
          </View>

          {/* ===================================================== */}
          {/* CAUSA RAÍZ */}
          {/* ===================================================== */}

          <Text style={styles.sectionTitle}>
            🔍 Causa Raíz
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleNC.causaRaiz || "-"}
            </Text>
          </View>

          {/* ===================================================== */}
          {/* ACCIÓN INMEDIATA */}
          {/* ===================================================== */}

          <Text style={styles.sectionTitle}>
            🚑 Acción Inmediata
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleNC.accionInmediata || "-"}
            </Text>
          </View>

          {/* ===================================================== */}
          {/* ACCIÓN CORRECTIVA */}
          {/* ===================================================== */}

          <Text style={styles.sectionTitle}>
            🛠 Acción Correctiva
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleNC.accionCorrectiva || "-"}
            </Text>
          </View>

          {/* ===================================================== */}
          {/* RESPUESTA DEL PROVEEDOR */}
          {/* ===================================================== */}

          <Text style={styles.sectionTitle}>
            🏭 Respuesta del Proveedor
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleNC.respuestaProveedor || "-"}
            </Text>
          </View>

          {/* ===================================================== */}
          {/* CONCLUSIÓN */}
          {/* ===================================================== */}

          <Text style={styles.sectionTitle}>
            📋 Conclusión
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleNC.conclusion || "-"}
            </Text>
          </View>

          {/* ===================================================== */}
          {/* VERIFICACIÓN DE EFICACIA */}
          {/* ===================================================== */}

          <Text style={styles.sectionTitle}>
            ✅ Verificación Eficacia
          </Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionText}>
              {detalleNC.verificacionEficacia || "-"}
            </Text>
          </View>

          {/* ===================================================== */}
          {/* IMPACTO ECONÓMICO */}
          {/* ===================================================== */}

          <Text style={styles.sectionTitle}>
            💰 Impacto Económico
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Coste Nagrup
            </Text>

            <Text style={styles.infoValue}>
              {Number(
                detalleNC.costeNagrup || 0
              ).toLocaleString("es-ES")} €
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Importe Recuperado
            </Text>

            <Text style={styles.infoValue}>
              {Number(
                detalleNC.importeAbonado || 0
              ).toLocaleString("es-ES")} €
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Pendiente Recuperar
            </Text>

            <Text
              style={[
                styles.infoValue,
                {
                  color: "#dc2626",
                  fontWeight: "700",
                },
              ]}
            >
              {Math.max(
                0,
                Number(
                  detalleNC.costeNagrup || 0
                ) -
                Number(
                  detalleNC.importeAbonado || 0
                )
              ).toLocaleString("es-ES")} €
            </Text>
          </View>

          {/* ===================================================== */}
          {/* EVIDENCIAS */}
          {/* ===================================================== */}

          <Text style={styles.commentsTitle}>
            📎 Evidencias
          </Text>

          {(detalleNC.evidencias || [])
            .length === 0 ? (

            <View
              style={styles.emptyStateCard}
            >
              <Text>
                No existen evidencias
              </Text>
            </View>

          ) : (

            detalleNC.evidencias.map(
              evidencia => (

                <View
                  key={evidencia.id}
                  style={
                    styles.evidenciaCard
                  }
                >

                  <Text>
                    📎 {evidencia.nombre}
                  </Text>

                  {evidencia.uri ? (
                    <Image
                      source={{
                        uri: evidencia.uri,
                      }}
                      style={{
                        width: "100%",
                        height: 180,
                        marginTop: 10,
                        borderRadius: 10,
                      }}
                      resizeMode="cover"
                    />
                  ) : null}

                  <Text
                    style={
                      styles.commentDate
                    }
                  >
                    {evidencia.fecha}
                  </Text>

                </View>

              )
            )

          )}

          {!soloLectura && (
            <TouchableOpacity
              onPress={agregarEvidencia}
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

          {/* ===================================================== */}
          {/* COMENTARIOS */}
          {/* ===================================================== */}

          <Text style={styles.commentsTitle}>
            💬 Comentarios
          </Text>

          {(detalleNC.comentarios || [])
            .length === 0 ? (

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

            detalleNC.comentarios.map(
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
                    {comentario.autor}
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

          {/* ===================================================== */}
          {/* HISTORIAL */}
          {/* ===================================================== */}

          <Text style={styles.commentsTitle}>
            📜 Historial
          </Text>

          {detalleNC.historial?.length > 0 ? (

            detalleNC.historial.map(
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

          ) : (

            <View
              style={styles.emptyStateCard}
            >
              <Text>
                No existe historial registrado
              </Text>
            </View>

          )}

          {/* ===================================================== */}
          {/* ACCIONES */}
          {/* ===================================================== */}

          <View style={styles.buttonRow}>

            {!soloLectura && (
              <TouchableOpacity
                onPress={() =>
                  editarNC(detalleNC)
                }
                style={styles.editButton}
              >
                <Text
                  style={
                    styles.primaryButtonText
                  }
                >
                  Editar NC
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