import React, { createContext, useContext, useState } from "react";

type Unit = "metric" | "imperial";

interface WeatherContextType {
  unit: Unit;
  toggleUnit: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [unit, setUnit] = useState<Unit>(
    () => (localStorage.getItem("unit") as Unit) || "metric"
  );

  const toggleUnit = () => {
    setUnit((prev) => {
      const next = prev === "metric" ? "imperial" : "metric";
      localStorage.setItem("unit", next);
      return next;
    });
  };

  return (
    <WeatherContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context)
    throw new Error("useWeatherContext must be used within WeatherProvider");
  return context;
};
