import React from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "../styles/TablaStyles";

export default function ReclamacionTabla({
  reclamacionesFiltradas,
  busqueda,
  setBusqueda,
  cambiarEstado,
  cambiarGravedad,
  eliminar,
  verDetalle,
  editarReclamacion,
  gestionarEvidencias,
  soloLectura,
}) {
  return (
    <View style={styles.card}>

      <View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  }}
>

  <View>
    <Text style={styles.cardTitle}>
      📋 Reclamaciones
    </Text>

    <Text
      style={{
        color: "#64748b",
        marginTop: 4,
      }}
    >
      {reclamacionesFiltradas.length}
      {" "}registros encontrados
    </Text>
  </View>

</View>

<TextInput
  style={[
    styles.input,
    {
      marginBottom: 15,
      backgroundColor: "#f8fafc",
    },
  ]}
  placeholder="🔍 Buscar cliente, descripción o responsable..."
  value={busqueda}
  onChangeText={setBusqueda}
/>

      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator
      >
        <View
          style={{
            minWidth: 1800,
          }}
        >

          <View style={styles.tableHeader}>

            <Text
              style={[
                styles.headerCell,
                { width: 140 },
              ]}
            >
              Código
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 120 },
              ]}
            >
              Fecha
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 180 },
              ]}
            >
              Cliente
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 320 },
              ]}
            >
              Descripción
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 160 },
              ]}
            >
              Responsable
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 120 },
              ]}
            >
              Coste
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 180 },
              ]}
            >
              Estado
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 140 },
              ]}
            >
              Gravedad
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 140 },
              ]}
            >
              Fecha cierre
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 280 },
              ]}
            >
              Gestión
            </Text>

          </View>

          {reclamacionesFiltradas.length === 0 ? (

            <View
              style={{
                padding: 20,
                backgroundColor: "#fff",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#64748b",
                }}
              >
                No existen reclamaciones
              </Text>
            </View>

          ) : (

            reclamacionesFiltradas
              .slice()
              .reverse()
              .map((item) => (

                <View
                  key={item.id}
                  style={styles.tableRow}
                >

                  <Text
                    style={[
                      styles.cell,
                      { width: 140 },
                    ]}
                  >
                    {item.id}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      { width: 120 },
                    ]}
                  >
                    {item.fecha}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      {
                        width: 180,
                        fontWeight: "700",
                      },
                    ]}
                  >
                    {item.cliente}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      {
                        width: 320,
                      },
                    ]}
                  >
                    {item.descripcion}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      {
                        width: 160,
                      },
                    ]}
                  >
                    {item.responsable || "-"}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      {
                        width: 120,
                      },
                    ]}
                  >
                    {item.coste} €
                  </Text>

                  <View
                    style={{
                      width: 180,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 20,

                        backgroundColor:
                          item.estado === "Cerrada"
                            ? "#dcfce7"
                            : item.estado ===
                              "Pendiente Cliente"
                            ? "#fef9c3"
                            : item.estado ===
                              "Acción Correctiva"
                            ? "#ede9fe"
                            : "#fed7aa",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: "700",
                        }}
                      >
                        {item.estado}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: 140,
                      alignItems: "center",
                    }}
                  >
                    <Text>
                      {item.gravedad === "Alta"
                        ? "🔴 Alta"
                        : item.gravedad ===
                          "Baja"
                        ? "🟢 Baja"
                        : "🟠 Media"}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.cell,
                      {
                        width: 140,
                      },
                    ]}
                  >
                    {item.fechaCierre || "-"}
                  </Text>

<View
  style={[
    styles.actions,
    {
      width: 320,
    },
  ]}
>

                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() =>
                        verDetalle(item)
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
                            editarReclamacion(item)
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
                            cambiarEstado(item.id)
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
                            cambiarGravedad(item.id)
                          }
                        >
                          <Text>⚠️</Text>
                          <Text
                            style={
                              styles.actionLabel
                            }
                          >
                            Severidad
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
                            eliminar(item.id)
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