import { useState, useMemo } from 'react';
import { Menu, X, ChevronRight, Sparkles, Heart, Coffee, Quote, Users, ArrowRight, Link, Bird, Fingerprint, Loader2, Anchor } from 'lucide-react';

// --- MINIFIED SVG ICONS ---
const TikTokIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>;
const SnapchatIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.11 1.74c-2.3 0-4.64.95-5.9 3.12-.66 1.15-.88 2.66-.75 4.09.28 2.94 1.83 5.37 3.55 7.6.48.62 1 1.25 1.56 1.84.45.47.88.94 1.43 1.34.34.25.75.46 1.18.5a2 2 0 0 0 1.25-.33c.48-.33.9-.76 1.3-1.18.6-.65 1.17-1.32 1.7-2.02 1.74-2.27 3.26-4.75 3.51-7.75.14-1.5-.12-3.03-.8-4.2-1.3-2.22-3.64-3.01-6.03-3.01zm-1.8 15.68c-.64-.53-1.28-1.08-1.93-1.63-.44-.38-.9-.76-1.32-1.16a29.13 29.13 0 0 1-2.9-3.23c-.34-.44-.65-.92-.88-1.42-.36-.78-.5-1.65-.45-2.52.05-1.05.3-2.1.8-3.03.9-1.66 2.5-2.82 4.4-3.15 1.73-.3 3.52 0 5 1.01 1.45 1 2.45 2.5 2.76 4.25.17.97.08 1.96-.23 2.88-.28.84-.7 1.63-1.2 2.34-1.1 1.54-2.4 2.94-3.66 4.35-.45.5-1.04 1.05-1.68 1.12-.22.02-.45-.03-.63-.16l-.08-.05z"/></svg>;
const PinterestIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.105 0 7.301 2.923 7.301 6.822 0 4.084-2.574 7.37-6.147 7.37-1.2 0-2.328-.624-2.714-1.363l-.74 2.818c-.268 1.023-.996 2.302-1.488 3.084 1.144.35 2.365.539 3.626.539 6.623 0 11.988-5.367 11.988-11.988C24 5.367 18.64 0 12.017 0z"/></svg>;

// --- GEMINI API INTEGRATION ---
const apiKey = ""; 
const generateMantraWithGemini = async (mood) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: `The user is feeling or aiming for: "${mood}". Generate a very short personal mantra (1 or 2 sentences max) to give them strength today. It must reflect prosperity, peace, and confidence.` }] }],
    systemInstruction: { parts: [{ text: "You are the voice of the luxury brand 'Million Dollar Bill', originating from Myrtle Beach. Your values are Unity, Peace, Love, Prosperity, and Authenticity. Speak in a confident, luxurious, and inspiring tone. Always respond in English." }] }
  };
  const delays = [1000, 2000, 4000, 8000, 16000];
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Prosperity is a journey, not a destination.";
    } catch (error) {
      if (attempt === 5) throw error;
      await new Promise(resolve => setTimeout(resolve, delays[attempt]));
    }
  }
};

