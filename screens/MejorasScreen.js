import React, {
  useMemo,
  useState,
} from "react";

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import KPIBox from "../components/KPIBox";
import ScreenLayout from "../components/ScreenLayout";

import MejoraFormulario from "../components/MejoraFormulario";
import MejoraTabla from "../components/MejoraTabla";
import MejoraDetalleModal from "../components/MejoraDetalleModal";
import { mejoraSchema }
  from "../schemas/mejoraSchema";

import { validar }
  from "../schemas/validar";

import { mostrarMensaje }
  from "../utils/mensajes";
import { useQuality } from "../context/QualityContext";
import { useAuth } from "../context/AuthContext";
import {
  generarSiguienteId,
  PREFIJOS_ID,
} from "../utils/correlativos";

import {
  crearModeloMejora,
} from "../models/Mejora";

import {
  calcularKPIsMejoras,
} from "../utils/mejorasKPI";

import {
  crearNuevaMejora,
  borrarMejora,
  actualizarEstadoMejora,
  actualizarMejora,
  agregarComentarioMejora,
  agregarEvidenciaMejora,
  eliminarEvidenciaMejora,
} from "../services/mejorasService";

export default function MejorasScreen() {

  const {
    mejoras = [],
    actualizarMejoras,
  } = useQuality();

  const { tienePermisoEdicion } = useAuth();

  const puedeEditar = tienePermisoEdicion("mejoras");

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
    detalleMejora,
    setDetalleMejora,
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
      !detalleMejora
    ) {
      return;
    }

    const comentario = {
      fecha: new Date().toLocaleString("es-ES"),
      autor: "Usuario",
      texto: nuevoComentario.trim(),
    };

    actualizarMejoras(
      agregarComentarioMejora(
        mejoras,
        detalleMejora.id,
        comentario
      )
    );

    setDetalleMejora({
      ...detalleMejora,
      comentarios: [
        ...(detalleMejora.comentarios || []),
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

    actualizarMejoras(
      agregarEvidenciaMejora(
        mejoras,
        item.id,
        evidencia
      )
    );

    setDetalleMejora({
      ...item,
      evidencias: [
        ...(item.evidencias || []),
        evidencia,
      ],
    });
  };

  const eliminarEvidencia = (evidenciaId) => {
    if (!puedeEditar) return;
    if (!detalleMejora) return;

    actualizarMejoras(
      eliminarEvidenciaMejora(
        mejoras,
        detalleMejora.id,
        evidenciaId
      )
    );

    setDetalleMejora({
      ...detalleMejora,
      evidencias: (
        detalleMejora.evidencias || []
      ).filter((e) => e.id !== evidenciaId),
    });
  };

  const aprobarMejora = () => {
    if (!puedeEditar) return;
    if (!detalleMejora) return;

    actualizarMejoras(
      actualizarMejora(
        mejoras,
        detalleMejora.id,
        { estado: "Aprobada" }
      )
    );

    setDetalleMejora({
      ...detalleMejora,
      estado: "Aprobada",
    });
  };

  const cerrarMejora = () => {
    if (!puedeEditar) return;
    if (!detalleMejora) return;

    const fechaCierre = new Date().toLocaleDateString("es-ES");

    actualizarMejoras(
      actualizarMejora(
        mejoras,
        detalleMejora.id,
        { estado: "Cerrada", fechaCierre, cerrada: true }
      )
    );

    setDetalleMejora({
      ...detalleMejora,
      estado: "Cerrada",
      fechaCierre,
      cerrada: true,
    });
  };

  const reabrirMejora = () => {
    if (!puedeEditar) return;
    if (!detalleMejora) return;

    actualizarMejoras(
      actualizarMejora(
        mejoras,
        detalleMejora.id,
        { estado: "En Curso", fechaCierre: "", cerrada: false }
      )
    );

    setDetalleMejora({
      ...detalleMejora,
      estado: "En Curso",
      fechaCierre: "",
      cerrada: false,
    });
  };

  const [titulo, setTitulo] =
    useState("");

  const [
    descripcion,
    setDescripcion,
  ] = useState("");

  const [tipo, setTipo] =
    useState("Mejora Continua");

  const [origen, setOrigen] =
    useState("");

  const [area, setArea] =
    useState("");

  const [proceso, setProceso] =
    useState("");

  const [
    departamento,
    setDepartamento,
  ] = useState("");

  const [
    responsable,
    setResponsable,
  ] = useState("");

  const [
    patrocinador,
    setPatrocinador,
  ] = useState("");

  const [
    prioridad,
    setPrioridad,
  ] = useState("Media");

  const [
    impacto,
    setImpacto,
  ] = useState("Medio");

  const [
    categoria,
    setCategoria,
  ] = useState("");

  const [
    subcategoria,
    setSubcategoria,
  ] = useState("");

  const [norma, setNorma] =
    useState("");

  const [
    clasificacion,
    setClasificacion,
  ] = useState("");

  const [riesgo, setRiesgo] =
    useState("");

  const [
    oportunidad,
    setOportunidad,
  ] = useState("");

  const [kpi, setKpi] =
    useState("");

  const [objetivo, setObjetivo] =
    useState("");

  const [auditor, setAuditor] =
    useState("");

  const [
    estadoAuditoria,
    setEstadoAuditoria,
  ] = useState("");

  const [
    aprobacionDireccion,
    setAprobacionDireccion,
  ] = useState(false);

  const [
    centroLogistico,
    setCentroLogistico,
  ] = useState("");

  const [
    beneficioCualitativo,
    setBeneficioCualitativo,
  ] = useState("");

  const [
    causaOrigen,
    setCausaOrigen,
  ] = useState("");

  const [
    accionPropuesta,
    setAccionPropuesta,
  ] = useState("");

  const [
    indicador,
    setIndicador,
  ] = useState("");

  const [
    unidadIndicador,
    setUnidadIndicador,
  ] = useState("");

  const [
    valorInicial,
    setValorInicial,
  ] = useState("");

  const [
    valorObjetivo,
    setValorObjetivo,
  ] = useState("");

  const [
    beneficio,
    setBeneficio,
  ] = useState("");

  const [
    ahorroEstimado,
    setAhorroEstimado,
  ] = useState("");

  const [
    costeProyecto,
    setCosteProyecto,
  ] = useState("");

  const [
    fechaInicio,
    setFechaInicio,
  ] = useState("");

  const [
    fechaObjetivo,
    setFechaObjetivo,
  ] = useState("");

  const [
    observaciones,
    setObservaciones,
  ] = useState("");

  const [estado, setEstado] =
    useState("Propuesta");

  const limpiarFormulario =
    () => {

      setTitulo("");
      setDescripcion("");

      setTipo(
        "Mejora Continua"
      );

      setOrigen("");

      setArea("");
      setProceso("");
      setDepartamento("");

      setResponsable("");
      setPatrocinador("");

      setPrioridad(
        "Media"
      );

      setImpacto(
        "Medio"
      );

      setCategoria("");
      setSubcategoria("");

      setCausaOrigen("");

      setAccionPropuesta("");

      setNorma("");
      setClasificacion("");
      setRiesgo("");
      setOportunidad("");
      setKpi("");
      setObjetivo("");
      setAuditor("");
      setEstadoAuditoria("");
      setAprobacionDireccion(false);
      setCentroLogistico("");
      setBeneficioCualitativo("");

      setIndicador("");
      setUnidadIndicador("");

      setValorInicial("");
      setValorObjetivo("");

      setBeneficio("");

      setAhorroEstimado("");

      setCosteProyecto("");

      setFechaInicio("");

      setFechaObjetivo("");

      setObservaciones("");

      setEstado(
        "Propuesta"
      );

      setEditando(null);

    };

const crearMejora = async () => {

  if (!puedeEditar) {
    return;
  }

  const resultado = validar(
    mejoraSchema,
    {
      titulo,
      descripcion,
      tipo,
      origen,
      area,
      responsable,
      accionPropuesta,
      fechaInicio,
      fechaObjetivo,
      beneficio,
      ahorroEstimado,
      costeProyecto,
    }
  );

  if (!resultado.ok) {

    mostrarMensaje(
      "Validación",
      resultado.mensaje
    );

    return;
  }

  const convertirFechaParaSQL = fecha => {

    const partes =
      fecha.split("/");

    if (partes.length !== 3) {
      return fecha;
    }

    const [
      dia,
      mes,
      anio,
    ] = partes;

    return `${anio}-${mes}-${dia}`;
  };

  const id =
    await generarSiguienteId(
      PREFIJOS_ID.MEJORA
    );

  const nueva =
    crearNuevaMejora({
      id,
      titulo,
      categoria,
      responsable,
      descripcion,
      crearModeloMejora,
    });

  Object.assign(
    nueva,
    {
      tipo,
      origen,
      area,
      proceso,
      departamento,
      patrocinador,
      prioridad,
      impacto,
      categoria,
      subcategoria,
      causaOrigen,
      accionPropuesta,

      norma,
      clasificacion,
      riesgo,
      oportunidad,
      kpi,
      objetivo,
      auditor,
      estadoAuditoria,
      aprobacionDireccion,
      centroLogistico,
      beneficioCualitativo,

      indicador,
      unidadIndicador,
      valorInicial,
      valorObjetivo,

      beneficio:
        Number(beneficio || 0),

      ahorroEstimado:
        Number(
          ahorroEstimado || 0
        ),

      costeProyecto:
        Number(
          costeProyecto || 0
        ),

      fechaInicio:
        convertirFechaParaSQL(
          fechaInicio
        ),

      fechaObjetivo:
        convertirFechaParaSQL(
          fechaObjetivo
        ),

      observaciones,

      estado,
    }
  );

  actualizarMejoras([
    ...mejoras,
    nueva,
  ]);

  limpiarFormulario();

  setMostrarFormulario(
    false
  );

  mostrarMensaje(
    "Correcto",
    "Acción de mejora creada"
  );
};

const guardarEdicion = () => {

  if (!puedeEditar) {
    return;
  }

  const resultado = validar(
    mejoraSchema,
    {
      titulo,
      descripcion,
      tipo,
      origen,
      area,
      responsable,
      accionPropuesta,
      fechaInicio,
      fechaObjetivo,
      beneficio,
      ahorroEstimado,
      costeProyecto,
    }
  );

  if (!resultado.ok) {

    mostrarMensaje(
      "Validación",
      resultado.mensaje
    );

    return;
  }

  const convertirFechaParaSQL = fecha => {

    const partes =
      fecha.split("/");

    if (partes.length !== 3) {
      return fecha;
    }

    const [
      dia,
      mes,
      anio,
    ] = partes;

    return `${anio}-${mes}-${dia}`;
  };

  const nuevaLista =
    actualizarMejora(
      mejoras,
      editando,
      {
        titulo:
          titulo.trim(),

        descripcion:
          descripcion.trim(),

        tipo,
        origen,
        area,
        proceso,
        departamento,

        responsable:
          responsable.trim(),

        patrocinador,
        prioridad,
        impacto,
        categoria,
        subcategoria,

        causaOrigen,

        accionPropuesta,

        norma,
        clasificacion,
        riesgo,
        oportunidad,
        kpi,
        objetivo,
        auditor,
        estadoAuditoria,
        aprobacionDireccion,
        centroLogistico,
        beneficioCualitativo,

        indicador,
        unidadIndicador,

        valorInicial,
        valorObjetivo,

        beneficio:
          Number(
            beneficio || 0
          ),

        ahorroEstimado:
          Number(
            ahorroEstimado || 0
          ),

        costeProyecto:
          Number(
            costeProyecto || 0
          ),

        fechaInicio:
          convertirFechaParaSQL(
            fechaInicio
          ),

        fechaObjetivo:
          convertirFechaParaSQL(
            fechaObjetivo
          ),

        observaciones,

        estado,
      }
    );

  actualizarMejoras(
    nuevaLista
  );

  limpiarFormulario();

  setMostrarFormulario(
    false
  );

  mostrarMensaje(
    "Correcto",
    "Acción de mejora actualizada"
  );
};

  const eliminar = id => {

    if (!puedeEditar) {
      return;
    }

    actualizarMejoras(
      borrarMejora(
        mejoras,
        id
      )
    );

  };

  const cambiarEstado =
    id => {

      if (!puedeEditar) {
        return;
      }

      actualizarMejoras(
        actualizarEstadoMejora(
          mejoras,
          id
        )
      );

    };

  const verDetalle =
    mejora => {

      setDetalleMejora(
        mejora
      );

      setMostrarDetalle(
        true
      );

    };

  const editarMejora =
    mejora => {

      if (!puedeEditar) {
        return;
      }

      setEditando(
        mejora.id
      );

      setTitulo(
        mejora.titulo || ""
      );

      setDescripcion(
        mejora.descripcion || ""
      );

      setTipo(
        mejora.tipo || ""
      );

      setOrigen(
        mejora.origen || ""
      );

      setArea(
        mejora.area || ""
      );

      setProceso(
        mejora.proceso || ""
      );

      setDepartamento(
        mejora.departamento || ""
      );

      setResponsable(
        mejora.responsable || ""
      );

      setPatrocinador(
        mejora.patrocinador || ""
      );

      setPrioridad(
        mejora.prioridad || "Media"
      );

      setImpacto(
        mejora.impacto || "Medio"
      );

      setCategoria(
        mejora.categoria || ""
      );

      setSubcategoria(
        mejora.subcategoria || ""
      );

      setCausaOrigen(
        mejora.causaOrigen || ""
      );

      setAccionPropuesta(
        mejora.accionPropuesta || ""
      );

      setNorma(mejora.norma || "");

      setClasificacion(
        mejora.clasificacion || ""
      );

      setRiesgo(mejora.riesgo || "");

      setOportunidad(
        mejora.oportunidad || ""
      );

      setKpi(mejora.kpi || "");

      setObjetivo(mejora.objetivo || "");

      setAuditor(mejora.auditor || "");

      setEstadoAuditoria(
        mejora.estadoAuditoria || ""
      );

      setAprobacionDireccion(
        mejora.aprobacionDireccion || false
      );

      setCentroLogistico(
        mejora.centroLogistico || ""
      );

      setBeneficioCualitativo(
        mejora.beneficioCualitativo || ""
      );

      setIndicador(
        mejora.indicador || ""
      );

      setUnidadIndicador(
        mejora.unidadIndicador || ""
      );

      setValorInicial(
        mejora.valorInicial || ""
      );

      setValorObjetivo(
        mejora.valorObjetivo || ""
      );

      setBeneficio(
        String(
          mejora.beneficio || ""
        )
      );

      setAhorroEstimado(
        String(
          mejora.ahorroEstimado || ""
        )
      );

      setCosteProyecto(
        String(
          mejora.costeProyecto || ""
        )
      );

      setFechaInicio(
  mejora.fechaInicio
    ? mejora.fechaInicio.includes("-")
      ? mejora.fechaInicio
          .split("-")
          .reverse()
          .join("/")
      : mejora.fechaInicio
    : ""
);

      setFechaObjetivo(
  mejora.fechaObjetivo
    ? mejora.fechaObjetivo.includes("-")
      ? mejora.fechaObjetivo
          .split("-")
          .reverse()
          .join("/")
      : mejora.fechaObjetivo
    : ""
);

      setObservaciones(
        mejora.observaciones || ""
      );

      setEstado(
        mejora.estado ||
        "Propuesta"
      );

      setMostrarDetalle(
        false
      );

      setMostrarFormulario(
        true
      );

    };

  const mejorasFiltradas =
    mejoras.filter(
      item => {

        const texto =
          busqueda.toLowerCase();

        return (

          item.titulo
            ?.toLowerCase()
            .includes(texto)

          ||

          item.area
            ?.toLowerCase()
            .includes(texto)

          ||

          item.proceso
            ?.toLowerCase()
            .includes(texto)

          ||

          item.responsable
            ?.toLowerCase()
            .includes(texto)

          ||

          item.estado
            ?.toLowerCase()
            .includes(texto)

        );

      }
    );

  const kpis = useMemo(
    () =>
      calcularKPIsMejoras(
        mejoras
      ),
    [mejoras]
  );

  const {

    propuestas,
    aprobadas,
    enCurso,
    implantadas,
    cerradas,

    prioridadAlta,
    prioridadMedia,
    prioridadBaja,

    impactoAlto,
    impactoMedio,
    impactoBajo,

    cumplimiento,

    ahorroTotal,

    accionesAbiertas,

    mediaResolucion,

    responsablePendiente,

  } = kpis;

return (
  <ScreenLayout>

    <ScrollView style={styles.container}>

      {/* CABECERA */}

      <View style={styles.header}>

        <Text style={styles.title}>
          📈 Acciones de Mejora
        </Text>

        <Text style={styles.subtitle}>
          Gestión de oportunidades, mejora continua
          e iniciativas de optimización de procesos
        </Text>

      </View>

      {/* KPI PRINCIPALES */}

      <View style={styles.kpiContainer}>

        <KPIBox
          style={styles.kpiCard}
          title="Propuestas"
          value={propuestas}
          detail="Pendientes revisión"
          icon="💡"
          color="#2563eb"
          cardStyle={styles.kpiPropuestas}
        />

        <KPIBox
          style={styles.kpiCard}
          title="Aprobadas"
          value={aprobadas}
          detail="Listas para implantar"
          icon="✅"
          color="#16a34a"
          cardStyle={styles.kpiAprobadas}
        />

        <KPIBox
          style={styles.kpiCard}
          title="Implantación"
          value={enCurso}
          detail="Actualmente activas"
          icon="🚀"
          color="#f97316"
          cardStyle={styles.kpiCurso}
        />

        <KPIBox
          style={styles.kpiCard}
          title="Validadas"
          value={implantadas}
          detail="Pendientes cierre"
          icon="📈"
          color="#0891b2"
          cardStyle={styles.kpiImplantadas}
        />

        <KPIBox
          style={styles.kpiCard}
          title="Cerradas"
          value={cerradas}
          detail="Finalizadas"
          icon="🏁"
          color="#7c3aed"
          cardStyle={styles.kpiCerradas}
        />

        <KPIBox
          style={styles.kpiCard}
          title="Cumplimiento"
          value={`${cumplimiento}%`}
          detail="Objetivos alcanzados"
          icon="📊"
          color="#dc2626"
          cardStyle={styles.kpiCumplimiento}
        />

        <KPIBox
          style={styles.kpiCard}
          title="Impacto Alto"
          value={impactoAlto}
          detail="Críticas"
          icon="🔥"
          color="#dc2626"
          cardStyle={styles.kpiImpactoAlto}
        />

        <KPIBox
          style={styles.kpiCard}
          title="Impacto Medio"
          value={impactoMedio}
          detail="Moderadas"
          icon="⚡"
          color="#f97316"
          cardStyle={styles.kpiImpactoMedio}
        />

        <KPIBox
          style={styles.kpiCard}
          title="Impacto Bajo"
          value={impactoBajo}
          detail="Menor impacto"
          icon="✅"
          color="#16a34a"
          cardStyle={styles.kpiImpactoBajo}
        />

      </View>

      {/* RESUMEN OPERATIVO */}

      <View style={styles.summaryCard}>

        <Text style={styles.cardTitle}>
          📊 Resumen Operativo
        </Text>

        <View style={styles.summaryRow}>
          <Text>📋 Total Mejoras</Text>
          <Text style={styles.summaryValue}>
            {mejoras.length}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🔴 Prioridad Alta</Text>
          <Text style={styles.summaryValue}>
            {prioridadAlta}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🟠 Prioridad Media</Text>
          <Text style={styles.summaryValue}>
            {prioridadMedia}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🟢 Prioridad Baja</Text>
          <Text style={styles.summaryValue}>
            {prioridadBaja}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🔥 Impacto Alto</Text>
          <Text style={styles.summaryValue}>
            {impactoAlto}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>⚡ Impacto Medio</Text>
          <Text style={styles.summaryValue}>
            {impactoMedio}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>✅ Impacto Bajo</Text>
          <Text style={styles.summaryValue}>
            {impactoBajo}
          </Text>
        </View>

      </View>

      {/* INDICADORES AVANZADOS */}

      <View style={styles.summaryCard}>

        <Text style={styles.cardTitle}>
          📈 Indicadores Avanzados
        </Text>

        <View style={styles.summaryRow}>
          <Text>💰 Ahorro Total</Text>

          <Text style={styles.summaryValue}>
            {Number(
              ahorroTotal || 0
            ).toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>📌 Acciones Abiertas</Text>

          <Text style={styles.summaryValue}>
            {accionesAbiertas}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>⏱️ Resolución Media</Text>

          <Text style={styles.summaryValue}>
            {mediaResolucion} días
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>👤 Responsable Pendiente</Text>

          <Text style={styles.summaryValue}>
            {responsablePendiente || "-"}
          </Text>
        </View>

      </View>
      {/* ===================================================== */}
      {/* FORMULARIO PLAN DE MEJORA CONTINUA */}
      {/* ===================================================== */}

      {puedeEditar && (
      <MejoraFormulario
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

        titulo={titulo}
        setTitulo={setTitulo}

        descripcion={descripcion}
        setDescripcion={
          setDescripcion
        }

        tipo={tipo}
        setTipo={setTipo}

        origen={origen}
        setOrigen={setOrigen}

        area={area}
        setArea={setArea}

        proceso={proceso}
        setProceso={setProceso}

        departamento={departamento}
        setDepartamento={setDepartamento}

        responsable={responsable}
        setResponsable={
          setResponsable
        }

        patrocinador={patrocinador}
        setPatrocinador={setPatrocinador}

        prioridad={prioridad}
        setPrioridad={setPrioridad}

        impacto={impacto}
        setImpacto={setImpacto}

        categoria={categoria}
        setCategoria={setCategoria}

        subcategoria={subcategoria}
        setSubcategoria={setSubcategoria}

        causaOrigen={causaOrigen}
        setCausaOrigen={setCausaOrigen}

        accionPropuesta={accionPropuesta}
        setAccionPropuesta={setAccionPropuesta}

        indicador={indicador}
        setIndicador={setIndicador}

        unidadIndicador={unidadIndicador}
        setUnidadIndicador={setUnidadIndicador}

        valorInicial={valorInicial}
        setValorInicial={setValorInicial}

        valorObjetivo={valorObjetivo}
        setValorObjetivo={setValorObjetivo}

        beneficio={beneficio}
        setBeneficio={
          setBeneficio
        }

        ahorroEstimado={ahorroEstimado}
        setAhorroEstimado={setAhorroEstimado}

        costeProyecto={costeProyecto}
        setCosteProyecto={setCosteProyecto}

        norma={norma}
        setNorma={setNorma}

        clasificacion={clasificacion}
        setClasificacion={setClasificacion}

        riesgo={riesgo}
        setRiesgo={setRiesgo}

        oportunidad={oportunidad}
        setOportunidad={setOportunidad}

        kpi={kpi}
        setKpi={setKpi}

        objetivo={objetivo}
        setObjetivo={setObjetivo}

        auditor={auditor}
        setAuditor={setAuditor}

        estadoAuditoria={estadoAuditoria}
        setEstadoAuditoria={setEstadoAuditoria}

        aprobacionDireccion={aprobacionDireccion}
        setAprobacionDireccion={setAprobacionDireccion}

        centroLogistico={centroLogistico}
        setCentroLogistico={setCentroLogistico}

        beneficioCualitativo={beneficioCualitativo}
        setBeneficioCualitativo={setBeneficioCualitativo}

        fechaInicio={fechaInicio}
        setFechaInicio={
          setFechaInicio
        }

        fechaObjetivo={
          fechaObjetivo
        }
        setFechaObjetivo={
          setFechaObjetivo
        }

        observaciones={observaciones}
        setObservaciones={setObservaciones}

        crearMejora={
          crearMejora
        }

        styles={styles}
      />
      )}

      {!puedeEditar && (
        <View style={styles.summaryCard}>
          <Text style={{ color: "#64748b" }}>
            🔒 Acceso de solo lectura: puedes consultar los
            planes de mejora, pero no crear, editar ni borrar
            registros.
          </Text>
        </View>
      )}

      {/* ===================================================== */}
      {/* TABLA DE SEGUIMIENTO DE MEJORAS */}
      {/* ===================================================== */}

      <MejoraTabla
        mejorasFiltradas={
          mejorasFiltradas
        }

        busqueda={busqueda}
        setBusqueda={
          setBusqueda
        }

        verDetalle={verDetalle}

        editarMejora={
          editarMejora
        }

        cambiarEstado={
          cambiarEstado
        }

        eliminar={eliminar}
        soloLectura={!puedeEditar}
      />

      {/* ===================================================== */}
      {/* ESPACIADO INFERIOR DE LA PANTALLA */}
      {/* ===================================================== */}

      <View
        style={{
          height: 60,
        }}
      />

    </ScrollView>

    {/* ===================================================== */}
    {/* MODAL DETALLE DE MEJORA */}
    {/* ===================================================== */}

    <MejoraDetalleModal
      visible={mostrarDetalle}

      detalleMejora={
        detalleMejora
      }

      nuevoComentario={nuevoComentario}
      setNuevoComentario={setNuevoComentario}
      agregarComentario={agregarComentario}
      agregarEvidencia={agregarEvidencia}
      eliminarEvidencia={eliminarEvidencia}

      aprobarMejora={aprobarMejora}
      cerrarMejora={cerrarMejora}
      reabrirMejora={reabrirMejora}

      editarMejora={
        editarMejora
      }

      soloLectura={!puedeEditar}

      onClose={() => {
        setMostrarDetalle(false);
      }}
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

  header: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
  },

  subtitle: {
    color: "#64748b",
    marginTop: 5,
    fontSize: 14,
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

kpiPropuestas: {
  backgroundColor: "#eff6ff",
},

kpiAprobadas: {
  backgroundColor: "#f0fdf4",
},

kpiCurso: {
  backgroundColor: "#fff7ed",
},

kpiImplantadas: {
  backgroundColor: "#f0f9ff",
},

kpiCerradas: {
  backgroundColor: "#faf5ff",
},

kpiCumplimiento: {
  backgroundColor: "#ecfdf5",
},

kpiImpactoAlto: {
  backgroundColor: "#fef2f2",
},

kpiImpactoMedio: {
  backgroundColor: "#fff7ed",
},

kpiImpactoBajo: {
  backgroundColor: "#f0fdf4",
},

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16163b",
    marginBottom: 15,
  },

  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
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