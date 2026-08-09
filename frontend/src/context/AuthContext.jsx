import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const DEMO_USERS = [
  {
    id: 1,
    username: "student",
    password: "student123",
    name: "Student User",
    role: "student",
  },
  {
    id: 2,
    username: "teacher",
    password: "teacher123",
    name: "Teacher User",
    role: "teacher",
  },
  {
    id: 3,
    username: "admin",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("lmsUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("lmsUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("lmsUser");
    }
  }, [user]);

  const login = (username, password) => {
    const matchingUser = DEMO_USERS.find(
      (demoUser) =>
        demoUser.username === username &&
        demoUser.password === password
    );

    if (!matchingUser) {
      return {
        success: false,
        message: "Invalid username or password.",
      };
    }

    const authenticatedUser = {
      id: matchingUser.id,
      username: matchingUser.username,
      name: matchingUser.name,
      role: matchingUser.role,
    };

    setUser(authenticatedUser);

    return {
      success: true,
      user: authenticatedUser,
    };
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: user !== null,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}