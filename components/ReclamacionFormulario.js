import React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "../styles/FormularioStyles";

const NIVELES_GRAVEDAD = ["Baja", "Media", "Alta"];

export default function ReclamacionFormulario({
  mostrarFormulario,
  setMostrarFormulario,

  editando,
  guardarEdicion,

  cliente,
  setCliente,

  descripcion,
  setDescripcion,

  responsable,
  setResponsable,

  coste,
  setCoste,

  fecha,
  setFecha,

  gravedad,
  setGravedad,

  producto,
  setProducto,

  pedido,
  setPedido,

  lote,
  setLote,

  causaRaiz,
  setCausaRaiz,

  accionCorrectiva,
  setAccionCorrectiva,

  compensacion,
  setCompensacion,

  crearReclamacion,
}) {
  return (
    <View style={styles.card}>

      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() =>
          setMostrarFormulario(
            !mostrarFormulario
          )
        }
      >
        <Text style={styles.cardTitle}>
          {editando
          ? "✏️ Editar Reclamación"
          : "📦 Nueva Reclamación"}
        </Text>

        <Text style={styles.expandIcon}>
          {mostrarFormulario
            ? "▲"
            : "▼"}
        </Text>
      </TouchableOpacity>

      {mostrarFormulario && (
        <>

          {/* DATOS DEL CLIENTE */}

          <TextInput
            style={styles.input}
            placeholder="Cliente"
            value={cliente}
            onChangeText={setCliente}
          />

          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Responsable"
            value={responsable}
            onChangeText={
              setResponsable
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Fecha (DD-MM-YYYY)"
            value={fecha}
            onChangeText={setFecha}
          />

          {/* TRAZABILIDAD DEL PRODUCTO */}

          <Text style={styles.sectionSubtitle}>
            Trazabilidad
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Producto / SKU"
            value={producto}
            onChangeText={setProducto}
          />

          <TextInput
            style={styles.input}
            placeholder="Nº de pedido"
            value={pedido}
            onChangeText={setPedido}
          />

          <TextInput
            style={styles.input}
            placeholder="Lote"
            value={lote}
            onChangeText={setLote}
          />

          {/* CLASIFICACIÓN */}

          <Text style={styles.sectionSubtitle}>
            Gravedad
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 12,
            }}
          >
            {NIVELES_GRAVEDAD.map((nivel) => (
              <TouchableOpacity
                key={nivel}
                onPress={() => setGravedad(nivel)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor:
                    gravedad === nivel
                      ? "#1D4ED8"
                      : "#E2E8F0",
                }}
              >
                <Text
                  style={{
                    color:
                      gravedad === nivel
                        ? "#FFFFFF"
                        : "#334155",
                    fontWeight: "600",
                  }}
                >
                  {nivel}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ANÁLISIS DE CAUSA Y ACCIÓN CORRECTIVA (ISO 10.2) */}

          <Text style={styles.sectionSubtitle}>
            Análisis (ISO 9001 - 10.2)
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Causa raíz"
            value={causaRaiz}
            onChangeText={setCausaRaiz}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Acción correctiva"
            value={accionCorrectiva}
            onChangeText={setAccionCorrectiva}
            multiline
          />

          {/* IMPACTO ECONÓMICO */}

          <Text style={styles.sectionSubtitle}>
            Impacto económico
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Coste (€)"
            keyboardType="numeric"
            value={coste}
            onChangeText={setCoste}
          />

          <TextInput
            style={styles.input}
            placeholder="Compensación al cliente (€)"
            keyboardType="numeric"
            value={compensacion}
            onChangeText={setCompensacion}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={
              editando
                ? guardarEdicion
                : crearReclamacion
            }
          >
            <Text style={styles.buttonText}>
              {editando
                ? "Actualizar Reclamación"
                : "Crear Reclamación"}
            </Text>
          </TouchableOpacity>

        </>
      )}

    </View>
  );
}
