<div align="center">

# 🌾 Krishi Seva Center
### कृषि AI: लाइव किसान सेवा केंद्र

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Vercel-brightgreen?style=for-the-badge)](https://krishi-seva-center.vercel.app/)
[![Backend](https://img.shields.io/badge/🔧_Backend_API-Render-blue?style=for-the-badge)](https://tomato-disease-app-snqt.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Raj--Anmol-black?style=for-the-badge&logo=github)](https://github.com/Raj-Anmol)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Raj_Anmol-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/raj-anmol/)

**An AI-powered full-stack web application for Indian farmers — combining crop disease detection, live weather updates, real-time mandi prices, and bilingual (Hindi/English) farm advisory — all in one platform.**

</div>

---

## 📌 Project Overview

**Krishi Seva Center** is a farmer-first web application built to solve real agricultural challenges in India. It provides an intelligent, easy-to-use interface where farmers can upload crop photos to detect diseases, check live weather conditions for their region (Patna, Bihar), get real-time mandi commodity prices, and track their farm's health analytics — all accessible in both Hindi and English.

> *"Technology in the hands of every farmer, in their own language."*

---

## 📸 App Screenshot

<div align="center">

![Krishi Seva Center - Live App Preview](./frontend/public/hero.png)

*Live view of the app showing Crop Selection, Real-time Patna Weather Station, and Today's Mandi Bhav (Live Commodity Prices)*

</div>

---

## 🌐 Deployment Links

| Service | URL |
|---|---|
| 🖥️ Frontend (Live App) | https://krishi-seva-center.vercel.app/ |
| ⚙️ Backend API | https://tomato-disease-app-snqt.onrender.com |
| 👨‍💻 GitHub Profile | https://github.com/Raj-Anmol |
| 💼 LinkedIn | https://www.linkedin.com/in/raj-anmol/ |

---

## ✨ Key Features

### 🔍 1. AI Crop Disease Detection
- Upload a crop photo and select your crop type
- Instantly receive disease name (in Hindi & English), confidence score, and treatment remedy
- Supports 8 major crops: Wheat, Rice, Cotton, Sugarcane, Maize, Tomato, Potato, Brinjal

### 🌤️ 2. Live Weather Station (Patna)
- Real-time weather data fetched from the **Open-Meteo API**
- Displays temperature, humidity, wind speed, and weather condition
- Includes a **Smart Agro Alert** warning farmers about bad weather conditions (e.g., stop pesticide spraying during rain/storms)

### 📈 4. Farm Health Analytics (Enhanced)
- Tracks total scans, healthy vs. diseased detections
- **Visual health score with animated progress bar**
- **Persisted locally via browser storage across sessions**
- **Enhanced tracking: Last harvest date & Soil pH monitoring**
- **GPS-based location analytics** for weather-pattern correlations

### 🌍 4b. GPS & Location Features (Advanced)
- **Auto-detects user location** via HTML5 Geolocation
- **Dynamic weather API** with latitude/longitude parameters
- **Falls back to Patna coordinates** if GPS unavailable
- **Location error handling** with graceful fallback
- **Location data stored** in scan history for pattern analysis

### 🌐 5. Bilingual Interface (Hindi / English)
- Full toggle between Hindi (हिंदी) and English
- All labels, alerts, results, and advisory content switch language seamlessly

### 🏪 6. Nearby Agri-Shop Locator
- Lists nearby agri input shops (fertilizer, pesticide, seed stores) with names and contact info
- Focuses on the Patna, Bihar region

### ❓ 7. FAQ Section
- Common farming questions answered in both languages
- Covers disease prevention, weather interpretation, and mandi price usage

### 📜 8. Scan History Log
- Maintains a session-based record of previous disease detections
- Shows crop type, detected disease, and timestamp

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React.js | ^18.3.0 | UI Framework |
| Vite | ^5.2.0 | Build Tool & Dev Server |
| Vanilla CSS | — | Custom Styling & Responsive Layout |
| React Hooks | useState, useEffect | State & Side-effect Management |
| ESLint | ^8.57.0 | Code Linting |

### Backend
| Technology | Purpose |
|---|---|
| Python | Core Language |
| FastAPI | REST API Framework |
| Uvicorn | ASGI Server |
| httpx | Async HTTP Client (for Open-Meteo API) |
| python-multipart | File Upload Handling |

### External APIs
| API | Usage |
|---|---|
| [Open-Meteo](https://open-meteo.com/) | Free real-time weather data (Patna coordinates) |

### Deployment
| Platform | Role |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend API hosting |

---

## 📁 Project Structure

```
krishi-seva-center/
│
├── backend/
│   ├── main.py              # FastAPI app — weather, mandi, disease predict APIs
│   └── requirements.txt     # Python dependencies
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/          # Static images (hero, react, vite SVGs)
│   │   ├── App.jsx          # Main React component (all features)
│   │   ├── App.css          # Complete styling
│   │   ├── index.css        # Global base styles
│   │   └── main.jsx         # React DOM entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
└── .gitignore
```

---

## ⚙️ API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/weather` | Fetches live weather data for Patna from Open-Meteo |
| `GET` | `/api/mandi` | Returns today's commodity price index for 8 crops |
| `POST` | `/predict` | Accepts crop image + crop name, returns disease info |

### Sample `/predict` Response
```json
{
  "disease_en": "Tomato Early Blight",
  "disease_hi": "टमाटर का अगेती झुलसा रोग",
  "confidence": "97.43%",
  "remedy_en": "Apply organic copper fungicide.",
  "remedy_hi": "कॉपर फंगसीसाइड का छिड़काव करें।"
}
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- pip

### 1. Clone the Repository
```bash
git clone https://github.com/Raj-Anmol/krishi-seva-center.git
cd krishi-seva-center
```

### 2. Setup Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
# Backend runs at: http://localhost:9000
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend runs at: http://localhost:5173
```

---

## 🌱 Supported Crops

| Crop | Disease Detected | Remedy |
|---|---|---|
| 🌾 Wheat | Wheat Rust Disease | Propiconazole fungicide spray |
| 🌾 Rice | Bacterial Leaf Blight | Agrimycin solution |
| ☁️ Cotton | Bollworm Attack | Pheromone traps |
| 🎋 Sugarcane | Red Rot | Uproot & destroy infected canes |
| 🌽 Maize | Leaf Blight | Mancozeb fungicide |
| 🍅 Tomato | Early Blight | Copper fungicide |
| 🥔 Potato | Late Blight | Avoid overhead irrigation |
| 🍆 Brinjal | Little Leaf Disease | Neem-based insecticide |

---

## 📸 UI Highlights

- ✅ Clean, card-based responsive layout (mobile-friendly)
- ✅ Green-themed agricultural design (`#2e7d32`, `#4caf50`)
- ✅ **Modern animated UI with fade-in-up and pulse effects**
- ✅ **GPS-based dynamic weather location detection**
- ✅ **Enhanced analytics with last harvest & soil pH tracking**
- ✅ **Shop item hover animations** (lift effect + shadow)
- ✅ **Animated health progress bar**
- ✅ Red alert banner for weather warnings
- ✅ Responsive grid for mandi price table
- ✅ Language switcher with active state highlight
- ✅ Mobile-optimized max-width 400px breakpoints

---

## 🔮 Future Improvements

- [x] **Integrate GPS-based auto-location weather** (completed - auto-detects user location)
- [ ] Connect to official government Agmarknet API for actual mandi prices
- [ ] Add push notifications for weather alerts
- [ ] **PWA support for offline access** in low-connectivity rural areas
- [ ] Add more regional languages (Bhojpuri, Maithili)
- [ ] Integrate real CNN/ML model for disease detection (currently rule-based)
- [ ] Add soil health card integration with pH tracking
- [ ] Multi-language weather condition descriptions

---

## 👨‍💻 Developer

<div align="center">

**Raj Anmol**  
*B.Tech Computer Science | AI & Cloud Computing Intern*  
*Edunet Foundation × AICTE × IBM SkillsBuild*

[![GitHub](https://img.shields.io/badge/GitHub-Raj--Anmol-black?style=flat-square&logo=github)](https://github.com/Raj-Anmol)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-raj--anmol-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/raj-anmol/)

</div>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ for the farmers of India 🇮🇳

*किसान की मुस्कान, हमारी पहचान。*

---

## 🚀 Advanced Features

### GPS-Based Dynamic Weather
The app now auto-detects your location using HTML5 Geolocation and fetches real-time weather from Open-Meteo API with your exact coordinates. Falls back to Patna (25.5948°N, 85.1376°E) if GPS is unavailable or denied.

### Enhanced Farm Analytics
- **Last harvest tracking**: Auto-updates every 5 scans, shows last harvest date
- **Soil pH monitoring**: Track soil health over time, essential for crop planning
- **Pattern analysis**: Location data stored with each scan for weather-crop correlation

### Modern UI/UX
- **Fade-in-up animations** on page load for all cards and items
- **Pulse animation** keyframes for visual interest
- **Shop item hover effects**: Items lift with enhanced shadow on hover
- **Mobile-first responsive design**: Optimized for devices up to 400px wide
- **Smooth transitions** throughout all interactive elements

### Technical Improvements
- **React 18 + Vite 5**: Stable, production-ready versions
- **File type validation**: Only PNG, JPG, JPEG, WebP allowed for uploads
- **CORS security**: Restricted to localhost origins for development
- **Division-by-zero protection**: Analytics ratio safely handles edge cases
- **Backend Python syntax**: Fixed missing comma in CROPS_DATABASE

---

<div align="center">

**Raj Anmol**  
*B.Tech Computer Science | AI & Cloud Computing Intern*  
*Edunet Foundation × AICTE × IBM SkillsBuild*

[![GitHub](https://img.shields.io/badge/GitHub-Raj--Anmol-black?style=flat-square&logo=github)](https://github.com/Raj-Anmol)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-raj--anmol-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/raj-anmol/)

</div>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ for the farmers of India 🇮🇳

*किसान की मुस्कान, हमारी पहचान。*

</div>

</div>