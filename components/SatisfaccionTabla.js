import React from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "../styles/TablaStyles";
import { clasificarNPS } from "../services/satisfaccionService";

const colorClasificacion = clasificacion =>
  clasificacion === "Promotor"
    ? "#dcfce7"
    : clasificacion === "Pasivo"
    ? "#fef9c3"
    : clasificacion === "Detractor"
    ? "#fee2e2"
    : "#e2e8f0";

const colorEstado = estado =>
  estado === "Cerrada"
    ? "#dcfce7"
    : estado === "Respondida"
    ? "#dbeafe"
    : estado === "Enviada"
    ? "#fef9c3"
    : "#fed7aa";

export default function SatisfaccionTabla({
  registrosFiltrados,
  busqueda,
  setBusqueda,
  cambiarEstado,
  eliminar,
  verDetalle,
  editarRegistro,
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
            😊 Encuestas de Satisfacción
          </Text>

          <Text
            style={{
              color: "#64748b",
              marginTop: 4,
            }}
          >
            {registrosFiltrados.length}
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
        placeholder="🔍 Buscar cliente, responsable o pedido..."
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
            minWidth: 1700,
          }}
        >

          <View style={styles.tableHeader}>

            <Text style={[styles.headerCell, { width: 140 }]}>
              Código
            </Text>

            <Text style={[styles.headerCell, { width: 110 }]}>
              Fecha
            </Text>

            <Text style={[styles.headerCell, { width: 180 }]}>
              Cliente
            </Text>

            <Text style={[styles.headerCell, { width: 130 }]}>
              Canal
            </Text>

            <Text style={[styles.headerCell, { width: 100 }]}>
              NPS
            </Text>

            <Text style={[styles.headerCell, { width: 130 }]}>
              Clasificación
            </Text>

            <Text style={[styles.headerCell, { width: 160 }]}>
              Estado
            </Text>

            <Text style={[styles.headerCell, { width: 160 }]}>
              Seguimiento
            </Text>

            <Text style={[styles.headerCell, { width: 260 }]}>
              Gestión
            </Text>

          </View>

          {registrosFiltrados.length === 0 ? (

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
                No existen encuestas de satisfacción
              </Text>
            </View>

          ) : (

            registrosFiltrados
              .slice()
              .reverse()
              .map(item => {

                const clasificacion = clasificarNPS(item.nps);

                return (
                  <View
                    key={item.id}
                    style={styles.tableRow}
                  >

                    <Text style={[styles.cell, { width: 140 }]}>
                      {item.id}
                    </Text>

                    <Text style={[styles.cell, { width: 110 }]}>
                      {item.fecha}
                    </Text>

                    <Text
                      style={[
                        styles.cell,
                        { width: 180, fontWeight: "700" },
                      ]}
                    >
                      {item.cliente}
                    </Text>

                    <Text style={[styles.cell, { width: 130 }]}>
                      {item.canal}
                    </Text>

                    <Text
                      style={[
                        styles.cell,
                        { width: 100, fontWeight: "700" },
                      ]}
                    >
                      {item.nps ?? "-"}
                    </Text>

                    <View
                      style={{
                        width: 130,
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderRadius: 20,
                          backgroundColor:
                            colorClasificacion(clasificacion),
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: "700",
                          }}
                        >
                          {clasificacion}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: 160,
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderRadius: 20,
                          backgroundColor:
                            colorEstado(item.estado),
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

                    <Text
                      style={[
                        styles.cell,
                        { width: 160 },
                      ]}
                    >
                      {item.requiereSeguimiento &&
                      item.estado !== "Cerrada"
                        ? "⚠️ Pendiente"
                        : "-"}
                    </Text>

                    <View
                      style={[
                        styles.actions,
                        { width: 260 },
                      ]}
                    >

                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => verDetalle(item)}
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
                            onPress={() => editarRegistro(item)}
                          >
                            <Text>✏️</Text>
                            <Text style={styles.actionLabel}>
                              Editar
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => cambiarEstado(item.id)}
                          >
                            <Text>🔄</Text>
                            <Text style={styles.actionLabel}>
                              Estado
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={[
                              styles.actionButton,
                              { backgroundColor: "#fee2e2" },
                            ]}
                            onPress={() => eliminar(item.id)}
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
                );

              })

          )}

        </View>

      </ScrollView>

    </View>
  );
}
