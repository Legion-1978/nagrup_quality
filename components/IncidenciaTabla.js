import React from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "../styles/TablaStyles";

export default function IncidenciaTabla({
  incidenciasFiltradas,
  busqueda,
  setBusqueda,
  verDetalle,
  editarIncidencia,
  cambiarEstado,
  cambiarGravedad,
  gestionarAcciones,
  gestionarEvidencias,
  eliminar,
  soloLectura,
}) {

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Cerrada":
        return "#dcfce7";

      case "Validación Eficacia":
        return "#dbeafe";

      case "Acción Correctiva":
        return "#ede9fe";

      case "Contención Aplicada":
        return "#fed7aa";

      case "En Investigación":
        return "#fef9c3";

      case "Registrada":
        return "#e5e7eb";

      default:
        return "#e5e7eb";
    }
  };

  const getEstadoTextoColor = (
    estado
  ) => {
    switch (estado) {
      case "Cerrada":
        return "#166534";

      case "Validación Eficacia":
        return "#1d4ed8";

      case "Acción Correctiva":
        return "#6d28d9";

      case "Contención Aplicada":
        return "#c2410c";

      case "En Investigación":
        return "#a16207";

      case "Registrada":
        return "#475569";

      default:
        return "#334155";
    }
  };

  const getGravedadLabel = (
    gravedad
  ) => {
    switch (gravedad) {
      case "Crítica":
        return "🚨 Crítica";

      case "Alta":
        return "🔴 Alta";

      case "Media":
        return "🟡 Media";

      case "Baja":
        return "🟢 Baja";

      default:
        return "🟢 Baja";
    }
  };

  const getGravedadColor = (
    gravedad
  ) => {
    switch (gravedad) {
      case "Crítica":
        return "#b91c1c";

      case "Alta":
        return "#dc2626";

      case "Media":
        return "#ca8a04";

      case "Baja":
        return "#16a34a";

      default:
        return "#64748b";
    }
  };

  const getImpactoColor = (
    impacto
  ) => {
    const valor = Number(
      impacto || 0
    );

    if (valor >= 1000) {
      return "#b91c1c";
    }

    if (valor >= 500) {
      return "#ea580c";
    }

    if (valor >= 100) {
      return "#ca8a04";
    }

    return "#16a34a";
  };

  const getEstadoIcono = (
    estado
  ) => {
    switch (estado) {
      case "Registrada":
        return "📝";

      case "En Investigación":
        return "🔍";

      case "Contención Aplicada":
        return "🛡️";

      case "Acción Correctiva":
        return "📋";

      case "Validación Eficacia":
        return "✅";

      case "Cerrada":
        return "✔️";

      default:
        return "📄";
    }
  };

