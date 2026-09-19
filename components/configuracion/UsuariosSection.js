import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";

const ROLES = ["Administrador", "Supervisor", "Usuario"];

// Preajustes de permisos según el rol elegido. El usuario admin
// siempre puede afinar cada permiso a mano después de elegir uno.
const PRESET_PERMISOS = {
  Administrador: {
    dashboard: true,
    otif: true,
    incidencias: true,
    reclamaciones: true,
    proveedores: true,
    auditorias: true,
    satisfaccion: true,
    mejoras: true,
    formacion: true,
    procedimientos: true,
    costes: true,
    configuracion: true,
  },
  Supervisor: {
    dashboard: true,
    otif: true,
    incidencias: true,
    reclamaciones: true,
    proveedores: true,
    auditorias: true,
    satisfaccion: true,
    mejoras: true,
    formacion: true,
    procedimientos: true,
    costes: true,
    configuracion: false,
  },
  Usuario: {
    dashboard: true,
    otif: false,
    incidencias: false,
    reclamaciones: false,
    proveedores: false,
    auditorias: false,
    satisfaccion: false,
    mejoras: false,
    formacion: false,
    procedimientos: false,
    costes: false,
    configuracion: false,
  },
};

// Preajustes de permisos de EDICIÓN (crear/editar/borrar registros)
// dentro de las páginas a las que el usuario ya tiene acceso. El
// Administrador siempre puede editar todo (ver tienePermisoEdicion
// en AuthContext), por eso aquí no se usa para él en la práctica,
// pero se deja completo por coherencia con el resto de presets.
const PRESET_PERMISOS_EDICION = {
  Administrador: {
    otif: true,
    incidencias: true,
    reclamaciones: true,
    proveedores: true,
    auditorias: true,
    satisfaccion: true,
    mejoras: true,
    formacion: true,
    procedimientos: true,
  },
  Supervisor: {
    otif: true,
    incidencias: true,
    reclamaciones: true,
    proveedores: true,
    auditorias: true,
    satisfaccion: true,
    mejoras: true,
    formacion: true,
    procedimientos: true,
  },
  Usuario: {
    otif: false,
    incidencias: false,
    reclamaciones: false,
    proveedores: false,
    auditorias: false,
    satisfaccion: false,
    mejoras: false,
    formacion: false,
    procedimientos: false,
  },
};

const ETIQUETAS_PERMISOS = {
  dashboard: "Panel de Control",
  otif: "OTIF",
  incidencias: "Incidencias",
  reclamaciones: "Reclamaciones",
  proveedores: "Proveedores (No Conformidades)",
  auditorias: "Auditorías",
  satisfaccion: "Satisfacción Cliente",
  mejoras: "Mejoras Continuas",
  formacion: "Formación",
  procedimientos: "Procedimientos",
  costes: "Coste de No Calidad",
  configuracion: "Configuración",
};

// Solo las páginas con alta/edición de registros tienen sentido
// aquí; Dashboard, Coste de No Calidad y Configuración son de
// solo consulta (o se gestionan aparte) y no aparecen en esta
// matriz de edición.
const ETIQUETAS_PERMISOS_EDICION = {
  otif: "OTIF",
  incidencias: "Incidencias",
  reclamaciones: "Reclamaciones",
  proveedores: "Proveedores (No Conformidades)",
  auditorias: "Auditorías",
  satisfaccion: "Satisfacción Cliente",
  mejoras: "Mejoras Continuas",
  formacion: "Formación",
  procedimientos: "Procedimientos",
};

function soloLetrasYNumeros(texto) {
  return /^[a-zA-Z0-9._-]*$/.test(texto);
}

function emailValido(texto) {
  if (!texto) return true; // el email es opcional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);
}

