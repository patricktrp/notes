import { create } from "zustand";
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "notes",
  clientId: "react-ui",
});

type AuthStore = {
  keycloak: Keycloak;
  isAuthenticated: boolean;
};

export const useAuthStore = create<AuthStore>((set) => ({
  keycloak,
  isAuthenticated: false,
}));
