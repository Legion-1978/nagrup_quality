import React, {
  useState,
  useMemo,
} from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import KPIBox from "../components/KPIBox";
import { useQuality } from "../context/QualityContext";
import { useAuth } from "../context/AuthContext";
import {
  generarSiguienteId,
  PREFIJOS_ID,
} from "../utils/correlativos";
import ScreenLayout from "../components/ScreenLayout";
import {crearModeloNC,} from "../models/ProveedorNC";
import {calcularKPIsProveedores,} from "../utils/proveedoresKPI";
import {
  borrarNC,
  actualizarGravedadNC,
  actualizarEstadoNC,
  actualizarNC,
  agregarComentarioNC,
  crearNuevaNC,
  agregarEvidenciaNC,
} from "../services/proveedoresService";
import ProveedorDetalleModal from "../components/ProveedorDetalleModal";
import ProveedorFormulario from "../components/ProveedorFormulario";
import ProveedorTabla from "../components/ProveedorTabla";
import * as ImagePicker from "expo-image-picker";
import { ncProveedorSchema }
  from "../schemas/ncProveedorSchema";

import { validar }
  from "../schemas/validar";

import { mostrarMensaje }
  from "../utils/mensajes";

export default function ProveedoresScreen() {
  const {
    ncProveedores = [],
    actualizarProveedores,
  } = useQuality();

  const { tienePermisoEdicion } = useAuth();

  const puedeEditar = tienePermisoEdicion("proveedores");

  const [
    mostrarFormulario,
    setMostrarFormulario,
  ] = useState(false);

  const [codigo, setCodigo] =
    useState("");

  const [proveedor, setProveedor] =
    useState("");

  const [
    responsable,
    setResponsable,
  ] = useState("");

  const [
    evaluador,
    setEvaluador,
  ] = useState("");

  const [producto, setProducto] =
    useState("");

  const [tipoNC, setTipoNC] =
    useState("");

  const [impacto, setImpacto] =
    useState("Medio");

  const [lote, setLote] =
    useState("");

  const [
    pedidoCompra,
    setPedidoCompra,
  ] = useState("");

  const [problema, setProblema] =
    useState("");

  const [
    causaRaiz,
    setCausaRaiz,
  ] = useState("");

  const [
    accionInmediata,
    setAccionInmediata,
  ] = useState("");

  const [
    accionCorrectiva,
    setAccionCorrectiva,
  ] = useState("");

  const [
    respuestaProveedor,
    setRespuestaProveedor,
  ] = useState("");

  const [conclusion, setConclusion] =
    useState("");

  const [
    verificacionEficacia,
    setVerificacionEficacia,
  ] = useState("");

  const [
    costeNagrup,
    setCosteNagrup,
  ] = useState("");

  const [
    importeAbonado,
    setImporteAbonado,
  ] = useState("");

  const [editando, setEditando] =
    useState(null);

  const [
    detalleNC,
    setDetalleNC,
  ] = useState(null);

  const [
    mostrarDetalle,
    setMostrarDetalle,
  ] = useState(false);

  const [
    nuevoComentario,
    setNuevoComentario,
  ] = useState("");

  const kpis = useMemo(
    () =>
      calcularKPIsProveedores(
        ncProveedores
      ),
    [ncProveedores]
  );

  const {
    abiertas,
    investigacion,
    reclamadas,
    cerradas,

    critica,
    alta,
    media,
    baja,

    costeTotal,
    importeRecuperado,

    porcentajeRecuperacion,

    proveedorMasNC,
    productoMasNC,

    tiempoMedioCierre,
  } = kpis;

  const porcentajeResolucion =
    ncProveedores.length === 0
      ? 0
      : Math.round(
          (
            cerradas /
            ncProveedores.length
          ) * 100
        );

  const refrescarDetalle = (
    nuevaLista,
    id
  ) => {

    if (
      !detalleNC ||
      detalleNC.id !== id
    ) {
      return;
    }

    const actualizada =
      nuevaLista.find(
        item => item.id === id
      );

    if (actualizada) {
      setDetalleNC(
        actualizada
      );
    }
  };

  const limpiarFormulario = () => {

    setCodigo("");

    setProveedor("");
    setResponsable("");
    setEvaluador("");

    setProducto("");

    setTipoNC("");
    setImpacto("Medio");

    setLote("");
    setPedidoCompra("");

    setProblema("");
    setCausaRaiz("");

    setAccionInmediata("");
    setAccionCorrectiva("");

    setRespuestaProveedor("");

    setConclusion("");
    setVerificacionEficacia("");

    setCosteNagrup("");
    setImporteAbonado("");

    setEditando(null);
  };

const crearNC = async () => {

  if (!puedeEditar) {
    return;
  }

  const resultado = validar(
    ncProveedorSchema,
    {
      proveedor,
      responsable,
      evaluador,
      producto,
      lote,
      pedidoCompra,
      tipoNC,
      impacto,
      problema,
      costeNagrup,
      importeAbonado,
    }
  );

  if (!resultado.ok) {
    mostrarMensaje(
      "Validación",
      resultado.mensaje
    );
    return;
  }

  const codigo =
    await generarSiguienteId(
      PREFIJOS_ID.NO_CONFORMIDAD_PROVEEDOR
    );

  const nueva =
    crearNuevaNC({
      codigo,

      proveedor,
      responsable,
      evaluador,

      producto,

      tipoNC,
      impacto,

      lote,
      pedidoCompra,

      problema,
      causaRaiz,

      accionInmediata,
      accionCorrectiva,

      respuestaProveedor,

      conclusion,
      verificacionEficacia,

      costeNagrup,
      importeAbonado,

      crearModeloNC,
    });

  await actualizarProveedores([
    ...ncProveedores,
    nueva,
  ]);

  limpiarFormulario();

  setMostrarFormulario(false);
};

  const borrar = id => {

    if (!puedeEditar) {
      return;
    }

    Alert.alert(
      "Confirmación",
      "¿Deseas eliminar esta NC?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {

            const nuevaLista =
              borrarNC(
                ncProveedores,
                id
              );

            actualizarProveedores(
              nuevaLista
            );
          },
        },
      ]
    );
  };

  const agregarComentario =
    async () => {

      if (!puedeEditar) {
        return;
      }

      if (
        !nuevoComentario.trim() ||
        !detalleNC
      ) {
        return;
      }

      const comentario = {
        fecha:
          new Date().toLocaleString(
            "es-ES"
          ),

        autor: "Usuario",

        texto:
          nuevoComentario.trim(),
      };

      const nuevaLista =
        agregarComentarioNC(
          ncProveedores,
          detalleNC.id,
          comentario
        );

      await actualizarProveedores(
        nuevaLista
      );

      const actualizada =
        nuevaLista.find(
          item =>
            item.id ===
            detalleNC.id
        );

      setDetalleNC(
        actualizada
      );

      setNuevoComentario("");
    };