const GeminiMantraGenerator = () => {
  const [mood, setMood] = useState("");
  const [mantra, setMantra] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!mood.trim()) return;
    setLoading(true); setError(""); setMantra("");
    try {
      const result = await generateMantraWithGemini(mood);
      setMantra(result);
    } catch (err) {
      setError("Unable to channel your aura right now. Please try again later.");
    } finally { setLoading(false); }
  };

  return (
    <div className="hyper-glass rounded-3xl p-8 mb-16 relative overflow-hidden group max-w-4xl mx-auto">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
      <div className="relative z-10 text-center">
        <h3 className="text-3xl font-extrabold text-white mb-4 flex items-center justify-center gap-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <Sparkles className="text-[#FFD662]" /> Personal Aura Generator ✨ <Sparkles className="text-[#FFD662]" />
        </h3>
        <p className="text-gray-100 mb-6 font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">How are you feeling today? Let our AI craft your bespoke mantra.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <input 
            type="text" value={mood} onChange={(e) => setMood(e.target.value)}
            placeholder="Ex: I need confidence for a big meeting..." 
            className="w-full sm:w-96 bg-black/30 backdrop-blur-md border border-white/30 rounded-full px-6 py-4 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-gray-300 shadow-inner"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button 
            onClick={handleGenerate} disabled={loading || !mood.trim()}
            className="hover-bounce bg-gradient-to-r from-[#FFD662] to-[#D4AF37] text-[#0B132B] px-8 py-4 rounded-full font-extrabold uppercase tracking-widest shadow-[0_5px_15px_rgba(212,175,55,0.4)] disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Generate ✨"}
          </button>
        </div>
        {error && <p className="text-red-400 font-bold drop-shadow-md">{error}</p>}
        {mantra && (
          <div className="mt-8 p-6 bg-black/20 border-t border-l border-white/30 border-b border-r border-white/5 rounded-2xl animate-in fade-in duration-700 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]">
            <Quote className="h-6 w-6 text-[#FFD662] mb-2 mx-auto drop-shadow-md" />
            <p className="text-xl md:text-2xl text-white font-bold italic leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">"{mantra}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN APPLICATION ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); 
  const [hoveredTenet, setHoveredTenet] = useState(null);

  const STORE_URL = "https://themilliondollarbill.us.com";

  // --- DYNAMIC CONTENT ---
  const allQuotes = [
    { text: "Prosperity isn't just about what's in your pocket; it's about the peace in your spirit and the authenticity in your step.", author: "Million Dollar Bill" },
    { text: "The ocean doesn't apologize for its waves. Never apologize for your energy.", author: "Myrtle Beach Roots" },
    { text: "Unity is the highest frequency. When we rise together, the tide lifts all ships.", author: "Aeterna Opera" },
    { text: "Authenticity is your ultimate currency. Never trade it for temporary approval.", author: "The MD Mindset" },
    { text: "Peace is not the absence of storms, but the deeply anchored confidence within them.", author: "Inner Wealth" },
    { text: "True luxury is waking up with a clear mind, a full heart, and an unstoppable spirit.", author: "Million Dollar Bill" },
    { text: "Love isn't just an emotion; it's the foundation of every lasting empire.", author: "Aeterna Opera" },
    { text: "Your aura introduces you before you even speak. Make sure it says 'Prosperity'.", author: "The MD Mindset" },
    { text: "Abundance flows like water. Stop building dams and start building reservoirs.", author: "Million Dollar Bill" },
    { text: "True luxury is fluid. It adapts, it overcomes, and it never forces itself. It just is.", author: "Aeterna Opera" },
    { text: "Your frequency is the tide. Make sure it lifts every ship around you.", author: "Myrtle Beach Roots" },
    { text: "Wealth is loud, but prosperity is a quiet, unshakeable confidence.", author: "The MD Mindset" }
  ];

  const dailyBackgrounds = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2560", 
    "https://images.unsplash.com/photo-1518837695005-2083093ee354?auto=format&fit=crop&q=80&w=2560", 
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2560", 
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80&w=2560", 
    "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=2560", 
    "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&q=80&w=2560"  
  ];

  const dailyQuotes = useMemo(() => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const startIndex = seed % allQuotes.length;
    const selection = [];
    for(let i = 0; i < 8; i++) selection.push(allQuotes[(startIndex + i) % allQuotes.length]);
    return selection;
  }, []);

  const currentBgImage = useMemo(() => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    return dailyBackgrounds[seed % dailyBackgrounds.length];
  }, []);

  // --- 12-HOUR MANIFESTO ROTATION ---
  const manifestoImages = [
    "/1770360549744(6).png",
    "/1770360549744(3).png",
    "/Untitled (1).png",
    "/1765990717525_3_4ddff95e-9bec-4055-a255-414ae260218a.png",
    "/1745624804850.jpg",
    "/1745624932376.jpg"
  ];

  const currentManifestoBg = useMemo(() => {
    // 12 hours in milliseconds: 12 * 60 * 60 * 1000 = 43200000
    const cycleMs = 43200000;
    const index = Math.floor(Date.now() / cycleMs) % manifestoImages.length;
    return manifestoImages[index];
  }, []);

  // --- PAGE COMPONENTS ---

  const renderHomePage = () => (
    <div className="animate-in fade-in duration-700">
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0B132B] via-[#003B46] to-[#D4AF37]/30 z-0" />
        <div className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-overlay z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000')" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="hyper-glass inline-flex items-center gap-2 px-6 py-2 rounded-full mb-6 text-[#FFD662] font-black text-sm tracking-widest uppercase">
            <Sparkles size={16} /> <span>Born in Myrtle Beach</span> <Sparkles size={16} />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-2xl">
            Live the <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD662] via-[#D4AF37] to-[#FFF0B3]">Million Dollar</span> Life.
          </h2>
          <p className="mt-4 max-w-2xl text-xl md:text-2xl text-white mx-auto mb-10 font-bold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Unity. Peace. Love. Prosperity. <br/> Step into the energy and look absolutely incredible.
          </p>
          <a href={STORE_URL} className="hover-bounce bg-gradient-to-r from-[#FFD662] to-[#D4AF37] text-[#0B132B] px-10 py-5 rounded-full flex items-center justify-center space-x-2 text-lg font-extrabold uppercase tracking-widest shadow-[0_10px_30px_rgba(212,175,55,0.4)]">
            <span>Shop the Vibe</span> <ChevronRight className="h-6 w-6" />
          </a>
        </div>
      </section>

      <section className="py-24 bg-[#0B132B] border-t border-white/10 relative overflow-hidden flex items-center justify-center min-h-[60vh]">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none transition-all duration-700 ease-out z-0">
          <div className={`transform transition-all duration-700 ${hoveredTenet === 0 ? 'scale-100 translate-y-0 opacity-100' : 'scale-50 translate-y-20 opacity-0'} absolute`}><Link className="w-80 h-80 text-[#D4AF37]" /></div>
          <div className={`transform transition-all duration-700 ${hoveredTenet === 1 ? 'scale-100 translate-y-0 opacity-100' : 'scale-50 translate-y-20 opacity-0'} absolute`}><Bird className="w-80 h-80 text-blue-300" /></div>
          <div className={`transform transition-all duration-700 ${hoveredTenet === 2 ? 'scale-100 translate-y-0 opacity-100' : 'scale-50 translate-y-20 opacity-0'} absolute`}><Fingerprint className="w-80 h-80 text-[#FFD662]" /></div>
          <div className={`transform transition-all duration-700 ${hoveredTenet === 3 ? 'scale-100 translate-y-0 opacity-100' : 'scale-50 translate-y-20 opacity-0'} absolute`}><Heart className="w-80 h-80 text-pink-500" /></div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-[150px] opacity-20 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
          <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-12 drop-shadow-lg">Prosperity is a <span className="text-[#D4AF37] italic">Mindset</span>.</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
            {['Unity', 'Peace', 'Authenticity', 'Love'].map((value, idx) => (
              <div key={idx} onMouseEnter={() => setHoveredTenet(idx)} onMouseLeave={() => setHoveredTenet(null)}
                className={`hyper-glass rounded-2xl p-8 transition-all duration-500 cursor-pointer overflow-hidden relative group ${hoveredTenet === idx ? '-translate-y-4 shadow-[0_20px_40px_rgba(212,175,55,0.3)]' : 'hover:-translate-y-2'}`}>
                <div className="relative z-10">
                  <span className="text-[#FFD662] text-4xl font-black block mb-3 group-hover:scale-110 transition-transform drop-shadow-md">{`0${idx + 1}`}</span>
                  <span className="text-white font-bold tracking-widest uppercase text-sm drop-shadow-md">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderManifestoPage = () => (
    <div className="min-h-screen relative animate-in fade-in duration-1000 pt-32 pb-24 flex flex-col justify-center">
      {/* 12-Hour Rotating Background with Fallback for the Preview */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-1000 opacity-100" 
        style={{ backgroundImage: `url('${currentManifestoBg}'), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2560')` }} 
      />
      
      {/* Zero tint overlay - letting the raw image and hyper-glass refraction shine perfectly */}
      <div className="absolute inset-0 bg-transparent z-0" /> 
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-10">
        <div className="hyper-glass rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]">
          {/* Inner glass lighting effect */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
          
          <div className="text-center mb-12 relative z-10">
            <Anchor className="h-16 w-16 text-[#FFD662] mx-auto mb-6 drop-shadow-lg" />
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">The Manifesto</h2>
            <p className="text-xl text-[#FFD662] font-bold tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Born in Myrtle Beach. Built for the World.</p>
          </div>
          
          <div className="space-y-8 text-lg md:text-xl text-white font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] relative z-10">
            <p>
              Million Dollar Bill isn't just a label; it is a living, breathing frequency. Founded on the shores of Myrtle Beach, South Carolina, we realized that true luxury doesn't come from a price tag. It comes from an aura of absolute confidence, unshakeable peace, and radical authenticity.
            </p>
            <p>
              We believe in <strong className="text-[#FFD662]">Unity</strong>—that a rising tide lifts all ships. We believe in <strong className="text-[#FFD662]">Peace</strong>—the quiet power of knowing exactly who you are. We believe in <strong className="text-[#FFD662]">Love</strong> as the ultimate creative force, and <strong className="text-[#FFD662]">Prosperity</strong> as a natural byproduct of living authentically.
            </p>
            <p>
              This energy flows through everything we touch. Whether you are stepping into your power with our apparel, glowing with <span className="italic text-[#FFD662]">Million Dollar Beauties</span> cosmetics, raising the next generation of <span className="italic text-[#FFD662]">Million Dollar Babies</span>, or starting your morning with our <span className="italic text-[#FFD662]">Breakfast & Brunch</span> collection—you are consuming and projecting high-frequency energy.
            </p>
            <div className="text-center pt-8 border-t border-white/20 mt-12">
              <p className="text-2xl font-black italic text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">Aeterna Opera.</p>
              <p className="text-sm tracking-widest text-[#FFD662] mt-2 font-bold uppercase">The Eternal Work</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommunityPage = () => (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-[#0B132B] to-[#141b33] animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Users className="h-16 w-16 text-[#D4AF37] mx-auto mb-6" />
          <h2 className="text-5xl font-extrabold text-white mb-4">The Inner Circle</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Connect with a community that celebrates authenticity, peace, and living the Million Dollar lifestyle.</p>
        </div>
        <div className="hyper-glass rounded-3xl p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-md">Community Features Coming Soon</h3>
          <p className="text-white font-bold mb-8 drop-shadow-md">We are building an exclusive space for events, networking, and celebrating life together. Stay tuned.</p>
          <a href={STORE_URL} className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0B132B] px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-transform">
            Shop the Looks Meantime <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </div>
  );

  const renderQuotesPage = () => (
    <div className="min-h-screen relative animate-in fade-in duration-1000 pt-32 pb-24 flex flex-col justify-center">
      {/* 24-HOUR ROTATING MURAL */}
      <div className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-1000 opacity-100" style={{ backgroundImage: `url('${currentBgImage}')` }} />
      {/* Zero tint overlay to ensure Hyper-Glass refraction is highly visible */}
      <div className="absolute inset-0 bg-transparent z-0" /> 

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center mb-12">
          <div className="hyper-glass inline-flex items-center gap-2 px-6 py-2 rounded-full mb-8 text-[#FFD662] font-black text-xs tracking-widest uppercase">
            <Sparkles size={14} /> <span>Curated for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span> <Sparkles size={14} />
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">Daily Inspired Energy</h2>
          <p className="text-xl text-white max-w-2xl mx-auto font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Daily fuel for the mind and soul. New quotes and a new mural every 24 hours.</p>
        </div>

        <GeminiMantraGenerator />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {dailyQuotes.map((quote, idx) => (
            <div key={idx} className="hyper-glass rounded-3xl p-8 relative group hover:-translate-y-3 transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-default">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D4AF37] rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-0"></div>
              <div className="relative z-10">
                <Quote className="h-8 w-8 text-[#FFD662] mb-4 transform group-hover:scale-110 duration-500 drop-shadow-lg" />
                <p className="text-lg text-white font-bold italic leading-relaxed mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">"{quote.text}"</p>
              </div>
              <div className="relative z-10 border-t border-white/20 pt-4 mt-auto">
                <p className="text-[#FFD662] font-black tracking-widest uppercase text-xs drop-shadow-md">— {quote.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-white font-sans bg-[#0B132B] selection:bg-[#D4AF37] selection:text-[#0B132B]">
      {/* THE HYPER-GLASS CSS ENGINE
        This creates the ultra-realistic, tactile ice/crystal floating effect!
      */}
      <style dangerouslySetInnerHTML={{__html: `
        .hyper-glass {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
          backdrop-filter: blur(24px) saturate(160%) brightness(1.1);
          -webkit-backdrop-filter: blur(24px) saturate(160%) brightness(1.1);
          border-top: 1px solid rgba(255, 255, 255, 0.5);
          border-left: 1px solid rgba(255, 255, 255, 0.5);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 15px 35px 0 rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.15);
        }
        .glass-nav {
          background: rgba(11, 19, 43, 0.1);
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }
        .hover-bounce { transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .hover-bounce:hover { transform: translateY(-5px) scale(1.05); }
      `}} />

      <header className="glass-nav fixed top-0 w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => setCurrentPage('home')}>
              <h1 className="text-2xl md:text-3xl font-black tracking-widest text-white uppercase group-hover:scale-105 transition-transform duration-300 drop-shadow-md">
                Million Dollar <span className="text-[#D4AF37]">Bill</span>
              </h1>
            </div>

            <nav className="hidden lg:flex space-x-6 items-center">
              <button onClick={() => setCurrentPage('home')} className={`text-sm font-bold tracking-wider uppercase drop-shadow-md transition-colors ${currentPage === 'home' ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}>Home</button>
              <button onClick={() => setCurrentPage('manifesto')} className={`text-sm font-bold tracking-wider uppercase drop-shadow-md transition-colors ${currentPage === 'manifesto' ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}>Our Manifesto</button>
              <button onClick={() => setCurrentPage('community')} className={`text-sm font-bold tracking-wider uppercase drop-shadow-md transition-colors ${currentPage === 'community' ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}>Community</button>
              <button onClick={() => setCurrentPage('quotes')} className={`text-sm font-bold tracking-wider uppercase drop-shadow-md transition-colors ${currentPage === 'quotes' ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}>Inspired Quotes</button>
              <a href={STORE_URL} className="text-sm font-bold tracking-wider uppercase text-white hover:text-[#D4AF37] flex items-center gap-1 transition-colors drop-shadow-md ml-4 border border-white/20 px-4 py-2 rounded-full hyper-glass hover:bg-white/10">
                Shop Store <ArrowRight size={16} />
              </a>
            </nav>

            <div className="flex items-center lg:hidden">
              <button className="p-2 text-white drop-shadow-md" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden glass-nav absolute w-full border-t border-white/10 bg-[#0B132B]/95 backdrop-blur-3xl">
            <div className="px-6 pt-4 pb-8 space-y-6 text-center">
              <button onClick={() => {setCurrentPage('home'); setIsMenuOpen(false);}} className="block w-full text-xl font-bold text-white hover:text-[#D4AF37] uppercase">Home</button>
              <button onClick={() => {setCurrentPage('manifesto'); setIsMenuOpen(false);}} className="block w-full text-xl font-bold text-white hover:text-[#D4AF37] uppercase">Our Manifesto</button>
              <button onClick={() => {setCurrentPage('community'); setIsMenuOpen(false);}} className="block w-full text-xl font-bold text-white hover:text-[#D4AF37] uppercase">Community</button>
              <button onClick={() => {setCurrentPage('quotes'); setIsMenuOpen(false);}} className="block w-full text-xl font-bold text-white hover:text-[#D4AF37] uppercase">Inspired Quotes</button>
              <a href={STORE_URL} className="block w-full text-xl font-black text-[#D4AF37] uppercase pt-4 border-t border-white/10">Go To Store →</a>
            </div>
          </div>
        )}
      </header>

      <main>
        {currentPage === 'home' && renderHomePage()}
        {currentPage === 'manifesto' && renderManifestoPage()}
        {currentPage === 'community' && renderCommunityPage()}
        {currentPage === 'quotes' && renderQuotesPage()}
      </main>

      <footer className="bg-[#050914] pt-20 pb-10 border-t border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                Million Dollar <span className="text-[#D4AF37]">Bill</span> <Sparkles className="text-[#D4AF37]" size={24}/>
              </h2>
              <p className="text-gray-400 max-w-sm mb-8 text-lg leading-relaxed font-medium">
                Bringing the Myrtle Beach heat to the world. A lifestyle brand built on Unity, Peace, Love, and absolute Prosperity.
              </p>
              <div className="inline-block border border-[#D4AF37]/50 text-[#D4AF37] px-6 py-2 rounded-full font-bold tracking-widest uppercase text-sm hyper-glass">
                Aeterna Opera
              </div>
            </div>
            
            <div className="md:col-span-3">
              <h4 className="text-white font-black mb-6 uppercase tracking-widest text-sm">The Ecosystem</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><a href={STORE_URL} className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">Main Store <ArrowRight size={14}/></a></li>
                <li><a href={`${STORE_URL}/collections/million-dollar-babies`} className="hover:text-[#D4AF37] transition-colors">Million Dollar Babies</a></li>
                <li><a href={`${STORE_URL}/collections/million-dollar-beauties`} className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">Million Dollar Beauties <Heart size={14} className="text-pink-400"/></a></li>
                <li><a href={`${STORE_URL}/collections/breakfast-brunch`} className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">MD Breakfast / Brunch <Coffee size={14}/></a></li>
              </ul>
            </div>
            
            <div className="md:col-span-4">
              <h4 className="text-white font-black mb-6 uppercase tracking-widest text-sm">Join The Energy</h4>
              <p className="text-gray-400 mb-6 font-medium">Follow us across the web for exclusive drops, wild moments, and daily inspiration.</p>
              <div className="flex flex-wrap gap-4">
                <a href="https://instagram.com/milliondollarbillco" target="_blank" rel="noreferrer" className="hyper-glass p-3 rounded-full hover:-translate-y-1 transition-all"></a>
                <a href="https://facebook.com/milliondollarbillco" target="_blank" rel="noreferrer" className="hyper-glass p-3 rounded-full hover:-translate-y-1 transition-all"></a>
                <a href="https://tiktok.com/@millions1023" target="_blank" rel="noreferrer" className="hyper-glass p-3 rounded-full hover:-translate-y-1 transition-all"><div className="text-white"><TikTokIcon /></div></a>
                <a href="https://snapchat.com/coolbreezemb" target="_blank" rel="noreferrer" className="hyper-glass p-3 rounded-full hover:-translate-y-1 transition-all"><div className="text-white"><SnapchatIcon /></div></a>
                <a href="https://pinterest.com/themilliondollarbillco" target="_blank" rel="noreferrer" className="hyper-glass p-3 rounded-full hover:-translate-y-1 transition-all"><div className="text-white"><PinterestIcon /></div></a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 font-medium text-sm">
            <p>&copy; {new Date().getFullYear()} Million Dollar Bill Co. | Myrtle Beach, SC</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
