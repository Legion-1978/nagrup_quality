import React from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "../styles/TablaStyles";

export default function AuditoriaTabla({
  auditoriasFiltradas,

  busqueda,
  setBusqueda,

  verDetalle,
  editarAuditoria,
  cambiarEstado,

  eliminar,
  soloLectura,
}) {

  const obtenerColorEstado = (
    estado
  ) => {

    switch (estado) {

      case "Planificada":
        return "#dbeafe";

      case "En Ejecución":
        return "#fef9c3";

      case "Seguimiento":
        return "#ede9fe";

      case "Cerrada":
        return "#dcfce7";

      default:
        return "#f1f5f9";

    }

  };

  return (

    <View style={styles.card}>

      <Text style={styles.cardTitle}>
        📋 Gestión de Auditorías
      </Text>

      <TextInput
        style={styles.input}
        placeholder="🔍 Buscar auditoría, norma o auditor..."
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
            minWidth: 1750,
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
                { width: 140 },
              ]}
            >
              Tipo
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 140 },
              ]}
            >
              Norma
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 150 },
              ]}
            >
              Auditor
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 180 },
              ]}
            >
              Responsable Auditado
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 150 },
              ]}
            >
              Alcance
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
                { width: 160 },
              ]}
            >
              Estado
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 100 },
              ]}
            >
              Hallazgos
            </Text>

            <Text
              style={[
                styles.headerCell,
                { width: 100 },
              ]}
            >
              Acciones
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

          {auditoriasFiltradas.length ===
          0 ? (

            <View
              style={{
                padding: 20,
              }}
            >
              <Text
                style={{
                  textAlign:
                    "center",
                }}
              >
                No existen auditorías registradas
              </Text>
            </View>

          ) : (

            auditoriasFiltradas
              .slice()
              .reverse()
              .map(auditoria => (

                <View
                  key={auditoria.id}
                  style={
                    styles.tableRow
                  }
                >

                  <Text
                    style={[
                      styles.cell,
                      { width: 120 },
                    ]}
                  >
                    {auditoria.id}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      { width: 140 },
                    ]}
                  >
                    {auditoria.tipo}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      { width: 140 },
                    ]}
                  >
                    {auditoria.norma ||
                      "-"}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      { width: 150 },
                    ]}
                  >
                    {auditoria.auditor ||
                      "-"}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      {
                        width: 180,
                      },
                    ]}
                  >
                    {auditoria.responsableAuditado ||
                      "-"}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      {
                        width: 150,
                      },
                    ]}
                  >
                    {auditoria.alcance ||
                      "-"}
                  </Text>

<Text
  style={[
    styles.cell,
    { width: 120 },
  ]}
>
  {auditoria.fecha
    ? auditoria.fecha.includes("-")
      ? auditoria.fecha
          .split("-")
          .reverse()
          .join("/")
      : auditoria.fecha
    : "-"
  }
</Text>

                  <View
                    style={{
                      width: 160,
                      alignItems:
                        "center",
                    }}
                  >

                    <View
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 20,
                        backgroundColor:
                          obtenerColorEstado(
                            auditoria.estado
                          ),
                      }}
                    >

                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight:
                            "700",
                        }}
                      >
                        {
                          auditoria.estado
                        }
                      </Text>

                    </View>

                  </View>

                  <Text
                    style={[
                      styles.cell,
                      { width: 100 },
                    ]}
                  >
                    {auditoria
                      .hallazgos
                      ?.length || 0}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      { width: 100 },
                    ]}
                  >
                    {auditoria
                      .accionesAbiertas ||
                      0}
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
                      style={
                        styles.actionButton
                      }
                      onPress={() =>
                        verDetalle(
                          auditoria
                        )
                      }
                    >
                      <Text>
                        👁️
                      </Text>
                    </TouchableOpacity>

                    {!soloLectura && (
                      <>
                        <TouchableOpacity
                          style={
                            styles.actionButton
                          }
                          onPress={() =>
                            editarAuditoria(
                              auditoria
                            )
                          }
                        >
                          <Text>
                            ✏️
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={
                            styles.actionButton
                          }
                          onPress={() =>
                            cambiarEstado(
                              auditoria.id
                            )
                          }
                        >
                          <Text>
                            🔄
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
                              auditoria.id
                            )
                          }
                        >
                          <Text>
                            🗑️
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