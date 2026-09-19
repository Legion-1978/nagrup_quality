import * as Crypto from "expo-crypto";

// Prefijos que marcan el esquema usado para una contraseña guardada:
// - "sha256:"         -> esquema antiguo, SHA-256 sin salt (solo lectura, se migra al vuelo)
// - "sha256s:<salt>:" -> esquema actual, SHA-256 con salt aleatorio por usuario
const HASH_PREFIX_LEGACY = "sha256:";
const HASH_PREFIX_SALTED = "sha256s:";

const generarSalt = () => {
  const bytes = Crypto.getRandomBytes(16);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const digest = async (texto) =>
  Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, texto);

/**
 * Convierte una contraseña en texto plano en un hash SHA-256 con salt
 * aleatorio propio. No es un sistema de nivel bancario (para eso haría
 * falta bcrypt/argon2 en un backend), pero evita tanto contraseñas
 * legibles como hashes vulnerables a tablas rainbow precalculadas.
 */
export async function hashPassword(password) {
  const texto = String(password ?? "");
  const salt = generarSalt();
  const hash = await digest(salt + texto);

  return `${HASH_PREFIX_SALTED}${salt}:${hash}`;
}

/**
 * Indica si un valor ya está hasheado (con cualquiera de los dos
 * esquemas), para no volver a hashear contraseñas migradas y para
 * saber cuáles quedan aún en texto plano o en el esquema antiguo.
 */
export function esHashDeContrasena(valor) {
  return (
    typeof valor === "string" &&
    (valor.startsWith(HASH_PREFIX_SALTED) ||
      valor.startsWith(HASH_PREFIX_LEGACY))
  );
}

/** Indica si el hash guardado usa el esquema antiguo sin salt. */
export function esHashLegacySinSalt(valor) {
  return (
    typeof valor === "string" && valor.startsWith(HASH_PREFIX_LEGACY)
  );
}

/**
 * Compara una contraseña en texto plano (la que escribe el usuario
 * en el login) contra el hash guardado, soportando ambos esquemas.
 */
export async function verificarPassword(passwordPlano, hashGuardado) {
  if (typeof hashGuardado !== "string") {
    return false;
  }

  if (hashGuardado.startsWith(HASH_PREFIX_SALTED)) {
    const resto = hashGuardado.slice(HASH_PREFIX_SALTED.length);
    const separador = resto.indexOf(":");

    if (separador === -1) {
      return false;
    }

    const salt = resto.slice(0, separador);
    const hashEsperado = resto.slice(separador + 1);
    const candidato = await digest(salt + String(passwordPlano ?? ""));

    return candidato === hashEsperado;
  }

  if (hashGuardado.startsWith(HASH_PREFIX_LEGACY)) {
    // Esquema antiguo sin salt: se valida igual, y quien llama
    // (AuthContext) se encarga de volver a hashear con salt tras
    // un login correcto para completar la migración.
    const hashEsperado = hashGuardado.slice(HASH_PREFIX_LEGACY.length);
    const candidato = await digest(String(passwordPlano ?? ""));

    return candidato === hashEsperado;
  }

  // Dato antiguo sin migrar en absoluto (texto plano): comparación
  // directa como último recurso; no debería ocurrir tras el arranque.
  return passwordPlano === hashGuardado;
}