const agregarEvidencia =
  async () => {

    if (!puedeEditar) {
      return;
    }

    if (!detalleNC) {
      return;
    }

    const permiso =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
  mostrarMensaje("error", "Permiso requerido", "Se necesita acceso a la galería");
  return;
}

    const resultado =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],

        quality: 0.8,
      });

    if (resultado.canceled) {
      return;
    }

    const imagen =
      resultado.assets[0];

    const evidencia = {
      id:
        Date.now().toString(),

      nombre:
        imagen.fileName ||
        `foto_${Date.now()}.jpg`,

      tipo: "imagen",

      uri: imagen.uri,

      fecha:
        new Date().toLocaleString(
          "es-ES"
        ),
    };

    const nuevaLista =
      agregarEvidenciaNC(
        ncProveedores,
        detalleNC.id,
        evidencia
      );

    await actualizarProveedores(
      nuevaLista
    );

    refrescarDetalle(
      nuevaLista,
      detalleNC.id
    );
  };

const cambiarEstado = async id => {

  if (!puedeEditar) {
    return;
  }

  const nuevaLista =
    actualizarEstadoNC(
      ncProveedores,
      id
    );

  await actualizarProveedores(
    nuevaLista
  );

  refrescarDetalle(
    nuevaLista,
    id
  );
};

