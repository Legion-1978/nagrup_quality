import React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function SistemaSection({
  showSistema,
  setShowSistema,
  config,
  actualizarCampo,
  styles,
}) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() =>
          setShowSistema(!showSistema)
        }
      >
        <Text style={styles.section}>
          ⚙️ Sistema
        </Text>

        <Text style={styles.arrow}>
          {showSistema ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>

      {showSistema && (
        <>
          <Text style={styles.label}>
            Aplicación
          </Text>

          <TextInput
            style={styles.input}
            value={config.nombreAplicacion}
            onChangeText={(v) =>
              actualizarCampo(
                "nombreAplicacion",
                v
              )
            }
          />

          <Text style={styles.label}>
            Versión
          </Text>

          <TextInput
            style={styles.input}
            value={config.versionSistema}
            onChangeText={(v) =>
              actualizarCampo(
                "versionSistema",
                v
              )
            }
          />

          <Text style={styles.label}>
            Empresa
          </Text>

          <TextInput
            style={styles.input}
            value={config.empresa}
            onChangeText={(v) =>
              actualizarCampo(
                "empresa",
                v
              )
            }
          />

          <Text style={styles.label}>
            CIF
          </Text>

          <TextInput
            style={styles.input}
            value={config.cif}
            onChangeText={(v) =>
              actualizarCampo(
                "cif",
                v
              )
            }
          />

          <Text style={styles.label}>
            Dirección
          </Text>

          <TextInput
            style={styles.input}
            value={config.direccion}
            onChangeText={(v) =>
              actualizarCampo(
                "direccion",
                v
              )
            }
          />

          <Text style={styles.label}>
            Ciudad
          </Text>

          <TextInput
            style={styles.input}
            value={config.ciudad}
            onChangeText={(v) =>
              actualizarCampo(
                "ciudad",
                v
              )
            }
          />

          <Text style={styles.label}>
            País
          </Text>

          <TextInput
            style={styles.input}
            value={config.pais}
            onChangeText={(v) =>
              actualizarCampo(
                "pais",
                v
              )
            }
          />

          <Text style={styles.label}>
            Teléfono
          </Text>

          <TextInput
            style={styles.input}
            value={config.telefono}
            onChangeText={(v) =>
              actualizarCampo(
                "telefono",
                v
              )
            }
          />

          <Text style={styles.label}>
            Correo electrónico
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={config.email}
            onChangeText={(v) =>
              actualizarCampo(
                "email",
                v
              )
            }
          />

          <Text style={styles.label}>
            Página web
          </Text>

          <TextInput
            style={styles.input}
            value={config.web}
            onChangeText={(v) =>
              actualizarCampo(
                "web",
                v
              )
            }
          />

          <Text style={styles.label}>
            Responsable de Calidad
          </Text>

          <TextInput
            style={styles.input}
            value={
              config.responsableCalidad
            }
            onChangeText={(v) =>
              actualizarCampo(
                "responsableCalidad",
                v
              )
            }
          />

          <Text style={styles.label}>
            Director General
          </Text>

          <TextInput
            style={styles.input}
            value={
              config.directorGeneral
            }
            onChangeText={(v) =>
              actualizarCampo(
                "directorGeneral",
                v
              )
            }
          />

          <Text style={styles.label}>
            Norma Principal
          </Text>

          <TextInput
            style={styles.input}
            value={
              config.normaPrincipal
            }
            onChangeText={(v) =>
              actualizarCampo(
                "normaPrincipal",
                v
              )
            }
          />
        </>
      )}
    </View>
  );
}
