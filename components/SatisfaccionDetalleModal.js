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
import { clasificarNPS } from "../services/satisfaccionService";

export default function SatisfaccionDetalleModal({
  visible,
  detalleRegistro,
  nuevoComentario,
  setNuevoComentario,
  agregarComentario,
  editarRegistro,
  marcarSeguimiento,
  accionSeguimientoTexto,
  setAccionSeguimientoTexto,
  soloLectura,
  onClose,
}) {

  if (!detalleRegistro) {
    return null;
  }

  const clasificacion = clasificarNPS(detalleRegistro.nps);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >

      <View style={styles.modalOverlay}>

        <View style={styles.modalContent}>

          <ScrollView showsVerticalScrollIndicator={false}>

            {/* CABECERA */}

            <View style={styles.headerCard}>

              <Text style={styles.modalTitle}>
                {detalleRegistro.id}
              </Text>

              <Text style={styles.headerSubtitle}>
                {detalleRegistro.cliente}
              </Text>

              <View style={styles.badgeContainer}>

                <View style={styles.estadoBadge}>
                  <Text style={styles.badgeText}>
                    {detalleRegistro.estado}
                  </Text>
                </View>

                <View style={styles.gravedadBadge}>
                  <Text style={styles.badgeText}>
                    {clasificacion}
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
                {detalleRegistro.cliente}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>
                Fecha
              </Text>

              <Text style={styles.infoValue}>
                {detalleRegistro.fecha}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>
                Responsable
              </Text>

              <Text style={styles.infoValue}>
                {detalleRegistro.responsable || "-"}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>
                Canal
              </Text>

              <Text style={styles.infoValue}>
                {detalleRegistro.canal}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>
                Pedido / Producto
              </Text>

              <Text style={styles.infoValue}>
                {detalleRegistro.pedido || "-"}
                {" / "}
                {detalleRegistro.producto || "-"}
              </Text>
            </View>

            {detalleRegistro.reclamacionRelacionada ? (
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>
                  Reclamación relacionada
                </Text>

                <Text style={styles.infoValue}>
                  {detalleRegistro.reclamacionRelacionada}
                </Text>
              </View>
            ) : null}

            {/* NOTAS */}

            <Text style={styles.sectionTitle}>
              Valoraciones
            </Text>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>
                NPS
              </Text>

              <Text style={styles.infoValue}>
                {detalleRegistro.nps ?? "-"} / 10
                {"  ("}{clasificacion}{")"}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>
                Calidad
              </Text>

              <Text style={styles.infoValue}>
                {detalleRegistro.notaCalidad ?? "-"} / 5
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>
                Plazo
              </Text>

              <Text style={styles.infoValue}>
                {detalleRegistro.notaPlazo ?? "-"} / 5
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>
                Comunicación
              </Text>

              <Text style={styles.infoValue}>
                {detalleRegistro.notaComunicacion ?? "-"} / 5
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>
                Precio
              </Text>

              <Text style={styles.infoValue}>
                {detalleRegistro.notaPrecio ?? "-"} / 5
              </Text>
            </View>

            {/* COMENTARIO DEL CLIENTE */}

            <Text style={styles.sectionTitle}>
              Comentario del Cliente
            </Text>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionText}>
                {detalleRegistro.comentario || "Sin comentario"}
              </Text>
            </View>

            {/* SEGUIMIENTO */}

            <Text style={styles.commentsTitle}>
              Seguimiento
            </Text>

            {detalleRegistro.requiereSeguimiento ? (
              <>
                <View style={styles.sectionCard}>
                  <Text style={styles.sectionText}>
                    ⚠️ Cliente detractor: requiere acción de
                    seguimiento antes de cerrar el registro.
                  </Text>
                </View>

                {!soloLectura && (
                  <>
                    <TextInput
                      placeholder="Acción de seguimiento realizada..."
                      value={accionSeguimientoTexto}
                      onChangeText={setAccionSeguimientoTexto}
                      style={styles.input}
                      multiline
                    />

                    <TouchableOpacity
                      onPress={() =>
                        marcarSeguimiento(detalleRegistro)
                      }
                      style={styles.primaryButton}
                    >
                      <Text style={styles.primaryButtonText}>
                        Marcar Seguimiento Resuelto
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            ) : (
              <View style={styles.emptyStateCard}>
                <Text>
                  {detalleRegistro.accionSeguimiento ||
                    "No requiere seguimiento"}
                </Text>
              </View>
            )}

            {/* COMENTARIOS INTERNOS */}

            <Text style={styles.commentsTitle}>
              Comentarios Internos
            </Text>

            {(detalleRegistro.comentarios || []).length === 0 ? (

              <View style={styles.emptyStateCard}>
                <Text>
                  No existen comentarios
                </Text>
              </View>

            ) : (

              detalleRegistro.comentarios.map(
                (comentario, index) => (

                  <View
                    key={index}
                    style={styles.commentCard}
                  >

                    <Text style={styles.commentAuthor}>
                      {comentario.autor || "Usuario"}
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
              placeholder="Añadir comentario interno..."
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

            {/* ACCIONES */}

            <View style={styles.buttonRow}>

              {!soloLectura && (
                <TouchableOpacity
                  onPress={() => {
                    onClose();
                    editarRegistro(detalleRegistro);
                  }}
                  style={styles.editButton}
                >
                  <Text style={styles.primaryButtonText}>
                    Editar Encuesta
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
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
