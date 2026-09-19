import React from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "../styles/TablaStyles";

export default function MejoraTabla({
  mejorasFiltradas,

  busqueda,
  setBusqueda,

  verDetalle,
  editarMejora,
  cambiarEstado,
  eliminar,
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
          🚀 Mejoras
        </Text>

        <Text
          style={{
            color: "#64748b",
            marginTop: 4,
          }}
        >
          {mejorasFiltradas.length}
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
      placeholder="🔍 Buscar mejora..."
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
          minWidth: 2200,
        }}
      >

        <View style={styles.tableHeader}>

          <Text
            style={[
              styles.headerCell,
              { width: 120 },
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
              { width: 250 },
            ]}
          >
            Título
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 180 },
            ]}
          >
            Área
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 180 },
            ]}
          >
            Tipo
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 180 },
            ]}
          >
            Responsable
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 130 },
            ]}
          >
            Prioridad
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 160 },
            ]}
          >
            Estado
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 120 },
            ]}
          >
            Avance
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 140 },
            ]}
          >
            Beneficio
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 320 },
            ]}
          >
            Gestión
          </Text>

        </View>

        {mejorasFiltradas.length === 0 ? (

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
              No existen acciones de mejora registradas
            </Text>

          </View>

        ) : (

          mejorasFiltradas
            .slice()
            .reverse()
            .map(mejora => (

              <View
                key={mejora.id}
                style={styles.tableRow}
              >

                <Text
                  style={[
                    styles.cell,
                    { width: 120 },
                  ]}
                >
                  {mejora.id}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 120 },
                  ]}
                >
                  {mejora.fechaInicio ||
                    mejora.fechaCreacion ||
                    mejora.fecha ||
                    "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 250 },
                  ]}
                  numberOfLines={2}
                >
                  {mejora.titulo}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 180 },
                  ]}
                >
                  {mejora.area || "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 180 },
                  ]}
                >
                  {mejora.tipo ||
                    mejora.proceso ||
                    "-"}
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
                  {mejora.responsable || "-"}
                </Text>

                <View
                  style={{
                    width: 130,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >

                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 20,

                      backgroundColor:
                        (mejora.prioridad || "Media") ===
                        "Alta"
                          ? "#fee2e2"
                          : (mejora.prioridad || "Media") ===
                            "Media"
                          ? "#fef3c7"
                          : "#dcfce7",
                    }}
                  >

                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "700",
                      }}
                    >
                      {mejora.prioridad ||
                        "Media"}
                    </Text>

                  </View>

                </View>

                <View
                  style={{
                    width: 160,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >

                  <View
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 20,

                      backgroundColor:
                        mejora.estado ===
                        "Finalizada"
                          ? "#dcfce7"
                          : mejora.estado ===
                            "Cerrada"
                          ? "#dcfce7"
                          : mejora.estado ===
                            "En Curso"
                          ? "#dbeafe"
                          : mejora.estado ===
                            "Implantación"
                          ? "#ede9fe"
                          : mejora.estado ===
                            "Planificada"
                          ? "#fef3c7"
                          : "#fee2e2",
                    }}
                  >

                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "700",
                      }}
                    >
                      {mejora.estado}
                    </Text>

                  </View>

                </View>

                <Text
                  style={[
                    styles.cell,
                    {
                      width: 120,
                      fontWeight: "700",
                    },
                  ]}
                >
                  {mejora.porcentajeAvance ??
                    mejora.progreso ??
                    0}
                  %
                </Text>

                <Text
                  style={[
                    styles.cell,
                    {
                      width: 140,
                      fontWeight: "700",
                      color: "#16a34a",
                    },
                  ]}
                >
                  {mejora.beneficio
                    ? `${Number(
                        mejora.beneficio
                      ).toLocaleString(
                        "es-ES"
                      )} €`
                    : "-"}
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
                      verDetalle(mejora)
                    }
                  >
                    <Text>👁️</Text>

                    <Text style={styles.actionLabel}>
                      Ver
                    </Text>
                  </TouchableOpacity>

                  {!soloLectura && (
                    <>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                          editarMejora(mejora)
                        }
                      >
                        <Text>✏️</Text>

                        <Text style={styles.actionLabel}>
                          Editar
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                          cambiarEstado(
                            mejora.id
                          )
                        }
                      >
                        <Text>🔄</Text>

                        <Text style={styles.actionLabel}>
                          Estado
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
                            mejora.id
                          )
                        }
                      >
                        <Text>🗑️</Text>

                        <Text style={styles.actionLabel}>
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