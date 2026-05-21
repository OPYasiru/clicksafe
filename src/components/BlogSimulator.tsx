import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Search, 
  Menu, 
  ArrowRight, 
  User, 
  Calendar, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Share2, 
  Smartphone, 
  Monitor, 
  X,
  PlusCircle,
  Hash,
  BookOpen
} from 'lucide-react';
import { CustomizerState, Post } from '../types';

interface BlogSimulatorProps {
  customizer: CustomizerState;
  posts: Post[];
  onAddPost: (post: Post) => void;
}

export default function BlogSimulator({ customizer, posts, onAddPost }: BlogSimulatorProps) {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>('');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Draft creator state
  const [isDraftCreatorOpen, setIsDraftCreatorOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftCategory, setDraftCategory] = useState<'Scam Alerts' | 'AI Tools' | 'Tech Updates' | 'Safety Guides'>('Scam Alerts');
  const [draftSnippet, setDraftSnippet] = useState('');
  const [draftContent, setDraftContent] = useState('');
  const [draftImage, setDraftImage] = useState('');

  const currentThemeStyles = {
    '--color-navy': customizer.colors.navy,
    '--color-blue': customizer.colors.blue,
    '--color-light-blue': customizer.colors.lightBlue,
    '--color-warn-red': customizer.colors.warningRed,
    '--color-warn-orange': customizer.colors.warningOrange,
    '--color-text-dark': customizer.colors.textDark,
    '--color-text-gray': customizer.colors.textGray,
    '--color-background': customizer.colors.background,
    '--color-white': customizer.colors.white,
  } as React.CSSProperties;

  // Filter posts based on simulated routes
  const filteredPosts = useMemo(() => {
    if (currentPath.startsWith('/search/label/')) {
      const label = decodeURIComponent(currentPath.replace('/search/label/', ''));
      return posts.filter(p => p.category.toLowerCase() === label.toLowerCase());
    }
    if (currentPath.startsWith('/search?q=')) {
      const q = decodeURIComponent(currentPath.replace('/search?q=', '')).toLowerCase();
      return posts.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.snippet.toLowerCase().includes(q) || 
        p.content.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [currentPath, posts]);

  // Find active single post if path is a post slug
  const activePost = useMemo(() => {
    if (currentPath.startsWith('/p/')) {
      const slug = currentPath.replace('/p/', '');
      return posts.find(p => p.slug === slug);
    }
    return null;
  }, [currentPath, posts]);

  // Popular posts
  const popularPosts = useMemo(() => {
    return posts.slice(0, 3);
  }, [posts]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveSearchTerm(searchQuery);
      setCurrentPath(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleCreateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle || !draftSnippet || !draftContent) {
      alert('Please fill out Title, Snippet, and Article Body.');
      return;
    }

    const newPost: Post = {
      id: String(Date.now()),
      title: draftTitle,
      slug: draftTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      date: 'Just Now',
      author: 'You (Simulator)',
      category: draftCategory,
      snippet: draftSnippet,
      content: draftContent,
      thumbnailUrl: draftImage || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    };

    onAddPost(newPost);
    navigateTo(`/p/${newPost.slug}`);
    
    // Reset values
    setDraftTitle('');
    setDraftSnippet('');
    setDraftContent('');
    setDraftImage('');
    setIsDraftCreatorOpen(false);
  };

  const triggerPostTemplate = (type: 'scam' | 'ai' | 'tech') => {
    if (type === 'scam') {
      setDraftTitle('New Delivery Status WhatsApp Link Scam Alert');
      setDraftCategory('Scam Alerts');
      setDraftSnippet('Received a message from an unknown number warning about a package held back in delivery warehouses? Careful, it is an dangerous phish link.');
      setDraftContent(`
<p>In the last 48 hours, thousands of users reported receiving direct messages pretending to be official postal services requiring verification details.</p>

<div class="warning-box">
  <strong>🚨 URGENT RED FLAGS:</strong> Legitimate postal systems never reach out through WhatsApp channels or require dynamic debit card inputs to unlock standard packages.
</div>

<h3>Details of the link trap</h3>
<p>The scam is delivered with extreme pressure: <em>"Your package delivery has been stopped due to incorrect street numbers. Please update within 2 hours or package will be returned to sender."</em></p>

<div class="checklist-box">
  <ul>
    <li>The sender operates a standard personal phone number instead of official business credentials.</li>
    <li>Clicking redirects to a site asking for home address info and OTP bypass confirmations.</li>
  </ul>
</div>

<a class="safe-cta" href="#avoid-phish">Report Fake SMS Now</a>
<div class="source-note">Verified by SafeClick Lab. Never key in physical addresses.</div>
      `);
      setDraftImage('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800');
    } else if (type === 'ai') {
      setDraftTitle('Claude 3.7 Sonnet: Essential Data Safety Check');
      setDraftCategory('AI Tools');
      setDraftSnippet('Anthropic published their upgraded Claude system. Find out how to audit your chat archives and configure optimal privacy layers.');
      setDraftContent(`
<p>The newest Claude model includes powerful deep-reasoning APIs, but handles default training streams the same. By optimizing settings, you can harness state-of-the-art parameters securely.</p>

<div class="info-box">
  <strong>💡 PRO PRIVACY SETTING:</strong> If you are subscribed to Claude Pro tier, you have an opt-out banner in main settings panel to disable data training hooks. Change this option immediately to keep files safe.
</div>

<h3>3 Steps to verify data locks</h3>
<ol>
  <li>Open Claude User Menu profile on bottom-left.</li>
  <li>Scroll to "Settings" -> "Data Control".</li>
  <li>Locate the training toggles and press Disable.</li>
</ol>
<a class="safe-cta" href="#safe-ai">Find Safe AI Workflows</a>
      `);
      setDraftImage('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800');
    } else {
      setDraftTitle('Emergency Chrome v130 Security Vulnerability Patched');
      setDraftCategory('Tech Updates');
      setDraftSnippet('Our research team detected active zero-day sandbox escape exploits targeting web rendering kits. Force a Chrome update now to secure your system.');
      setDraftContent(`
<p>Major browsers built on the Chromium codebase released critical software updates to repair memory overflow glitches exploited inside active web applications.</p>

<div class="warning-box">
  <strong>⚠️ MANDATORY ACTION REQUIRED:</strong> Open your Chrome menu -> Help -> About, and wait for Chrome to download security patch version 130.0.6723.91.
</div>

<h3>Vulnerability Risks Explained</h3>
<p>Without the latest system patch, visiting malicious or intercepted web portals can grant criminals authority to read localized session cookie tokens of sensitive bank vaults.</p>

<a class="safe-cta" href="#patch">Trigger Emergency Browser Updater</a>
      `);
      setDraftImage('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800');
    }
    setIsDraftCreatorOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 overflow-hidden border border-slate-800 rounded-2xl shadow-2xl transition-all duration-300">
      
      {/* Device Viewport & Draft simulation controls bar */}
      <div className="bg-[#0B1220] px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 text-white select-none">
        
        {/* Left header */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono font-extrabold tracking-wider text-slate-300 uppercase">LIVE PREVIEW ENVIRONMENT</span>
        </div>

        {/* Viewport Selectors */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button 
            type="button"
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
              viewport === 'desktop' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/15' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Desktop
          </button>
          <button 
            type="button"
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
              viewport === 'mobile' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/15' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile
          </button>
        </div>

        {/* Simulator controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsDraftCreatorOpen(!isDraftCreatorOpen);
            }}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg shadow-emerald-600/10 cursor-pointer transition-all active:scale-[0.98]"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Write Custom Post
          </button>
          
          <button
            type="button"
            onClick={() => navigateTo('/')}
            className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer"
          >
            Home
          </button>
        </div>
      </div>

      {/* Main Simulation Sandbox area */}
      <div className="flex-1 bg-slate-950 overflow-y-auto p-4 md:p-6 flex justify-center items-start transition-all duration-300 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        {/* Device wrapper Frame */}
        <div 
          style={currentThemeStyles}
          className={`bg-slate-50 text-slate-800 transition-all duration-300 relative border shadow-2xl ${
            viewport === 'mobile' 
              ? 'w-[375px] max-w-full rounded-[40px] border-[12px] border-slate-800 min-h-[760px] my-4 overflow-hidden shadow-2xl ring-4 ring-slate-800/10' 
              : 'w-full max-w-6xl min-h-screen rounded-2xl border-slate-800/80 overflow-hidden'
          }`}
        >
          
          {/* Internal Device Simulator screen layout */}
          <div className="h-full flex flex-col font-sans">
            
            {/* 1. Header component */}
            <header 
              className="sticky top-0 z-50 backdrop-blur-md border-b shadow-lg transition-colors"
              style={{ 
                backgroundColor: customizer.colors.navy + 'F2', // transparent dynamic navy
                borderColor: customizer.colors.blue + '2D'
              }}
            >
              <div className="px-4 py-3 flex items-center justify-between max-w-6xl mx-auto">
                
                {/* Brand Logo & Icon */}
                <span 
                  onClick={() => navigateTo('/')} 
                  className="flex items-center gap-2.5 text-white font-display font-extrabold text-base md:text-lg cursor-pointer hover:opacity-90 select-none"
                >
                  <span 
                    className="p-1.5 rounded-xl border flex items-center justify-center transition-colors shadow-md"
                    style={{ 
                      color: customizer.colors.blue,
                      backgroundColor: customizer.colors.blue + '1A',
                      borderColor: customizer.colors.blue + '33'
                    }}
                  >
                    <Shield className="w-5 h-5" />
                  </span>
                  <span className="tracking-tight">{customizer.brandName}</span>
                </span>

                {/* Navigation Menus for Desktop */}
                {viewport === 'desktop' && (
                  <nav className="flex items-center gap-5 text-xs font-bold font-mono tracking-wider">
                    <button 
                      type="button"
                      onClick={() => navigateTo('/')} 
                      className={`transition-colors duration-200 cursor-pointer ${currentPath === '/' ? 'text-white' : 'text-slate-300 hover:text-white'}`}
                      style={currentPath === '/' ? { color: customizer.colors.blue } : undefined}
                    >
                      Home
                    </button>
                    <button 
                      type="button"
                      onClick={() => navigateTo('/search/label/Scam Alerts')} 
                      className={`transition-colors duration-200 cursor-pointer ${currentPath === '/search/label/Scam Alerts' ? 'text-white' : 'text-slate-300 hover:text-white'}`}
                      style={currentPath === '/search/label/Scam Alerts' ? { color: customizer.colors.blue } : undefined}
                    >
                      Scam Alerts
                    </button>
                    <button 
                      type="button"
                      onClick={() => navigateTo('/search/label/AI Tools')} 
                      className={`transition-colors duration-200 cursor-pointer ${currentPath === '/search/label/AI Tools' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                      style={currentPath === '/search/label/AI Tools' ? { color: customizer.colors.blue } : undefined}
                    >
                      AI Tools
                    </button>
                    <button 
                      type="button"
                      onClick={() => navigateTo('/search/label/Tech Updates')} 
                      className={`transition-colors duration-200 cursor-pointer ${currentPath === '/search/label/Tech Updates' ? 'text-white' : 'text-slate-300 hover:text-white'}`}
                      style={currentPath === '/search/label/Tech Updates' ? { color: customizer.colors.blue } : undefined}
                    >
                      Tech Updates
                    </button>
                    <button 
                      type="button"
                      onClick={() => navigateTo('/search/label/Safety Guides')} 
                      className={`transition-colors duration-200 cursor-pointer ${currentPath === '/search/label/Safety Guides' ? 'text-white' : 'text-slate-300 hover:text-white'}`}
                      style={currentPath === '/search/label/Safety Guides' ? { color: customizer.colors.blue } : undefined}
                    >
                      Safety Guides
                    </button>
 
                    {/* Navbar Search Form */}
                    <form 
                      onSubmit={handleSearchSubmit} 
                      className="flex items-center bg-white/5 border border-white/10 rounded-xl py-1 px-3 ml-2 transition-all duration-200"
                      style={{ focusWithin: `border-color: ${customizer.colors.blue}` }}
                    >
                      <input 
                        type="text" 
                        placeholder="Search safety tips..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent text-white text-xs outline-none w-28 focus:w-36 transition-all placeholder-slate-400"
                      />
                      <button 
                        type="submit" 
                        className="text-slate-400 cursor-pointer hover:text-white"
                        style={{ color: customizer.colors.blue }}
                      >
                        <Search className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </nav>
                )}

                {/* Hamburger dropdown for Mobile Viewport */}
                {viewport === 'mobile' && (
                  <button 
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-white hover:text-slate-300 p-1"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Mobile Drawer Menu Links */}
              {viewport === 'mobile' && isMobileMenuOpen && (
                <div className="bg-[#0B1220] border-t border-white/10 px-4 py-4 space-y-3 flex flex-col items-stretch text-sm">
                  <button 
                    type="button"
                    onClick={() => navigateTo('/')} 
                    className={`text-left py-2 border-b border-white/5 font-semibold transition-colors ${currentPath === '/' ? 'text-[#2563EB]' : 'text-slate-300'}`}
                  >
                    Home
                  </button>
                  <button 
                    type="button"
                    onClick={() => navigateTo('/search/label/Scam Alerts')} 
                    className={`text-left py-2 border-b border-white/5 font-semibold transition-colors ${currentPath === '/search/label/Scam Alerts' ? 'text-[#2563EB]' : 'text-slate-300'}`}
                  >
                    Scam Alerts
                  </button>
                  <button 
                    type="button"
                    onClick={() => navigateTo('/search/label/AI Tools')} 
                    className={`text-left py-2 border-b border-white/5 font-semibold transition-colors ${currentPath === '/search/label/AI Tools' ? 'text-[#2563EB]' : 'text-slate-300'}`}
                  >
                    AI Tools
                  </button>
                  <button 
                    type="button"
                    onClick={() => navigateTo('/search/label/Tech Updates')} 
                    className={`text-left py-2 border-b border-white/5 font-semibold transition-colors ${currentPath === '/search/label/Tech Updates' ? 'text-[#2563EB]' : 'text-slate-300'}`}
                  >
                    Tech Updates
                  </button>
                  <button 
                    type="button"
                    onClick={() => navigateTo('/search/label/Safety Guides')} 
                    className={`text-left py-2 border-b border-white/5 font-semibold transition-colors ${currentPath === '/search/label/Safety Guides' ? 'text-[#2563EB]' : 'text-slate-300'}`}
                  >
                    Safety Guides
                  </button>

                  {/* Mobile Search bar */}
                  <form onSubmit={handleSearchSubmit} className="flex items-center w-full bg-white/5 border border-white/15 rounded-xl p-2">
                    <input 
                      type="text" 
                      placeholder="Search safety tips..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-white text-xs outline-none flex-1 placeholder-slate-500"
                    />
                    <button type="submit" className="text-[#2563EB]">
                      <Search className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </header>

            {/* 2. Hero Widget section (Index only) */}
            {currentPath === '/' && (
              <section 
                className="text-white py-14 px-6 text-center border-b transition-all relative overflow-hidden"
                style={{ 
                  background: `radial-gradient(ellipse at top, ${customizer.colors.navy} 0%, ${customizer.colors.navy}E0 100%)`, 
                  borderBottomColor: customizer.colors.blue,
                  borderBottomWidth: '4px'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                <div className="max-w-3xl mx-auto relative z-10">
                  <span 
                    className="border px-4 py-1.5 text-[10px] font-bold font-mono uppercase tracking-widest rounded-full shadow-md inline-block"
                    style={{ 
                      color: customizer.colors.blue,
                      backgroundColor: customizer.colors.blue + '1A',
                      borderColor: customizer.colors.blue + '33'
                    }}
                  >
                    🛡️ Online Safety Center
                  </span>
                  
                  <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight mt-5 text-white leading-tight">
                    Stay Safe Before You Click
                  </h1>
                  
                  <p className="text-sm md:text-base text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed font-sans">
                    {customizer.tagline}
                  </p>
                  
                  <div className="mt-8 flex flex-row flex-wrap gap-3.5 items-center justify-center">
                    <button 
                      type="button"
                      onClick={() => navigateTo('/search/label/Scam Alerts')}
                      className="bg-red-500 hover:bg-red-600 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg shadow-red-500/10 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      🚨 Latest Scam Alerts
                    </button>
                    <button 
                      type="button"
                      onClick={() => navigateTo('/search/label/AI Tools')}
                      className="text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg active:scale-[0.98] transition-all cursor-pointer"
                      style={{ 
                        backgroundColor: customizer.colors.blue,
                        boxShadow: `0 10px 15px -3px ${customizer.colors.blue}20`
                      }}
                    >
                      🛡️ Explore AI Tools
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* 3. Category Links Cards Grid */}
            {currentPath === '/' && (
              <section className="bg-white border-b border-slate-200 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                  <h2 
                    className="text-xl md:text-2xl font-display font-black tracking-tight flex items-center gap-2"
                    style={{ color: customizer.colors.navy }}
                  >
                    <span style={{ color: customizer.colors.blue }}>▣</span> Explore Tech Safety Categories
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
                    
                    {/* Scam Card */}
                    <div className="bg-slate-50 border border-slate-200/80 hover:border-red-400 p-6 rounded-2xl shadow-sm transition-all duration-250 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between group">
                      <div>
                        <div className="w-11 h-11 bg-red-100/80 text-red-500 text-xl flex items-center justify-center rounded-xl font-bold shadow-sm transition-transform duration-300 group-hover:scale-110">🚨</div>
                        <h3 className="font-display font-bold text-slate-900 mt-4 text-base">Scam Alerts</h3>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">WhatsApp traps, phishing websites, SMS links, bank spoof messages.</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => navigateTo('/search/label/Scam Alerts')}
                        className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1.5 mt-5 text-left cursor-pointer font-mono uppercase tracking-wider"
                      >
                        Check Alerts <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                    {/* AI Card */}
                    <div 
                      className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl shadow-sm transition-all duration-250 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between group"
                      style={{ hoverBorderColor: customizer.colors.blue }}
                    >
                      <div>
                        <div 
                          className="w-11 h-11 text-xl flex items-center justify-center rounded-xl font-bold shadow-sm transition-transform duration-300 group-hover:scale-110"
                          style={{ 
                            color: customizer.colors.blue, 
                            backgroundColor: customizer.colors.blue + '1A' 
                          }}
                        >
                          💡
                        </div>
                        <h3 className="font-display font-bold text-slate-900 mt-4 text-base">AI Tools</h3>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">Discussions of models, automated workflow tricks, and training opt-outs.</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => navigateTo('/search/label/AI Tools')}
                        className="text-xs font-bold flex items-center gap-1.5 mt-5 text-left cursor-pointer font-mono uppercase tracking-wider"
                        style={{ color: customizer.colors.blue }}
                      >
                        Explore Tools <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                    {/* Guides Card */}
                    <div className="bg-slate-50 border border-slate-200/80 hover:border-emerald-500 p-6 rounded-2xl shadow-sm transition-all duration-250 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between group">
                      <div>
                        <div className="w-11 h-11 bg-emerald-100/80 text-emerald-600 text-xl flex items-center justify-center rounded-xl font-bold shadow-sm transition-transform duration-300 group-hover:scale-110">🔑</div>
                        <h3 className="font-display font-bold text-slate-900 mt-4 text-base">Safety Guides</h3>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">Detailed router lockdowns, credentials privacy, password policies.</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => navigateTo('/search/label/Safety Guides')}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 mt-5 text-left cursor-pointer font-mono uppercase tracking-wider"
                      >
                        Read Guides <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                    {/* Updates Card */}
                    <div className="bg-slate-50 border border-slate-200/80 hover:border-amber-500 p-6 rounded-2xl shadow-sm transition-all duration-250 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between group">
                      <div>
                        <div className="w-11 h-11 bg-amber-100/80 text-amber-600 text-xl flex items-center justify-center rounded-xl font-bold shadow-sm transition-transform duration-300 group-hover:scale-110">💻</div>
                        <h3 className="font-display font-bold text-slate-900 mt-4 text-base">Tech Updates</h3>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">Critical Chromium browser bugs, security announcements, system leaks.</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => navigateTo('/search/label/Tech Updates')}
                        className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1.5 mt-5 text-left cursor-pointer font-mono uppercase tracking-wider"
                      >
                        View Updates <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                  </div>
                </div>
              </section>
            )}

            {/* 4. Main Body layouts (Split Sidebar + Content on Desktop) */}
            <div className="px-4 md:px-6 py-8 max-w-6xl mx-auto w-full flex-grow">
              <div className={`grid gap-8 ${viewport === 'desktop' ? 'grid-cols-3' : 'grid-cols-1'}`}>
                
                {/* Content Stream (Takes 2 cols on Desktop) */}
                <div className={viewport === 'desktop' ? 'col-span-2 space-y-6' : 'space-y-6'}>
                  
                  {/* Category banner description inside listing views */}
                  {currentPath.startsWith('/search/label/') && (
                    <div className="bg-blue-50/50 border-l-4 p-4 rounded-r-2xl border-blue-500 shadow-sm" style={{ borderLeftColor: customizer.colors.blue }}>
                      <p className="text-xs font-semibold text-slate-800 font-mono uppercase tracking-wider">
                        Label Category: <span className="font-extrabold" style={{ color: customizer.colors.blue }}>"{decodeURIComponent(currentPath.replace('/search/label/', ''))}"</span>
                      </p>
                    </div>
                  )}

                  {currentPath.startsWith('/search?q=') && (
                    <div className="bg-blue-50/50 border-l-4 p-4 rounded-r-2xl border-blue-500 shadow-sm flex items-center justify-between" style={{ borderLeftColor: customizer.colors.blue }}>
                      <p className="text-xs font-semibold text-slate-800 font-mono uppercase tracking-wider">
                        Search query: <span className="font-extrabold" style={{ color: customizer.colors.blue }}>"{decodeURIComponent(currentPath.replace('/search?q=', ''))}"</span>
                      </p>
                      <button 
                        type="button"
                        onClick={() => navigateTo('/')} 
                        className="text-[10px] font-bold text-slate-400 hover:text-slate-800 uppercase tracking-widest font-mono cursor-pointer"
                      >
                        Clear Search
                      </button>
                    </div>
                  )}

                  {/* Single Post Article page rendering */}
                  {activePost ? (
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-md">
                      
                      {/* Navigate back */}
                      <button 
                        type="button"
                        onClick={() => navigateTo('/')}
                        className="text-xs font-bold text-slate-400 hover:text-slate-800 inline-flex items-center gap-1.5 mb-6 uppercase tracking-wider font-mono cursor-pointer transition-colors"
                      >
                        ⇠ Go Back Home
                      </button>

                      <div className="space-y-4">
                        <span 
                          className="inline-block font-mono text-[10px] font-bold uppercase rounded-lg px-3 py-1.5 tracking-wider"
                          style={{ 
                            color: customizer.colors.blue, 
                            backgroundColor: customizer.colors.blue + '14',
                            border: `1px solid ${customizer.colors.blue}20`
                          }}
                        >
                          {activePost.category}
                        </span>
                        
                        <h1 
                          className="text-2xl md:text-3.5xl font-display font-black tracking-tight leading-tight"
                          style={{ color: customizer.colors.navy }}
                        >
                          {activePost.title}
                        </h1>

                        <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pb-6 border-b border-slate-100">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" style={{ color: customizer.colors.blue }} />
                            {activePost.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {activePost.date}
                          </span>
                        </div>

                        {/* Thumbnail image if available */}
                        {activePost.thumbnailUrl && (
                          <div className="relative rounded-2xl overflow-hidden max-h-96 my-6 border border-slate-200/60 bg-[#0B1220] shadow-sm">
                            <img 
                              src={activePost.thumbnailUrl} 
                              alt={activePost.title} 
                              className="w-full object-cover max-h-96 hover:scale-[1.01] transition-all duration-300"
                            />
                          </div>
                        )}

                        {/* Article Core Body HTML Renderer */}
                        <div 
                          className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-sm md:text-base space-y-4 pt-4 blogspot-rendered-content"
                          dangerouslySetInnerHTML={{ __html: activePost.content }}
                        />

                        {/* Sharing buttons */}
                        <div className="mt-10 pt-8 border-t border-slate-100">
                          <span className="text-xs font-extrabold text-slate-800 tracking-wider uppercase block mb-3 font-mono">
                            🛡️ Share safety card to save families
                          </span>
                          <div className="flex flex-wrap gap-2.5">
                            <button
                              type="button"
                              onClick={() => alert('Simulated WhatsApp Shared Callback. Copy URL to broadcast Scam Alerts.')}
                              className="bg-[#25D366] text-white text-xs font-bold px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 shadow-md shadow-emerald-600/10 hover:opacity-90 transition-opacity cursor-pointer"
                            >
                              WhatsApp Share
                            </button>
                            <button
                              type="button"
                              onClick={() => alert('Simulated Facebook Shared Link.')} 
                              className="bg-[#1877F2] text-white text-xs font-bold px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 shadow-md shadow-blue-600/10 hover:opacity-90 transition-opacity cursor-pointer"
                            >
                              Facebook
                            </button>
                            <button
                              type="button"
                              onClick={() => alert('Simulated Twitter/X Shared Tip.')}
                              className="bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 shadow-md shadow-slate-900/10 hover:opacity-90 transition-opacity cursor-pointer"
                            >
                              Twitter / X
                            </button>
                          </div>
                        </div>

                        {/* CTA guidelines */}
                        <div className="bg-[#0B1220] text-slate-300 p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-5 mt-10">
                          <div className="text-center md:text-left space-y-1">
                            <h4 className="font-display font-bold text-white text-sm">Need dynamic support or instant browser updates?</h4>
                            <p className="text-xs text-slate-400">Keep yourself secure from spoofing loops by validating from recognized portals.</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => alert('Checking updates... Simulated safety click action performed safely.')}
                            className="font-bold text-xs text-white px-4.5 py-3 rounded-xl whitespace-nowrap cursor-pointer transition-all hover:brightness-110 active:scale-95 shadow-lg"
                            style={{ 
                              backgroundColor: customizer.colors.blue,
                              boxShadow: `0 8px 16px -4px ${customizer.colors.blue}4D` 
                            }}
                          >
                            Explore Online Guide Library
                          </button>
                        </div>

                      </div>
                    </div>
                  ) : (
                    // Listing view (Grid)
                    <div>
                      {filteredPosts.length === 0 ? (
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center text-slate-500 shadow-sm">
                          <p className="text-base font-semibold text-slate-800">No posts found matching that query in simulator database.</p>
                          <p className="text-xs text-slate-400 mt-1">Write a custom post using "Write Custom Post" to see it instantly.</p>
                          <button 
                            type="button"
                            onClick={() => navigateTo('/')}
                            className="text-xs font-bold mt-5 block mx-auto underline cursor-pointer"
                            style={{ color: customizer.colors.blue }}
                          >
                            Return to Homepage
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {filteredPosts.map(post => (
                            <div 
                              key={post.id}
                              style={{ contentVisibility: 'auto' }}
                              className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col h-full group"
                            >
                              {/* Card Image header */}
                              <div 
                                onClick={() => navigateTo(`/p/${post.slug}`)}
                                className="h-44 bg-slate-900 relative overflow-hidden cursor-pointer"
                              >
                                {post.thumbnailUrl ? (
                                  <img 
                                    src={post.thumbnailUrl} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-xs font-mono text-slate-500">
                                    No image available
                                  </div>
                                )}
                                <span 
                                  className="absolute top-3 left-3 text-[9px] font-bold text-white px-2.5 py-1 uppercase rounded-lg tracking-wider shadow-md z-10 font-mono"
                                  style={{ 
                                    backgroundColor: 
                                      post.category === 'Scam Alerts' ? '#EF4444' :
                                      post.category === 'AI Tools' ? customizer.colors.blue :
                                      post.category === 'Safety Guides' ? '#10B981' : 
                                      '#F59E0B'
                                  }}
                                >
                                  {post.category}
                                </span>
                              </div>

                              {/* Card details */}
                              <div className="p-5 flex flex-col flex-1">
                                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mb-2 uppercase">
                                  <Calendar className="w-3 h-3 text-slate-400" />
                                  {post.date}
                                </span>
                                
                                <h3 
                                  onClick={() => navigateTo(`/p/${post.slug}`)}
                                  className="text-base font-display font-black leading-snug cursor-pointer line-clamp-2 transition-colors duration-200"
                                  style={{ color: customizer.colors.navy }}
                                >
                                  {post.title}
                                </h3>
                                
                                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed flex-1">
                                  {post.snippet}
                                </p>

                                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold font-mono">
                                  <span className="text-slate-400 uppercase tracking-tight">By {post.author.split(' ')[0]}</span>
                                  <button 
                                    type="button"
                                    onClick={() => navigateTo(`/p/${post.slug}`)}
                                    className="hover:opacity-80 font-bold flex items-center gap-1 uppercase tracking-wider text-[11px] cursor-pointer"
                                    style={{ color: customizer.colors.blue }}
                                  >
                                    Read Guide ➔
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 5. Pre-click Quick Check checklist (Shown on simulator homepage bottom only) */}
                  {currentPath === '/' && (
                    <div 
                      className="text-white p-6 md:p-8 rounded-2xl border transition-all shadow-xl space-y-5"
                      style={{ 
                        backgroundColor: customizer.colors.navy,
                        borderColor: customizer.colors.blue + '2D'
                      }}
                    >
                      <div className="border-b border-white/10 pb-4">
                        <span className="text-[10px] uppercase font-bold tracking-widest font-mono" style={{ color: customizer.colors.blue }}>Safety Fast Test</span>
                        <h2 className="text-xl md:text-2xl font-display font-black text-white mt-1">Before You Click, Check This</h2>
                        <p className="text-xs text-slate-300 mt-1 max-w-xl">Four quick rules to stop hackers from hijacking authorization codes.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-xs font-bold text-white">1. Real Domain Check</h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed mt-1">Check extensions. Scam portals use hyphen links like <code>web-security-update.club</code> instead of your authentic site.</p>
                          </div>
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-xs font-bold text-white">2. Secret Credentials Hold</h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed mt-1">Banks will absolutely never demand your OTP text, credit card PIN, or direct backup codes inside text links.</p>
                          </div>
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-xs font-bold text-white">3. Artificial Urgency</h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed mt-1">Messages urging immediate fee payments warning of dynamic account suspension in 5 minutes are fake.</p>
                          </div>
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-xs font-bold text-white">4. Confirm via Branch</h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed mt-1">When in doubt, open physical banking apps or call the number shown on physical debit labels securely.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Sidebar area (Only visible on Desktop, or stacked bottom on simulator if mobile) */}
                {viewport === 'desktop' && (
                  <div className="space-y-6">
                    
                    {/* Sidebar: About widget */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                      <h3 
                        className="text-xs uppercase font-extrabold tracking-widest border-l-4 pl-2.5 font-mono"
                        style={{ color: customizer.colors.navy, borderLeftColor: customizer.colors.blue }}
                      >
                        About SafeClick Tech
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        {customizer.aboutText}
                      </p>
                      <button 
                        type="button"
                        onClick={() => navigateTo('/search/label/Safety Guides')}
                        className="w-full text-xs font-bold py-2.5 rounded-xl hover:bg-opacity-95 transition-all cursor-pointer font-mono uppercase tracking-wider text-center"
                        style={{ 
                          color: customizer.colors.blue, 
                          backgroundColor: customizer.colors.blue + '1A' 
                        }}
                      >
                        Explore Checklist Library
                      </button>
                    </div>

                    {/* Sidebar: Popular Tips Widget */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                      <h3 
                        className="text-xs uppercase font-extrabold tracking-widest border-l-4 pl-2.5 font-mono"
                        style={{ color: customizer.colors.navy, borderLeftColor: customizer.colors.blue }}
                      >
                        Popular Safety Tips
                      </h3>
                      <div className="space-y-4">
                        {popularPosts.map(post => (
                          <div 
                            key={`popular-${post.id}`} 
                            style={{ contentVisibility: 'auto' }}
                            onClick={() => navigateTo(`/p/${post.slug}`)}
                            className="flex gap-3 hover:opacity-85 cursor-pointer group"
                          >
                            <img 
                              src={post.thumbnailUrl} 
                              alt="Popular clip thumbnail" 
                              className="w-12 h-12 rounded-xl object-cover bg-slate-100 flex-shrink-0 border border-slate-100 shadow-sm"
                            />
                            <div className="space-y-0.5">
                              <span 
                                className="text-[9px] font-bold uppercase font-mono tracking-tight"
                                style={{ color: customizer.colors.blue }}
                              >
                                {post.category}
                              </span>
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                {post.title}
                              </h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sidebar: Label Category Cloud Widget */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                      <h3 
                        className="text-xs uppercase font-extrabold tracking-widest border-l-4 pl-2.5 font-mono"
                        style={{ color: customizer.colors.navy, borderLeftColor: customizer.colors.blue }}
                      >
                        Safety Categories
                      </h3>
                      <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
                        <button 
                          type="button"
                          onClick={() => navigateTo('/search/label/Scam Alerts')}
                          className="font-bold border px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                          style={{ 
                            color: customizer.colors.blue, 
                            backgroundColor: customizer.colors.blue + '10',
                            borderColor: customizer.colors.blue + '1F'
                          }}
                        >
                          Scam Alerts ({posts.filter(p => p.category === 'Scam Alerts').length})
                        </button>
                        <button 
                          type="button"
                          onClick={() => navigateTo('/search/label/AI Tools')}
                          className="font-bold border px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                          style={{ 
                            color: customizer.colors.blue, 
                            backgroundColor: customizer.colors.blue + '10',
                            borderColor: customizer.colors.blue + '1F'
                          }}
                        >
                          AI Tools ({posts.filter(p => p.category === 'AI Tools').length})
                        </button>
                        <button 
                          type="button"
                          onClick={() => navigateTo('/search/label/Tech Updates')}
                          className="font-bold border px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                          style={{ 
                            color: customizer.colors.blue, 
                            backgroundColor: customizer.colors.blue + '10',
                            borderColor: customizer.colors.blue + '1F'
                          }}
                        >
                          Tech Updates ({posts.filter(p => p.category === 'Tech Updates').length})
                        </button>
                        <button 
                          type="button"
                          onClick={() => navigateTo('/search/label/Safety Guides')}
                          className="font-bold border px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                          style={{ 
                            color: customizer.colors.blue, 
                            backgroundColor: customizer.colors.blue + '10',
                            borderColor: customizer.colors.blue + '1F'
                          }}
                        >
                          Safety Guides ({posts.filter(p => p.category === 'Safety Guides').length})
                        </button>
                      </div>
                    </div>

                    {/* Sidebar: Archive list */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                      <h3 
                        className="text-xs uppercase font-extrabold tracking-widest border-l-4 pl-2.5 font-mono"
                        style={{ color: customizer.colors.navy, borderLeftColor: customizer.colors.blue }}
                      >
                        Monthly Archives
                      </h3>
                      <div className="space-y-3.5 text-xs text-slate-600">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="font-bold text-slate-800">May 2026 (Active)</span>
                          <span 
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg border"
                            style={{ 
                              color: customizer.colors.blue, 
                              backgroundColor: customizer.colors.blue + '1A',
                              borderColor: customizer.colors.blue + '15'
                            }}
                          >
                            {posts.length} Posts
                          </span>
                        </div>
                        <div className="flex items-center justify-between opacity-40 pb-1">
                          <span className="font-medium">April 2026</span>
                          <span className="font-mono">0</span>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </div>

            {/* 6. Footer Component matches design variables */}
            <footer 
              className="text-slate-400 text-xs py-12 px-6 border-t transition-colors"
              style={{ 
                backgroundColor: customizer.colors.navy,
                borderTopColor: customizer.colors.blue,
                borderTopWidth: '4px'
              }}
            >
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                
                {/* Brand Logo and Text intro */}
                <div className="space-y-4">
                  <span className="flex items-center gap-2.5 text-white font-display font-black text-sm">
                    <span style={{ color: customizer.colors.blue }}>🛡️</span>
                    <span>{customizer.brandName}</span>
                  </span>
                  <p className="leading-relaxed text-slate-400 text-[11px] font-sans">
                    Spreading online safety, fake SMS link reports, WhatsApp scam alerts, browser security releases, and safe AI tools step-by-step.
                  </p>
                </div>

                {/* Footer Col 2 */}
                <div>
                  <h4 className="text-white font-mono font-extrabold tracking-wider uppercase mb-3.5 text-xs md:text-sm">Quick Links</h4>
                  <ul className="space-y-2 text-[11px] text-slate-400 font-medium">
                    <li><button type="button" onClick={() => navigateTo('/')} className="hover:text-white transition-colors text-left">Simulator Home</button></li>
                    <li><button type="button" onClick={() => navigateTo('/search/label/Scam Alerts')} className="hover:text-white transition-colors text-left">Scam Warnings</button></li>
                    <li><button type="button" onClick={() => navigateTo('/search/label/AI Tools')} className="hover:text-white transition-colors text-left">AI Tools Safety</button></li>
                    <li><button type="button" onClick={() => navigateTo('/search/label/Safety Guides')} className="hover:text-white transition-colors text-left">Safety Handbooks</button></li>
                  </ul>
                </div>

                {/* Footer Col 3 */}
                <div>
                  <h4 className="text-white font-mono font-extrabold tracking-wider uppercase mb-3.5 text-xs md:text-sm">Resources</h4>
                  <ul className="space-y-2 text-[11px] text-slate-400 font-medium font-sans">
                    <li><button type="button" onClick={() => navigateTo('/search/label/Tech Updates')} className="hover:text-white transition-colors text-left">Browser Exploits</button></li>
                    <li><a href="#how-to-install" className="hover:text-white transition-colors text-left">Paste Code Info</a></li>
                    <li><a href="#monetag-info" className="hover:text-white transition-colors text-left">Monetag Earnings</a></li>
                  </ul>
                </div>

                {/* Footer Col 4 */}
                <div>
                  <h4 className="text-white font-mono font-extrabold tracking-wider uppercase mb-3.5 text-xs md:text-sm">Support Secure Network</h4>
                  <p className="mb-4 text-[11px] leading-relaxed text-slate-400 font-sans">
                    Support our free web security reports by verifying our official partner redirect page.
                  </p>
                  <button 
                    type="button"
                    onClick={() => alert('Checking updates... Redirect URL validated successfully by client-side security.')}
                    className="w-full text-white font-bold text-[10px] py-2.5 px-3 rounded-xl uppercase tracking-wider font-mono text-center cursor-pointer shadow-lg active:scale-95 transition-all"
                    style={{ 
                      backgroundColor: customizer.colors.blue,
                      boxShadow: `0 4px 12px ${customizer.colors.blue}30`
                    }}
                  >
                    View Secure Resource Tips
                  </button>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="border-t border-white/10 pt-8 text-[10px] text-slate-500 leading-relaxed max-w-6xl mx-auto font-sans">
                <p><strong>Disclaimer:</strong> {customizer.brandName} shares independent online safety awareness tips and tech platform overviews. Always verify security threats via physical branch calls or known bank support numbers. Never upload passwords or transmit financial secrets to SMS numbers.</p>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-white/5">
                  <span className="font-mono">© 2026 {customizer.brandName} • Powered by simulated Blogger Widgets</span>
                  <div className="flex gap-4 font-mono">
                    <span className="hover:text-white transition-colors cursor-pointer">Facebook</span>
                    <span className="hover:text-white transition-colors cursor-pointer">Twitter</span>
                    <span className="hover:text-white transition-colors cursor-pointer">Telegram Alerts</span>
                  </div>
                </div>
              </div>

            </footer>

          </div>
        </div>
      </div>

      {/* DRAFT WRITER POPUP OVERLAY */}
      {isDraftCreatorOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in-50 zoom-in-95">
            
            {/* Modal Header */}
            <div className="bg-[#0B1220] px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-extrabold text-sm md:text-base">Simulator Post Composer</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsDraftCreatorOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateDraft} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs md:text-sm">
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-medium">✨ Use one of our high-quality prepopulated templates:</p>
                <div className="flex gap-1.5">
                  <button 
                    type="button" 
                    onClick={() => triggerPostTemplate('scam')}
                    className="bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-md"
                  >
                    Scam Alert Text
                  </button>
                  <button 
                    type="button" 
                    onClick={() => triggerPostTemplate('ai')}
                    className="bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-md"
                  >
                    AI Tool Check
                  </button>
                  <button 
                    type="button" 
                    onClick={() => triggerPostTemplate('tech')}
                    className="bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-md"
                  >
                    Tech Update
                  </button>
                </div>
              </div>

              {/* Title & Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0B1220] block">Post Title *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g., Fake Netlfix Subscription Warning"
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0B1220] block">Post Category/Label *</label>
                  <select 
                    value={draftCategory}
                    onChange={(e) => setDraftCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs outline-none focus:border-[#2563EB]"
                  >
                    <option value="Scam Alerts">Scam Alerts</option>
                    <option value="AI Tools">AI Tools</option>
                    <option value="Tech Updates">Tech Updates</option>
                    <option value="Safety Guides">Safety Guides</option>
                  </select>
                </div>
              </div>

              {/* Snippet / Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0B1220] block">Short Snippet/Excerpt *</label>
                <textarea 
                  required
                  rows={2}
                  placeholder="Summarize your safety tips in 2 sentences..."
                  value={draftSnippet}
                  onChange={(e) => setDraftSnippet(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs outline-none focus:border-[#2563EB] resize-none"
                />
              </div>

              {/* Background Image Url */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0B1220] block">Thumbnail Image URL (Optional)</label>
                <input 
                  type="text" 
                  placeholder="https://images.unsplash.com/photo-..."
                  value={draftImage}
                  onChange={(e) => setDraftImage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Rich Body Content (supports basic HTML markup) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#0B1220] block">Article Body HTML/Text *</label>
                  <span className="text-[10px] text-slate-400 font-mono">Supports warning-box, info-box, safe-cta labels</span>
                </div>
                <textarea 
                  required
                  rows={6}
                  placeholder="Enter HTML paragraph details here. Tip: Use <div class='warning-box'>Test</div> for highlight boxes!"
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 font-mono text-xs outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg flex gap-1 items-center">
                <span className="text-[10px] font-bold text-[#2563EB]">Tip:</span>
                <span className="text-[10px] text-slate-500">Inject <code>&lt;a class="safe-cta" href="#"&gt;Button Text&lt;/a&gt;</code> to create copy-safe action controls automatically!</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setIsDraftCreatorOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-lg"
                >
                  Publish to Simulator Feed
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
