import { createContext, useContext, useState, useEffect } from "react";

export interface Admin {
  id: string;
  username: string;
  email: string;
}

interface AdminContextType {
  admin: Admin | null;
  isAdminLoggedIn: boolean;
  isLoading: boolean;
  adminLogin: (username: string, password: string) => Promise<void>;
  adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Default admin credentials (in production, validate against backend)
const DEFAULT_ADMIN = {
  username: "admin",
  password: "admin@2024", // Change this in production
};

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load admin from localStorage on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem("sazkino_admin");
    if (savedAdmin) {
      try {
        setAdmin(JSON.parse(savedAdmin));
      } catch {
        localStorage.removeItem("sazkino_admin");
      }
    }
    setIsLoading(false);
  }, []);

  const adminLogin = async (
    username: string,
    password: string
  ): Promise<void> => {
    // Validate credentials
    if (
      username !== DEFAULT_ADMIN.username ||
      password !== DEFAULT_ADMIN.password
    ) {
      throw new Error("نۇستا ياكى پاسپۇرت خاتا");
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newAdmin: Admin = {
      id: "1",
      username: DEFAULT_ADMIN.username,
      email: "admin@sazkino.com",
    };

    setAdmin(newAdmin);
    localStorage.setItem("sazkino_admin", JSON.stringify(newAdmin));
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem("sazkino_admin");
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        isAdminLoggedIn: admin !== null,
        isLoading,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
