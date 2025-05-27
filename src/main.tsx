import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { WeatherProvider } from "./context/WeatherProvider.tsx";
import { Toaster } from "react-hot-toast";
import Header from "./components/layout/Header.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WeatherProvider>
      <App />
      <Toaster />
    </WeatherProvider>
  </StrictMode>
);
