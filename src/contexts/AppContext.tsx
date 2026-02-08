import React, { createContext, useContext, useState, ReactNode } from "react";

export interface UserProfile {
  name: string;
  age: string;
  gender: string;
  state: string;
  district: string;
  annualIncome: string;
  occupation: string;
  category: string;
}

interface AppContextType {
  language: string;
  setLanguage: (lang: string) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  isGuest: boolean;
  setIsGuest: (guest: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("en");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  return (
    <AppContext.Provider
      value={{ language, setLanguage, userProfile, setUserProfile, isGuest, setIsGuest }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
