import React, {
  useState,
  useMemo,
} from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  guardarAuditoria,
  actualizarAuditoria as actualizarAuditoriaDB,
  eliminarAuditoria as eliminarAuditoriaDB,
  obtenerAuditorias,
} from "../services/auditoriasRepository";
import { useQuality } from "../context/QualityContext";
import { useAuth } from "../context/AuthContext";
import {
  generarSiguienteId,
  PREFIJOS_ID,
} from "../utils/correlativos";
import { auditoriaSchema } from "../schemas/auditoriaSchema";
import { validar } from "../schemas/validar";
import { mostrarMensaje } from "../utils/mensajes";
import ScreenLayout from "../components/ScreenLayout";
import KPIBox from "../components/KPIBox";

import AuditoriaFormulario from "../components/AuditoriaFormulario";
import AuditoriaTabla from "../components/AuditoriaTabla";
import AuditoriaDetalleModal from "../components/AuditoriaDetalleModal";

import {
  crearModeloAuditoria,
} from "../models/Auditoria";

import {
  calcularKPIsAuditorias,
} from "../utils/auditoriasKPI";

import {
  crearNuevaAuditoria,
  borrarAuditoria,
  actualizarEstadoAuditoria,
  actualizarAuditoria,
  agregarComentarioAuditoria,
  agregarEvidenciaAuditoria,
  agregarHallazgoAuditoria,
  eliminarHallazgoAuditoria,
  agregarNoConformidadAuditoria,
  cambiarEstadoNoConformidadAuditoria,
  agregarAccionAuditoria,
  cambiarEstadoAccionAuditoria,
} from "../services/auditoriasService";

