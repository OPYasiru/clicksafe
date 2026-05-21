import { useState } from 'react';
import { Shield, Sparkles, Smartphone, Eye, Settings, HelpCircle, Code } from 'lucide-react';
import { CustomizerState, Post } from './types';
import { INITIAL_MOCK_POSTS } from './mockPosts';
import ThemeDashboard from './components/ThemeDashboard';
import BlogSimulator from './components/BlogSimulator';

export default function App() {
  const [customizer, setCustomizer] = useState<CustomizerState>({
    brandName: 'SafeClick Tech',
    tagline: 'Scam alerts, AI tools, and tech safety tips made simple.',
    colors: {
      navy: '#0B1220',
      blue: '#2563EB',
      lightBlue: '#EFF6FF',
      warningRed: '#EF4444',
      warningOrange: '#F97316',
      textDark: '#111827',
      textGray: '#6B7280',
      background: '#F8FAFC',
      white: '#FFFFFF',
    },
    includeSidebarAbout: true,
    aboutText: 'SafeClick Tech shares online safety tips, fake SMS link alerts, and cyber guides for general awareness. Never share OTP codes or passwords with text links.',
  });

  const [posts, setPosts] = useState<Post[]>(INITIAL_MOCK_POSTS);
  const [activeWorkspaceView, setActiveWorkspaceView] = useState<'both' | 'dashboard' | 'simulator'>('both');

  const handleAddPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Top Main Toolbar Header */}
      <header className="bg-[#0B1220] border-b border-slate-800/80 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-xl select-none sticky top-0 z-50">
        
        {/* Brand/title */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-base font-display font-extrabold tracking-tight text-white">
                <span className="text-blue-500">SafeClick</span> Tech
              </span>
              <span className="bg-blue-500/10 text-blue-400 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-blue-500/25 uppercase tracking-wide">
                Blogger Studio
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 font-sans leading-none">Generate mobile-first Blogger XML themes with automatic blog synchronization.</p>
          </div>
        </div>

        {/* Workspace Display View toggler (Adapts to screens) */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
          
          <button
            type="button"
            onClick={() => setActiveWorkspaceView('both')}
            className={`hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeWorkspaceView === 'both' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/15' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Split Workspace
          </button>
          
          <button
            type="button"
            onClick={() => setActiveWorkspaceView('dashboard')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeWorkspaceView === 'dashboard' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/15' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            Theme Customizer
          </button>

          <button
            type="button"
            onClick={() => setActiveWorkspaceView('simulator')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeWorkspaceView === 'simulator' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/15' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Live Simulator Feed
          </button>

        </div>

        {/* Right Info Quick Tips */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          <a
            href="#how-to-install"
            onClick={(e) => {
              e.preventDefault();
              setActiveWorkspaceView('dashboard');
            }}
            className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors font-medium"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            Theme Guide
          </a>
          <span className="text-slate-800">|</span>
          <div className="text-right">
            <span className="text-slate-500 block text-[10px] font-mono tracking-wider">XML COMPILER</span>
            <span className="text-emerald-400 font-extrabold text-[10px] uppercase font-mono tracking-widest flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-slow"></span>
              COMPILATION OK
            </span>
          </div>
        </div>

      </header>

      {/* Main Split Interface Workspace Area */}
      <main className="flex-1 p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden max-w-[1920px] mx-auto w-full">
        
        {/* Left Segment: Theme Config Dashboard Customizer */}
        {(activeWorkspaceView === 'both' || activeWorkspaceView === 'dashboard') && (
          <div className={`flex flex-col h-[calc(100vh-140px)] min-h-[500px] transition-all duration-300 ${
            activeWorkspaceView === 'dashboard' ? 'col-span-12' : 'col-span-12 lg:col-span-5'
          }`}>
            <ThemeDashboard 
              customizer={customizer} 
              onChangeCustomizer={setCustomizer} 
            />
          </div>
        )}

        {/* Right Segment: Live Web Blog Simulator */}
        {(activeWorkspaceView === 'both' || activeWorkspaceView === 'simulator') && (
          <div className={`flex flex-col h-[calc(100vh-140px)] min-h-[500px] transition-all duration-300 ${
            activeWorkspaceView === 'simulator' ? 'col-span-12' : 'col-span-12 lg:col-span-7'
          }`}>
            <BlogSimulator 
              customizer={customizer} 
              posts={posts} 
              onAddPost={handleAddPost} 
            />
          </div>
        )}

      </main>

      {/* Floating alert bar */}
      <footer className="bg-[#0B1220] border-t border-slate-800/80 px-6 py-3 text-center text-slate-500 text-[10px] flex flex-wrap justify-between items-center gap-2 select-none">
        <span className="font-medium">© 2026 SafeClick Tech Blogger XML Design Studio. All Rights Reserved.</span>
        <div className="flex items-center gap-3">
          <span className="text-emerald-500 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            ✓ Direct Blogger Sync Enabled
          </span>
          <span className="text-slate-800">|</span>
          <span className="font-mono">Theme Version: 1.0.0-Stable</span>
        </div>
      </footer>

    </div>
  );
}
