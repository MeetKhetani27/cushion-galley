import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  addresses: Address[];
};

type Address = {
  id: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  pinCode: string;
  isDefault: boolean;
};

type AuthCtx = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
};

const Ctx = createContext<AuthCtx | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = read<User | null>("tcg_user", null);
    setUser(savedUser);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) {
        window.localStorage.setItem("tcg_user", JSON.stringify(user));
      } else {
        window.localStorage.removeItem("tcg_user");
      }
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call - replace with real authentication
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Demo: accept any email/password for testing
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name: email.split("@")[0],
      addresses: [],
    };
    
    setUser(mockUser);
    setIsLoading(false);
    return true;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call - replace with real registration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      addresses: [],
    };
    
    setUser(mockUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const addAddress = (address: Omit<Address, "id">) => {
    if (user) {
      const newAddress: Address = {
        ...address,
        id: Date.now().toString(),
      };
      
      // If this is the first address or marked as default, make it default
      const updatedAddresses = address.isDefault || user.addresses.length === 0
        ? user.addresses.map((a) => ({ ...a, isDefault: false })).concat(newAddress)
        : user.addresses.concat(newAddress);
      
      setUser({ ...user, addresses: updatedAddresses });
    }
  };

  const removeAddress = (id: string) => {
    if (user) {
      const updatedAddresses = user.addresses.filter((a) => a.id !== id);
      setUser({ ...user, addresses: updatedAddresses });
    }
  };

  const setDefaultAddress = (id: string) => {
    if (user) {
      const updatedAddresses = user.addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }));
      setUser({ ...user, addresses: updatedAddresses });
    }
  };

  return (
    <Ctx.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        addAddress,
        removeAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
