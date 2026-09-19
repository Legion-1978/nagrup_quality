import React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "../styles/FormularioStyles";

export default function ProveedorFormulario({
  mostrarFormulario,
  setMostrarFormulario,

  editando,

  codigo,

  proveedor,
  setProveedor,

  responsable,
  setResponsable,

  evaluador,
  setEvaluador,

  producto,
  setProducto,

  lote,
  setLote,

  pedidoCompra,
  setPedidoCompra,

  tipoNC,
  setTipoNC,

  impacto,
  setImpacto,

  problema,
  setProblema,

  causaRaiz,
  setCausaRaiz,

  accionInmediata,
  setAccionInmediata,

  accionCorrectiva,
  setAccionCorrectiva,

  respuestaProveedor,
  setRespuestaProveedor,

  conclusion,
  setConclusion,

  verificacionEficacia,
  setVerificacionEficacia,

  costeNagrup,
  setCosteNagrup,

  importeAbonado,
  setImporteAbonado,

  crearNC,
  guardarEdicion,
}) {
return (
  <View style={styles.card}>

    {/* ===================================================== */}
    {/* CABECERA DEL FORMULARIO */}
    {/* ===================================================== */}

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
          ? "✏️ Editar NC"
          : "🚚 Nueva NC"}
      </Text>

      <Text style={styles.expandIcon}>
        {mostrarFormulario
          ? "▲"
          : "▼"}
      </Text>
    </TouchableOpacity>

    {/* ===================================================== */}
    {/* FORMULARIO NC PROVEEDOR */}
    {/* ===================================================== */}

    {mostrarFormulario && (
      <>

        {/* ===================================================== */}
        {/* IDENTIFICACIÓN */}
        {/* ===================================================== */}

        <TextInput
          style={[
            styles.input,
            { backgroundColor: "#F1F5F9", color: "#64748B" },
          ]}
          placeholder="Se genera automáticamente al guardar"
          value={codigo}
          editable={false}
        />

        {/* ===================================================== */}
        {/* DATOS GENERALES */}
        {/* ===================================================== */}

        <TextInput
          style={styles.input}
          placeholder="Proveedor"
          value={proveedor}
          onChangeText={setProveedor}
        />

        <TextInput
          style={styles.input}
          placeholder="Responsable"
          value={responsable}
          onChangeText={setResponsable}
        />

        <TextInput
          style={styles.input}
          placeholder="Evaluador"
          value={evaluador}
          onChangeText={setEvaluador}
        />

        <TextInput
          style={styles.input}
          placeholder="Código Producto"
          value={producto}
          onChangeText={setProducto}
        />

        <TextInput
          style={styles.input}
          placeholder="Lote"
          value={lote}
          onChangeText={setLote}
        />

        <TextInput
          style={styles.input}
          placeholder="Pedido de Compra"
          value={pedidoCompra}
          onChangeText={setPedidoCompra}
        />

        {/* ===================================================== */}
        {/* CLASIFICACIÓN NC */}
        {/* ===================================================== */}

        <TextInput
          style={styles.input}
          placeholder="Tipo NC (Calidad, Cantidad, Transporte...)"
          value={tipoNC}
          onChangeText={setTipoNC}
        />

        <TextInput
          style={styles.input}
          placeholder="Impacto (Bajo, Medio, Alto, Crítico)"
          value={impacto}
          onChangeText={setImpacto}
        />

        {/* ===================================================== */}
        {/* DESCRIPCIÓN DEL PROBLEMA */}
        {/* ===================================================== */}

        <TextInput
          style={styles.input}
          placeholder="Problema Detectado"
          value={problema}
          onChangeText={setProblema}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Causa Raíz"
          value={causaRaiz}
          onChangeText={setCausaRaiz}
          multiline
        />

        {/* ===================================================== */}
        {/* ACCIONES Y SEGUIMIENTO */}
        {/* ===================================================== */}

        <TextInput
          style={styles.input}
          placeholder="Acción Inmediata"
          value={accionInmediata}
          onChangeText={setAccionInmediata}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Acción Correctiva"
          value={accionCorrectiva}
          onChangeText={setAccionCorrectiva}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Respuesta del Proveedor"
          value={respuestaProveedor}
          onChangeText={setRespuestaProveedor}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Conclusión"
          value={conclusion}
          onChangeText={setConclusion}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Verificación de Eficacia"
          value={verificacionEficacia}
          onChangeText={setVerificacionEficacia}
          multiline
        />

        {/* ===================================================== */}
        {/* IMPACTO ECONÓMICO */}
        {/* ===================================================== */}

        <TextInput
          style={styles.input}
          placeholder="Coste Nagrup (€)"
          value={costeNagrup}
          onChangeText={setCosteNagrup}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Importe Recuperado (€)"
          value={importeAbonado}
          onChangeText={setImporteAbonado}
          keyboardType="numeric"
        />

        {/* ===================================================== */}
        {/* ACCIÓN PRINCIPAL */}
        {/* ===================================================== */}

        <TouchableOpacity
          style={styles.button}
          onPress={
            editando
              ? guardarEdicion
              : crearNC
          }
        >
          <Text style={styles.buttonText}>
            {editando
              ? "Guardar Cambios"
              : "Crear NC"}
          </Text>
        </TouchableOpacity>

      </>
    )}

  </View>
);
}