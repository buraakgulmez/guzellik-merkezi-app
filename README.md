Güzellik Merkezi Randevu Uygulaması

🔗 Canlı Demo:
https://guzellik-merkezi-app.vercel.app

Bu proje, güzellik merkezleri için geliştirilmiş uçtan uca (frontend + backend) bir online randevu alma sistemidir.
Kullanıcılar hizmet seçerek randevu oluşturabilir; randevular Firebase Firestore’da saklanır ve hem kullanıcıya hem işletmeye e-posta + takvim (.ics) bildirimi gönderilir.

🚀 Özellikler

🗓 Online randevu alma

💅 Hizmet seçimi (cilt bakımı, epilasyon, tırnak vb.)

🔥 Firebase Firestore üzerinde randevu kaydı

📧 Nodemailer ile otomatik e-posta gönderimi

📎 .ics takvim dosyası (Google / Apple / Outlook uyumlu)

❌ Randevu iptali

📱 Mobil uyumlu modern arayüz

⚡ Vercel üzerinde canlı deployment

🧠 Kullanılan Teknolojiler
Frontend

Next.js

React

JavaScript

HTML / CSS

Backend

Next.js API Routes / Node.js

Firebase Firestore

Firebase Admin SDK

Express.js

Nodemailer

ICS (takvim dosyası oluşturma)

Deployment

Vercel

🏗️ Sistem Mimarisi

Kullanıcı arayüzü Next.js ile geliştirilmiştir.

Randevu oluşturulduğunda:

Randevu bilgileri Firestore’a kaydedilir.

Otomatik .ics takvim dosyası oluşturulur.

İşletme sahibine ve kullanıcıya e-posta gönderilir.

Randevu iptal edildiğinde:

Firestore’dan silinir

Taraflara iptal e-postası gönderilir

📂 Proje Yapısı (Özet)
├── frontend/
│   ├── pages/
│   ├── components/
│   └── styles/
│
├── backend/
│   ├── index.js           # Express server
│   ├── firebaseAdmin.js   # Firebase Admin config
│   └── randevular.json    # (Test verileri)
│
└── README.md

🔥 Firebase Kullanımı

Randevular Firestore → randevular koleksiyonunda tutulur

Firebase Admin SDK ile güvenli sunucu tarafı erişim sağlanır

CRUD işlemleri backend üzerinden yapılır.

🎯 Projenin Amacı

Bu proje, güzellik merkezlerinde sıkça yaşanan:

Randevu çakışmaları

Manuel kayıt karmaşası

İletişim kopuklukları

gibi problemleri dijital ve otomatik bir sistemle çözmeyi hedefler.

Aynı yapı;
✔ kuaför
✔ diş kliniği
✔ danışmanlık
✔ spor salonu

gibi işletmelere kolayca uyarlanabilir.
