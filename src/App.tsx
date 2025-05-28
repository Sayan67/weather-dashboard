import { useState, useEffect } from "react";
import WeatherCard, { AppWrapper } from "./components/WeatherCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Authentication/Auth";
import Header from "./components/layout/Header";
import { AuthProvider } from "./components/Providers/AuthProvider";
import History from "./components/History";
import { ProtectedRoute } from "./components/Authentication/ProtectedRoute";
import { PublicRoute } from "./components/Authentication/PublicRoute";

function App() {
  const [city, setCity] = useState(
    () => localStorage.getItem("city") || "London"
  );

  useEffect(() => {
    localStorage.setItem("city", city);
  }, [city]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <AppWrapper>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/history" element={<History />}></Route>
            </Route>
            
            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <Auth />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={<WeatherCard city={city} setCity={setCity} />}
            />
          </Routes>
        </AppWrapper>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
