import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking session
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const signIn = async (email: string, pass: string) => {
    // In real app, call API
    setIsLoading(true);
    setTimeout(() => {
      setUser({ id: '1', email });
      setIsLoading(false);
    }, 1000);
  };

  const signUp = async (email: string, pass: string) => {
    // In real app, call API
    setIsLoading(true);
    setTimeout(() => {
      setUser({ id: '2', email });
      setIsLoading(false);
    }, 1000);
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
