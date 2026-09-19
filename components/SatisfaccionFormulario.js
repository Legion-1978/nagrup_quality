import React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "../styles/FormularioStyles";

const CANALES = ["Teléfono", "Email", "Presencial", "Otro"];

const NOTAS_1_5 = [1, 2, 3, 4, 5];

function SelectorNota({ etiqueta, valor, onCambiar }) {
  return (
    <>
      <Text style={styles.sectionSubtitle}>
        {etiqueta}
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 12,
        }}
      >
        {NOTAS_1_5.map(nota => (
          <TouchableOpacity
            key={nota}
            onPress={() => onCambiar(String(nota))}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                String(valor) === String(nota)
                  ? "#1D4ED8"
                  : "#E2E8F0",
            }}
          >
            <Text
              style={{
                color:
                  String(valor) === String(nota)
                    ? "#FFFFFF"
                    : "#334155",
                fontWeight: "700",
              }}
            >
              {nota}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

export default function SatisfaccionFormulario({
  mostrarFormulario,
  setMostrarFormulario,

  editando,
  guardarEdicion,

  cliente,
  setCliente,

  responsable,
  setResponsable,

  pedido,
  setPedido,

  producto,
  setProducto,

  fecha,
  setFecha,

  canal,
  setCanal,

  nps,
  setNps,

  notaCalidad,
  setNotaCalidad,

  notaPlazo,
  setNotaPlazo,

  notaComunicacion,
  setNotaComunicacion,

  notaPrecio,
  setNotaPrecio,

  comentario,
  setComentario,

  reclamacionRelacionada,
  setReclamacionRelacionada,

  crearRegistro,
}) {
  return (
    <View style={styles.card}>

      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() =>
          setMostrarFormulario(!mostrarFormulario)
        }
      >
        <Text style={styles.cardTitle}>
          {editando
            ? "✏️ Editar Encuesta"
            : "😊 Nueva Encuesta de Satisfacción"}
        </Text>

        <Text style={styles.expandIcon}>
          {mostrarFormulario ? "▲" : "▼"}
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
            placeholder="Responsable de la llamada / contacto"
            value={responsable}
            onChangeText={setResponsable}
          />

          <TextInput
            style={styles.input}
            placeholder="Fecha (DD/MM/YYYY)"
            value={fecha}
            onChangeText={setFecha}
          />

          {/* TRAZABILIDAD */}

          <Text style={styles.sectionSubtitle}>
            Trazabilidad
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nº de pedido"
            value={pedido}
            onChangeText={setPedido}
          />

          <TextInput
            style={styles.input}
            placeholder="Producto / SKU"
            value={producto}
            onChangeText={setProducto}
          />

          <TextInput
            style={styles.input}
            placeholder="Reclamación relacionada (código, opcional)"
            value={reclamacionRelacionada}
            onChangeText={setReclamacionRelacionada}
          />

          {/* CANAL */}

          <Text style={styles.sectionSubtitle}>
            Canal de contacto
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 12,
            }}
          >
            {CANALES.map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => setCanal(item)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor:
                    canal === item
                      ? "#1D4ED8"
                      : "#E2E8F0",
                }}
              >
                <Text
                  style={{
                    color:
                      canal === item
                        ? "#FFFFFF"
                        : "#334155",
                    fontWeight: "600",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* NPS */}

          <Text style={styles.sectionSubtitle}>
            NPS — ¿Recomendaría naGRUP? (0 a 10)
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 12,
            }}
          >
            {Array.from({ length: 11 }, (_, i) => i).map(valor => (
              <TouchableOpacity
                key={valor}
                onPress={() => setNps(String(valor))}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    String(nps) === String(valor)
                      ? "#1D4ED8"
                      : "#E2E8F0",
                }}
              >
                <Text
                  style={{
                    color:
                      String(nps) === String(valor)
                        ? "#FFFFFF"
                        : "#334155",
                    fontWeight: "700",
                    fontSize: 12,
                  }}
                >
                  {valor}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* SUB-NOTAS POR ASPECTO */}

          <Text style={styles.sectionSubtitle}>
            Valoración por aspecto (1 a 5)
          </Text>

          <SelectorNota
            etiqueta="Calidad del producto"
            valor={notaCalidad}
            onCambiar={setNotaCalidad}
          />

          <SelectorNota
            etiqueta="Cumplimiento de plazo"
            valor={notaPlazo}
            onCambiar={setNotaPlazo}
          />

          <SelectorNota
            etiqueta="Comunicación"
            valor={notaComunicacion}
            onCambiar={setNotaComunicacion}
          />

          <SelectorNota
            etiqueta="Precio"
            valor={notaPrecio}
            onCambiar={setNotaPrecio}
          />

          {/* COMENTARIO */}

          <Text style={styles.sectionSubtitle}>
            Comentario del cliente
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Comentario textual del cliente"
            value={comentario}
            onChangeText={setComentario}
            multiline
          />

          <TouchableOpacity
            style={styles.button}
            onPress={editando ? guardarEdicion : crearRegistro}
          >
            <Text style={styles.buttonText}>
              {editando
                ? "Actualizar Encuesta"
                : "Guardar Encuesta"}
            </Text>
          </TouchableOpacity>

        </>
      )}

    </View>
  );
}