export default function AuditoriasScreen() {

  const {
    auditorias = [],
    actualizarAuditorias,
  } = useQuality();

  const { tienePermisoEdicion } = useAuth();

  const puedeEditar = tienePermisoEdicion("auditorias");

  const [
    codigoAuditoria,
    setCodigoAuditoria,
  ] = useState("");

  const [
    tipo,
    setTipo,
  ] = useState("");

  const [
    norma,
    setNorma,
  ] = useState("");

  const [
    auditor,
    setAuditor,
  ] = useState("");

  const [
    responsableAuditado,
    setResponsableAuditado,
  ] = useState("");

  const [
    alcance,
    setAlcance,
  ] = useState("");

  const [
    criterioAuditoria,
    setCriterioAuditoria,
  ] = useState("");

  const [
    fecha,
    setFecha,
  ] = useState("");

  const [
    resultado,
    setResultado,
  ] = useState("");

  const [
    conclusion,
    setConclusion,
  ] = useState("");

  const [
    mostrarFormulario,
    setMostrarFormulario,
  ] = useState(false);

  const [
    editando,
    setEditando,
  ] = useState(null);

  const [
    busqueda,
    setBusqueda,
  ] = useState("");

  const [
    detalleAuditoria,
    setDetalleAuditoria,
  ] = useState(null);

  const [
    mostrarDetalle,
    setMostrarDetalle,
  ] = useState(false);

  const [
    nuevoComentario,
    setNuevoComentario,
  ] = useState("");

  const agregarComentario = () => {
    if (!puedeEditar) return;

    if (
      !nuevoComentario.trim() ||
      !detalleAuditoria
    ) {
      return;
    }

    const comentario = {
      fecha: new Date().toLocaleString("es-ES"),
      autor: "Usuario",
      texto: nuevoComentario.trim(),
    };

    const nuevaLista = agregarComentarioAuditoria(
      auditorias,
      detalleAuditoria.id,
      comentario
    );

    actualizarAuditorias(nuevaLista);

    setDetalleAuditoria({
      ...detalleAuditoria,
      comentarios: [
        ...(detalleAuditoria.comentarios || []),
        comentario,
      ],
    });

    setNuevoComentario("");
  };

  const agregarEvidencia = (item) => {
    if (!puedeEditar) return;
    if (!item) return;

    const evidencia = {
      id: Date.now(),
      nombre: `Evidencia ${new Date().toLocaleDateString("es-ES")}`,
      fecha: new Date().toLocaleString("es-ES"),
    };

    const nuevaLista = agregarEvidenciaAuditoria(
      auditorias,
      item.id,
      evidencia
    );

    actualizarAuditorias(nuevaLista);

    setDetalleAuditoria({
      ...item,
      evidencias: [
        ...(item.evidencias || []),
        evidencia,
      ],
    });
  };

  /* ===================================================== */
  /* HALLAZGOS */
  /* ===================================================== */

  const [
    nuevoHallazgo,
    setNuevoHallazgo,
  ] = useState("");

  const [
    tipoHallazgo,
    setTipoHallazgo,
  ] = useState("Observación");

  const agregarHallazgo = () => {
    if (!puedeEditar) return;

    if (
      !nuevoHallazgo.trim() ||
      !detalleAuditoria
    ) {
      return;
    }

    const hallazgo = {
      id: Date.now(),
      descripcion: nuevoHallazgo.trim(),
      tipo: tipoHallazgo,
      fecha: new Date().toLocaleDateString("es-ES"),
    };

    const nuevaLista = agregarHallazgoAuditoria(
      auditorias,
      detalleAuditoria.id,
      hallazgo
    );

    actualizarAuditorias(nuevaLista);

    setDetalleAuditoria({
      ...detalleAuditoria,
      hallazgos: [
        ...(detalleAuditoria.hallazgos || []),
        hallazgo,
      ],
    });

    setNuevoHallazgo("");
    setTipoHallazgo("Observación");
  };

  const eliminarHallazgo = (hallazgoId) => {
    if (!puedeEditar) return;
    if (!detalleAuditoria) return;

    const nuevaLista = eliminarHallazgoAuditoria(
      auditorias,
      detalleAuditoria.id,
      hallazgoId
    );

    actualizarAuditorias(nuevaLista);

    setDetalleAuditoria({
      ...detalleAuditoria,
      hallazgos: (
        detalleAuditoria.hallazgos || []
      ).filter((h) => h.id !== hallazgoId),
    });
  };

  /* ===================================================== */
  /* NO CONFORMIDADES */
  /* ===================================================== */

  const [
    nuevaNoConformidad,
    setNuevaNoConformidad,
  ] = useState("");

  const [
    clausulaNC,
    setClausulaNC,
  ] = useState("");

  const agregarNoConformidad = () => {
    if (!puedeEditar) return;

    if (
      !nuevaNoConformidad.trim() ||
      !detalleAuditoria
    ) {
      return;
    }

    const nc = {
      id: Date.now(),
      descripcion: nuevaNoConformidad.trim(),
      clausula: clausulaNC.trim(),
      estado: "Abierta",
      fecha: new Date().toLocaleDateString("es-ES"),
      fechaCierre: "",
    };

    const nuevaLista = agregarNoConformidadAuditoria(
      auditorias,
      detalleAuditoria.id,
      nc
    );

    actualizarAuditorias(nuevaLista);

    setDetalleAuditoria({
      ...detalleAuditoria,
      noConformidades: [
        ...(detalleAuditoria.noConformidades || []),
        nc,
      ],
      ncAbiertas:
        (detalleAuditoria.ncAbiertas || 0) + 1,
    });

    setNuevaNoConformidad("");
    setClausulaNC("");
  };

  const cambiarEstadoNoConformidad = (ncId) => {
    if (!puedeEditar) return;
    if (!detalleAuditoria) return;

    const nuevaLista = cambiarEstadoNoConformidadAuditoria(
      auditorias,
      detalleAuditoria.id,
      ncId
    );

    actualizarAuditorias(nuevaLista);

    const actualizada = nuevaLista.find(
      (a) => a.id === detalleAuditoria.id
    );

    if (actualizada) {
      setDetalleAuditoria(actualizada);
    }
  };

  /* ===================================================== */
  /* ACCIONES DE SEGUIMIENTO */
  /* ===================================================== */

  const [
    nuevaAccion,
    setNuevaAccion,
  ] = useState("");

  const [
    responsableAccion,
    setResponsableAccion,
  ] = useState("");

  const [
    fechaLimiteAccion,
    setFechaLimiteAccion,
  ] = useState("");

  const agregarAccion = () => {
    if (!puedeEditar) return;

    if (
      !nuevaAccion.trim() ||
      !detalleAuditoria
    ) {
      return;
    }

    const accion = {
      id: Date.now(),
      descripcion: nuevaAccion.trim(),
      responsable: responsableAccion.trim(),
      fechaLimite: fechaLimiteAccion.trim(),
      estado: "Pendiente",
      fecha: new Date().toLocaleDateString("es-ES"),
      fechaCompletada: "",
    };

    const nuevaLista = agregarAccionAuditoria(
      auditorias,
      detalleAuditoria.id,
      accion
    );

    actualizarAuditorias(nuevaLista);

    setDetalleAuditoria({
      ...detalleAuditoria,
      acciones: [
        ...(detalleAuditoria.acciones || []),
        accion,
      ],
      accionesAbiertas:
        (detalleAuditoria.accionesAbiertas || 0) + 1,
    });

    setNuevaAccion("");
    setResponsableAccion("");
    setFechaLimiteAccion("");
  };

  const cambiarEstadoAccion = (accionId) => {
    if (!puedeEditar) return;
    if (!detalleAuditoria) return;

    const nuevaLista = cambiarEstadoAccionAuditoria(
      auditorias,
      detalleAuditoria.id,
      accionId
    );

    actualizarAuditorias(nuevaLista);

    const actualizada = nuevaLista.find(
      (a) => a.id === detalleAuditoria.id
    );

    if (actualizada) {
      setDetalleAuditoria(actualizada);
    }
  };

const limpiarFormulario = () => {

  setCodigoAuditoria("");
  setTipo("");
  setNorma("");
  setAuditor("");
  setResponsableAuditado("");
  setAlcance("");
  setCriterioAuditoria("");
  setFecha("");
  setResultado("");
  setConclusion("");

  setEditando(null);
};

const formatearFechaVisual = fecha => {

  if (!fecha) {
    return "";
  }

  return fecha.includes("-")
    ? fecha
        .split("-")
        .reverse()
        .join("/")
    : fecha;
};

const crearAuditoria = async () => {

  try {

    if (!puedeEditar) {
      return;
    }

    const validacion = validar(
      auditoriaSchema,
      {
        tipo,
        norma,
        auditor,
        responsableAuditado,
        alcance,
        criterioAuditoria,
        fecha,
        resultado,
        conclusion,
      }
    );

    if (!validacion.ok) {
      mostrarMensaje(
        "Validación",
        validacion.mensaje
      );
      return;
    }

    const duplicada =
      auditorias.some(
        item =>
          item.tipo ===
            tipo.trim() &&
          item.fecha ===
            fecha.trim()
      );

    if (duplicada) {
      mostrarMensaje(
        "Validación",
        "Ya existe una auditoría con ese tipo y fecha"
      );
      return;
    }

    const id =
      await generarSiguienteId(
        PREFIJOS_ID.AUDITORIA
      );

    const convertirFechaParaSQL = fecha => {

      const partes =
        fecha.split("/");

      if (
        partes.length !== 3
      ) {
        return fecha;
      }

      const [
        dia,
        mes,
        anio,
      ] = partes;

      return `${anio}-${mes}-${dia}`;
    };

    const nueva =
      crearNuevaAuditoria({
        id,
        tipo,
        norma,
        auditor,
        responsableAuditado,
        alcance,
        criterioAuditoria,
        fecha:
          convertirFechaParaSQL(
            fecha
          ),
        resultado,
        conclusion,
        crearModeloAuditoria,
      });

    await guardarAuditoria(
      nueva
    );

    const auditoriasActualizadas =
      await obtenerAuditorias();

    actualizarAuditorias(
      auditoriasActualizadas
    );

    limpiarFormulario();

    setMostrarFormulario(
      false
    );

    mostrarMensaje(
      "Correcto",
      "Auditoría guardada"
    );

  } catch (error) {

    console.error(error);

    mostrarMensaje(
      "Error",
      error?.message ||
        "No se pudo crear la auditoría"
    );
  }
};

const guardarEdicion = async () => {

  if (!puedeEditar) {
    return;
  }

  const validacion = validar(
    auditoriaSchema,
    {
      tipo,
      norma,
      auditor,
      responsableAuditado,
      alcance,
      criterioAuditoria,
      fecha,
      resultado,
      conclusion,
    }
  );

  if (!validacion.ok) {

    mostrarMensaje(
      "Validación",
      validacion.mensaje
    );

    return;
  }

  try {

    await actualizarAuditoriaDB(
      editando,
      {
        tipo:
          tipo.trim(),

        norma:
          norma.trim(),

        auditor:
          auditor.trim(),

        responsableAuditado:
          responsableAuditado.trim(),

        alcance:
          alcance.trim(),

        criterioAuditoria:
          criterioAuditoria.trim(),

        fecha:
          fecha.includes("/")
            ? fecha
              .split("/")
              .reverse()
              .join("-")
              : fecha.trim(),


        resultado:
          resultado.trim(),

        conclusion:
          conclusion.trim(),
      }
    );

    const auditoriasActualizadas =
      await obtenerAuditorias();

    actualizarAuditorias(
      auditoriasActualizadas
    );

    limpiarFormulario();

    setMostrarFormulario(
      false
    );

    mostrarMensaje(
      "Correcto",
      "Auditoría actualizada"
    );

  } catch (error) {

    console.error(error);

    mostrarMensaje(
      "Error",
      "No se pudo actualizar la auditoría"
    );
  }
};

  const eliminar =
    async id => {

      if (!puedeEditar) {
        return;
      }

try {
  await eliminarAuditoriaDB(id);

  const auditoriasActualizadas =
    await obtenerAuditorias();

  actualizarAuditorias(
    auditoriasActualizadas
  );

} catch (error) {
mostrarMensaje(
  "Error",
  "No se pudo eliminar la auditoría"
);

  console.error(error);
}

    };

  const cambiarEstado =
    async id => {

      if (!puedeEditar) {
        return;
      }

      await actualizarAuditorias(
        actualizarEstadoAuditoria(
          auditorias,
          id
        )
      );

    };

  const verDetalle =
    auditoria => {

      setDetalleAuditoria(
        auditoria
      );

      setMostrarDetalle(
        true
      );

    };

  const editarAuditoria =
    auditoria => {

      if (!puedeEditar) {
        return;
      }

      setEditando(
        auditoria.id
      );

      setCodigoAuditoria(
        auditoria.id
      );

      setTipo(
        auditoria.tipo || ""
      );

      setNorma(
        auditoria.norma || ""
      );

      setAuditor(
        auditoria.auditor || ""
      );

      setResponsableAuditado(
        auditoria.responsableAuditado || ""
      );

      setAlcance(
        auditoria.alcance || ""
      );

      setCriterioAuditoria(
        auditoria.criterioAuditoria || ""
      );

      setFecha(
        auditoria.fecha || ""
      );

      setResultado(
        auditoria.resultado || ""
      );

      setConclusion(
        auditoria.conclusion || ""
      );

      setMostrarDetalle(
        false
      );

      setMostrarFormulario(
        true
      );

    };

  const auditoriasFiltradas =
    auditorias.filter(
      item => {

        const texto =
          busqueda.toLowerCase();

        return (

          item.id
            ?.toLowerCase()
            .includes(texto)

          ||

          item.tipo
            ?.toLowerCase()
            .includes(texto)

          ||

          item.norma
            ?.toLowerCase()
            .includes(texto)

          ||

          item.auditor
            ?.toLowerCase()
            .includes(texto)

          ||

          item.responsableAuditado
            ?.toLowerCase()
            .includes(texto)

        );

      }
    );

  const kpis = useMemo(
    () =>
      calcularKPIsAuditorias(
        auditorias
      ),
    [auditorias]
  );

  const {

    abiertas,

    ejecucion,

    seguimiento,

    cerradas,

    internas,

    externas,

    certificacion,

    cumplimiento,

    hallazgos,

    ncAbiertas,

    accionesAbiertas,

    mediaResolucion,

    auditorPendiente,

  } = kpis;

return (
  <ScreenLayout>

    <ScrollView style={styles.container}>

      {/* CABECERA */}

      <View style={styles.header}>
        <Text style={styles.title}>
          ✅ Auditorías
        </Text>

        <Text style={styles.subtitle}>
          Gestión y seguimiento de auditorías
        </Text>
      </View>

{/* KPI PRINCIPALES */}

<View style={styles.kpiContainer}>

  <KPIBox
    style={styles.kpiCard}
    title="Planificadas"
    value={abiertas}
    detail="Pendientes ejecución"
    icon="📋"
    color="#2563eb"
    cardStyle={styles.kpiPlan}
  />

  <KPIBox
    style={styles.kpiCard}
    title="En Ejecución"
    value={ejecucion}
    detail="Auditorías activas"
    icon="🔍"
    color="#f97316"
    cardStyle={styles.kpiEjecucion}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Seguimiento"
    value={seguimiento}
    detail="Acciones abiertas"
    icon="📌"
    color="#7c3aed"
    cardStyle={styles.kpiSeguimiento}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Cerradas"
    value={cerradas}
    detail="Finalizadas"
    icon="✅"
    color="#16a34a"
    cardStyle={styles.kpiCerradas}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Cumplimiento"
    value={`${cumplimiento}%`}
    detail="Tasa de cierre"
    icon="🎯"
    color="#16a34a"
    cardStyle={styles.kpiCumplimiento}
  />

  <KPIBox
    style={styles.kpiCard}
    title="NC Abiertas"
    value={ncAbiertas}
    detail="Pendientes cierre"
    icon="⚠️"
    color="#dc2626"
    cardStyle={styles.kpiNC}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Hallazgos"
    value={hallazgos}
    detail="Detectados"
    icon="🚨"
    color="#dc2626"
    cardStyle={styles.kpiHallazgos}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Resolución"
    value={`${mediaResolucion} d`}
    detail="Tiempo medio"
    icon="⏱️"
    color="#0284c7"
    cardStyle={styles.kpiResolucion}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Internas"
    value={internas}
    detail="Auditorías internas"
    icon="🏢"
    color="#1d4ed8"
    cardStyle={styles.kpiInternas}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Externas"
    value={externas}
    detail="Clientes y proveedores"
    icon="🌍"
    color="#0f766e"
    cardStyle={styles.kpiExternas}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Certificación"
    value={certificacion}
    detail="ISO / IFS / BRC"
    icon="📜"
    color="#7c2d12"
    cardStyle={styles.kpiCertificacion}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Auditor Pend."
    value={auditorPendiente || "-"}
    detail="Pendiente asignación"
    icon="👤"
    color="#475569"
    cardStyle={styles.kpiAuditor}
  />

</View>

      {/* RESUMEN OPERATIVO */}

      <View style={styles.summaryCard}>

        <Text style={styles.cardTitle}>
          📊 Resumen Operativo
        </Text>

        <View style={styles.summaryRow}>
          <Text>Total Auditorías</Text>
          <Text style={styles.summaryValue}>
            {auditorias.length}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🏢 Internas</Text>
          <Text style={styles.summaryValue}>
            {internas}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🌍 Externas</Text>
          <Text style={styles.summaryValue}>
            {externas}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>📜 Certificación</Text>
          <Text style={styles.summaryValue}>
            {certificacion}
          </Text>
        </View>

      </View>

      {/* INDICADORES AVANZADOS */}

      <View style={styles.summaryCard}>

        <Text style={styles.cardTitle}>
          📈 Indicadores Avanzados
        </Text>

        <View style={styles.summaryRow}>
          <Text>🚨 Hallazgos</Text>
          <Text
            style={[
              styles.summaryValue,
              {
                color: "#dc2626",
              },
            ]}
          >
            {hallazgos}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>⚠️ NC Abiertas</Text>
          <Text
            style={[
              styles.summaryValue,
              {
                color: "#dc2626",
              },
            ]}
          >
            {ncAbiertas}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>⏱️ Resolución Media</Text>
          <Text style={styles.summaryValue}>
            {mediaResolucion} días
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>👤 Auditor Pendiente</Text>
          <Text
            style={[
              styles.summaryValue,
              {
                color: "#dc2626",
              },
            ]}
          >
            {auditorPendiente || "-"}
          </Text>
        </View>

      </View>

      {/* FORMULARIO */}

      {puedeEditar && (
        <AuditoriaFormulario
  mostrarFormulario={
    mostrarFormulario
  }

  setMostrarFormulario={
    setMostrarFormulario
  }

  editando={editando}

  guardarEdicion={
    guardarEdicion
  }

  crearAuditoria={
    crearAuditoria
  }

  codigoAuditoria={
    codigoAuditoria
  }


  tipo={tipo}
  setTipo={setTipo}

  norma={norma}
  setNorma={setNorma}

  auditor={auditor}
  setAuditor={setAuditor}

  responsableAuditado={
    responsableAuditado
  }

  setResponsableAuditado={
    setResponsableAuditado
  }

  alcance={alcance}
  setAlcance={setAlcance}

  criterioAuditoria={
    criterioAuditoria
  }

  setCriterioAuditoria={
    setCriterioAuditoria
  }

  fecha={fecha}
  setFecha={setFecha}

  resultado={resultado}
  setResultado={setResultado}

  conclusion={conclusion}
  setConclusion={setConclusion}
/>
      )}

      {!puedeEditar && (
        <View style={styles.summaryCard}>
          <Text style={{ color: "#64748b" }}>
            🔒 Acceso de solo lectura: puedes consultar las
            auditorías, pero no crear, editar ni borrar
            registros.
          </Text>
        </View>
      )}

      {/* TABLA */}

      <AuditoriaTabla
        auditoriasFiltradas={
          auditoriasFiltradas
        }
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        verDetalle={verDetalle}
        editarAuditoria={
          editarAuditoria
        }
        cambiarEstado={
          cambiarEstado
        }
        eliminar={eliminar}
        styles={styles}
        soloLectura={!puedeEditar}
      />

      <View
        style={{
          height: 50,
        }}
      />

    </ScrollView>

    <AuditoriaDetalleModal
      visible={mostrarDetalle}
      detalleAuditoria={
        detalleAuditoria
      }
      nuevoComentario={nuevoComentario}
      setNuevoComentario={setNuevoComentario}
      agregarComentario={agregarComentario}
      agregarEvidencia={agregarEvidencia}

      nuevoHallazgo={nuevoHallazgo}
      setNuevoHallazgo={setNuevoHallazgo}
      tipoHallazgo={tipoHallazgo}
      setTipoHallazgo={setTipoHallazgo}
      agregarHallazgo={agregarHallazgo}
      eliminarHallazgo={eliminarHallazgo}

      nuevaNoConformidad={nuevaNoConformidad}
      setNuevaNoConformidad={setNuevaNoConformidad}
      clausulaNC={clausulaNC}
      setClausulaNC={setClausulaNC}
      agregarNoConformidad={agregarNoConformidad}
      cambiarEstadoNoConformidad={cambiarEstadoNoConformidad}

      nuevaAccion={nuevaAccion}
      setNuevaAccion={setNuevaAccion}
      responsableAccion={responsableAccion}
      setResponsableAccion={setResponsableAccion}
      fechaLimiteAccion={fechaLimiteAccion}
      setFechaLimiteAccion={setFechaLimiteAccion}
      agregarAccion={agregarAccion}
      cambiarEstadoAccion={cambiarEstadoAccion}

      editarAuditoria={
        editarAuditoria
      }
      soloLectura={!puedeEditar}
      onClose={() =>
        setMostrarDetalle(false)
      }
    />

  </ScreenLayout>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    padding: 16,
  },

kpiContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "stretch",
  marginBottom: 20,
},

kpiCard: {
  width: "31%",
  flexGrow: 0,
  flexShrink: 0,
  marginBottom: 10,
},

kpiPlan: {
  backgroundColor: "#eff6ff",
},

kpiEjecucion: {
  backgroundColor: "#fff7ed",
},

kpiSeguimiento: {
  backgroundColor: "#faf5ff",
},

kpiCerradas: {
  backgroundColor: "#f0fdf4",
},

kpiCumplimiento: {
  backgroundColor: "#ecfdf5",
},

kpiNC: {
  backgroundColor: "#fef2f2",
},

kpiHallazgos: {
  backgroundColor: "#fef2f2",
},

kpiResolucion: {
  backgroundColor: "#f0f9ff",
},


  header: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#16163b",
  },

  subtitle: {
    color: "#64748b",
    marginTop: 5,
  },

  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16163b",
    marginBottom: 15,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
  },
});