return (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>
      📋 Registro de Incidencias Internas de Calidad Logística
    </Text>

    <TextInput
      style={styles.input}
      placeholder="🔍 Buscar código, área, proceso, SKU, responsable o problema..."
      value={busqueda}
      onChangeText={setBusqueda}
    />

    <ScrollView
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator
    >
      <View style={{ minWidth: 3200 }}>

        {/* CABECERA */}

        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { width: 120 }]}>
            Código
          </Text>

          <Text style={[styles.headerCell, { width: 110 }]}>
            Fecha
          </Text>

          <Text style={[styles.headerCell, { width: 130 }]}>
            Área
          </Text>

          <Text style={[styles.headerCell, { width: 180 }]}>
            Proceso
          </Text>

          <Text style={[styles.headerCell, { width: 100 }]}>
            Turno
          </Text>

          <Text style={[styles.headerCell, { width: 140 }]}>
            Ubicación
          </Text>

          <Text style={[styles.headerCell, { width: 160 }]}>
            Categoría
          </Text>

          <Text style={[styles.headerCell, { width: 140 }]}>
            SKU
          </Text>

          <Text style={[styles.headerCell, { width: 120 }]}>
            Cantidad
          </Text>

          <Text style={[styles.headerCell, { width: 280 }]}>
            Problema
          </Text>

          <Text style={[styles.headerCell, { width: 130 }]}>
            Impacto €
          </Text>

          <Text style={[styles.headerCell, { width: 120 }]}>
            Gravedad
          </Text>

          <Text style={[styles.headerCell, { width: 180 }]}>
            Estado
          </Text>

          <Text style={[styles.headerCell, { width: 150 }]}>
            Responsable
          </Text>

          <Text style={[styles.headerCell, { width: 140 }]}>
            Compromiso
          </Text>

          <Text style={[styles.headerCell, { width: 100 }]}>
            CAPAs
          </Text>

          <Text style={[styles.headerCell, { width: 700 }]}>
            Gestión
          </Text>
        </View>

        {incidenciasFiltradas.length === 0 ? (
          <View style={{ padding: 20 }}>
            <Text
              style={{
                textAlign: "center",
              }}
            >
              No existen incidencias
            </Text>
          </View>
        ) : (
          incidenciasFiltradas
            .slice()
            .reverse()
            .map((incidencia) => (
              <View
                key={incidencia.id}
                style={styles.tableRow}
              >
                <Text
                  style={[
                    styles.cell,
                    { width: 120 },
                  ]}
                >
                  {incidencia.id}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 110 },
                  ]}
                >
                  {incidencia.fecha}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 130 },
                  ]}
                >
                  {incidencia.area || "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 180 },
                  ]}
                >
                  {incidencia.proceso || "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 100 },
                  ]}
                >
                  {incidencia.turno || "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 140 },
                  ]}
                >
                  {incidencia.ubicacion || "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 160 },
                  ]}
                >
                  {incidencia.categoria || "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 140 },
                  ]}
                >
                  {incidencia.sku || "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 120 },
                  ]}
                >
                  {incidencia.cantidadAfectada || 0}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 280 },
                  ]}
                >
                  {incidencia.problema}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    {
                      width: 130,
                      color: getImpactoColor(
                        incidencia.impactoEconomico
                      ),
                      fontWeight: "700",
                    },
                  ]}
                >
                  {Number(
                    incidencia.impactoEconomico || 0
                  ).toFixed(2)} €
                </Text>

                <TouchableOpacity
                  disabled={soloLectura}
                  style={{
                    width: 120,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() =>
                    cambiarGravedad(
                      incidencia.id
                    )
                  }
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      color: getGravedadColor(
                        incidencia.gravedad
                      ),
                    }}
                  >
                    {getGravedadLabel(
                      incidencia.gravedad
                    )}
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    width: 180,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor:
                        getEstadoColor(
                          incidencia.estado
                        ),

                      borderRadius: 20,

                      paddingHorizontal: 12,
                      paddingVertical: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "700",
                        color:
                          getEstadoTextoColor(
                            incidencia.estado
                          ),
                      }}
                    >
                      {getEstadoIcono(
                        incidencia.estado
                      )}{" "}
                      {incidencia.estado}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.cell,
                    { width: 150 },
                  ]}
                >
                  {incidencia.responsable || "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 140 },
                  ]}
                >
                  {incidencia.fechaCompromiso ||
                    "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    {
                      width: 100,
                      fontWeight: "700",
                    },
                  ]}
                >
                  {incidencia.accionesAbiertas ||
                    0}
                </Text>

                <View
                  style={[
                    styles.actions,
                    {
                      width: 700,
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() =>
                      verDetalle(
                        incidencia
                      )
                    }
                  >
                    <Text>👁️</Text>
                    <Text
                      style={
                        styles.actionLabel
                      }
                    >
                      Ver
                    </Text>
                  </TouchableOpacity>

                  {!soloLectura && (
                    <>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                          editarIncidencia(
                            incidencia
                          )
                        }
                      >
                        <Text>✏️</Text>
                        <Text
                          style={
                            styles.actionLabel
                          }
                        >
                          Editar
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                          cambiarEstado(
                            incidencia.id
                          )
                        }
                      >
                        <Text>🔄</Text>
                        <Text
                          style={
                            styles.actionLabel
                          }
                        >
                          Estado
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                          cambiarGravedad(
                            incidencia.id
                          )
                        }
                      >
                        <Text>⚠️</Text>
                        <Text
                          style={
                            styles.actionLabel
                          }
                        >
                          Gravedad
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.actionButton,
                          {
                            backgroundColor:
                              "#fee2e2",
                          },
                        ]}
                        onPress={() =>
                          eliminar(
                            incidencia.id
                          )
                        }
                      >
                        <Text>🗑️</Text>
                        <Text
                          style={
                            styles.actionLabel
                          }
                        >
                          Borrar
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            ))
        )}
      </View>
    </ScrollView>
  </View>
);
}