import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    padding: 16,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#16163b",
    marginBottom: 5,
  },

  subtitle: {
    color: "#64748b",
    marginBottom: 20,
    fontSize: 14,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 4,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  section: {
    fontSize: 20,
    fontWeight: "700",
    color: "#16163b",
  },

  arrow: {
    fontSize: 18,
    color: "#64748b",
    fontWeight: "700",
  },

  label: {
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 10,
    color: "#334155",
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },

  infoText: {
    color: "#475569",
    marginTop: 4,
    marginBottom: 8,
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },

  button: {
    backgroundColor: "#16a34a",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  secondaryButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16163b",
    marginTop: 15,
    marginBottom: 10,
  },

  permissionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 10,
  },

  userCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 15,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },

  userUsername: {
    color: "#64748b",
    marginBottom: 10,
  },

  permissionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },

  permissionBadge: {
    backgroundColor: "#dbeafe",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 6,
  },

  permissionText: {
    color: "#1d4ed8",
    fontSize: 12,
    fontWeight: "600",
  },

  userActions: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },

  editButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  editButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  deleteButton: {
    backgroundColor: "#dc2626",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  fieldGroup: {
    marginBottom: 4,
  },

  fieldLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748b",
    marginBottom: 6,
    marginTop: 8,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },

  helperText: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: -10,
    marginBottom: 12,
  },

  errorText: {
    fontSize: 12,
    color: "#dc2626",
    marginTop: -10,
    marginBottom: 12,
    fontWeight: "600",
  },

  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
  },

  showPasswordButton: {
    position: "absolute",
    right: 12,
    top: 14,
  },

  showPasswordText: {
    fontSize: 12,
    color: "#2563eb",
    fontWeight: "700",
  },

  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 15,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
  },

  chipActive: {
    backgroundColor: "#2563eb",
  },

  chipText: {
    color: "#334155",
    fontWeight: "600",
    fontSize: 13,
  },

  chipTextActive: {
    color: "#fff",
  },

  permissionsCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  permissionsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  linkButton: {
    fontSize: 12,
    color: "#2563eb",
    fontWeight: "700",
  },

  userCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  roleBadge: {
    backgroundColor: "#ede9fe",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 6,
  },

  roleBadgeText: {
    color: "#6d28d9",
    fontSize: 11,
    fontWeight: "700",
  },

  statusBadgeActive: {
    backgroundColor: "#dcfce7",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  statusBadgeInactive: {
    backgroundColor: "#fee2e2",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  statusBadgeTextActive: {
    color: "#16a34a",
    fontSize: 11,
    fontWeight: "700",
  },

  statusBadgeTextInactive: {
    color: "#dc2626",
    fontSize: 11,
    fontWeight: "700",
  },

  userMetaText: {
    color: "#64748b",
    fontSize: 12,
    marginBottom: 2,
  },

  cancelButton: {
    backgroundColor: "#e2e8f0",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  cancelButtonText: {
    color: "#334155",
    fontWeight: "700",
    fontSize: 15,
  },
});

export default styles;