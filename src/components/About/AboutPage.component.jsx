import React, { useState, useEffect } from "react";
import aboutImg from "../../images/about/about.jpg";
import "./AboutPage.component.css";

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch("/about-us.json")
      .then((res) => res.json())
      .then((data) => setAboutData(data[0]))
      .catch((err) => console.error("Veri alınamadı:", err));
  }, []);

  return (
    <section className="about-section">
      <h1 className="about-title">Hakkımızda</h1>
      <div className="about-container">
        <div className="about-image">
          <img src={aboutImg} alt="About" />
        </div>
        <div className="about-content">
          {aboutData ? (
            <>
              <h2 className="about-heading">{aboutData.title}</h2>
              <p className="about-text">{aboutData.description}</p>
              <p className="about-text">{aboutData.description2}</p>
              <p className="about-text">{aboutData.description3}</p>
            </>
          ) : (
            <p className="loading-text">Yükleniyor...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
