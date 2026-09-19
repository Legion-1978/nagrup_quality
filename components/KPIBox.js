import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function KPIBox({
  title,
  value,
  detail,
  icon,
  color = "#2563eb",
  style,
}) {
  return (
<View
  style={[
    styles.card,
    {
      borderTopColor: color,
    },
    style,
  ]}
>
      <View style={styles.header}>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text
          style={[
            styles.icon,
            { color },
          ]}
        >
          {icon}
        </Text>
      </View>

      <Text
        style={[
          styles.value,
          { color },
        ]}
        numberOfLines={1}
      >
        {value}
      </Text>

      {detail ? (
        <Text
          style={styles.detail}
          numberOfLines={2}
        >
          {detail}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
card: {
  minWidth: 0,

  minHeight: 110,

  backgroundColor: "#ffffff",

  borderTopWidth: 4,

  borderRadius: 14,

  paddingHorizontal: 14,

  paddingVertical: 12,

  shadowColor: "#000",

  shadowOpacity: 0.04,

  shadowRadius: 5,

  shadowOffset: {
    width: 0,
    height: 2,
  },

  elevation: 2,

  overflow: "hidden",
},

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-start",

    marginBottom: 8,
  },

  icon: {
    fontSize: 18,

    fontWeight: "700",
  },

  title: {
    flex: 1,

    fontSize: 10,

    fontWeight: "700",

    color: "#64748b",

    textTransform: "uppercase",

    letterSpacing: 0.8,

    marginRight: 8,
  },

  value: {
    fontSize: 24,

    fontWeight: "800",

    marginBottom: 4,
  },

detail: {
  fontSize: 11,

  color: "#64748b",

  lineHeight: 15,

  marginTop: 2,
},
});