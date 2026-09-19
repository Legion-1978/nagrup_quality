import React, {
  useMemo,
  useState,
} from "react";

import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import KPIBox from "../components/KPIBox";
import { useLogistics } from "../context/LogisticsContext";
import {
  generarSiguienteId,
  PREFIJOS_ID,
} from "../utils/correlativos";
import { useConfig } from "../context/ConfigContext";
import { useAuth } from "../context/AuthContext";
import ScreenLayout from "../components/ScreenLayout";
import { otifSchema }
  from "../schemas/otifSchema";

import { validar }
  from "../schemas/validar";

import { mostrarMensaje }
  from "../utils/mensajes";

export default function OTIFScreen() {
  const {
    entregasOTIF = [],
    actualizarOTIF,
  } = useLogistics();

  const {
    configuracionDashboard = {},
  } = useConfig();

  const { tienePermisoEdicion } = useAuth();

  const puedeEditar = tienePermisoEdicion("otif");

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  const [cliente, setCliente] =
    useState("");

  const [pedido, setPedido] =
    useState("");

  const [fechaPrevista, setFechaPrevista] =
    useState("");

  const [fechaEntrega, setFechaEntrega] =
    useState("");

  const [cantidadPedida, setCantidadPedida] =
    useState("");

  const [
    cantidadEntregada,
    setCantidadEntregada,
  ] = useState("");

  const [motivo, setMotivo] =
    useState("");

  const [transportista, setTransportista] =
    useState("");

  const [entregaEditando, setEntregaEditando] =
    useState(null);

  const datos = useMemo(() => {
    const total =
      entregasOTIF.length;

    const correctas =
      entregasOTIF.filter(
        x => x.otif
      ).length;

    const fallidas =
      total - correctas;

    const fueraPlazo =
      entregasOTIF.filter(
        x => !x.onTime
      ).length;

    const incompletas =
      entregasOTIF.filter(
        x => !x.inFull
      ).length;

    const porcentaje =
      total === 0
        ? 0
        : (
            (correctas / total) *
            100
          ).toFixed(1);

    return {
      total,
      correctas,
      fallidas,
      fueraPlazo,
      incompletas,
      porcentaje,
    };
  }, [entregasOTIF]);

const parseFecha = fecha => {

  if (!fecha) {
    return null;
  }

  const partes =
    fecha.split("/");

  if (partes.length !== 3) {
    return null;
  }

  const [
    dia,
    mes,
    anio,
  ] = partes;

  const fechaConvertida =
    new Date(
      Number(anio),
      Number(mes) - 1,
      Number(dia)
    );

  return isNaN(
    fechaConvertida.getTime()
  )
    ? null
    : fechaConvertida;
};

  const limpiarFormulario = () => {
    setCliente("");
    setPedido("");
    setFechaPrevista("");
    setFechaEntrega("");
    setCantidadPedida("");
    setCantidadEntregada("");
    setMotivo("");
    setTransportista("");
    setEntregaEditando(null);
  };

const registrarEntrega = async () => {

  if (!puedeEditar) {
    return;
  }

  const resultado = validar(
    otifSchema,
    {
      cliente,
      pedido,
      fechaPrevista,
      fechaEntrega,
      cantidadPedida,
      cantidadEntregada,
      transportista,
    }
  );

  if (!resultado.ok) {

    mostrarMensaje(
      "Validación",
      resultado.mensaje
    );

    return;
  }

  const fechaPrev =
    parseFecha(fechaPrevista);

  const fechaEnt =
    parseFecha(fechaEntrega);

  const onTime =
    fechaEnt <= fechaPrev;

  const inFull =
    Number(cantidadEntregada) >=
    Number(cantidadPedida);

  const otif =
    onTime && inFull;

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
    entregaEditando?.id ||
    (await generarSiguienteId(
      PREFIJOS_ID.OTIF
    ));

  const nuevaEntrega = {

    id,

    cliente:
      cliente.trim(),

    pedido:
      pedido.trim(),

    fechaPrevista:
      convertirFechaParaSQL(
        fechaPrevista
      ),

    fechaEntrega:
      convertirFechaParaSQL(
        fechaEntrega
      ),

    cantidadPedida:
      Number(
        cantidadPedida
      ),

    cantidadEntregada:
      Number(
        cantidadEntregada
      ),

    motivo: otif
      ? ""
      : motivo.trim(),

    transportista:
      transportista.trim(),

    onTime,

    inFull,

    otif,

    fechaRegistro:
      entregaEditando?.fechaRegistro ||
      new Date().toISOString(),
  };

  if (entregaEditando) {

    actualizarOTIF(prev =>
      prev.map(item =>
        item.id === entregaEditando.id
          ? nuevaEntrega
          : item
      )
    );

  } else {

    actualizarOTIF(prev => [
      ...prev,
      nuevaEntrega,
    ]);

  }

  limpiarFormulario();

  setMostrarFormulario(
    false
  );

  mostrarMensaje(
    "Correcto",
    entregaEditando
      ? "Entrega actualizada"
      : "Entrega registrada"
  );
};

  const editarEntrega = item => {
    if (!puedeEditar) {
      return;
    }

    setEntregaEditando(item);

    setCliente(item.cliente);
    setPedido(item.pedido);
setFechaPrevista(
  item.fechaPrevista
    ? item.fechaPrevista.includes("-")
      ? item.fechaPrevista
          .split("-")
          .reverse()
          .join("/")
      : item.fechaPrevista
    : ""
);

setFechaEntrega(
  item.fechaEntrega
    ? item.fechaEntrega.includes("-")
      ? item.fechaEntrega
          .split("-")
          .reverse()
          .join("/")
      : item.fechaEntrega
    : ""
);
    setCantidadPedida(
      String(item.cantidadPedida)
    );
    setCantidadEntregada(
      String(item.cantidadEntregada)
    );
    setMotivo(item.motivo || "");

    setTransportista(item.transportista || "");

    setMostrarFormulario(true);
  };

  const eliminarEntrega = id => {
    if (!puedeEditar) {
      return;
    }

    actualizarOTIF(prev =>
      prev.filter(
        item => item.id !== id
      )
    );
  };

  const clientesUnicos =
    new Set(
      entregasOTIF.map(
        item => item.cliente
      )
    ).size;

  const objetivoOTIF =
    configuracionDashboard
      .objetivoOTIF || 98;

  const desviacion = (
    Number(datos.porcentaje) -
    objetivoOTIF
  ).toFixed(1);

  const obtenerTipoNC = item => {
    if (item.otif) return "-";

    if (
      !item.onTime &&
      !item.inFull
    ) {
      return "Plazo + Cantidad";
    }

    if (!item.onTime) {
      return "Retraso";
    }

    if (!item.inFull) {
      return "Cantidad";
    }

    return "-";
  };

return (
  <ScreenLayout>
    <ScrollView style={styles.container}>

{/* ===================================================== */}
{/* CABECERA */}
{/* ===================================================== */}

<View style={styles.header}>
  <Text style={styles.title}>
    🚛 Gestión OTIF
  </Text>

  <Text style={styles.subtitle}>
    Seguimiento entregas On Time In Full
  </Text>
</View>

{/* ===================================================== */}
{/* KPI OTIF */}
{/* ===================================================== */}

<View style={styles.row}>
  <KPIBox
    style={styles.dashboardKpi}
    title="OTIF Global"
    value={`${datos.porcentaje}%`}
    detail={`Objetivo ${objetivoOTIF}%`}
    icon="🎯"
    color="#16a34a"
  />

  <KPIBox
    style={styles.dashboardKpi}
    title="Entregas"
    value={datos.total}
    detail="Pedidos registrados"
    icon="📦"
    color="#2563eb"
  />
</View>

<View style={styles.row}>
  <KPIBox
    style={styles.dashboardKpi}
    title="Correctas"
    value={datos.correctas}
    detail="On Time + In Full"
    icon="✅"
    color="#16a34a"
  />

  <KPIBox
    style={styles.dashboardKpi}
    title="Incumplimientos"
    value={datos.fallidas}
    detail="Entregas no OTIF"
    icon="❌"
    color="#dc2626"
  />
</View>

<View style={styles.row}>
  <KPIBox
    style={styles.dashboardKpi}
    title="Fuera Plazo"
    value={datos.fueraPlazo}
    detail="No On Time"
    icon="⏰"
    color="#f97316"
  />

  <KPIBox
    style={styles.dashboardKpi}
    title="Incompletas"
    value={datos.incompletas}
    detail="No In Full"
    icon="📉"
    color="#dc2626"
  />
</View>

<View style={styles.row}>
  <KPIBox
    style={styles.dashboardKpi}
    title="Clientes"
    value={clientesUnicos}
    detail="Clientes servidos"
    icon="🏢"
    color="#0f766e"
  />

  <KPIBox
    style={styles.dashboardKpi}
    title="Desviación"
    value={`${desviacion}%`}
    detail="Vs objetivo"
    icon="📊"
    color={
      Number(desviacion) >= 0
        ? "#16a34a"
        : "#dc2626"
    }
  />
</View>

{/* ===================================================== */}
{/* INDICADORES ISO 9001 */}
{/* ===================================================== */}

<View style={styles.card}>
  <Text style={styles.tableTitle}>
    📈 Indicadores ISO 9001
  </Text>

  <View style={styles.balanceRow}>
    <Text>🎯 Objetivo OTIF</Text>
    <Text>{objetivoOTIF}%</Text>
  </View>

  <View style={styles.balanceRow}>
    <Text>📦 Entregas Registradas</Text>
    <Text>{datos.total}</Text>
  </View>

  <View style={styles.balanceRow}>
    <Text>✅ Entregas Correctas</Text>
    <Text>{datos.correctas}</Text>
  </View>

  <View style={styles.balanceRow}>
    <Text>❌ Incumplimientos</Text>
    <Text>{datos.fallidas}</Text>
  </View>

  <View style={styles.balanceRow}>
    <Text>⏰ Fuera de Plazo</Text>
    <Text>{datos.fueraPlazo}</Text>
  </View>

  <View style={styles.balanceRow}>
    <Text>📉 Incompletas</Text>
    <Text>{datos.incompletas}</Text>
  </View>

  <View style={styles.balanceRow}>
    <Text>🏢 Clientes Atendidos</Text>
    <Text>{clientesUnicos}</Text>
  </View>
</View>

{/* ===================================================== */}
{/* BOTÓN NUEVA ENTREGA */}
{/* ===================================================== */}

{puedeEditar && (
  <TouchableOpacity
    style={styles.button}
    onPress={() =>
      setMostrarFormulario(
        !mostrarFormulario
      )
    }
  >
    <Text style={styles.buttonText}>
      🚛 Nueva Entrega
    </Text>
  </TouchableOpacity>
)}

{!puedeEditar && (
  <View style={styles.card}>
    <Text style={{ color: "#64748b" }}>
      🔒 Acceso de solo lectura: puedes consultar las entregas
      OTIF, pero no crear, editar ni borrar registros.
    </Text>
  </View>
)}

      {/* ===================================================== */}
      {/* FORMULARIO REGISTRO ENTREGA */}
      {/* ===================================================== */}

      {puedeEditar && mostrarFormulario && (
        <View style={styles.card}>

          <TextInput
            placeholder="Cliente"
            value={cliente}
            onChangeText={setCliente}
            style={styles.input}
          />

          <TextInput
            placeholder="Pedido"
            value={pedido}
            onChangeText={setPedido}
            style={styles.input}
          />

          <TextInput
            placeholder="Fecha Prevista (DD/MM/AAAA)"
            value={fechaPrevista}
            onChangeText={setFechaPrevista}
            style={styles.input}
          />

          <TextInput
            placeholder="Fecha Entrega (DD/MM/AAAA)"
            value={fechaEntrega}
            onChangeText={setFechaEntrega}
            style={styles.input}
          />

          <TextInput
            placeholder="Cantidad Pedida"
            value={cantidadPedida}
            onChangeText={setCantidadPedida}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            placeholder="Cantidad Entregada"
            value={cantidadEntregada}
            onChangeText={setCantidadEntregada}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            placeholder="Transportista"
            value={transportista}
            onChangeText={setTransportista}
            style={styles.input}
          />

          <TextInput
            placeholder="Motivo (si no cumple OTIF)"
            value={motivo}
            onChangeText={setMotivo}
            style={styles.input}
            multiline
          />

          <TouchableOpacity
            style={styles.button}
            onPress={registrarEntrega}
          >
            <Text style={styles.buttonText}>
              Registrar Entrega
            </Text>
          </TouchableOpacity>

        </View>
      )}

      {/* ===================================================== */}
      {/* TABLA DE ENTREGAS */}
      {/* ===================================================== */}

      <View style={styles.card}>

        <Text style={styles.tableTitle}>
          📋 Listado Entregas
        </Text>

        <ScrollView
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >

<View
  style={{
    minWidth: 1650,
  }}
>

  {/* CABECERA TABLA */}

  <View style={styles.tableHeader}>
    <Text style={[styles.headerCell, { width: 120 }]}>
      Pedido
    </Text>

    <Text style={[styles.headerCell, { width: 180 }]}>
      Cliente
    </Text>

    <Text style={[styles.headerCell, { width: 140 }]}>
      Transportista
    </Text>

    <Text style={[styles.headerCell, { width: 120 }]}>
      Fecha Prevista
    </Text>

    <Text style={[styles.headerCell, { width: 120 }]}>
      Fecha Entrega
    </Text>

    <Text style={[styles.headerCell, { width: 90 }]}>
      Pedida
    </Text>

    <Text style={[styles.headerCell, { width: 90 }]}>
      Entregada
    </Text>

    <Text style={[styles.headerCell, { width: 80 }]}>
      On Time
    </Text>

    <Text style={[styles.headerCell, { width: 80 }]}>
      In Full
    </Text>

    <Text style={[styles.headerCell, { width: 130 }]}>
      Estado OTIF
    </Text>

    <Text style={[styles.headerCell, { width: 140 }]}>
      Tipo NC
    </Text>

    <Text style={[styles.headerCell, { width: 220 }]}>
      Motivo
    </Text>

    <Text style={[styles.headerCell, { width: 140 }]}>
      Registro
    </Text>

    <Text style={[styles.headerCell, { width: 140 }]}>
      Acciones
    </Text>
  </View>

  {entregasOTIF.length === 0 ? (
    <View
      style={{
        backgroundColor: "#fff",
        paddingVertical: 20,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: "#64748b",
        }}
      >
        No existen entregas registradas
      </Text>
    </View>
  ) : (
    entregasOTIF.map(item => (
      <View
        key={item.id}
        style={styles.tableRow}
      >
        <Text
          style={[
            styles.cell,
            { width: 120 },
          ]}
        >
          {item.pedido}
        </Text>

        <Text
          style={[
            styles.cell,
            { width: 180 },
          ]}
        >
          {item.cliente}
        </Text>

        <Text
          style={[
            styles.cell,
            { width: 140 },
          ]}
        >
          {item.transportista || "-"}
        </Text>

        <Text
          style={[
            styles.cell,
            { width: 120 },
          ]}
        >
          {item.fechaPrevista
  ? item.fechaPrevista.includes("-")
    ? item.fechaPrevista
        .split("-")
        .reverse()
        .join("/")
    : item.fechaPrevista
  : "-"
}
        </Text>

        <Text
          style={[
            styles.cell,
            { width: 120 },
          ]}
        >
{item.fechaEntrega
  ? item.fechaEntrega.includes("-")
    ? item.fechaEntrega
        .split("-")
        .reverse()
        .join("/")
    : item.fechaEntrega
  : "-"
}
        </Text>

        <Text
          style={[
            styles.cell,
            { width: 90 },
          ]}
        >
          {item.cantidadPedida}
        </Text>

        <Text
          style={[
            styles.cell,
            { width: 90 },
          ]}
        >
          {item.cantidadEntregada}
        </Text>

        <Text
          style={[
            styles.cell,
            {
              width: 80,
              color: item.onTime
                ? "#16a34a"
                : "#dc2626",
            },
          ]}
        >
          {item.onTime ? "✅" : "❌"}
        </Text>

        <Text
          style={[
            styles.cell,
            {
              width: 80,
              color: item.inFull
                ? "#16a34a"
                : "#dc2626",
            },
          ]}
        >
          {item.inFull ? "✅" : "❌"}
        </Text>

        <Text
          style={[
            styles.cell,
            {
              width: 130,
              fontWeight: "700",
              color: item.otif
                ? "#16a34a"
                : "#dc2626",
            },
          ]}
        >
          {item.otif
            ? "✅ Conforme"
            : "❌ NC"}
        </Text>

        <Text
          style={[
            styles.cell,
            { width: 140 },
          ]}
        >
          {obtenerTipoNC(item)}
        </Text>

        <Text
          style={[
            styles.cell,
            { width: 220 },
          ]}
          numberOfLines={2}
        >
          {item.motivo || "-"}
        </Text>

        <Text
          style={[
            styles.cell,
            { width: 140 },
          ]}
        >
          {item.fechaRegistro
            ? new Date(
                item.fechaRegistro
              ).toLocaleDateString(
                "es-ES"
              )
            : "-"}
        </Text>

        <View
          style={{
            width: 140,
            flexDirection: "row",
            justifyContent: "center",
            gap: 12,
          }}
        >
          {puedeEditar && (
            <>
              <TouchableOpacity
                onPress={() =>
                  editarEntrega(item)
                }
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  ✏️
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  eliminarEntrega(item.id)
                }
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
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

    </ScrollView>
  </ScreenLayout>
);
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#f4f7fb",
      padding: 16,
    },

dashboardKpi: {
  flex: 1,
},

balanceRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: "#e2e8f0",
},

    header: {
      backgroundColor:
        "#fff",
      padding: 20,
      borderRadius: 12,
      marginBottom: 20,
    },

    title: {
      fontSize: 28,
      fontWeight: "700",
    },

    subtitle: {
      color: "#64748b",
      marginTop: 5,
    },
    
    card: {
      backgroundColor:
        "#fff",
      padding: 20,
      borderRadius: 12,
      marginBottom: 20,
    },

    input: {
      borderWidth: 1,
      borderColor: "#d1d5db",
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
    },

    button: {
      backgroundColor:
        "#2563eb",
      padding: 14,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 15,
    },

    buttonText: {
      color: "#fff",
      fontWeight: "700",
    },

    tableTitle: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 15,
    },
tableHeader: {
  flexDirection: "row",
  backgroundColor: "#2563eb",
  paddingVertical: 12,
  minWidth: 1410,
},

row: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 10,
  marginBottom: 12,
},

tableRow: {
  flexDirection: "row",
  alignItems: "center",
  minHeight: 55,
  minWidth: 1410,
  borderBottomWidth: 1,
  borderBottomColor: "#e5e7eb",
  backgroundColor: "#ffffff",
},

headerCell: {
  color: "#ffffff",
  fontWeight: "700",
  fontSize: 12,
  textAlign: "center",
},

cell: {
  fontSize: 12,
  color: "#1e293b",
  textAlign: "center",
  paddingHorizontal: 4,
},
  });