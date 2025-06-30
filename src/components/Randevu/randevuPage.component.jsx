import React, { useState, useEffect } from "react";
import CancelAppointmentForm from "../RandevuIptal/CancelAppointmentForm";
import "./randevuPage.component.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

function addMinutesToTime(timeStr, minutes) {
  const [hour, minute] = timeStr.split(":" ).map(Number);
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute + minutes);
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

function generateTimeSlots(start = "09:00", end = "19:00", step = 30) {
  const slots = [];
  let current = start;
  while (current < end) {
    slots.push(current);
    current = addMinutesToTime(current, step);
  }
  return slots;
}

const AppointmentForm = () => {
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then(setServices)
      .catch(console.error);
  }, []);

  useEffect(() => {
    async function fetchAppointments() {
      if (!formData.date) {
        setAppointments([]);
        return;
      }
      try {
        const q = query(
          collection(db, "randevular"),
          where("date", "==", formData.date)
        );
        const snapshot = await getDocs(q);
        const apps = snapshot.docs.map((doc) => doc.data());
        setAppointments(apps);
      } catch (err) {
        console.error("Firestore randevu çekme hatası:", err);
      }
    }
    fetchAppointments();
  }, [formData.date]);

  const timeSlots = generateTimeSlots();
  const blockedTimes = new Set();
  appointments.forEach((app) => {
    const serviceItem = services.find((s) => s.title === app.service);
    const duration = serviceItem?.duration || 60;
    let blockTime = app.time;
    const slotCount = Math.ceil(duration / 30);
    for (let i = 0; i < slotCount; i++) {
      blockedTimes.add(blockTime);
      blockTime = addMinutesToTime(blockTime, 30);
    }
  });

  const timeOptions = timeSlots.map((time, i) => {
    const isBlocked = blockedTimes.has(time);
    return (
      <option key={i} value={time} disabled={isBlocked}>
        {time} {isBlocked ? " - DOLU" : ""}
      </option>
    );
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/randevu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Randevunuz başarıyla alındı.");
        setFormData({
          service: "",
          date: "",
          time: "",
          name: "",
          phone: "",
          email: "",
        });
      } else {
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch (err) {
      console.error("Hata:", err);
      alert("Sunucuya ulaşılamadı.");
    }
  };

  return (
    <div className="appointment-page">
      <div className="appointment-wrapper">
        <form onSubmit={handleSubmit} className="appointment-form">
          <h2 className="appointment-title">Randevu Al</h2>

          <label className="form-label">Hizmet:</label>
          <select
            name="service"
            onChange={handleChange}
            value={formData.service}
            className="form-select"
            required
          >
            <option value="">-- Hizmet Seçin --</option>
            {services.map((s, i) => (
              <option key={i} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>

          <label className="form-label">Tarih:</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={formData.date}
            className="form-input"
            required
          />

          <label className="form-label">Saat:</label>
          <select
            name="time"
            onChange={handleChange}
            value={formData.time}
            className="form-select time-select"
            required
            disabled={!formData.service || !formData.date}
          >
            <option value="">-- Saat Seçin --</option>
            {timeOptions}
          </select>

          <label className="form-label">Ad Soyad:</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            className="form-input"
            placeholder="Adınız ve soyadınızı girin"
            required
          />

          <label className="form-label">E-posta:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email || ""}
            className="form-input"
            placeholder="ornek@email.com"
          />

          <label className="form-label">Telefon:</label>
          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            className="form-input"
            placeholder="05XX XXX XX XX"
            required
          />

          <button type="submit" className="submit-button">
            Randevu Al
          </button>
        </form>

        <div className="cancel-form-container">
          <CancelAppointmentForm />
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
