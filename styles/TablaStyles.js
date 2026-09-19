import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16163b",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  headerCell: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 12,
    paddingHorizontal: 6,
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
  },

  cell: {
    textAlign: "center",
    fontSize: 12,
    color: "#1e293b",
    paddingHorizontal: 6,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  actionButton: {
    minWidth: 60,
    minHeight: 50,
    borderRadius: 8,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },

  actionLabel: {
    fontSize: 9,
    color: "#475569",
    marginTop: 2,
  },
});