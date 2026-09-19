import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

export default function AdministracionSection({
  eliminarTodosLosDatos,
  guardar,
  styles,
}) {
  return (
    <View>

      <TouchableOpacity
        style={[
          styles.secondaryButton,
          {
            backgroundColor: "#dc2626",
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

    </View>
  );
}