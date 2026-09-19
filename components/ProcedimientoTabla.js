import React from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "../styles/TablaStyles";

export default function ProcedimientoTabla({
  procedimientosFiltrados,

  busqueda,
  setBusqueda,

  verDetalle,
  editarProcedimiento,
  cambiarEstado,
  eliminar,
  soloLectura,
}) {

  return (

    <View style={styles.card}>

      <Text style={styles.cardTitle}>
        📋 Registro de Procedimientos
      </Text>

      <TextInput
        style={styles.input}
        placeholder="🔍 Buscar código, título, responsable o departamento"
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
            minWidth: 2350,
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
                { width: 320 },
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
              Tipo
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 180 },
              ]}
            >
              Departamento
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
                { width: 120 },
              ]}
            >
              Versión
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 140 },
              ]}
            >
              Emisión
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 140 },
              ]}
            >
              Revisión
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
              Criticidad
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 120 },
              ]}
            >
              Evidencias
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 120 },
              ]}
            >
              Comentarios
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 430 },
              ]}
            >
              Gestión
            </Text>

          </View>

          {procedimientosFiltrados.length === 0 ? (

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
                No existen procedimientos registrados
              </Text>
            </View>

          ) : (

            procedimientosFiltrados
              .slice()
              .reverse()
              .map(item => (

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
                    {item.codigo}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      {
                        width: 320,
                        fontWeight: "700",
                      },
                    ]}
                  >
                    {item.titulo}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      { width: 180 },
                    ]}
                  >
                    {item.tipo || "-"}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      { width: 180 },
                    ]}
                  >
                    {item.departamento || "-"}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      { width: 180 },
                    ]}
                  >
                    {item.responsable || "-"}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      { width: 120 },
                    ]}
                  >
                    {item.version || "-"}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      { width: 140 },
                    ]}
                  >
                    {item.fechaEmision || "-"}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      { width: 140 },
                    ]}
                  >
                    {item.fechaRevision || "-"}
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
                          item.estado === "Vigente"
                            ? "#dcfce7"
                            : item.estado === "En Revisión"
                            ? "#fef9c3"
                            : item.estado === "Obsoleto"
                            ? "#fee2e2"
                            : "#dbeafe",
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
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "700",
                      }}
                    >
                      {item.criticidad === "Alta"
                        ? "🔴 Alta"
                        : item.criticidad === "Baja"
                        ? "🟢 Baja"
                        : "🟠 Media"}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.cell,
                      {
                        width: 120,
                        textAlign: "center",
                      },
                    ]}
                  >
                    {item.evidencias?.length || 0}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      {
                        width: 120,
                        textAlign: "center",
                      },
                    ]}
                  >
                    {item.comentarios?.length || 0}
                  </Text>

                  <View
                    style={[
                      styles.actions,
                      {
                        width: 430,
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
                        style={styles.actionLabel}
                      >
                        Ver
                      </Text>
                    </TouchableOpacity>

                    {!soloLectura && (
                      <>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() =>
                            editarProcedimiento(item)
                          }
                        >
                          <Text>✏️</Text>
                          <Text
                            style={styles.actionLabel}
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
                            style={styles.actionLabel}
                          >
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
                            eliminar(item.id)
                          }
                        >
                          <Text>🗑️</Text>
                          <Text
                            style={styles.actionLabel}
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