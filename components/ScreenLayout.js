import React from "react";
import Header from "./Header";
import { useAuth } from "../context/AuthContext";

export default function ScreenLayout({
  children,
}) {
  const { usuarioActual, logout } = useAuth();

  return (
    <>
      <Header
        usuario={
          usuarioActual?.nombre ||
          "admin"
        }
        cargo={
          usuarioActual?.rol ||
          "Administrador"
        }
        onLogout={logout}
      />

      {children}
    </>
  );
}