export default function UsuariosSection({
  usuarios,
  nuevoUsuario,
  setNuevoUsuario,
  confirmarPassword,
  setConfirmarPassword,
  editandoId,
  crearUsuario,
  actualizarUsuario,
  editarUsuario,
  eliminarUsuario,
  cancelarEdicion,
  styles,
}) {
  const [mostrarPassword, setMostrarPassword] =
    useState(false);

  const actualizarCampo = (campo, valor) => {
    setNuevoUsuario({
      ...nuevoUsuario,
      [campo]: valor,
    });
  };

  const aplicarPreset = (rol) => {
    setNuevoUsuario({
      ...nuevoUsuario,
      rol,
      permisos: {
        ...PRESET_PERMISOS[rol],
      },
      permisosEdicion: {
        ...PRESET_PERMISOS_EDICION[rol],
      },
    });
  };

  const marcarTodos = (valor) => {
    const permisos = {};

    Object.keys(
      nuevoUsuario.permisos || ETIQUETAS_PERMISOS
    ).forEach((p) => {
      permisos[p] = valor;
    });

    setNuevoUsuario({
      ...nuevoUsuario,
      permisos,
    });
  };

  const marcarTodosEdicion = (valor) => {
    const permisosEdicion = {};

    Object.keys(
      nuevoUsuario.permisosEdicion ||
        ETIQUETAS_PERMISOS_EDICION
    ).forEach((p) => {
      permisosEdicion[p] = valor;
    });

    setNuevoUsuario({
      ...nuevoUsuario,
      permisosEdicion,
    });
  };

  const usuarioValido =
    nuevoUsuario.usuario?.trim().length > 0 &&
    soloLetrasYNumeros(nuevoUsuario.usuario.trim());

  const emailOk = emailValido(
    nuevoUsuario.email?.trim() || ""
  );

  const passwordsCoinciden =
    editandoId
      ? !nuevoUsuario.password ||
        nuevoUsuario.password === confirmarPassword
      : nuevoUsuario.password === confirmarPassword;

  const passwordLongitudOk =
    editandoId && !nuevoUsuario.password
      ? true // en edición, dejar en blanco = no cambiar
      : (nuevoUsuario.password || "").length >= 6;

  const formularioValido =
    nuevoUsuario.nombre?.trim().length > 0 &&
    usuarioValido &&
    emailOk &&
    passwordsCoinciden &&
    passwordLongitudOk &&
    (editandoId
      ? true
      : (nuevoUsuario.password || "").length > 0);

  return (
    <View>
      <Text style={styles.sectionTitle}>
        {editandoId
          ? "✏️ Editar Usuario"
          : "👤 Nuevo Usuario"}
      </Text>

      {/* DATOS PERSONALES */}

      <Text style={styles.fieldLabel}>
        Nombre completo *
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: María López"
        value={nuevoUsuario.nombre}
        onChangeText={(v) =>
          actualizarCampo("nombre", v)
        }
      />

      <Text style={styles.fieldLabel}>
        Correo electrónico
      </Text>

      <TextInput
        style={styles.input}
        placeholder="ej: maria.lopez@empresa.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={nuevoUsuario.email || ""}
        onChangeText={(v) =>
          actualizarCampo("email", v)
        }
      />

      {!emailOk && (
        <Text style={styles.errorText}>
          El formato del correo no es válido
        </Text>
      )}

      <Text style={styles.fieldLabel}>
        Departamento
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: Calidad, Logística, Almacén..."
        value={nuevoUsuario.departamento || ""}
        onChangeText={(v) =>
          actualizarCampo("departamento", v)
        }
      />

      {/* ACCESO */}

      <Text style={styles.fieldLabel}>
        Usuario (para iniciar sesión) *
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Sin espacios ni acentos"
        autoCapitalize="none"
        editable={!editandoId}
        value={nuevoUsuario.usuario}
        onChangeText={(v) =>
          actualizarCampo("usuario", v)
        }
      />

      {!usuarioValido &&
        nuevoUsuario.usuario?.length > 0 && (
          <Text style={styles.errorText}>
            Solo letras, números, puntos, guiones y sin espacios
          </Text>
        )}

      {editandoId && (
        <Text style={styles.helperText}>
          El nombre de usuario no se puede modificar
        </Text>
      )}

      <Text style={styles.fieldLabel}>
        {editandoId
          ? "Nueva contraseña"
          : "Contraseña *"}
      </Text>

      <View>
        <TextInput
          style={styles.input}
          placeholder={
            editandoId
              ? "Dejar en blanco para no cambiarla"
              : "Mínimo 6 caracteres"
          }
          secureTextEntry={!mostrarPassword}
          value={nuevoUsuario.password}
          onChangeText={(v) =>
            actualizarCampo("password", v)
          }
        />

        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() =>
            setMostrarPassword(!mostrarPassword)
          }
        >
          <Text style={styles.showPasswordText}>
            {mostrarPassword ? "Ocultar" : "Ver"}
          </Text>
        </TouchableOpacity>
      </View>

      {!passwordLongitudOk && (
        <Text style={styles.errorText}>
          La contraseña debe tener al menos 6 caracteres
        </Text>
      )}

      <Text style={styles.fieldLabel}>
        Confirmar contraseña
        {editandoId ? "" : " *"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Repite la contraseña"
        secureTextEntry={!mostrarPassword}
        value={confirmarPassword}
        onChangeText={setConfirmarPassword}
      />

      {!passwordsCoinciden && (
        <Text style={styles.errorText}>
          Las contraseñas no coinciden
        </Text>
      )}

      {/* ROL */}

      <Text style={styles.fieldLabel}>
        Rol
      </Text>

      <View style={styles.chipRow}>
        {ROLES.map((rol) => (
          <TouchableOpacity
            key={rol}
            onPress={() => aplicarPreset(rol)}
            style={[
              styles.chip,
              nuevoUsuario.rol === rol &&
                styles.chipActive,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                nuevoUsuario.rol === rol &&
                  styles.chipTextActive,
              ]}
            >
              {rol}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.helperText}>
        Elegir un rol rellena los permisos habituales; puedes
        ajustarlos abajo antes de guardar
      </Text>

      {/* ESTADO */}

      <View style={styles.switchRow}>
        <Text style={styles.label}>
          Usuario activo
        </Text>

        <Switch
          value={nuevoUsuario.activo !== false}
          onValueChange={(v) =>
            actualizarCampo("activo", v)
          }
        />
      </View>

      {/* PERMISOS */}

      <View style={styles.permissionsCard}>
        <View style={styles.permissionsHeaderRow}>
          <Text style={styles.label}>
            Permisos por módulo
          </Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity onPress={() => marcarTodos(true)}>
              <Text style={styles.linkButton}>
                Marcar todos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => marcarTodos(false)}>
              <Text style={styles.linkButton}>
                Ninguno
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {Object.keys(
          nuevoUsuario.permisos || ETIQUETAS_PERMISOS
        ).map((permiso) => (
          <View
            key={permiso}
            style={styles.permissionRow}
          >
            <Text>
              {ETIQUETAS_PERMISOS[permiso] || permiso}
            </Text>

            <Switch
              value={Boolean(
                nuevoUsuario.permisos?.[permiso]
              )}
              onValueChange={(valor) =>
                setNuevoUsuario({
                  ...nuevoUsuario,
                  permisos: {
                    ...nuevoUsuario.permisos,
                    [permiso]: valor,
                  },
                })
              }
            />
          </View>
        ))}
      </View>

      {/* PERMISOS DE EDICIÓN (crear / editar / borrar registros) */}

      <View style={styles.permissionsCard}>
        <View style={styles.permissionsHeaderRow}>
          <Text style={styles.label}>
            Permisos de edición por módulo
          </Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity onPress={() => marcarTodosEdicion(true)}>
              <Text style={styles.linkButton}>
                Marcar todos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => marcarTodosEdicion(false)}>
              <Text style={styles.linkButton}>
                Ninguno
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.helperText}>
          Solo aplica a páginas donde el usuario ya tiene permiso
          de ver (arriba). Sin permiso de edición, la página se
          muestra en modo solo lectura: puede consultar, pero no
          crear, modificar ni borrar registros.
        </Text>

        {Object.keys(
          nuevoUsuario.permisosEdicion ||
            ETIQUETAS_PERMISOS_EDICION
        ).map((permiso) => (
          <View
            key={permiso}
            style={[
              styles.permissionRow,
              !nuevoUsuario.permisos?.[permiso] && {
                opacity: 0.4,
              },
            ]}
          >
            <Text>
              {ETIQUETAS_PERMISOS_EDICION[permiso] || permiso}
            </Text>

            <Switch
              disabled={!nuevoUsuario.permisos?.[permiso]}
              value={Boolean(
                nuevoUsuario.permisosEdicion?.[permiso]
              )}
              onValueChange={(valor) =>
                setNuevoUsuario({
                  ...nuevoUsuario,
                  permisosEdicion: {
                    ...nuevoUsuario.permisosEdicion,
                    [permiso]: valor,
                  },
                })
              }
            />
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.secondaryButton,
          !formularioValido && { opacity: 0.5 },
        ]}
        disabled={!formularioValido}
        onPress={() =>
          editandoId
            ? actualizarUsuario()
            : crearUsuario()
        }
      >
        <Text style={styles.buttonText}>
          {editandoId
            ? "💾 Guardar Cambios"
            : "➕ Crear Usuario"}
        </Text>
      </TouchableOpacity>

      {editandoId && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={cancelarEdicion}
        >
          <Text style={styles.cancelButtonText}>
            Cancelar edición
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.sectionTitle}>
        Usuarios registrados ({usuarios.length})
      </Text>

      {usuarios.map((user) => (
        <View
          key={user.id}
          style={styles.userCard}
        >
          <View style={styles.userCardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>
                {user.nombre}
              </Text>

              <Text style={styles.userUsername}>
                @{user.usuario}
              </Text>
            </View>

            <View
              style={
                user.activo !== false
                  ? styles.statusBadgeActive
                  : styles.statusBadgeInactive
              }
            >
              <Text
                style={
                  user.activo !== false
                    ? styles.statusBadgeTextActive
                    : styles.statusBadgeTextInactive
                }
              >
                {user.activo !== false
                  ? "Activo"
                  : "Inactivo"}
              </Text>
            </View>
          </View>

          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>
              {user.rol || "Usuario"}
            </Text>
          </View>

          {user.email && (
            <Text style={styles.userMetaText}>
              ✉️ {user.email}
            </Text>
          )}

          {user.departamento && (
            <Text style={styles.userMetaText}>
              🏢 {user.departamento}
            </Text>
          )}

          <View style={styles.permissionsContainer}>
            {Object.keys(user.permisos || {})
              .filter((p) => user.permisos?.[p])
              .map((p) => (
                <View
                  key={p}
                  style={styles.permissionBadge}
                >
                  <Text style={styles.permissionText}>
                    {ETIQUETAS_PERMISOS[p] || p}
                  </Text>
                </View>
              ))}
          </View>

          {user.rol !== "Administrador" && (
            <View style={styles.permissionsContainer}>
              {Object.keys(user.permisosEdicion || {})
                .filter((p) => user.permisosEdicion?.[p])
                .map((p) => (
                  <View
                    key={`edicion-${p}`}
                    style={styles.permissionBadge}
                  >
                    <Text style={styles.permissionText}>
                      ✏️ {ETIQUETAS_PERMISOS_EDICION[p] || p}
                    </Text>
                  </View>
                ))}
            </View>
          )}

          <View style={styles.userActions}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => editarUsuario(user)}
            >
              <Text style={styles.editButtonText}>
                ✏️ Editar
              </Text>
            </TouchableOpacity>

            {user.usuario !== "admin" && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  eliminarUsuario(user.id)
                }
              >
                <Text style={styles.deleteButtonText}>
                  🗑 Eliminar
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}
