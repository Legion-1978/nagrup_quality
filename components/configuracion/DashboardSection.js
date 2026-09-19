import React, { useState } from "react";

import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";

import { useAuth } from "../../context/AuthContext";
import { useQuality } from "../../context/QualityContext";
import { useLogistics } from "../../context/LogisticsContext";
import { useConfig } from "../../context/ConfigContext";
import { usuarioInicial } from "../../constants/usuarioInicial";
import { hashPassword } from "../../utils/security";
import ScreenLayout from "../../components/ScreenLayout";
import SistemaSection from "../../components/configuracion/SistemaSection";
import UsuariosSection from "../../components/configuracion/UsuariosSection";
import KPISection from "../../components/configuracion/KPISection";

import styles from "../../styles/configuracionStyles";

export default function ConfiguracionScreen() {
  const {
    usuarios = [],
    actualizarUsuarios,
  } = useAuth();

  const {
    configuracionDashboard = {},
    actualizarConfiguracion,
    eliminarDatosConfig,
  } = useConfig();

  const {
    eliminarDatosQuality,
  } = useQuality();

  const {
    eliminarDatosLogistics,
  } = useLogistics();

const eliminarTodosLosDatos = async () => {
  try {

    await Promise.all([
      eliminarDatosQuality(),
      eliminarDatosLogistics(),
      eliminarDatosConfig(),
    ]);

    if (
      typeof window !== "undefined"
    ) {
      window.alert(
        "✅ Todos los datos han sido eliminados correctamente"
      );
    } else {
      Alert.alert(
        "Datos eliminados",
        "✅ Todos los datos han sido eliminados correctamente"
      );
    }

  } catch (error) {

    console.error(error);

    if (
      typeof window !== "undefined"
    ) {
      window.alert(
        "❌ Error eliminando los datos"
      );
    } else {
      Alert.alert(
        "Error",
        "No se pudieron eliminar los datos"
      );
    }

  }
};

const [config, setConfig] = useState({
  // SISTEMA
  nombreAplicacion:
    configuracionDashboard?.nombreAplicacion ??
    "Nagrup Operational Excellence",

  versionSistema:
    configuracionDashboard?.versionSistema ??
    "1.0.0",

  empresa:
    configuracionDashboard?.empresa ??
    "Nagrup",

  cif:
    configuracionDashboard?.cif ?? "",

  direccion:
    configuracionDashboard?.direccion ?? "",

  ciudad:
    configuracionDashboard?.ciudad ?? "",

  pais:
    configuracionDashboard?.pais ?? "",

  telefono:
    configuracionDashboard?.telefono ?? "",

  email:
    configuracionDashboard?.email ?? "",

  web:
    configuracionDashboard?.web ?? "",

  responsableCalidad:
    configuracionDashboard?.responsableCalidad ?? "",

  directorGeneral:
    configuracionDashboard?.directorGeneral ?? "",

  normaPrincipal:
    configuracionDashboard?.normaPrincipal ??
    "ISO 9001:2015",

  // KPI
  objetivoOTIF:
    configuracionDashboard?.objetivoOTIF ?? 98,

  objetivoIncidencias:
    configuracionDashboard?.objetivoIncidencias ?? 90,

  objetivoReclamaciones:
    configuracionDashboard?.objetivoReclamaciones ?? 90,

  objetivoProveedores:
    configuracionDashboard?.objetivoProveedores ?? 90,

  objetivoAuditorias:
    configuracionDashboard?.objetivoAuditorias ?? 100,

  // DASHBOARD
  refrescoDashboard:
    configuracionDashboard?.refrescoDashboard ?? 5,

  mostrarActividad:
    configuracionDashboard?.mostrarActividad ?? true,

  mostrarAlertas:
    configuracionDashboard?.mostrarAlertas ?? true,

  // NOTIFICACIONES
  notiIncidencias:
    configuracionDashboard?.notiIncidencias ?? true,

  notiReclamaciones:
    configuracionDashboard?.notiReclamaciones ?? true,

  notiAuditorias:
    configuracionDashboard?.notiAuditorias ?? true,
});

  const [showSistema, setShowSistema] =
    useState(false);

  const [showObjetivos, setShowObjetivos] =
    useState(false);

  const [showDashboard, setShowDashboard] =
    useState(false);

  const [showUsuarios, setShowUsuarios] =
    useState(false);

  const [
    showNotificaciones,
    setShowNotificaciones,
  ] = useState(false);

  const [showAdmin, setShowAdmin] =
    useState(false);

  const [editandoId, setEditandoId] =
    useState(null);

  const [nuevoUsuario, setNuevoUsuario] =
    useState(usuarioInicial);

  const [confirmarPassword, setConfirmarPassword] =
    useState("");

const actualizarCampo = (campo, valor) => {
  setConfig((prev) => ({
    ...prev,
    [campo]: valor,
  }));
};

  const resetFormulario = () => {
    setEditandoId(null);
    setNuevoUsuario(usuarioInicial);
    setConfirmarPassword("");
  };

  const mostrarAviso = (mensaje) => {
    if (typeof window !== "undefined") {
      window.alert(mensaje);
    } else {
      Alert.alert("Usuario", mensaje);
    }
  };

  const guardarUsuarios = async (
    lista
  ) => {
    await actualizarUsuarios(lista);
  };

  const crearUsuario = async () => {
    const nombre = nuevoUsuario.nombre.trim();
    const usuario = nuevoUsuario.usuario.trim();
    const email = (nuevoUsuario.email || "").trim();
    const password = nuevoUsuario.password || "";

    if (!nombre || !usuario || !password) {
      mostrarAviso(
        "Complete nombre, usuario y contraseña"
      );
      return;
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(usuario)) {
      mostrarAviso(
        "El nombre de usuario solo puede contener letras, números, puntos, guiones y guiones bajos"
      );
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mostrarAviso(
        "El formato del correo electrónico no es válido"
      );
      return;
    }

    if (password.length < 6) {
      mostrarAviso(
        "La contraseña debe tener al menos 6 caracteres"
      );
      return;
    }

    if (password !== confirmarPassword) {
      mostrarAviso(
        "Las contraseñas no coinciden"
      );
      return;
    }

    const existe = usuarios.some(
      (u) =>
        u.usuario.toLowerCase() ===
        usuario.toLowerCase()
    );

    if (existe) {
      mostrarAviso(
        "Ya existe un usuario con ese nombre de acceso"
      );
      return;
    }

    const nuevaLista = [
      ...usuarios,
      {
        id: Date.now(),
        activo:
          nuevoUsuario.activo !== false,
        createdAt:
          new Date().toISOString(),
        ...nuevoUsuario,
        nombre,
        usuario,
        email,
        password: await hashPassword(
          password
        ),
      },
    ];

    await guardarUsuarios(
      nuevaLista
    );

    resetFormulario();

    mostrarAviso(
      "✅ Usuario creado correctamente"
    );
  };

  const actualizarUsuario =
    async () => {
      const nombre = nuevoUsuario.nombre.trim();
      const email = (nuevoUsuario.email || "").trim();
      const passwordNueva = nuevoUsuario.password || "";

      if (!nombre) {
        mostrarAviso(
          "El nombre no puede estar vacío"
        );
        return;
      }

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        mostrarAviso(
          "El formato del correo electrónico no es válido"
        );
        return;
      }

      // Si el campo de contraseña se deja en blanco al editar,
      // se conserva la contraseña actual del usuario.
      const usuarioActualLista = usuarios.find(
        (u) => u.id === editandoId
      );

      let passwordFinal =
        usuarioActualLista?.password || "";

      if (passwordNueva.trim().length > 0) {
        if (passwordNueva.length < 6) {
          mostrarAviso(
            "La nueva contraseña debe tener al menos 6 caracteres"
          );
          return;
        }

        if (passwordNueva !== confirmarPassword) {
          mostrarAviso(
            "Las contraseñas no coinciden"
          );
          return;
        }

        passwordFinal = await hashPassword(
          passwordNueva
        );
      }

      const nuevaLista =
        usuarios.map((u) =>
          u.id === editandoId
            ? {
                ...u,
                ...nuevoUsuario,
                nombre,
                email,
                password: passwordFinal,
                updatedAt:
                  new Date().toISOString(),
              }
            : u
        );

      await guardarUsuarios(
        nuevaLista
      );

      resetFormulario();

      mostrarAviso(
        "✅ Usuario actualizado"
      );
    };

  const editarUsuario = (user) => {
    setEditandoId(user.id);

    setNuevoUsuario({
      nombre: user.nombre || "",
      usuario: user.usuario || "",
      email: user.email || "",
      departamento: user.departamento || "",
      password: "",
      activo: user.activo !== false,
      rol: user.rol || "Usuario",

      permisos: {
        ...usuarioInicial.permisos,
        ...user.permisos,
      },

      permisosEdicion: {
        ...usuarioInicial.permisosEdicion,
        ...user.permisosEdicion,
      },
    });

    setConfirmarPassword("");
  };

  const eliminarUsuario =
    async (id) => {
      const usuario = usuarios.find(
        (u) => u.id === id
      );

      if (
        usuario?.usuario === "admin"
      ) {
        if (
          typeof window !==
          "undefined"
        ) {
          window.alert(
            "El usuario admin no puede eliminarse"
          );
        } else {
          Alert.alert(
            "Información",
            "El usuario admin no puede eliminarse"
          );
        }

        return;
      }

      if (
        typeof window !== "undefined"
      ) {
        const confirmar =
          window.confirm(
            `¿Eliminar ${usuario.nombre}?`
          );

        if (!confirmar) return;

        const nuevaLista =
          usuarios.filter(
            (u) => u.id !== id
          );

        await guardarUsuarios(
          nuevaLista
        );

        return;
      }

      Alert.alert(
        "Eliminar usuario",
        `¿Eliminar ${usuario.nombre}?`,
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: async () => {
              const nuevaLista =
                usuarios.filter(
                  (u) => u.id !== id
                );

              await guardarUsuarios(
                nuevaLista
              );
            },
          },
        ]
      );
    };

  const guardar = async () => {
    try {
      await actualizarConfiguracion(
        config
      );

      if (
        typeof window !==
        "undefined"
      ) {
        window.alert(
          "✅ Configuración guardada correctamente"
        );
      } else {
        Alert.alert(
          "Configuración",
          "✅ Configuración guardada correctamente"
        );
      }
    } catch (error) {
      console.error(error);

      if (
        typeof window !==
        "undefined"
      ) {
        window.alert(
          "❌ Error guardando configuración"
        );
      } else {
        Alert.alert(
          "Error",
          "No se pudo guardar la configuración"
        );
      }
    }
  };

