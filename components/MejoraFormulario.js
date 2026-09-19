import React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "../styles/FormularioStyles";

export default function MejoraFormulario({
  mostrarFormulario,
  setMostrarFormulario,

  editando,
  guardarEdicion,

  titulo,
  setTitulo,

  descripcion,
  setDescripcion,

  tipo,
  setTipo,

  origen,
  setOrigen,

  area,
  setArea,

  proceso,
  setProceso,

  departamento,
  setDepartamento,

  responsable,
  setResponsable,

  patrocinador,
  setPatrocinador,

  prioridad,
  setPrioridad,

  impacto,
  setImpacto,

  categoria,
  setCategoria,

  subcategoria,
  setSubcategoria,

  causaOrigen,
  setCausaOrigen,

  accionPropuesta,
  setAccionPropuesta,

  indicador,
  setIndicador,

  unidadIndicador,
  setUnidadIndicador,

  valorInicial,
  setValorInicial,

  valorObjetivo,
  setValorObjetivo,

  beneficio,
  setBeneficio,

  ahorroEstimado,
  setAhorroEstimado,

  costeProyecto,
  setCosteProyecto,

  fechaInicio,
  setFechaInicio,

  fechaObjetivo,
  setFechaObjetivo,

  observaciones,
  setObservaciones,

  crearMejora,
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
          ? "✏️ Editar Acción de Mejora"
          : "📈 Nueva Acción de Mejora"}
      </Text>

      <Text style={styles.expandIcon}>
        {mostrarFormulario
          ? "▲"
          : "▼"}
      </Text>
    </TouchableOpacity>

    {mostrarFormulario && (
      <>

        <TextInput
          style={styles.input}
          placeholder="Título de la mejora"
          value={titulo}
          onChangeText={setTitulo}
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
          placeholder="Tipo de mejora"
          value={tipo}
          onChangeText={setTipo}
        />

        <TextInput
          style={styles.input}
          placeholder="Origen"
          value={origen}
          onChangeText={setOrigen}
        />

        <TextInput
          style={styles.input}
          placeholder="Área"
          value={area}
          onChangeText={setArea}
        />

        <TextInput
          style={styles.input}
          placeholder="Proceso"
          value={proceso}
          onChangeText={setProceso}
        />

        <TextInput
          style={styles.input}
          placeholder="Departamento"
          value={departamento}
          onChangeText={setDepartamento}
        />

        <TextInput
          style={styles.input}
          placeholder="Responsable"
          value={responsable}
          onChangeText={setResponsable}
        />

        <TextInput
          style={styles.input}
          placeholder="Patrocinador"
          value={patrocinador}
          onChangeText={setPatrocinador}
        />

        <TextInput
          style={styles.input}
          placeholder="Prioridad"
          value={prioridad}
          onChangeText={setPrioridad}
        />

        <TextInput
          style={styles.input}
          placeholder="Impacto"
          value={impacto}
          onChangeText={setImpacto}
        />

        <TextInput
          style={styles.input}
          placeholder="Categoría"
          value={categoria}
          onChangeText={setCategoria}
        />

        <TextInput
          style={styles.input}
          placeholder="Subcategoría"
          value={subcategoria}
          onChangeText={setSubcategoria}
        />

        <TextInput
          style={styles.input}
          placeholder="Causa de origen"
          value={causaOrigen}
          onChangeText={setCausaOrigen}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Acción propuesta"
          value={accionPropuesta}
          onChangeText={setAccionPropuesta}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Indicador"
          value={indicador}
          onChangeText={setIndicador}
        />

        <TextInput
          style={styles.input}
          placeholder="Unidad del indicador"
          value={unidadIndicador}
          onChangeText={setUnidadIndicador}
        />

        <TextInput
          style={styles.input}
          placeholder="Valor inicial"
          value={valorInicial}
          onChangeText={setValorInicial}
        />

        <TextInput
          style={styles.input}
          placeholder="Valor objetivo"
          value={valorObjetivo}
          onChangeText={setValorObjetivo}
        />

        <TextInput
          style={styles.input}
          placeholder="Beneficio (€)"
          keyboardType="numeric"
          value={beneficio}
          onChangeText={setBeneficio}
        />

        <TextInput
          style={styles.input}
          placeholder="Ahorro estimado (€)"
          keyboardType="numeric"
          value={ahorroEstimado}
          onChangeText={setAhorroEstimado}
        />

        <TextInput
          style={styles.input}
          placeholder="Coste proyecto (€)"
          keyboardType="numeric"
          value={costeProyecto}
          onChangeText={setCosteProyecto}
        />

        <TextInput
          style={styles.input}
          placeholder="Fecha inicio (DD/MM/YYYY)"
          value={fechaInicio}
          onChangeText={setFechaInicio}
        />

        <TextInput
          style={styles.input}
          placeholder="Fecha objetivo (DD/MM/YYYY)"
          value={fechaObjetivo}
          onChangeText={setFechaObjetivo}
        />

        <TextInput
          style={styles.input}
          placeholder="Observaciones"
          value={observaciones}
          onChangeText={setObservaciones}
          multiline
        />

        <TouchableOpacity
          style={styles.button}
          onPress={
            editando
              ? guardarEdicion
              : crearMejora
          }
        >
          <Text style={styles.buttonText}>
            {editando
              ? "Guardar Cambios"
              : "Crear Acción de Mejora"}
          </Text>
        </TouchableOpacity>

      </>
    )}

  </View>
);
}