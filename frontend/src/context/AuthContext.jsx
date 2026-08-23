import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { API_BASE_URL } from "../config/api";

// Creates the authentication context used to share login
// information throughout the application.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Stores the currently logged-in user.
  // If a user was previously saved, restore them from localStorage
  // so they remain logged in after refreshing the page.
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("lmsUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Stores the authentication token returned by the Django API.
  // An existing token is restored when the application reloads.
  const [token, setToken] = useState(() => {
    return localStorage.getItem("lmsToken");
  });

  // Keeps the user stored in localStorage in sync with React state.
  // The stored user is removed when they log out.
  useEffect(() => {
    if (user) {
      localStorage.setItem("lmsUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("lmsUser");
    }
  }, [user]);

  // Keeps the authentication token stored in localStorage.
  // The token will be used to authenticate requests to protected API routes.
  useEffect(() => {
    if (token) {
      localStorage.setItem("lmsToken", token);
    } else {
      localStorage.removeItem("lmsToken");
    }
  }, [token]);

  // Sends the username and password to the Django login API.
  // If successful, Django returns an authentication token
  // and information about the logged-in user.
  const login = async (username, password) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      // Reject the login if Django does not return a successful response.
      if (!response.ok) {
        return {
          success: false,
          message: "Invalid username or password.",
        };
      }

      const data = await response.json();

      // Creates the user object used by the React frontend.
      // Django roles are uppercase, so they are converted to lowercase
      // to match the role names already used by the React routes.
      const authenticatedUser = {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        role: data.user.role.toLowerCase(),
      };

      // Save the authenticated user and their API token.
      setUser(authenticatedUser);
      setToken(data.token);

      return {
        success: true,
        user: authenticatedUser,
      };
    } catch {
      // Handles situations where the frontend cannot reach the Django server.
      return {
        success: false,
        message:
          "Unable to connect to the server. Please try again.",
      };
    }
  };

  // Clears authentication data when the user logs out.
const logout = async () => {
  try {
    if (token) {
      await fetch(
        `${API_BASE_URL}/api/logout/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
    }
  } finally {
    setUser(null);
    setToken(null);
  }
};

  // Makes authentication data and functions available
  // to components that use the AuthContext.
  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: Boolean(user && token),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook that allows components to access authentication data.
export function useAuth() {
  const context = useContext(AuthContext);

  // Prevents the hook from being used outside the AuthProvider.
  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}