import React, {
  useMemo,
  useState,
} from "react";

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import KPIBox from "../components/KPIBox";
import ScreenLayout from "../components/ScreenLayout";
import { mostrarMensaje }
  from "../utils/mensajes";
import ReclamacionFormulario from "../components/ReclamacionFormulario";
import ReclamacionTabla from "../components/ReclamacionTabla";
import ReclamacionDetalleModal from "../components/ReclamacionDetalleModal";
import {actualizarGravedadReclamacion,} from "../services/reclamacionesService";
import { useQuality } from "../context/QualityContext";
import { useAuth } from "../context/AuthContext";
import {
  generarSiguienteId,
  PREFIJOS_ID,
} from "../utils/correlativos";
import {calcularKPIsReclamaciones,} from "../utils/reclamacionesKPI";
import {
  crearNuevaReclamacion,
  borrarReclamacion,
  actualizarEstadoReclamacion,
  actualizarReclamacion,
  agregarEvidenciaReclamacion,
} from "../services/reclamacionesService";
import { reclamacionSchema } from "../schemas/reclamacionSchema";
import { validar } from "../schemas/validar";
import {
  crearModeloReclamacion,
} from "../models/ReclamacionCliente";

export default function ReclamacionesScreen() {

const {
  reclamaciones = [],
  actualizarReclamaciones,
} = useQuality();

  const { tienePermisoEdicion } = useAuth();

  const puedeEditar = tienePermisoEdicion("reclamaciones");

  const [
    mostrarFormulario,
    setMostrarFormulario,
  ] = useState(false);

  const [cliente, setCliente] =
    useState("");

  const [descripcion, setDescripcion] =
    useState("");

  const [responsable, setResponsable] =
    useState("");

  const [coste, setCoste] =
    useState("");

  const [fecha, setFecha] =
    useState("");

  const [gravedad, setGravedad] =
    useState("Media");

  const [producto, setProducto] =
    useState("");

  const [pedido, setPedido] =
    useState("");

  const [lote, setLote] =
    useState("");

  const [causaRaiz, setCausaRaiz] =
    useState("");

  const [accionCorrectiva, setAccionCorrectiva] =
    useState("");

  const [compensacion, setCompensacion] =
    useState("");

const [editando, setEditando] =
  useState(null);

  const [busqueda, setBusqueda] =
    useState("");

const [
  detalleReclamacion,
  setDetalleReclamacion,
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
      calcularKPIsReclamaciones(
        reclamaciones
      ),
    [reclamaciones]
  );

const crearReclamacion = async () => {

  if (!puedeEditar) {
    return;
  }

  const resultado = validar(
    reclamacionSchema,
    {
      cliente,
      descripcion,
      responsable,
      fecha,
      gravedad,
      producto,
      pedido,
      lote,
      coste,
      compensacion,
    }
  );

if (!resultado.ok) {
  mostrarMensaje(
    "Validación",
    resultado.mensaje
  );
  return;
}

  const id = await generarSiguienteId(
    PREFIJOS_ID.RECLAMACION
  );

  const nueva =
    crearNuevaReclamacion({
      id,
      cliente,
      descripcion,
      responsable,
      coste,
      fecha,
      gravedad,
      producto,
      pedido,
      lote,
      causaRaiz,
      accionCorrectiva,
      compensacion,
      crearModeloReclamacion,
    });

await actualizarReclamaciones([
  ...reclamaciones,
  nueva,
]);


  setCliente("");
  setDescripcion("");
  setResponsable("");
  setCoste("");
  setFecha("");
  setGravedad("Media");
  setProducto("");
  setPedido("");
  setLote("");
  setCausaRaiz("");
  setAccionCorrectiva("");
  setCompensacion("");
};

const guardarEdicion = async () => {

  if (!puedeEditar) {
    return;
  }

  const resultado = validar(
    reclamacionSchema,
    {
      cliente,
      descripcion,
      responsable,
      fecha,
      gravedad,
      producto,
      pedido,
      lote,
      coste,
      compensacion,
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
    actualizarReclamacion(
      reclamaciones,
      editando,
      {
        cliente: cliente.trim(),
        descripcion: descripcion.trim(),
        responsable: responsable.trim(),
        coste: Number(coste || 0),
        fecha,
        gravedad,
        producto: producto.trim(),
        pedido: pedido.trim(),
        lote: lote.trim(),
        causaRaiz: causaRaiz.trim(),
        accionCorrectiva: accionCorrectiva.trim(),
        compensacion: Number(compensacion || 0),
      }
    );

  await actualizarReclamaciones(
    nuevaLista
  );

  setEditando(null);

  setCliente("");
  setDescripcion("");
  setResponsable("");
  setCoste("");
  setFecha("");
  setGravedad("Media");
  setProducto("");
  setPedido("");
  setLote("");
  setCausaRaiz("");
  setAccionCorrectiva("");
  setCompensacion("");

  setMostrarFormulario(false);
};

const eliminar = async (id) => {

  if (!puedeEditar) {
    return;
  }

  await actualizarReclamaciones(
    borrarReclamacion(
      reclamaciones,
      id
    )
  );
};

const cambiarEstado = async (id) => {

  if (!puedeEditar) {
    return;
  }

  await actualizarReclamaciones(
    actualizarEstadoReclamacion(
      reclamaciones,
      id
    )
  );
};

const verDetalle = item => {

  setDetalleReclamacion(item);

  setMostrarDetalle(true);

};

const editarReclamacion = item => {

  if (!puedeEditar) {
    return;
  }

  setEditando(item.id);

  setCliente(
    item.cliente || ""
  );

  setDescripcion(
    item.descripcion || ""
  );

  setResponsable(
    item.responsable || ""
  );

  setCoste(
    String(item.coste || 0)
  );

  setFecha(
    item.fecha || ""
  );

  setGravedad(
    item.gravedad || "Media"
  );

  setProducto(
    item.producto || ""
  );

  setPedido(
    item.pedido || ""
  );

  setLote(
    item.lote || ""
  );

  setCausaRaiz(
    item.causaRaiz || ""
  );

  setAccionCorrectiva(
    item.accionCorrectiva || ""
  );

  setCompensacion(
    String(item.compensacion || 0)
  );

  setMostrarFormulario(true);

};

const agregarComentario = async () => {

  if (!puedeEditar) {
    return;
  }

  if (
    !nuevoComentario.trim() ||
    !detalleReclamacion
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
    reclamaciones.map(item => {

      if (
        item.id !==
        detalleReclamacion.id
      ) {
        return item;
      }

      return {
        ...item,
        comentarios: [
          ...(item.comentarios || []),
          comentario,
        ],
      };
    });

  await actualizarReclamaciones(
    nuevaLista
  );

  setDetalleReclamacion({
    ...detalleReclamacion,
    comentarios: [
      ...(detalleReclamacion.comentarios || []),
      comentario,
    ],
  });

  setNuevoComentario("");
};

const gestionarEvidencias = async (item) => {

  if (!puedeEditar) {
    return;
  }

  if (!item) {
    return;
  }

  const evidencia = {
    id: Date.now(),
    nombre: `Evidencia ${new Date().toLocaleDateString("es-ES")}`,
    fecha: new Date().toLocaleString("es-ES"),
  };

  const nuevaLista =
    agregarEvidenciaReclamacion(
      reclamaciones,
      item.id,
      evidencia
    );

  await actualizarReclamaciones(
    nuevaLista
  );

  setDetalleReclamacion({
    ...item,
    evidencias: [
      ...(item.evidencias || []),
      evidencia,
    ],
  });
};

  const reclamacionesFiltradas =
    reclamaciones.filter(item => {

      const texto =
        busqueda.toLowerCase();

      return (
        item.cliente
          ?.toLowerCase()
          .includes(texto) ||

        item.descripcion
          ?.toLowerCase()
          .includes(texto) ||

        item.responsable
          ?.toLowerCase()
          .includes(texto)
      );

    });

const cambiarGravedad = async (id) => {

  if (!puedeEditar) {
    return;
  }

  await actualizarReclamaciones(
    actualizarGravedadReclamacion(
      reclamaciones,
      id
    )
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
          📦 Reclamaciones Clientes
        </Text>

        <Text style={styles.subtitle}>
          Gestión de reclamaciones, costes y satisfacción cliente
        </Text>

      </View>

      {/* ===================================================== */}
      {/* KPI RECLAMACIONES */}
      {/* ===================================================== */}

      <View style={styles.row}>
        <KPIBox
          style={styles.dashboardKpi}
          title="Abiertas"
          value={kpis.abiertas}
          detail="Pendientes gestión"
          icon="🔴"
          color="#dc2626"
        />

        <KPIBox
          style={styles.dashboardKpi}
          title="Cumplimiento"
          value={`${kpis.cumplimiento}%`}
          detail="Objetivo cliente"
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
          title="Pendiente Cliente"
          value={kpis.pendienteCliente}
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
          icon="💰"
          color="#dc2626"
        />

        <KPIBox
          style={styles.dashboardKpi}
          title="Resolución"
          value={`${kpis.mediaResolucion || 0}`}
          detail="Días promedio"
          icon="⏱️"
          color="#2563eb"
        />
      </View>

      {/* ===================================================== */}
      {/* RESUMEN ECONÓMICO */}
      {/* ===================================================== */}

      <View style={styles.summaryCard}>

        <Text style={styles.cardTitle}>
          📊 Resumen Económico
        </Text>

        <View style={styles.summaryRow}>
          <Text>
            💰 Coste Total
          </Text>

          <Text style={styles.summaryValue}>
            {(kpis.costeTotal || 0).toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>
            ✅ Compensaciones
          </Text>

          <Text
            style={[
              styles.summaryValue,
              {
                color: "#16a34a",
              },
            ]}
          >
            {(kpis.compensacionTotal || 0).toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>
            📋 Total Reclamaciones
          </Text>

          <Text style={styles.summaryValue}>
            {kpis.total || 0}
          </Text>
        </View>

      </View>

      {/* ===================================================== */}
      {/* INDICADORES ISO Y SATISFACCIÓN CLIENTE */}
      {/* ===================================================== */}

      <View style={styles.summaryCard}>

        <Text style={styles.cardTitle}>
          📈 Indicadores Avanzados
        </Text>

        <View style={styles.summaryRow}>
          <Text>
            📊 Saldo Económico
          </Text>

          <Text
            style={[
              styles.summaryValue,
              {
                color:
                  (kpis.saldoEconomico || 0) > 0
                    ? "#dc2626"
                    : "#16a34a",
              },
            ]}
          >
            {(kpis.saldoEconomico || 0).toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>
            ⏱️ Resolución Media
          </Text>

          <Text style={styles.summaryValue}>
            {kpis.mediaResolucion || 0} días
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>
            🏢 Cliente más reclamado
          </Text>

          <Text style={styles.summaryValue}>
            {kpis.clienteMasReclamado || "-"}
          </Text>
        </View>

      </View>

      {/* ===================================================== */}
      {/* FORMULARIO RECLAMACIÓN */}
      {/* ===================================================== */}

      {puedeEditar && (
        <ReclamacionFormulario
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
          cliente={cliente}
          setCliente={setCliente}
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          responsable={responsable}
          setResponsable={setResponsable}
          coste={coste}
          setCoste={setCoste}
          fecha={fecha}
          setFecha={setFecha}
          gravedad={gravedad}
          setGravedad={setGravedad}
          producto={producto}
          setProducto={setProducto}
          pedido={pedido}
          setPedido={setPedido}
          lote={lote}
          setLote={setLote}
          causaRaiz={causaRaiz}
          setCausaRaiz={setCausaRaiz}
          accionCorrectiva={accionCorrectiva}
          setAccionCorrectiva={setAccionCorrectiva}
          compensacion={compensacion}
          setCompensacion={setCompensacion}
          crearReclamacion={
            crearReclamacion
          }
        />
      )}

      {!puedeEditar && (
        <View style={styles.summaryCard}>
          <Text style={{ color: "#64748b" }}>
            🔒 Acceso de solo lectura: puedes consultar las
            reclamaciones, pero no crear, editar ni borrar
            registros.
          </Text>
        </View>
      )}

      {/* ===================================================== */}
      {/* TABLA DE RECLAMACIONES */}
      {/* ===================================================== */}

      <ReclamacionTabla
        reclamacionesFiltradas={
          reclamacionesFiltradas
        }
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        cambiarEstado={cambiarEstado}
        cambiarGravedad={
          cambiarGravedad
        }
        eliminar={eliminar}
        verDetalle={verDetalle}
        editarReclamacion={
          editarReclamacion
        }
        gestionarEvidencias={
          gestionarEvidencias
        }
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
    {/* MODAL DETALLE RECLAMACIÓN */}
    {/* ===================================================== */}

    <ReclamacionDetalleModal
      visible={mostrarDetalle}
      detalleReclamacion={
        detalleReclamacion
      }
      nuevoComentario={
        nuevoComentario
      }
      setNuevoComentario={
        setNuevoComentario
      }
      agregarComentario={
        agregarComentario
      }
      editarReclamacion={
        editarReclamacion
      }
      gestionarEvidencias={
        gestionarEvidencias
      }
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

cardTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: "#16163b",
  marginBottom: 15,
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
    color: "#16163b",
  },

  subtitle: {
    color: "#64748b",
    marginTop: 5,
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