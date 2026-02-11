"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { prefs } from "@/src/app/types/prefs";


type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);



export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  // Load initial theme from /api/prefs
  useEffect(() => {
    async function fetchPrefs() {
      const res = await fetch("/api/prefs");
      const data: prefs = await res.json();
      setThemeState(data.theme as "dark" | "light");

      // Apply dark/light class immediately
      document.documentElement.classList.toggle("dark", data.theme === "dark");
    }
    fetchPrefs();
  }, []);

  // Update theme both in state and API
  const setTheme = async (newTheme: "light" | "dark") => {
    setThemeState(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");

    // Update prefs.json via API
    await fetch("/api/prefs", {
      method: "POST",
      body: JSON.stringify({ theme: newTheme }),
    });
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}




// // Custom hook for using context
// export function useTheme() {
//   const context = useContext(ThemeContext);
//   if (!context) throw new Error("useTheme must be used within ThemeProvider");
//   return context;
// }
