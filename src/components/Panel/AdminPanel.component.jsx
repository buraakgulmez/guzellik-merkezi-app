// src/components/Panel/AdminLogin.component.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase"; // Doğru Firebase yolu

import './AdminPanel.component.css';

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Hata mesajlarını göstermek için state
  const [isLoading, setIsLoading] = useState(false); // Yüklenme durumunu göstermek için state

  const handleLogin = async (e) => {
    e.preventDefault(); // Formun varsayılan submit davranışını engelle

    setError(null); // Önceki hataları temizle
    setIsLoading(true); // Yükleme durumunu başlat

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Giriş başarılı!");
      onLoginSuccess(); // Giriş başarılı olduğunda üst bileşene bildir
    } catch (firebaseError) {
      // Firebase'den dönen hata koduna göre kullanıcıya daha spesifik bilgi verilebilir
      let errorMessage = "Giriş başarısız oldu. Lütfen bilgilerinizi kontrol edin.";
      if (firebaseError.code === "auth/user-not-found" || firebaseError.code === "auth/wrong-password") {
        errorMessage = "Geçersiz e-posta veya şifre.";
      } else if (firebaseError.code === "auth/invalid-email") {
        errorMessage = "Geçersiz e-posta formatı.";
      } else if (firebaseError.code === "auth/too-many-requests") {
        errorMessage = "Çok fazla giriş denemesi. Lütfen daha sonra tekrar deneyin.";
      }
      setError(errorMessage);
      console.error("Giriş hatası:", firebaseError);
    } finally {
      setIsLoading(false); // Yükleme durumunu bitir
    }
  };

  return (
    <div className="login-container"> {/* CSS için kapsayıcı */}
      <form onSubmit={handleLogin} className="login-form"> {/* CSS için form sınıfı */}
        <h2>Admin Girişi</h2>
        {error && <p className="error-message">{error}</p>} {/* Hata mesajını göster */}

        <div className="form-group"> {/* Label ve input için grup */}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading} // Yüklenirken inputları devre dışı bırak
          />
        </div>

        <div className="form-group"> {/* Label ve input için grup */}
          <label htmlFor="password">Şifre:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading} // Yüklenirken inputları devre dışı bırak
          />
        </div>

        <button type="submit" disabled={isLoading}> {/* Yüklenirken butonu devre dışı bırak */}
          {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
