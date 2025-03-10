import { create } from "zustand";
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8088", // Your Keycloak server URL
  realm: "DeepNote", // The realm in Keycloak
  clientId: "react-ui", // The client ID in Keycloak
});

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
};

type AuthStore = {
  keycloak: Keycloak;
  isAuthenticated: boolean;
  initAuth: () => Promise<void>;
  user: UserData | null;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => {
  const authStore: AuthStore = {
    keycloak,
    isAuthenticated: false,
    user: null,
    logout: () => {
      // Log the user out using Keycloak's logout method
      keycloak.logout({
        redirectUri: window.location.origin, // Optionally redirect to home page after logout
      });
      set({ isAuthenticated: false, user: null }); // Clear the state
    },

    initAuth: async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: "check-sso", // Check if the user is already logged in
          checkLoginIframe: false, // Disable iframe login check for now
        });

        if (!authenticated) {
          keycloak.login(); // Trigger login if not authenticated
        } else {
          set({ isAuthenticated: true });

          // Load the user info and log it
          const userInfo = await keycloak.loadUserInfo();
          console.log("User Info:", userInfo);

          // Map the user info to your UserData type
          const mappedUser: UserData = {
            firstName: userInfo["given_name"] || "",
            lastName: userInfo["familyName"] || "",
            email: userInfo["email"] || "",
          };
          set({ user: mappedUser });
        }
      } catch (error) {
        console.error("Keycloak initialization error:", error);
      }
    },
  };

  // Initialize the authentication state
  authStore.initAuth();

  return authStore;
});
