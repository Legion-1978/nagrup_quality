import { StyleSheet } from "react-native";

export default StyleSheet.create({

  commentBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(15,23,42,0.65)",
  justifyContent: "center",
  alignItems: "center",
},

  modalContent: {
    width: "96%",
    maxHeight: "92%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#16163b",
    marginBottom: 10,
  },

  detailSection: {
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: 12,
  },

  detailLine: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 10,
    color: "#334155",
  },

  detailValue: {
    fontSize: 14,
    color: "#475569",
    marginTop: 4,
  },

  commentCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },

  commentHeader: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748b",
    marginBottom: 4,
  },

  modalActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },

  modalActionButton: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#eff6ff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  modalActionText: {
    fontWeight: "700",
    color: "#1e293b",
  },

  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

headerCard: {
  backgroundColor: "#f8fafc",
  borderRadius: 16,
  padding: 18,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: "#e2e8f0",
},

headerSubtitle: {
  fontSize: 15,
  color: "#64748b",
  marginTop: 4,
  marginBottom: 12,
},

badgeContainer: {
  flexDirection: "row",
  gap: 8,
},

estadoBadge: {
  backgroundColor: "#dbeafe",
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 20,
},

gravedadBadge: {
  backgroundColor: "#fef3c7",
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 20,
},

badgeText: {
  fontSize: 12,
  fontWeight: "700",
  color: "#1e293b",
},

infoCard: {
  backgroundColor: "#ffffff",
  borderRadius: 12,
  padding: 14,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: "#e2e8f0",
},

infoLabel: {
  fontSize: 12,
  textTransform: "uppercase",
  color: "#64748b",
  fontWeight: "700",
  marginBottom: 4,
},

infoValue: {
  fontSize: 15,
  color: "#0f172a",
  fontWeight: "600",
},

sectionCard: {
  backgroundColor: "#f8fafc",
  borderRadius: 12,
  padding: 14,
  marginBottom: 16,
  borderLeftWidth: 4,
  borderLeftColor: "#2563eb",
},

sectionText: {
  fontSize: 14,
  lineHeight: 22,
  color: "#334155",
},

emptyStateCard: {
  backgroundColor: "#f8fafc",
  borderRadius: 12,
  padding: 16,
  alignItems: "center",
  marginBottom: 12,
},

commentAuthor: {
  fontSize: 14,
  fontWeight: "700",
  color: "#0f172a",
  marginBottom: 4,
},

commentDate: {
  fontSize: 11,
  color: "#64748b",
  marginTop: 6,
},

commentsTitle: {
  fontSize: 17,
  fontWeight: "700",
  color: "#2563eb",
  marginTop: 20,
  marginBottom: 12,
},

buttonRow: {
  flexDirection: "row",
  gap: 10,
  marginTop: 20,
  marginBottom: 10,
},

primaryButton: {
  backgroundColor: "#2563eb",
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center",
  marginBottom: 15,
},

editButton: {
  flex: 1,
  backgroundColor: "#2563eb",
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center",
},

closeButton: {
  flex: 1,
  backgroundColor: "#ef4444",
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center",
  marginTop: 0,
},

primaryButtonText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 14,
},

evidenciaCard: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent:
    "space-between",

  backgroundColor: "#fff",

  borderWidth: 1,
  borderColor: "#e2e8f0",

  borderRadius: 12,

  padding: 12,

  marginBottom: 10,
},

secondaryButton: {
  flexDirection: "row",

  alignItems: "center",

  justifyContent: "center",

  backgroundColor: "#2563eb",

  borderRadius: 10,

  paddingVertical: 12,

  paddingHorizontal: 16,

  marginVertical: 12,
},

deleteButton: {
  padding: 6,
},

});