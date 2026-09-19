import AsyncStorage from "@react-native-async-storage/async-storage";
import { obtenerSiguienteCorrelativo } from "../services/contadoresRepository";

// Genera IDs con el formato PREFIJO + AA (2 dígitos del año) +
// correlativo de 3 dígitos. Ej: REC26001, REC26002... y al
// empezar el año 2027, vuelve a 001: REC27001.
//
// El contador vive en Supabase (tabla "contadores" + función SQL
// "siguiente_correlativo") y se incrementa de forma atómica, así que
// dos usuarios distintos nunca pueden recibir el mismo número. Si en
// algún momento no hay conexión, se usa un contador local
// (AsyncStorage) como red de seguridad para no bloquear el trabajo,
// pero esa vía solo debería usarse en local mientras no haya red.

const obtenerAnioCorto = () =>
  String(new Date().getFullYear()).slice(-2);

const claveContador = (prefijo, anio) =>
  `contador_local_${prefijo}_${anio}`;

async function generarIdLocalDeEmergencia(prefijo) {
  const anio = obtenerAnioCorto();
  const key = claveContador(prefijo, anio);

  let ultimoNumero = 0;

  try {
    const guardado = await AsyncStorage.getItem(key);
    ultimoNumero = guardado ? parseInt(guardado, 10) || 0 : 0;
  } catch (error) {
    ultimoNumero = 0;
  }

  const siguienteNumero = ultimoNumero + 1;

  try {
    await AsyncStorage.setItem(key, String(siguienteNumero));
  } catch (error) {
    // Si falla el guardado del contador, seguimos igualmente: es
    // preferible crear el registro con un ID que arriesgar a perder
    // el trabajo del usuario.
  }

  const correlativo = String(siguienteNumero).padStart(3, "0");

  return `${prefijo}${anio}${correlativo}`;
}

export async function generarSiguienteId(prefijo) {
  const anio = obtenerAnioCorto();

  try {
    const siguienteNumero = await obtenerSiguienteCorrelativo(
      prefijo,
      anio
    );

    const correlativo = String(siguienteNumero).padStart(3, "0");

    return `${prefijo}${anio}${correlativo}`;
  } catch (error) {
    console.warn(
      `No se pudo obtener el correlativo de Supabase para ${prefijo}, usando contador local de emergencia:`,
      error
    );

    return generarIdLocalDeEmergencia(prefijo);
  }
}

// Prefijos oficiales de cada módulo. Centralizados aquí para que
// todos los servicios usen exactamente el mismo código.
export const PREFIJOS_ID = {
  RECLAMACION: "REC",
  INCIDENCIA: "IN",
  NO_CONFORMIDAD_PROVEEDOR: "NC",
  AUDITORIA: "AUD",
  MEJORA: "MEJ",
  PROCEDIMIENTO: "PRO",
  FORMACION: "FOR",
  OTIF: "OTIF",
  SATISFACCION: "SAT",
};
