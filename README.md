# 🎓 EduPrime CRM — Xususiy Maktablar va Repetitorlik Markazlari Boshqaruv Tizimi

Zamonaviy, tezkor va to'liq moslashuvchan (Ultra-Responsive) CRM boshqaruv tizimi. Xususiy maktablar, o'quv markazlari va repetitorlik faoliyati bilan shug'ullanuvchilar uchun maxsus ishlab chiqilgan.

---

## ✨ Asosiy Imkoniyatlar

### 👨‍🏫 1. Ustozlar va Repetitorlar Boshqaruvi
- Har bir ustozning haftalik dars jadvallari (vaqtlari, xonalari, guruhlari).
- Repetitor o'quvchilari ro'yxati, to'lov holati va o'zlashtirishi.
- Biriktirilgan xonalar, soatlik stavkalar va oylik ulush hisoboti.

### 👥 2. O'quvchilar va Guruhlar
- O'quvchilar bazasi, qidiruv va tezkor filtrlash (Maktab, Repetitor, Qarzdorlar).
- Yangi o'quvchilarni guruhlarga yoki shaxsiy repetitorga biriktirish.
- Ota-onalar bilan aloqa ma'lumotlari.

### 💰 3. Moliya va To'lovlar Nazorati
- Oylik tushum, repetitorlar ulushi (70%) va markaz daromadi (30%).
- Qarzdorlar nazorati va tezkor eslatmalar.
- To'lov qabul qilish va avtomatik kvitansiya/chek chiqarish (Print).

### 📋 4. Davomat Tizimi
- Guruhlar va darslar kesimida kunlik davomat belgilash (*Keldi / Kelmadi / Sababli*).
- Oylik davomat foizi va hisobotlar.

### 🎯 5. Qabul va Lidlar (Sinov Darslari)
- Yangi arizalar, qiziqish bildirgan o'quvchilarni ro'yxatga olish.
- Sinov darslariga yozish va statuslarni boshqarish.

### 📊 6. Excel (CSV) Eksport
- **O'quvchilar ro'yxatini** bitta tugma bilan Excelga yuklab olish.
- **Moliya to'lovlari tarixini** Excelga yuklab olish.
- **Davomat hisobotlarini** Excelga yuklash (UTF-8 BOM qo'llab-quvvatlanadi).

### ✈️ 7. Telegram Bot Xabarnomalari
- Telegram Bot API integratsiyasi (Token va Chat ID sozlamalari).
- Yangi to'lov qabul qilinganda kanal yoki adminga avtomatik to'lov cheki yuborilishi.
- Test xabar yuborish imkoniyati.

### 💾 8. Zaxira Nusxa (Backup & Restore)
- Butun CRM bazasini `.json` formatda yuklab olish (Zaxira nusxa).
- Istalgan vaqtda fayldan bazani to'liq qayta tiklash.

### 📱 9. To'liq Mobil Moslashuv (Mobile First)
- Smartfonlar (iPhone, Android), planshet va kompyuterlar uchun 100% moslashgan.
- Pastki qulay navigatsiya (Bottom Navigation Bar) va iOS Safe-Area qo'llab-quvvatlovi.
- Tun / Kun (Dark & Light) rejimlari.

---

## 🚀 Ishga Tushirish

Loyiha toza **HTML5, CSS3 va JavaScript (Vanilla JS)** texnologiyalarida yaratilgan. Hech qanday murakkab server yoki o'rnatish talab etilmaydi.

1. Loyihani yuklab oling:
```bash
git clone https://github.com/username/schl-crm.git
```
2. Loyiha papkasini oching:
```bash
cd schl-crm
```
3. `index.html` faylini istalgan brauzerda oching yoki VS Code orqali **Live Server** bilan ishga tushiring.

---

## 🌐 GitHub Pages orqali Bepul Onlayn Ishga Tushirish

1. Ushbu loyihani GitHub hisobingizga yuklang (Push qiling).
2. Repozitoriy sozlamalariga kiring: **Settings -> Pages**.
3. **Branch** bo'limida `main` (yoki `master`) ni tanlang va **Save** tugmasini bosing.
4. Bir necha soniyadan so'ng sizga shaxsiy havola beriladi:  
   `https://username.github.io/schl-crm/`  
   Endi siz va jamoangiz istalgan telefondan ushbu havola orqali tizimdan bepul foydalana olasiz!

---

## 🛠 Texnologiyalar
- **HTML5** & **Vanilla CSS3** (CSS Custom Properties, Glassmorphism, CSS Grid, Flexbox)
- **JavaScript (ES6+)**
- **Font Awesome 6** (Ikonkalar)
- **Google Fonts** (Plus Jakarta Sans)
- **LocalStorage API** (Ma'lumotlarni brauzerda avtomatik saqlash)
