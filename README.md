<h1>🌸 Güzellik Merkezi Randevu Uygulaması</h1>

<p>
  <strong>Canlı Demo:</strong><br />
  <a href="https://guzellik-merkezi-app.vercel.app" target="_blank">
    https://guzellik-merkezi-app.vercel.app
  </a>
</p>

<p>
  Bu proje, güzellik merkezleri için geliştirilmiş
  <strong>uçtan uca (frontend + backend)</strong> bir
  <strong>online randevu alma sistemidir</strong>.
  Kullanıcılar hizmet seçerek randevu oluşturabilir; randevular
  <strong>Firebase Firestore</strong>’da saklanır ve hem kullanıcıya
  hem işletmeye <strong>e-posta + takvim (.ics)</strong> bildirimi gönderilir.
</p>

<h2>🚀 Özellikler</h2>

<ul>
  <li>🗓 <strong>Online randevu alma</strong></li>
  <li>💅 <strong>Hizmet seçimi</strong> (cilt bakımı, epilasyon, tırnak vb.)</li>
  <li>🔥 <strong>Firebase Firestore</strong> üzerinde randevu kaydı</li>
  <li>📧 <strong>Nodemailer</strong> ile otomatik e-posta gönderimi</li>
  <li>📎 <strong>.ics takvim dosyası</strong> (Google / Apple / Outlook uyumlu)</li>
  <li>❌ <strong>Randevu iptali</strong></li>
  <li>📱 <strong>Mobil uyumlu</strong> modern arayüz</li>
  <li>⚡ <strong>Vercel</strong> üzerinde canlı deployment</li>
</ul>

<h2>🧠 Kullanılan Teknolojiler</h2>

<h3>Frontend</h3>
<ul>
  <li>Next.js</li>
  <li>React</li>
  <li>JavaScript</li>
  <li>HTML / CSS</li>
</ul>

<h3>Backend</h3>
<ul>
  <li>Next.js API Routes / Node.js</li>
  <li>Firebase Firestore</li>
  <li>Firebase Admin SDK</li>
  <li>Express.js</li>
  <li>Nodemailer</li>
  <li>ICS (takvim dosyası oluşturma)</li>
</ul>

<h3>Deployment</h3>
<ul>
  <li>Vercel</li>
</ul>

<h2>🏗️ Sistem Mimarisi</h2>

<ul>
  <li>Kullanıcı arayüzü <strong>Next.js</strong> ile geliştirilmiştir.</li>
</ul>

<p><strong>Randevu oluşturulduğunda:</strong></p>
<ul>
  <li>Randevu bilgileri <strong>Firestore</strong>’a kaydedilir.</li>
  <li>Otomatik <strong>.ics takvim dosyası</strong> oluşturulur.</li>
  <li>İşletme sahibine ve kullanıcıya <strong>e-posta</strong> gönderilir.</li>
</ul>

<p><strong>Randevu iptal edildiğinde:</strong></p>
<ul>
  <li>Firestore’dan silinir.</li>
  <li>Taraflara iptal e-postası gönderilir.</li>
</ul>

<h2>🔥 Firebase Kullanımı</h2>

<ul>
  <li>
    Randevular
    <strong>Firestore → <code>randevular</code> koleksiyonunda</strong>
    tutulur.
  </li>
  <li>
    <strong>Firebase Admin SDK</strong> ile güvenli sunucu tarafı erişim sağlanır.
  </li>
  <li>
    CRUD işlemleri backend üzerinden yapılır.
  </li>
</ul>

<h2>🎯 Projenin Amacı</h2>

<p>
  Bu proje, güzellik merkezlerinde sıkça yaşanan aşağıdaki problemleri
  <strong>dijital ve otomatik</strong> bir sistemle çözmeyi hedefler:
</p>

<ul>
  <li>Randevu çakışmaları</li>
  <li>Manuel kayıt karmaşası</li>
  <li>İletişim kopuklukları</li>
</ul>

<h5>Admin Panel sayfası görünümü;</h5>
<img width="1903" height="1117" alt="Opera Anlık görüntü_2026-01-28_155653_localhost" src="https://github.com/user-attachments/assets/d21bf910-4260-4142-aedd-bd517df021fd" />

