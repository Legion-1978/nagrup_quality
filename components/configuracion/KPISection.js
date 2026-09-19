import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function KPISection({
  showObjetivos,
  setShowObjetivos,
  config,
  actualizarCampo,
  styles,
}) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() =>
          setShowObjetivos(!showObjetivos)
        }
      >
        <Text style={styles.section}>
          🎯 Objetivos KPI
        </Text>

        <Text style={styles.arrow}>
          {showObjetivos ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>

      {showObjetivos && (
        <>
          <Text style={styles.label}>
            Objetivo OTIF (%)
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(config.objetivoOTIF)}
            onChangeText={(v) =>
              actualizarCampo(
                "objetivoOTIF",
                Number(v)
              )
            }
          />

          <Text style={styles.label}>
            Objetivo Incidencias
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(
              config.objetivoIncidencias
            )}
            onChangeText={(v) =>
              actualizarCampo(
                "objetivoIncidencias",
                Number(v)
              )
            }
          />

          <Text style={styles.label}>
            Objetivo Reclamaciones
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(
              config.objetivoReclamaciones
            )}
            onChangeText={(v) =>
              actualizarCampo(
                "objetivoReclamaciones",
                Number(v)
              )
            }
          />

          <Text style={styles.label}>
            Objetivo Proveedores
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(
              config.objetivoProveedores
            )}
            onChangeText={(v) =>
              actualizarCampo(
                "objetivoProveedores",
                Number(v)
              )
            }
          />

          <Text style={styles.label}>
            Objetivo Auditorías
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(
              config.objetivoAuditorias
            )}
            onChangeText={(v) =>
              actualizarCampo(
                "objetivoAuditorias",
                Number(v)
              )
            }
          />
        </>
      )}
    </View>
  );
}