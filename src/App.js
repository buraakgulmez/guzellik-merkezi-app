import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
// import FooterItem from "./components/Footer/footer";
import HeaderItem from "./components/Header/header.component";
import SliderItem from "./components/Slider/sliderItem";
import AboutPage from "./components/About/AboutPage.component";
import ProductPage from "./components/Product/ProductPage.component";
import AppointmentForm from "./components/Randevu/randevuPage.component";
import CancelAppointmentForm from "./components/RandevuIptal/CancelAppointmentForm";
import AdminLogin from "./components/Panel/AdminPanel.component"; // Giriş bileşeni
import AdminPanel2 from "./components/Panel/AdminPanel2.component"; // Admin panel bileşeni

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    navigate("/admin/panel"); // Giriş sonrası admin paneline yönlendir
  };

  return (
    <>
      <HeaderItem />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SliderItem />
              <AboutPage />
              <ProductPage />
            </>
          }
        />
        <Route path="/randevu" element={<AppointmentForm />} />
        <Route path="/randevu" element={<CancelAppointmentForm />} />

        {/* Admin login sayfası */}
        <Route
          path="/admin"
          element={<AdminLogin onLoginSuccess={handleLoginSuccess} />}
        />
        {/* Admin panel sayfası */}
        <Route
          path="/admin/panel"
          element={
            isAdmin ? (
              <AdminPanel2 />
            ) : (
              <p>Yetkisiz erişim. Lütfen giriş yapın.</p>
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
