import React, { useState, useEffect } from 'react';
import { Droplets, Anchor, ArrowRight, Heart, MessageCircle, ShoppingBag, Waves, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [affirmation, setAffirmation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAffirmationSubmit = (e) => {
    e.preventDefault();
    if(affirmation.trim()) {
      setIsSubmitted(true);
      setAffirmation('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const quotes = [
    { id: 1, text: "Abundance flows like water. Stop building dams and start building reservoirs. You are meant to overflow.", author: "Founder, MDB Co." },
    { id: 2, text: "True luxury is fluid. It adapts, it overcomes, and it never forces itself. It just is.", author: "Million Dollar Mindset" },
    { id: 3, text: "Your frequency is the tide. Make sure it lifts every ship around you.", author: "Daily Affirmation" }
  ];

  const launches = [
    { id: 1, name: "The 'Deep Water' Myrtle Beach Collection", status: "Live Now", type: "Apparel", image: "https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, name: "Million Dollar Beauties: The Aqua Palette", status: "Dropping Soon", type: "Cosmetics", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, name: "Million Dollar Babies: Coastal Knits", status: "Waitlist Open", type: "Infant Wear", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop" }
  ];

  return (
    <div className="min-h-screen font-sans text-white bg-slate-950 relative overflow-x-hidden selection:bg-cyan-300 selection:text-slate-900">
      
      {/* Animated Oceanic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-950"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute top-[40%] left-[60%] w-96 h-96 bg-teal-400/10 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>
      
      {/* Navigation - Dynamic Glassmorphism */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-6'} px-4 sm:px-6`}>
        <div className={`max-w-7xl mx-auto transition-all duration-300 backdrop-blur-2xl border border-white/10 flex justify-between items-center shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] ${scrolled ? 'bg-slate-900/80 rounded-full px-6 py-3' : 'bg-white/5 rounded-3xl px-6 py-4'}`}>
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <Waves className="text-cyan-400 w-7 h-7 group-hover:scale-110 transition-transform" />
            <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase drop-shadow-md text-white hidden sm:block">
              MDB Co.
            </span>
          </div>
          
          <div className="flex space-x-4 sm:space-x-8 font-bold text-xs sm:text-sm uppercase tracking-widest text-white/70">
            <button onClick={() => setActiveTab('home')} className={`hover:text-cyan-300 transition-all ${activeTab === 'home' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`}>Vision</button>
            <button onClick={() => setActiveTab('community')} className={`hover:text-cyan-300 transition-all ${activeTab === 'community' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`}>Community</button>
            <button onClick={() => setActiveTab('vault')} className={`hover:text-cyan-300 transition-all ${activeTab === 'vault' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`}>Vault</button>
          </div>

          <button className="bg-cyan-400/20 backdrop-blur-md border border-cyan-400/50 text-cyan-50 px-4 sm:px-6 py-2 rounded-full font-black uppercase tracking-wider text-xs sm:text-sm hover:bg-cyan-400 hover:text-slate-900 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] flex items-center space-x-2">
            <ShoppingBag className="w-4 h-4 hidden sm:block" />
            <span>Shop</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 bg-blue-900/30 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30 text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.1)] mx-auto lg:mx-0">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  <span>Born by the water. Worn Worldwide.</span>
                </div>
                
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tighter drop-shadow-2xl">
                  WE ARE <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-teal-200 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                    ABUNDANCE.
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl lg:text-2xl font-light leading-relaxed text-blue-50 drop-shadow-md max-w-2xl mx-auto lg:mx-0">
                  Ridiculously rich in spirit, style, and truth. We've tapped into a frequency as deep and unstoppable as the ocean. Dive in. 
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                  <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm sm:text-lg hover:bg-white hover:text-blue-950 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center space-x-2 group">
                    <span>Join The Movement</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Founder / Brand Image Pure Glass Card */}
              <div className="relative mt-8 lg:mt-0 max-w-md mx-auto w-full">
                <div className="animate-[bounce_8s_infinite_alternate] hover:animate-none transition-all duration-500">
                  <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] aspect-square flex flex-col justify-end overflow-hidden group">
                    
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518837695005-2083093ee354?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000"></div>
                    
                    <div className="relative z-10 bg-slate-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                      <h3 className="text-xl sm:text-2xl font-black uppercase mb-2 text-cyan-300">The Founder's Truth</h3>
                      <p className="text-xs sm:text-sm text-blue-50/90 leading-relaxed font-medium">
                        "I built Million Dollar Bill Co. because I wanted to create a tidal wave of self-love. This isn't just a brand; it's a current. When you wear this, you aren't just making a statement—you are shifting the atmosphere."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMMUNITY TAB */}
        {activeTab === 'community' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300">The Daily Deposit</h2>
              <p className="text-lg sm:text-xl text-blue-100/80">Affirmations, courage, and real talk from the MDB Community. Let it wash over you.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {quotes.map((quote) => (
                <div key={quote.id} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl hover:bg-white/10 hover:border-cyan-400/30 transition-all cursor-pointer group shadow-lg flex flex-col justify-between">
                  <div>
                    <Sparkles className="text-cyan-400 w-8 h-8 mb-6 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                    <p className="text-xl sm:text-2xl font-bold mb-6 leading-tight text-white/90">"{quote.text}"</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-cyan-200/60">— {quote.author}</p>
                    <div className="mt-6 flex items-center space-x-4 border-t border-white/10 pt-4">
                      <button className="flex items-center space-x-2 text-sm text-white/50 hover:text-cyan-300 transition-colors">
                        <Heart className="w-4 h-4" /> <span>Amplify</span>
                      </button>
                      <button className="flex items-center space-x-2 text-sm text-white/50 hover:text-blue-300 transition-colors">
                        <MessageCircle className="w-4 h-4" /> <span>Discuss</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 backdrop-blur-2xl border border-cyan-400/20 p-6 sm:p-10 rounded-3xl text-center flex flex-col items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.1)] relative overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-black uppercase mb-4 text-white">Leave Your Mark</h3>
              <p className="mb-8 text-sm sm:text-base text-blue-100/80 max-w-lg mx-auto">Pour your own prosperity affirmation into the ocean for the 1 Billion+ family.</p>
              
              <form onSubmit={handleAffirmationSubmit} className="flex flex-col sm:flex-row w-full max-w-2xl relative z-10 gap-3 sm:gap-0">
                <input 
                  type="text" 
                  value={affirmation}
                  onChange={(e) => setAffirmation(e.target.value)}
                  placeholder="I am a magnet for..." 
                  className="w-full bg-slate-900/50 backdrop-blur-md border border-white/10 sm:border-r-0 rounded-full sm:rounded-r-none sm:rounded-l-full px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 transition-colors" 
                  required
                />
                <button type="submit" className="w-full sm:w-auto bg-cyan-500 text-slate-950 font-black uppercase px-8 py-4 rounded-full sm:rounded-l-none sm:rounded-r-full hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all flex justify-center items-center whitespace-nowrap">
                  {isSubmitted ? <CheckCircle2 className="w-6 h-6 animate-pulse" /> : 'Release'}
                </button>
              </form>

              <div className={`absolute top-4 bg-cyan-400/20 border border-cyan-400 text-cyan-300 px-4 py-2 rounded-full text-sm font-bold tracking-wider transition-all duration-500 ${isSubmitted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                Affirmation released to the ocean.
              </div>
            </div>
          </div>
        )}

        {/* VAULT TAB (Products/Collabs) */}
        {activeTab === 'vault' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300">The Vault</h2>
              <p className="text-lg sm:text-xl text-blue-100/80">Exclusive drops, future collabs, and the artifacts of abundance.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {launches.map((launch) => (
                <div key={launch.id} className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-2xl">
                  
                  <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity group-hover:scale-110 group-hover:opacity-50 transition-all duration-1000" style={{backgroundImage: `url(${launch.image})`}}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="inline-block bg-cyan-400/20 border border-cyan-400/50 text-cyan-300 text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                      {launch.status}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase leading-tight mb-2 text-white drop-shadow-md">{launch.name}</h3>
                    <p className="text-cyan-200/80 font-bold uppercase tracking-widest text-xs sm:text-sm mb-6 drop-shadow-sm">{launch.type}</p>
                    
                    <button className="w-full bg-white/10 hover:bg-cyan-400 hover:text-slate-950 hover:border-cyan-400 backdrop-blur-md border border-white/20 text-white font-bold py-3 sm:py-4 rounded-full uppercase tracking-wider text-xs sm:text-sm transition-all flex justify-center items-center space-x-2 group/btn">
                      <span>{launch.status === 'Live Now' ? 'Secure Yours' : 'Join Waitlist'}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}