return (
  <ScreenLayout>
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        ⚙️ Configuración
      </Text>

      <Text style={styles.subtitle}>
        Administración del sistema y permisos
      </Text>

      <SistemaSection
      showSistema={showSistema}
      setShowSistema={setShowSistema}
      config={config}
      actualizarCampo={actualizarCampo}
      styles={styles}
      />

      <KPISection
        showObjetivos={showObjetivos}
        setShowObjetivos={setShowObjetivos}
        config={config}
        actualizarCampo={actualizarCampo}
        styles={styles}
      />

      {/* USUARIOS */}

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() =>
            setShowUsuarios(!showUsuarios)
          }
        >
          <Text style={styles.section}>
            👥 Usuarios
          </Text>

          <Text style={styles.arrow}>
            {showUsuarios ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {showUsuarios && (
          <UsuariosSection
            usuarios={usuarios}
            nuevoUsuario={nuevoUsuario}
            setNuevoUsuario={setNuevoUsuario}
            confirmarPassword={confirmarPassword}
            setConfirmarPassword={setConfirmarPassword}
            editandoId={editandoId}
            crearUsuario={crearUsuario}
            actualizarUsuario={actualizarUsuario}
            editarUsuario={editarUsuario}
            eliminarUsuario={eliminarUsuario}
            cancelarEdicion={resetFormulario}
            styles={styles}
          />
        )}
      </View>

      {/* DASHBOARD */}

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() =>
            setShowDashboard(!showDashboard)
          }
        >
          <Text style={styles.section}>
            📊 Dashboard
          </Text>

          <Text style={styles.arrow}>
            {showDashboard ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {showDashboard && (
          <>
            <Text style={styles.label}>
              Refresco Dashboard
            </Text>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(
                config.refrescoDashboard
              )}
              onChangeText={(v) =>
                actualizarCampo(
                  "refrescoDashboard",
                  Number(v)
                )
              }
            />

            <View style={styles.switchRow}>
              <Text>
                Mostrar actividad
              </Text>

              <Switch
                value={
                  config.mostrarActividad
                }
                onValueChange={(v) =>
                  actualizarCampo(
                    "mostrarActividad",
                    v
                  )
                }
              />
            </View>

            <View style={styles.switchRow}>
              <Text>
                Mostrar alertas
              </Text>

              <Switch
                value={
                  config.mostrarAlertas
                }
                onValueChange={(v) =>
                  actualizarCampo(
                    "mostrarAlertas",
                    v
                  )
                }
              />
            </View>
          </>
        )}
      </View>

      {/* NOTIFICACIONES */}

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() =>
            setShowNotificaciones(
              !showNotificaciones
            )
          }
        >
          <Text style={styles.section}>
            🔔 Notificaciones
          </Text>

          <Text style={styles.arrow}>
            {showNotificaciones
              ? "▲"
              : "▼"}
          </Text>
        </TouchableOpacity>

        {showNotificaciones && (
          <>
            <View style={styles.switchRow}>
              <Text>
                Notificar incidencias
              </Text>

              <Switch
                value={
                  config.notiIncidencias
                }
                onValueChange={(v) =>
                  actualizarCampo(
                    "notiIncidencias",
                    v
                  )
                }
              />
            </View>

            <View style={styles.switchRow}>
              <Text>
                Notificar reclamaciones
              </Text>

              <Switch
                value={
                  config.notiReclamaciones
                }
                onValueChange={(v) =>
                  actualizarCampo(
                    "notiReclamaciones",
                    v
                  )
                }
              />
            </View>
          </>
        )}
      </View>

      {/* ADMINISTRACIÓN */}

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() =>
            setShowAdmin(!showAdmin)
          }
        >
          <Text style={styles.section}>
            💾 Administración
          </Text>

          <Text style={styles.arrow}>
            {showAdmin ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {showAdmin && (
          <>
            <TouchableOpacity
              style={[
                styles.secondaryButton,
                {
                  backgroundColor:
                    "#dc2626",
                },
              ]}
              onPress={eliminarTodosLosDatos}
            >
              <Text style={styles.buttonText}>
                🗑 Eliminar Todos los Datos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={guardar}
            >
              <Text style={styles.buttonText}>
                💾 Guardar Configuración
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={{ height: 60 }} />
    </ScrollView>
  </ScreenLayout>
);
}
