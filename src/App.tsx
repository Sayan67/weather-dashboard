import { useState, useEffect } from "react";
import WeatherCard, { AppWrapper } from "./components/WeatherCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Authentication/Auth";
import Header from "./components/layout/Header";

function App() {
  const [city, setCity] = useState(
    () => localStorage.getItem("city") || "London"
  );

  useEffect(() => {
    localStorage.setItem("city", city);
  }, [city]);

  return (
    <BrowserRouter>
      {/* <BackgroundImage>
        <img src={imageUrl} />
        </BackgroundImage> */}
      <Header />
      <AppWrapper>
        <Routes>
          <Route
            path="/"
            element={<WeatherCard city={city} setCity={setCity} />}
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
