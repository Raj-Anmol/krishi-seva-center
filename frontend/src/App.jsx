import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [lang, setLang] = useState('hi');
  const [selectedCrop, setSelectedCrop] = useState('tomato');
  const [selectedImage, setSelectedImage] = useState(null);
  const [rawImageFile, setRawImageFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [mandiPrices, setMandiPrices] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  
  // 🌐 CLOUD PROVISION ROUTING PIPELINE
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

  // 🗄️ LOCAL DISK HYDRATION HOOKS
  const [scanHistory, setScanHistory] = useState(() => {
    const savedHistory = localStorage.getItem('krishi_scan_history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [analytics, setAnalytics] = useState(() => {
    const savedAnalytics = localStorage.getItem('krishi_analytics');
    return savedAnalytics ? JSON.parse(savedAnalytics) : { total: 0, healthy: 0, diseased: 0, ratio: 100 };
  });

  const text = {
    hi: {
      title: "🌾 कृषि AI: लाइव किसान सेवा केंद्र",
      subtitle: "100% इंटरनेट लाइव मंडी भाव, पटना वास्तविक मौसम एवं मेगा फसल सुरक्षा यंत्र",
      step1: "📸 स्टेप 1: अपनी फसल और फोटो चुनें",
      chooseCrop: "फसल चुनें:",
      selectBtn: "📁 फोटो सेलेक्ट करें",
      changeBtn: "🔄 दूसरी फोटो चुनें",
      predictBtn: "🔍 बीमारी पहचानें",
      checking: "🤖 AI जांच कर रहा है...",
      resultTitle: "🤖 AI का फैसला",
      disease: "बीमारी:",
      remedy: "🌿 उपाय (Remedy):",
      weatherTitle: "🌤️ लाइव मौसम केंद्र (Patna Live)",
      temp: "तापमान:",
      humidity: "हवा में नमी:",
      wind: "हवा की गति:",
      alert: "पहले फोटो सेलेक्ट करें!",
      mandiTitle: "📊 आज का वास्तविक मंडी भाव (Live Rates)",
      cropName: "फसल सूची",
      price: "लाइव भाव (क्विंटल)",
      whatsappBtn: "🟢 WhatsApp पर भेजें",
      shopTitle: "🏪 आपके नजदीकी प्रमाणित कृषि स्टोर",
      weatherAlertTitle: "⚠️ स्मार्ट कृषि चेतावनी अलर्ट",
      weatherAlertDesc: "खराब मौसम या वर्षा की चेतावनी! फसल पर कीटनाशकों का छिड़काव रोक दें, दवा बहने का भारी खतरा है।",
      historyTitle: "🗄️ आपकी फसल जांच का इतिहास (Scan History Log - Permanent)",
      historyEmpty: "अभी तक कोई जांच नहीं की गई है।",
      thTime: "समय (Time)",
      thCrop: "फसल (Crop)",
      thResult: "AI का परिणाम (Verdict)",
      analyticsTitle: "📊 आपके खेत की लाइव हेल्थ एनालिटिक्स (Farm Analytics)",
      anTotal: "कुल जांच:",
      anHealthy: "स्वस्थ फसलें:",
      anDiseased: "बीमार फसलें:",
      anScore: "खेत का हेल्थ स्कोर:",
      faqTitle: "💡 सामान्य कृषि समाधान गाइड (Farmer Expert FAQ)",
      clearBtn: "🗑️ इतिहास साफ़ करें (Clear Storage)"
    },
    en: {
      title: "🌾 Krishi AI: Live Farmer Advisory",
      subtitle: "100% Internet Live Mandi Rates, Real Patna Weather & Crop Diagnostics",
      step1: "📸 Step 1: Select Crop & Photo",
      chooseCrop: "Choose Crop:",
      selectBtn: "📁 Select Photo",
      changeBtn: "🔄 Change Photo",
      predictBtn: "🔍 Detect Disease",
      checking: "🤖 AI Checking...",
      resultTitle: "🤖 AI Verdict",
      disease: "Disease:",
      remedy: "🌿 Remedy:",
      weatherTitle: "🌤️ Real-time Weather Station (Patna Live)",
      temp: "Temperature:",
      humidity: "Humidity:",
      wind: "Wind Speed:",
      alert: "Please select a photo first!",
      mandiTitle: "📊 Today's Official Mandi Bhav (Live Indexes)",
      cropName: "Commodity",
      price: "Live Rate (per Qtl)",
      whatsappBtn: "🟢 Share via WhatsApp",
      shopTitle: "🏪 Authorized Seed & Fertilizer Stations",
      weatherAlertTitle: "⚠️ Smart Agro Climatic Alert",
      weatherAlertDesc: "Precipitation warning detected! Postpone scheduled pesticide operations to avoid chemical runoff.",
      historyTitle: "🗄️ Crop Health Scan History Log (Permanent)",
      historyEmpty: "No scans recorded yet.",
      thTime: "Timestamp",
      thCrop: "Crop",
      thResult: "AI Verdict",
      analyticsTitle: "📊 Real-time Farm Health Analytics Dashboard",
      anTotal: "Total Scans:",
      anHealthy: "Healthy Crops:",
      anDiseased: "Diseased Crops:",
      anScore: "Farm Health Index Score:",
      faqTitle: "💡 Smart Agriculture FAQ & Solution Guide",
      clearBtn: "🗑️ Clear History Data"
    }
  };

  const faqData = [
    {
      q_hi: "🌿 फसलों में फंगस (कवक) जनित रोगों को रोकने का जैविक उपाय क्या है?",
      q_en: "🌿 What is the organic way to prevent fungal diseases in crops?",
      a_hi: "खेत में जलभराव न होने दें। खट्टी छाछ (Buttermilk) को पानी में मिलाकर या नीम के तेल का नियमित छिड़काव करने से फंगस के कीटाणु नष्ट हो जाते हैं।",
      a_en: "Avoid waterlogging in fields. Spraying sour buttermilk mixed with water or regular application of Neem Oil effectively destroys fungal spores."
    },
    {
      q_hi: "🧪 यूरिया और डीAAP (DAP) खाद का सही संतुलन कैसे बनाएं?",
      q_en: "🧪 What is the correct balance for applying Urea and DAP fertilizers?",
      a_hi: "बुवाई के समय हमेशा डीएपी का प्रयोग करें जिससे जड़ें मजबूत हों। यूरिया को फसल उगने के बाद २ से ३ किस्तों में मिट्टी में नमी होने पर ही छिड़कें।",
      a_en: "Always use DAP during sowing for strong root development. Apply Urea post-germination in 2-3 split doses, strictly when the soil has sufficient moisture."
    }
  ];

  const nearbyShops = [
    { name: "Bihar Krishi Kendra & Fertilizer", phone: "+91 94310 XXXXX", distance: "1.2 km" },
    { name: "Patna Beej Bhandar & Pesticides", phone: "+91 98352 XXXXX", distance: "2.5 km" }
  ];

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/weather`)
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.error("Weather fetch failed:", err));

    fetch(`${API_BASE_URL}/api/mandi`)
      .then(res => res.json())
      .then(data => setMandiPrices(data))
      .catch(err => console.error("Mandi fetch failed:", err));
  }, []);

  useEffect(() => {
    localStorage.setItem('krishi_scan_history', JSON.stringify(scanHistory));
  }, [scanHistory]);

  useEffect(() => {
    localStorage.setItem('krishi_analytics', JSON.stringify(analytics));
  }, [analytics]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setRawImageFile(file);
      setPrediction(null);
    }
  };

  const uploadToAI = async () => {
    if (!rawImageFile) return alert(text[lang].alert);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", rawImageFile);
    formData.append("crop", selectedCrop);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      // Reactive Language Fix: Save the entire raw output payload structure
      setPrediction(data);

      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const newLog = {
        time: timestamp,
        crop: selectedCrop.toUpperCase(),
        data: data 
      };
      
      setScanHistory(prevHistory => [newLog, ...prevHistory]);

      const isHealthy = data.disease_en.toLowerCase().includes("healthy") || data.disease_hi.includes("स्वस्थ");
      setAnalytics(prev => {
        const newTotal = prev.total + 1;
        const newHealthy = isHealthy ? prev.healthy + 1 : prev.healthy;
        const newDiseased = !isHealthy ? prev.diseased + 1 : prev.diseased;
        const newRatio = Math.round((newHealthy / newTotal) * 100);
        return { total: newTotal, healthy: newHealthy, diseased: newDiseased, ratio: newRatio };
      });

    } catch (error) {
      console.error("Error:", error);
      alert("Network server pipe error!");
    } finally {
      setLoading(false);
    }
  };

  const shareOnWhatsApp = () => {
    if (!prediction) return;
    const currentDisease = lang === 'hi' ? prediction.disease_hi : prediction.disease_en;
    const currentRemedy = lang === 'hi' ? prediction.remedy_hi : prediction.remedy_en;
    
    const message = `*${text[lang].resultTitle}*\n\n*${text[lang].disease}* ${currentDisease}\n*Confidence:* ${prediction.confidence}\n\n*${text[lang].remedy}* ${currentRemedy}\n\n_Sent via Live Krishi AI Engine_`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const clearStorageData = () => {
    if (window.confirm("क्या आप सचमुच पूरा इतिहास मिटाना चाहते हैं?")) {
      localStorage.removeItem('krishi_scan_history');
      localStorage.removeItem('krishi_analytics');
      setScanHistory([]);
      setAnalytics({ total: 0, healthy: 0, diseased: 0, ratio: 100 });
    }
  };

  const isBadWeather = weather && (weather.code >= 51 || weather.condition.includes("Rainy") || weather.condition.includes("Thunderstorm"));

  return (
    <div className="app-container">
      <div className="lang-switcher">
        <button onClick={() => setLang('hi')} className={lang === 'hi' ? 'active-lang' : ''}>हिन्दी</button>
        <button onClick={() => setLang('en')} className={lang === 'en' ? 'active-lang' : ''}>English</button>
      </div>

      <header className="app-header">
        <h1>{text[lang].title}</h1>
        <p>{text[lang].subtitle}</p>
      </header>

      {isBadWeather && (
        <div className="alert-banner">
          <h4>{text[lang].weatherAlertTitle}</h4>
          <p>{text[lang].weatherAlertDesc}</p>
        </div>
      )}

      {analytics.total > 0 && (
        <div className="analytics-card">
          <h3>{text[lang].analyticsTitle}</h3>
          <div className="analytics-grid">
            <div className="analytics-item total-box">📈 <b>{text[lang].anTotal}</b> <span className="stat-num">{analytics.total}</span></div>
            <div className="analytics-item healthy-box">🟢 <b>{text[lang].anHealthy}</b> <span className="stat-num">{analytics.healthy}</span></div>
            <div className="analytics-item diseased-box">🔴 <b>{text[lang].anDiseased}</b> <span className="stat-num">{analytics.diseased}</span></div>
            <div className="analytics-item score-box">🏆 <b>{text[lang].anScore}</b> <span className="stat-num">{analytics.ratio}%</span></div>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${analytics.ratio}%` }}></div>
          </div>
        </div>
      )}

      <div className="main-content">
        <div className="card">
          <h2>{text[lang].step1}</h2>
          
          <div className="crop-select-box">
            <label><strong>{text[lang].chooseCrop}</strong></label>
            <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)} className="modern-select">
              <option value="wheat">Wheat (गेंहू) 🌾</option>
              <option value="rice">Rice (धान) 🌾</option>
              <option value="cotton">Cotton (कपास) ☁️</option>
              <option value="sugarcane">Sugarcane (गन्ना) 🎋</option>
              <option value="maize">Maize (मक्का) 🌽</option>
              <option value="tomato">Tomato (टमाटर) 🍅</option>
              <option value="potato">Potato (आलू) 🥔</option>
              <option value="brinjal">Brinjal (बैंगन) 🍆</option>
            </select>
          </div>

          <input type="file" accept="image/*" onChange={handleImageChange} id="file-input" style={{display: 'none'}} />
          <label htmlFor="file-input" className="upload-btn">
            {selectedImage ? text[lang].changeBtn : text[lang].selectBtn}
          </label>

          {selectedImage && (
            <div className="image-preview">
              <img src={selectedImage} alt="Selected Leaf" />
              <button onClick={uploadToAI} className="predict-btn" disabled={loading}>
                {loading ? text[lang].checking : text[lang].predictBtn}
              </button>
            </div>
          )}
        </div>

        {prediction && (
          <div className="card result-card">
            <h2>{text[lang].resultTitle}</h2>
            <p><strong>{text[lang].disease}</strong> {lang === 'hi' ? prediction.disease_hi : prediction.disease_en}</p>
            <p><strong>Confidence:</strong> {prediction.confidence}</p>
            <div className="remedy-box">
              <p><strong>{text[lang].remedy}</strong> {lang === 'hi' ? prediction.remedy_hi : prediction.remedy_en}</p>
            </div>
            <button onClick={shareOnWhatsApp} className="whatsapp-share-btn">
              {text[lang].whatsappBtn}
            </button>
          </div>
        )}
      </div>

      <div className="dashboard-grid">
        {weather && (
          <div className="weather-card">
            <h3>{text[lang].weatherTitle}</h3>
            <div className="weather-grid">
              <div className="weather-item">📊 <b>{text[lang].temp}</b> {weather.temp}</div>
              <div className="weather-item">💧 <b>{text[lang].humidity}</b> {weather.humidity}%</div>
              <div className="weather-item">💨 <b>{text[lang].wind}</b> {weather.wind}</div>
            </div>
            <p style={{marginTop: '15px', fontSize: '14px', color: '#1565c0', fontWeight: 'bold'}}>📡 Status: {weather.condition}</p>
          </div>
        )}

        <div className="mandi-card">
          <h3>{text[lang].mandiTitle}</h3>
          <div style={{maxHeight: '220px', overflowY: 'auto'}}>
            <table className="mandi-table">
              <thead>
                <tr>
                  <th>{text[lang].cropName}</th>
                  <th>{text[lang].price}</th>
                </tr>
              </thead>
              <tbody>
                {mandiPrices.map((item, idx) => (
                  <tr key={idx}>
                    <td>{lang === 'hi' ? item.name_hi : item.name_en}</td>
                    <td><b>{item.price}</b></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="faq-card">
        <h3>{text[lang].faqTitle}</h3>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div className={`faq-item ${openFaq === index ? 'active-faq' : ''}`} key={index}>
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <h4>{lang === 'hi' ? item.q_hi : item.q_en}</h4>
                <span className="faq-icon">{openFaq === index ? '▲' : '▼'}</span>
              </div>
              {openFaq === index && (
                <div className="faq-answer">
                  <p>{lang === 'hi' ? item.a_hi : item.a_en}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="history-card">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h3>{text[lang].historyTitle}</h3>
          {scanHistory.length > 0 && (
            <button onClick={clearStorageData} className="clear-data-btn">{text[lang].clearBtn}</button>
          )}
        </div>
        {scanHistory.length === 0 ? (
          <p className="empty-text">{text[lang].historyEmpty}</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>{text[lang].thTime}</th>
                <th>{text[lang].thCrop}</th>
                <th>{text[lang].thResult}</th>
              </tr>
            </thead>
            <tbody>
              {scanHistory.map((log, index) => (
                <tr key={index}>
                  <td><span className="time-badge">⏱️ {log.time}</span></td>
                  <td><b>{log.crop}</b></td>
                  <td>
                    <span className="result-badge">
                      {log.data ? (lang === 'hi' ? log.data.disease_hi : log.data.disease_en) : log.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="shops-card">
        <h3>{text[lang].shopTitle}</h3>
        <div className="shops-list">
          {nearbyShops.map((shop, idx) => (
            <div className="shop-item" key={idx}>
              <div>
                <h4>{shop.name}</h4>
                <p>📞 {shop.phone}</p>
              </div>
              <span className="distance-tag">📍 {shop.distance}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;