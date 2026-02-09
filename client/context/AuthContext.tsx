import { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  register: (email: string, name: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("sazkino_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("sazkino_user");
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (
    email: string,
    name: string,
    password: string,
  ): Promise<void> => {
    // Simple registration - in production, you'd send this to a backend
    if (!email || !name || !password) {
      throw new Error("تهيه مايدىلار مەجبۇرى");
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
    };

    setUser(newUser);
    localStorage.setItem("sazkino_user", JSON.stringify(newUser));
  };

  const login = async (email: string, password: string): Promise<void> => {
    // Simple login - in production, you'd authenticate against a backend
    if (!email || !password) {
      throw new Error("ئىمايل ۋە پاسپۇرت مەجبۇرى");
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: email.split("@")[0],
    };

    setUser(newUser);
    localStorage.setItem("sazkino_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sazkino_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        isLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