const verDetalle = item => {
  setDetalleNC(item);
  setMostrarDetalle(true);
};

const editarNC = item => {

  if (!puedeEditar) {
    return;
  }

  setEditando(item.id);

  setCodigo(item.id);

  setProveedor(
    item.proveedor || ""
  );

  setResponsable(
    item.responsable || ""
  );

  setEvaluador(
    item.evaluador || ""
  );

  setProducto(
    item.codigoProducto || ""
  );

  setTipoNC(
    item.tipoNC || ""
  );

  setImpacto(
    item.impacto || "Medio"
  );

  setLote(
    item.lote || ""
  );

  setPedidoCompra(
    item.pedidoCompra || ""
  );

  setProblema(
    item.problema || ""
  );

  setCausaRaiz(
    item.causaRaiz || ""
  );

  setAccionInmediata(
    item.accionInmediata || ""
  );

  setAccionCorrectiva(
    item.accionCorrectiva || ""
  );

  setRespuestaProveedor(
    item.respuestaProveedor || ""
  );

  setConclusion(
    item.conclusion || ""
  );

  setVerificacionEficacia(
    item.verificacionEficacia || ""
  );

  setCosteNagrup(
    String(
      item.costeNagrup || 0
    )
  );

  setImporteAbonado(
    String(
      item.importeAbonado || 0
    )
  );

  setMostrarFormulario(true);
};

const guardarEdicion = async () => {

  if (!puedeEditar) {
    return;
  }

  const resultado = validar(
    ncProveedorSchema,
    {
      proveedor,
      responsable,
      evaluador,
      producto,
      lote,
      pedidoCompra,
      tipoNC,
      impacto,
      problema,
      costeNagrup,
      importeAbonado,
    }
  );

  if (!resultado.ok) {
    mostrarMensaje(
      "Validación",
      resultado.mensaje
    );
    return;
  }

  const nuevaLista =
    actualizarNC(
      ncProveedores,
      editando,
      {
        proveedor:
          proveedor.trim(),

        responsable:
          responsable.trim(),

        evaluador:
          evaluador.trim(),

        codigoProducto:
          producto.trim(),

        tipoNC:
          tipoNC.trim(),

        impacto:
          impacto.trim(),

        lote:
          lote.trim(),

        pedidoCompra:
          pedidoCompra.trim(),

        problema:
          problema.trim(),

        causaRaiz:
          causaRaiz.trim(),

        accionInmediata:
          accionInmediata.trim(),

        accionCorrectiva:
          accionCorrectiva.trim(),

        respuestaProveedor:
          respuestaProveedor.trim(),

        conclusion:
          conclusion.trim(),

        verificacionEficacia:
          verificacionEficacia.trim(),

        costeNagrup:
          Number(
            costeNagrup || 0
          ),

        importeAbonado:
          Number(
            importeAbonado || 0
          ),
      }
    );

  await actualizarProveedores(
    nuevaLista
  );

  limpiarFormulario();

  setMostrarFormulario(false);
};

const cambiarGravedad =
  async id => {

    if (!puedeEditar) {
      return;
    }

    const nuevaLista =
      actualizarGravedadNC(
        ncProveedores,
        id
      );

    await actualizarProveedores(
      nuevaLista
    );

    refrescarDetalle(
      nuevaLista,
      id
    );
  };

