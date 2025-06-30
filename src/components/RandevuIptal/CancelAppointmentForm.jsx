import React, { useState } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./CancelAppointmentForm.component.css";

const CancelAppointmentForm = () => {
  const [email, setEmail] = useState("");
  const [randevular, setRandevular] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("");

  // E-postaya göre randevuları getir
  const handleSearch = async () => {
    setMessage("");
    setRandevular([]);
    if (!email) {
      setMessage("Lütfen e-posta adresinizi girin.");
      return;
    }

    setLoading(true);
    try {
      const q = query(
        collection(db, "randevular"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setMessage("Bu e-posta ile kayıtlı randevu bulunamadı.");
      } else {
        const fetched = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRandevular(fetched);
      }
    } catch (error) {
      console.error(error);
      setMessage("Randevular getirilirken hata oluştu.");
    }
    setLoading(false);
  };

  // Randevu iptali
  const handleCancel = async (randevu) => {
    setMessage("");
    try {
      const response = await fetch(
        `http://localhost:5000/randevu/${randevu.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: randevu.name,
            email: randevu.email,
            date: randevu.date,
            time: randevu.time,
            service: randevu.service,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "İptal başarısız.");
      }

      setRandevular((prev) => prev.filter((r) => r.id !== randevu.id));
      setMessage("Randevu başarıyla iptal edildi.");
      setMessageType("success");
      setEmail(""); // Gerekirse e-posta temizlenebilir
    } catch (error) {
      console.error("İptal hatası:", error);
      setMessage("Randevu iptal edilirken bir hata oluştu.");
      setMessageType("error");
    }
  };

  return (
    <div className="cancel-appointment-page">
      <div className="cancel-appointment-form">
        <h2 className="cancel-appointment-title">Randevu İptal Et</h2>

        <div className="email-search-section">
          <input
            type="email"
            placeholder="E-posta adresinizi girin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="cancel-form-input"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="cancel-submit-button"
            style={{ marginTop: "15px" }}
          >
            {loading ? "Aranıyor..." : "Randevuları Getir"}
          </button>
        </div>

        {message && (
          <div
            className={
              messageType === "success"
                ? "cancel-success-message"
                : "cancel-error-message"
            }
          >
            {message}
          </div>
        )}

        {randevular.length > 0 && (
          <div className="appointment-list">
            <h3
              style={{
                color: "#613060",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Randevularınız
            </h3>
            {randevular.map((r) => (
              <div key={r.id} className="appointment-item">
                <div className="appointment-details">
                  <div className="appointment-main-info">
                    <strong style={{ color: "#613060", fontSize: "18px" }}>
                      {r.date} - {r.time}
                    </strong>
                    <span
                      style={{
                        color: "#774177",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      {r.service}
                    </span>
                  </div>
                  <div className="appointment-contact-info">
                    <span style={{ color: "#999", fontSize: "14px" }}>
                      {r.name} • {r.phone}
                    </span>
                  </div>
                </div>
                <button
                  className="cancel-button"
                  onClick={() => handleCancel(r)}
                  style={{
                    background: "linear-gradient(135deg, #f44336, #d32f2f)",
                    marginTop: "0",
                  }}
                >
                  İptal Et
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelAppointmentForm;
