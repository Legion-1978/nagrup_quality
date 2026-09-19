/**
 * Fechas de negocio:
 * - En pantalla siempre DD/MM/YYYY (ej. 16/06/2026).
 * - En columnas SQL `date` siempre YYYY-MM-DD.
 * - En columnas timestamptz, ISO-8601.
 */

export const EJEMPLO_FECHA_UI = "16/06/2026";

export const REGEX_FECHA_UI =
  /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[0-2])[/-]\d{4}$/;

const CAMPOS_FECHA = new Set([
  "fecha",
  "fechaCreacion",
  "fechaCierre",
  "fechaCompromiso",
  "fechaVerificacion",
  "fechaPrevista",
  "fechaEntrega",
  "fechaInicio",
  "fechaFin",
  "fechaObjetivo",
  "fechaImplantacion",
  "fechaValidacion",
  "fechaUltimaRevision",
  "fechaRevision",
  "fechaProximaRevision",
  "fechaEmision",
  "fechaRegistro",
  "fechaSolicitud",
  "fechaPlanificada",
  "fechaRenovacion",
  "fechaCaducidad",
  "fechaCertificacion",
  "vencimiento",
  "fechaLimite",
]);

const pad = (n) => String(n).padStart(2, "0");

const partesLocales = (date) => ({
  dia: pad(date.getDate()),
  mes: pad(date.getMonth() + 1),
  anio: String(date.getFullYear()),
  horas: pad(date.getHours()),
  minutos: pad(date.getMinutes()),
});

export function esCampoFecha(clave) {
  return CAMPOS_FECHA.has(clave);
}

export function fechaHoyUI() {
  const { dia, mes, anio } = partesLocales(new Date());
  return `${dia}/${mes}/${anio}`;
}

export function fechaHoySQL() {
  const { dia, mes, anio } = partesLocales(new Date());
  return `${anio}-${mes}-${dia}`;
}

export function ahoraISO() {
  return new Date().toISOString();
}

export function ahoraUI() {
  const { dia, mes, anio, horas, minutos } = partesLocales(new Date());
  return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
}

export function esFechaUI(valor) {
  if (typeof valor !== "string") return false;
  const texto = valor.trim();
  if (!REGEX_FECHA_UI.test(texto.replaceAll("-", "/"))) return false;

  const normalizado = texto.replaceAll("-", "/");
  const [dia, mes, anio] = normalizado.split("/").map(Number);
  const fecha = new Date(anio, mes - 1, dia);

  return (
    fecha.getFullYear() === anio &&
    fecha.getMonth() === mes - 1 &&
    fecha.getDate() === dia
  );
}

export function parsearFecha(valor) {
  if (!valor) return null;

  if (valor instanceof Date) {
    return Number.isNaN(valor.getTime()) ? null : valor;
  }

  if (typeof valor !== "string") return null;

  const texto = valor.trim();
  if (!texto) return null;

  const soloFechaISO = texto.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (soloFechaISO) {
    const anio = Number(soloFechaISO[1]);
    const mes = Number(soloFechaISO[2]);
    const dia = Number(soloFechaISO[3]);
    const fecha = new Date(anio, mes - 1, dia);
    return Number.isNaN(fecha.getTime()) ? null : fecha;
  }

  const ui = texto.match(
    /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})(?:\s+(\d{1,2}):(\d{2}))?/
  );
  if (ui) {
    const dia = Number(ui[1]);
    const mes = Number(ui[2]);
    const anio = Number(ui[3]);
    const horas = ui[4] ? Number(ui[4]) : 0;
    const minutos = ui[5] ? Number(ui[5]) : 0;
    const fecha = new Date(anio, mes - 1, dia, horas, minutos);
    if (
      fecha.getFullYear() !== anio ||
      fecha.getMonth() !== mes - 1 ||
      fecha.getDate() !== dia
    ) {
      return null;
    }
    return fecha;
  }

  const nativo = new Date(texto);
  return Number.isNaN(nativo.getTime()) ? null : nativo;
}

export function aSQLDate(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  const fecha = parsearFecha(valor);
  if (!fecha) return null;

  const { dia, mes, anio } = partesLocales(fecha);
  return `${anio}-${mes}-${dia}`;
}

export function aUIDate(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return "";
  }

  const fecha = parsearFecha(valor);
  if (!fecha) return String(valor);

  const { dia, mes, anio } = partesLocales(fecha);
  return `${dia}/${mes}/${anio}`;
}

export function diasDesde(fechaInicio, fechaFin = new Date()) {
  const inicio = parsearFecha(fechaInicio);
  const fin = parsearFecha(fechaFin);

  if (!inicio || !fin) return 0;

  const ms = fin.setHours(0, 0, 0, 0) - inicio.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export function registroFechasASql(registro) {
  if (!registro || typeof registro !== "object" || Array.isArray(registro)) {
    return registro;
  }

  const salida = { ...registro };

  Object.keys(salida).forEach((clave) => {
    if (esCampoFecha(clave)) {
      salida[clave] = aSQLDate(salida[clave]);
    }
  });

  return salida;
}

export function registroFechasAUI(registro) {
  if (!registro || typeof registro !== "object" || Array.isArray(registro)) {
    return registro;
  }

  const salida = { ...registro };

  Object.keys(salida).forEach((clave) => {
    if (esCampoFecha(clave)) {
      salida[clave] = aUIDate(salida[clave]);
    }
  });

  return salida;
}

export function listaFechasAUI(lista = []) {
  return lista.map(registroFechasAUI);
}
