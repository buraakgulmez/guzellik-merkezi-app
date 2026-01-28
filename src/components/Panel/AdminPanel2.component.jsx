import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./AdminPanel2.component.css";

const AdminPanel2 = () => {
  const [randevular, setRandevular] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState("randevular");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const randevuRef = collection(db, "randevular");
    const unsubscribe = onSnapshot(
      randevuRef,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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

  const formatDisplayDate = (dateStr) => {
    const [y, m, d] = dateStr.split("-");
    return `${d}.${m}.${y}`;
  };

  const handleDeleteAppointments = async () => {
    try {
      for (const id of selectedAppointments) {
        await deleteDoc(doc(db, "randevular", id));
      }
      setSelectedAppointments([]);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Randevu silinirken hata oluştu:", error);
      alert("Randevu silinirken bir hata oluştu!");
    }
  };

  const toggleAppointmentSelection = (id) => {
    setSelectedAppointments((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const randevuTarihleri = new Set(randevular.map((r) => r.date));
  const filteredRandevular =
    activeMenu === "randevular"
      ? randevular.filter((r) => r.date === formatDate(selectedDate))
      : randevular;

  const groupByService = (appointments) => {
    return appointments.reduce((acc, curr) => {
      const service = curr.service || "Diğer";
      if (!acc[service]) acc[service] = [];
      acc[service].push(curr);
      return acc;
    }, {});
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = formatDate(date);
      if (randevuTarihleri.has(dateStr)) {
        return "has-appointment";
      }
    }
    return null;
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateStr = formatDate(date);
      if (randevuTarihleri.has(dateStr)) {
        return <div className="randevu-dot"></div>;
      }
    }
    return null;
  };

  const menuItems = [
    { id: "randevular", label: "Randevular", icon: "📅" },
    { id: "iptal", label: "Randevu İptali", icon: "❌" },
    { id: "istatistik", label: "İstatistikler", icon: "📊" },
  ];

  return (
    <div className="admin-panel-wrapper">
      {/* Sidebar */}
      <div className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          {isSidebarOpen && <h2 className="sidebar-logo">Admin Panel</h2>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="sidebar-toggle"
          >
            {isSidebarOpen ? "X" : "☰"}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`sidebar-item ${
                activeMenu === item.id ? "active" : ""
              }`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {isSidebarOpen && (
                <span className="sidebar-label">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          {isSidebarOpen && (
            <div className="admin-info">
              <div className="admin-avatar">A</div>
              <div className="admin-details">
                <p className="admin-name">Admin</p>
                <p className="admin-email">admin@panel.com</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`admin-main-content ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="main-content-inner">
          {/* Header */}
          <div className="admin-header">
            <h1>{menuItems.find((m) => m.id === activeMenu)?.label}</h1>
            <p>Randevularınızı yönetin ve takip edin</p>
          </div>

          {/* Randevular View */}
          {activeMenu === "randevular" && (
            <div className="randevular-view">
              <div className="randevular-grid">
                {/* Calendar Section */}
                <div className="calendar-section">
                  <h3>
                    <span className="icon">📅</span>
                    Takvim
                  </h3>
                  <div className="calendar-days">
                    {[...Array(7)].map((_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i);
                      const dateStr = formatDate(date);
                      const hasAppointment = randevuTarihleri.has(dateStr);
                      const isSelected = formatDate(selectedDate) === dateStr;

                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(date)}
                          className={`calendar-day-button ${
                            isSelected
                              ? "selected"
                              : hasAppointment
                              ? "has-appointment"
                              : "no-appointment"
                          }`}
                        >
                          <div className="calendar-day-content">
                            <div>
                              <p className="calendar-day-name">
                                {date.toLocaleDateString("tr-TR", {
                                  weekday: "long",
                                })}
                              </p>
                              <p className="calendar-day-date">
                                {formatDisplayDate(dateStr)}
                              </p>
                            </div>
                            {hasAppointment && (
                              <div className="calendar-day-count">
                                <span>✓</span>
                                <span>
                                  {
                                    randevular.filter((r) => r.date === dateStr)
                                      .length
                                  }
                                </span>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Appointments Section */}
                <div className="appointments-section">
                  <h3>
                    <span className="icon">🕐</span>
                    {formatDisplayDate(formatDate(selectedDate))} Tarihli
                    Randevular
                  </h3>

                  {filteredRandevular.length === 0 ? (
                    <div className="no-appointments-modern">
                      <span className="icon-large">⚠️</span>
                      <p>Bu tarihte randevu bulunmuyor</p>
                    </div>
                  ) : (
                    <div className="appointments-list-modern">
                      {Object.entries(groupByService(filteredRandevular)).map(
                        ([service, appointments]) => (
                          <div key={service} className="service-group-modern">
                            <h4 className="service-header">
                              <span className="service-dot"></span>
                              {service}
                            </h4>
                            <div className="service-appointments">
                              {appointments.map((r) => (
                                <div key={r.id} className="appointment-card">
                                  <div className="appointment-card-content">
                                    <div className="appointment-card-details">
                                      <div className="appointment-card-header">
                                        <span className="appointment-time-badge">
                                          {r.time}
                                        </span>
                                        <span className="appointment-name">
                                          {r.name}
                                        </span>
                                      </div>
                                      <div className="appointment-contact">
                                        <p>📞 {r.phone}</p>
                                        <p>📧 {r.email || "-"}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* İptal View */}
          {activeMenu === "iptal" && (
            <div className="iptal-container">
              <div className="iptal-header">
                <h3>Tüm Randevular</h3>
                {selectedAppointments.length > 0 && (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="iptal-button"
                  >
                    <span>❌</span>
                    {selectedAppointments.length} Randevu İptal Et
                  </button>
                )}
              </div>

              {randevular.length === 0 ? (
                <div className="no-appointments-modern">
                  <span className="icon-large">⚠️</span>
                  <p>Henüz randevu bulunmuyor</p>
                </div>
              ) : (
                <div className="iptal-list">
                  {randevular.map((r) => (
                    <div
                      key={r.id}
                      className={`iptal-item ${
                        selectedAppointments.includes(r.id) ? "selected" : ""
                      }`}
                      onClick={() => toggleAppointmentSelection(r.id)}
                    >
                      <div className="iptal-item-content">
                        <input
                          type="checkbox"
                          checked={selectedAppointments.includes(r.id)}
                          onChange={() => {}}
                          className="iptal-checkbox"
                        />
                        <div className="iptal-details">
                          <span className="iptal-date">
                            {formatDisplayDate(r.date)}
                          </span>
                          <span className="iptal-time">{r.time}</span>
                          <span className="iptal-name">{r.name}</span>
                          <span className="iptal-phone">{r.phone}</span>
                          <span className="iptal-service">
                            {r.service || "Diğer"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* İstatistik View */}
          {activeMenu === "istatistik" && (
            <div className="stats-grid">
              <div className="stat-card stat-purple">
                <span className="stat-icon">👥</span>
                <p className="stat-number">{randevular.length}</p>
                <p className="stat-label">Toplam Randevu</p>
              </div>
              <div className="stat-card stat-blue">
                <span className="stat-icon">📅</span>
                <p className="stat-number">{randevuTarihleri.size}</p>
                <p className="stat-label">Aktif Gün</p>
              </div>
              <div className="stat-card stat-green">
                <span className="stat-icon">✅</span>
                <p className="stat-number">
                  {Object.keys(groupByService(randevular)).length}
                </p>
                <p className="stat-label">Hizmet Türü</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-body">
              <span className="modal-icon">❌</span>
              <h3 className="modal-title">Randevu İptali</h3>
              <p className="modal-text">
                {selectedAppointments.length} randevuyu iptal etmek
                istediğinizden emin misiniz?
              </p>
            </div>
            <div className="modal-buttons">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="modal-button modal-cancel"
              >
                Vazgeç
              </button>
              <button
                onClick={handleDeleteAppointments}
                className="modal-button modal-confirm"
              >
                İptal Et
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel2;