return (
  <ScreenLayout>

    <ScrollView style={styles.container}>

      {/* ===================================================== */}
      {/* CABECERA */}
      {/* ===================================================== */}

      <View style={styles.header}>
        <Text style={styles.title}>
          🚚 No Conformidades Proveedores
        </Text>

        <Text style={styles.subtitle}>
          Gestión de incidencias, evaluación y seguimiento de proveedores
        </Text>
      </View>

      {/* ===================================================== */}
      {/* KPI PRINCIPALES */}
      {/* ===================================================== */}

      <View style={styles.row}>
        <KPIBox
          style={styles.dashboardKpi}
          title="Abiertas"
          value={kpis.abiertas}
          detail="Pendientes de gestión"
          icon="🔴"
          color="#dc2626"
        />

        <KPIBox
          style={styles.dashboardKpi}
          title="% Cumplimiento"
          value={`${kpis.cumplimiento}%`}
          detail="Tasa de cierre"
          icon="✅"
          color="#16a34a"
        />
      </View>

      <View style={styles.row}>
        <KPIBox
          style={styles.dashboardKpi}
          title="Investigación"
          value={kpis.investigacion}
          detail="En análisis"
          icon="🔍"
          color="#f97316"
        />

        <KPIBox
          style={styles.dashboardKpi}
          title="Acción Correctiva"
          value={kpis.accionCorrectiva}
          detail="En ejecución"
          icon="🛠️"
          color="#7c3aed"
        />
      </View>

      <View style={styles.row}>
        <KPIBox
          style={styles.dashboardKpi}
          title="Pendiente Proveedor"
          value={kpis.pendienteProveedor}
          detail="Esperando respuesta"
          icon="📧"
          color="#eab308"
        />

        <KPIBox
          style={styles.dashboardKpi}
          title="Cerradas"
          value={kpis.cerradas}
          detail="Finalizadas"
          icon="✅"
          color="#16a34a"
        />
      </View>

      <View style={styles.row}>
        <KPIBox
          style={styles.dashboardKpi}
          title="Coste Total"
          value={`${(kpis.costeTotal || 0).toLocaleString("es-ES")} €`}
          detail="Impacto económico"
          icon="💸"
          color="#dc2626"
        />

        <KPIBox
          style={styles.dashboardKpi}
          title="Recuperado"
          value={`${(kpis.abonadoTotal || 0).toLocaleString("es-ES")} €`}
          detail="Importe abonado"
          icon="💰"
          color="#16a34a"
        />
      </View>

      {/* ===================================================== */}
      {/* KPI ISO AVANZADOS */}
      {/* ===================================================== */}

      <View style={styles.row}>
        <KPIBox
          style={styles.dashboardKpi}
          title="NC Críticas"
          value={kpis.criticas || 0}
          detail="Impacto crítico"
          icon="🚨"
          color="#dc2626"
        />

        <KPIBox
          style={styles.dashboardKpi}
          title="% Recuperación"
          value={`${Number(
            kpis.recuperacion || 0
          ).toFixed(1)}%`}
          detail="Costes recuperados"
          icon="💹"
          color="#16a34a"
        />
      </View>

      {/* ===================================================== */}
      {/* RESUMEN FINANCIERO */}
      {/* ===================================================== */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          📊 Resumen Financiero
        </Text>

        <View style={styles.summaryRow}>
          <Text>💸 Coste Total</Text>

          <Text
            style={{
              fontWeight: "700",
            }}
          >
            {(kpis.costeTotal || 0).toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>✅ Recuperado</Text>

          <Text
            style={{
              fontWeight: "700",
              color: "#16a34a",
            }}
          >
            {(kpis.abonadoTotal || 0).toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>⚠️ Pendiente Recuperar</Text>

          <Text
            style={{
              fontWeight: "700",
              color: "#dc2626",
            }}
          >
            {(kpis.pendienteRecuperar || 0).toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>📋 Total NC</Text>

          <Text
            style={{
              fontWeight: "700",
            }}
          >
            {kpis.total || 0}
          </Text>
        </View>

      </View>

      {/* ===================================================== */}
      {/* INDICADORES AVANZADOS */}
      {/* ===================================================== */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          📈 Indicadores Avanzados
        </Text>

        <View style={styles.summaryRow}>
          <Text>📊 Saldo Económico</Text>

          <Text
            style={{
              fontWeight: "700",
              color:
                (kpis.saldoEconomico || 0) >= 0
                  ? "#16a34a"
                  : "#dc2626",
            }}
          >
            {(kpis.saldoEconomico || 0).toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>⏱️ Resolución Media</Text>

          <Text
            style={{
              fontWeight: "700",
            }}
          >
            {kpis.mediaResolucion || 0} días
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🏭 Proveedor con más NC</Text>

          <Text
            style={{
              fontWeight: "700",
            }}
          >
            {kpis.proveedorMasNC || "-"}
          </Text>
        </View>

      </View>

      {/* ===================================================== */}
      {/* FORMULARIO NC */}
      {/* ===================================================== */}

      {puedeEditar && (
        <ProveedorFormulario
          mostrarFormulario={mostrarFormulario}
          setMostrarFormulario={setMostrarFormulario}
          editando={editando}

          codigo={codigo}

          proveedor={proveedor}
          setProveedor={setProveedor}

          responsable={responsable}
          setResponsable={setResponsable}

          evaluador={evaluador}
          setEvaluador={setEvaluador}

          producto={producto}
          setProducto={setProducto}

          lote={lote}
          setLote={setLote}

          pedidoCompra={pedidoCompra}
          setPedidoCompra={setPedidoCompra}

          tipoNC={tipoNC}
          setTipoNC={setTipoNC}

          impacto={impacto}
          setImpacto={setImpacto}

          problema={problema}
          setProblema={setProblema}

          causaRaiz={causaRaiz}
          setCausaRaiz={setCausaRaiz}

          accionInmediata={accionInmediata}
          setAccionInmediata={setAccionInmediata}

          accionCorrectiva={accionCorrectiva}
          setAccionCorrectiva={setAccionCorrectiva}

          respuestaProveedor={respuestaProveedor}
          setRespuestaProveedor={setRespuestaProveedor}

          conclusion={conclusion}
          setConclusion={setConclusion}

          verificacionEficacia={verificacionEficacia}
          setVerificacionEficacia={
            setVerificacionEficacia
          }

          costeNagrup={costeNagrup}
          setCosteNagrup={setCosteNagrup}

          importeAbonado={importeAbonado}
          setImporteAbonado={setImporteAbonado}

          crearNC={crearNC}
          guardarEdicion={guardarEdicion}
        />
      )}

      {!puedeEditar && (
        <View style={styles.card}>
          <Text style={{ color: "#64748b" }}>
            🔒 Acceso de solo lectura: puedes consultar las no
            conformidades de proveedores, pero no crear, editar
            ni borrar registros.
          </Text>
        </View>
      )}

      {/* ===================================================== */}
      {/* TABLA DE NC */}
      {/* ===================================================== */}

      <ProveedorTabla
        ncProveedores={ncProveedores}
        verDetalle={verDetalle}
        editarNC={editarNC}
        cambiarEstado={cambiarEstado}
        cambiarGravedad={cambiarGravedad}
        borrar={borrar}
        soloLectura={!puedeEditar}
      />

      {/* ===================================================== */}
      {/* ESPACIADO INFERIOR */}
      {/* ===================================================== */}

      <View
        style={{
          height: 50,
        }}
      />

    </ScrollView>

    {/* ===================================================== */}
    {/* MODAL DETALLE NC */}
    {/* ===================================================== */}

    <ProveedorDetalleModal
      visible={mostrarDetalle}
      detalleNC={detalleNC}
      nuevoComentario={nuevoComentario}
      setNuevoComentario={
        setNuevoComentario
      }
      agregarComentario={
        agregarComentario
      }
      agregarEvidencia={
        agregarEvidencia
      }
      editarNC={editarNC}
      soloLectura={!puedeEditar}
      onClose={() => {
        setMostrarDetalle(false);
        setNuevoComentario("");
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

row: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 10,
  marginBottom: 12,
},

dashboardKpi: {
  flex: 1,
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

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16163b",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

});