import { create } from "zustand";
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8088",
  realm: "DeepNote",
  clientId: "react-ui",
});

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
};

type AuthStore = {
  keycloak: Keycloak;
  isAuthenticated: boolean;
  token: string | null;
  user: UserData | null;
  initAuth: () => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => {
  const authStore: AuthStore = {
    keycloak,
    isAuthenticated: false,
    token: null,
    user: null,

    logout: () => {
      keycloak.logout({
        redirectUri: window.location.origin,
      });
      set({ isAuthenticated: false, user: null, token: null });
    },

    initAuth: async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: "check-sso",
          checkLoginIframe: false,
        });

        if (!authenticated) {
          keycloak.login();
        } else {
          set({ isAuthenticated: true, token: keycloak.token || null });

          const userInfo = await keycloak.loadUserInfo();
          console.log("User Info:", userInfo);

          const mappedUser: UserData = {
            firstName: userInfo["given_name"] || "",
            lastName: userInfo["family_name"] || "",
            email: userInfo["email"] || "",
          };

          set({ user: mappedUser });

          // Start automatic token refreshing
          setInterval(authStore.refreshToken, 60 * 1000); // Refresh every 60 seconds
        }
      } catch (error) {
        console.error("Keycloak initialization error:", error);
      }
    },

    refreshToken: async () => {
      if (!keycloak.token) return;
      try {
        await keycloak.updateToken(30); // Refresh token if it's older than 30 seconds
        set({ token: keycloak.token });
      } catch (error) {
        console.error("Token refresh failed", error);
        authStore.logout(); // Force logout on failure
      }
    },
  };

  authStore.initAuth();

  return authStore;
});
