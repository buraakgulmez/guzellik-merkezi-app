import React, { useEffect, useState } from "react";
import "./productpage.component.css";
import { Link } from "react-router-dom";
const ProductPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Veri alınamadı:", err));
  }, []);

  const formatPriceLabel = (key) => {
    const labels = {
      priceWomen: "Kadın Tüm Vücut",
      priceMen: "Erkek Tüm Vücut",
      kasPrice: "Kaş",
      liftingPrice: "Kirpik Lifting",
      ipekPrice: "İpek Kirpik",
      protezPrice: "Protez Tırnak",
      manikürAndOje: "Manikür + Oje",
      manikür: "Manikür",
      priceMin: "Dakika Fiyatı",
      ciltYenileme: "Cilt Yenileme",
      kimyasalPeeling: "Kimyasal Peeling",
      medicalCilt: "Medikal Cilt Bakımı",
    };
    return labels[key] || key;
  };

  return (
    <div className="background">
      <div>
        <h1 className="product-baslik pt-2">Hizmetlerimiz</h1>
        <div className="product-icerik-flex">
          {services.map((item, index) => (
            <div className="product-icerik" key={index}>
              <div className="product-flex">
                <h4 className="product-urun-baslik">{item.title}</h4>
                <p>{item.description}</p>
                <div className="product-fiyat">
                  {Object.entries(item)
                    .filter(([key]) => key !== "title" && key !== "description")
                    .map(([key, value], idx) => (
                      <h4 className="product-icerik-fiyat" key={idx}>
                        {formatPriceLabel(key)}: {value}
                      </h4>
                    ))}
                </div>
                <Link className="product-btn" to="/randevu">
                  Randevu Al
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
