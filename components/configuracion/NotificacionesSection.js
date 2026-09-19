import React from "react";
import {
  View,
  Text,
  Switch,
} from "react-native";

export default function NotificacionesSection({
  config,
  actualizarCampo,
  styles,
}) {
  return (
    <View>
      <View style={styles.switchRow}>
        <Text>
          Notificar incidencias
        </Text>

        <Switch
          value={config.notiIncidencias}
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
          value={config.notiReclamaciones}
          onValueChange={(v) =>
            actualizarCampo(
              "notiReclamaciones",
              v
            )
          }
        />
      </View>

      <View style={styles.switchRow}>
        <Text>
          Notificar auditorías
        </Text>

        <Switch
          value={config.notiAuditorias}
          onValueChange={(v) =>
            actualizarCampo(
              "notiAuditorias",
              v
            )
          }
        />
      </View>
    </View>
  );
}