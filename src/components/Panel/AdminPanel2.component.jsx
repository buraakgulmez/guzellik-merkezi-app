import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./AdminPanel2.component.css";

const AdminPanel2 = () => {
  const [randevular, setRandevular] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const randevuRef = collection(db, "randevular");
    const unsubscribe = onSnapshot(
      randevuRef,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRandevular(data);
      },
      (error) => {
        console.error("Randevular çekilemedi:", error);
      }
    );
    return () => unsubscribe();
  }, []);

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const randevuTarihleri = new Set(randevular.map((r) => r.date));
  const filteredRandevular = randevular.filter(
    (r) => r.date === formatDate(selectedDate)
  );

  const groupByService = (appointments) => {
    return appointments.reduce((acc, curr) => {
      const service = curr.service || "Diğer";
      if (!acc[service]) acc[service] = [];
      acc[service].push(curr);
      return acc;
    }, {});
  };

  const groupedRandevular = groupByService(filteredRandevular);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateStr = formatDate(date);
      if (randevuTarihleri.has(dateStr)) {
        return <div className="randevu-dot"></div>;
      }
    }
    return null;
  };

  return (
    <div className="admin-panel-container with-calendar">
      <h1 className="admin-panel-title">Randevular</h1>

      <div className="content-wrapper">
        <div className="calendar-wrapper">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={tileContent}
          />
        </div>

        <div className="appointments-wrapper">
          <h2>Seçilen Tarih: {formatDate(selectedDate)}</h2>

          {filteredRandevular.length === 0 ? (
            <p className="no-appointments">Bu tarihte randevu yok.</p>
          ) : (
            Object.keys(groupedRandevular).map(service => (
              <div key={service} className="service-group">
                <h3 className="service-title">{service}</h3>
                <ul className="appointment-list">
                  {groupedRandevular[service].map((r) => (
                    <li key={r.id} className="appointment-item">
                      <strong>{r.time}</strong> - {r.name} - {r.phone} - {r.email || "-"}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel2;
