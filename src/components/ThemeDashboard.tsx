import { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  Settings, 
  BookOpen, 
  DollarSign, 
  Code, 
  Sparkles, 
  Palette, 
  CopyCheck 
} from 'lucide-react';
import { CustomizerState } from '../types';
import { generateBloggerXml } from '../themeXml';

interface ThemeDashboardProps {
  customizer: CustomizerState;
  onChangeCustomizer: (state: CustomizerState) => void;
}

export default function ThemeDashboard({ customizer, onChangeCustomizer }: ThemeDashboardProps) {
  const [activeTab, setActiveTab] = useState<'xml' | 'instructions' | 'monetag' | 'classes' | 'templates'>('xml');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const generatedXml = generateBloggerXml(customizer);

  const triggerCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    }).catch(() => {
      // Fallback if writing clipboard blocked on iframe
      const dummyObj = document.createElement('textarea');
      document.body.appendChild(dummyObj);
      dummyObj.value = text;
      dummyObj.select();
      document.execCommand('copy');
      document.body.removeChild(dummyObj);
      
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    });
  };

  const handleDownloadXml = () => {
    const fileBlob = new Blob([generatedXml], { type: 'text/xml;charset=utf-8' });
    const localUrl = URL.createObjectURL(fileBlob);
    
    const clickLink = document.createElement('a');
    clickLink.href = localUrl;
    clickLink.download = 'safeclick-tech-blogger-theme.xml';
    document.body.appendChild(clickLink);
    clickLink.click();
    document.body.removeChild(clickLink);
    URL.revokeObjectURL(localUrl);
  };

  const updateColor = (colorKey: keyof typeof customizer.colors, hexCode: string) => {
    onChangeCustomizer({
      ...customizer,
      colors: {
        ...customizer.colors,
        [colorKey]: hexCode
      }
    });
  };

  // Preset theme color palettes
  const palettes = [
    {
      name: 'SafeClick Classic Navy',
      navy: '#0B1220',
      blue: '#2563EB',
      lightBlue: '#EFF6FF',
      warningRed: '#EF4444',
      warningOrange: '#F97316'
    },
    {
      name: 'Cyber Alert Dark Slate',
      navy: '#0F172A',
      blue: '#0EA5E9',
      lightBlue: '#F0F9FF',
      warningRed: '#F43F5E',
      warningOrange: '#F59E0B'
    },
    {
      name: 'Forest Security Guard',
      navy: '#022C22',
      blue: '#10B981',
      lightBlue: '#ECFDF5',
      warningRed: '#E11D48',
      warningOrange: '#F59E0B'
    }
  ];

  const applyPalette = (palette: typeof palettes[0]) => {
    onChangeCustomizer({
      ...customizer,
      colors: {
        ...customizer.colors,
        navy: palette.navy,
        blue: palette.blue,
        lightBlue: palette.lightBlue,
        warningRed: palette.warningRed,
        warningOrange: palette.warningOrange
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden transition-all duration-300">
      
      {/* Brand & Theme Title */}
      <div className="bg-[#0B1220] p-6 text-white border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-lg md:text-xl font-display font-bold tracking-tight">Blogger XML Customize Dashboard</h1>
            <p className="text-xs text-slate-400 mt-0.5">Configure live templates, inject Monetag elements, and preview real Blogspot XML.</p>
          </div>
        </div>
      </div>

      {/* Control Configuration Panel */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-4">
          <Palette className="w-4 h-4 text-blue-600" />
          1. Brand Settings &amp; Accent Customizer
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Website Brand Name</label>
            <input 
              type="text"
              value={customizer.brandName}
              onChange={(e) => onChangeCustomizer({ ...customizer, brandName: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs md:text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 text-[#0B1220] transition-all hover:border-slate-300"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Brand Tagline</label>
            <input 
              type="text"
              value={customizer.tagline}
              onChange={(e) => onChangeCustomizer({ ...customizer, tagline: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs md:text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 text-[#0B1220] transition-all hover:border-slate-300"
            />
          </div>
        </div>

        {/* Color pickers */}
        <div className="mt-4 pt-4 border-t border-slate-200/60">
          <label className="text-xs font-bold text-slate-700 block mb-2.5">Live Theme Color Palette picker:</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            
            {/* Navy Color picker */}
            <div className="flex items-center gap-2.5 bg-white border border-slate-200/80 p-2 rounded-xl hover:border-slate-300 transition-colors">
              <input 
                type="color" 
                value={customizer.colors.navy} 
                onChange={(e) => updateColor('navy', e.target.value)}
                className="w-7 h-7 rounded-lg cursor-pointer border-0 shrink-0 outline-none p-0"
              />
              <div className="text-[10px] leading-tight">
                <span className="font-bold block text-slate-700">Navy Dark</span>
                <span className="font-mono text-slate-400 font-medium">{customizer.colors.navy}</span>
              </div>
            </div>

            {/* Blue color picker */}
            <div className="flex items-center gap-2.5 bg-white border border-slate-200/80 p-2 rounded-xl hover:border-slate-300 transition-colors">
              <input 
                type="color" 
                value={customizer.colors.blue} 
                onChange={(e) => updateColor('blue', e.target.value)}
                className="w-7 h-7 rounded-lg cursor-pointer border-0 shrink-0 outline-none p-0"
              />
              <div className="text-[10px] leading-tight">
                <span className="font-bold block text-slate-700">Accent Blue</span>
                <span className="font-mono text-slate-400 font-medium">{customizer.colors.blue}</span>
              </div>
            </div>

            {/* Light Blue color picker */}
            <div className="flex items-center gap-2.5 bg-white border border-slate-200/80 p-2 rounded-xl hover:border-slate-300 transition-colors">
              <input 
                type="color" 
                value={customizer.colors.lightBlue} 
                onChange={(e) => updateColor('lightBlue', e.target.value)}
                className="w-7 h-7 rounded-lg cursor-pointer border-0 shrink-0 outline-none p-0"
              />
              <div className="text-[10px] leading-tight">
                <span className="font-bold block text-slate-700">Light Blue</span>
                <span className="font-mono text-slate-400 font-medium">{customizer.colors.lightBlue}</span>
              </div>
            </div>

            {/* Red alert color picker */}
            <div className="flex items-center gap-2.5 bg-white border border-slate-200/80 p-2 rounded-xl hover:border-slate-300 transition-colors">
              <input 
                type="color" 
                value={customizer.colors.warningRed} 
                onChange={(e) => updateColor('warningRed', e.target.value)}
                className="w-7 h-7 rounded-lg cursor-pointer border-0 shrink-0 outline-none p-0"
              />
              <div className="text-[10px] leading-tight">
                <span className="font-bold block text-red-500">Alert Red</span>
                <span className="font-mono text-slate-400 font-medium">{customizer.colors.warningRed}</span>
              </div>
            </div>

            {/* Orange alert picker */}
            <div className="flex items-center gap-2.5 bg-white border border-slate-200/80 p-2 rounded-xl hover:border-slate-300 transition-colors col-span-2 sm:col-span-1">
              <input 
                type="color" 
                value={customizer.colors.warningOrange} 
                onChange={(e) => updateColor('warningOrange', e.target.value)}
                className="w-7 h-7 rounded-lg cursor-pointer border-0 shrink-0 outline-none p-0"
              />
              <div className="text-[10px] leading-tight">
                <span className="font-bold block text-orange-500">Alert Orange</span>
                <span className="font-mono text-slate-400 font-medium">{customizer.colors.warningOrange}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Preset Palettes Quick Actions */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Apply Preset Palette:</span>
          <div className="flex flex-wrap gap-2">
            {palettes.map((p, index) => (
              <button 
                type="button"
                key={index}
                onClick={() => applyPalette(p)}
                className="text-[10px] font-semibold bg-white hover:bg-[#0B1220] hover:text-white hover:border-[#0B1220] border border-slate-200 px-3 py-1 rounded-full text-slate-600 shadow-sm hover:shadow-md cursor-pointer transition-all active:scale-[0.98]"
              >
                {p.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50 font-medium select-none scrollbar-none">
        
        <button
          type="button"
          onClick={() => setActiveTab('xml')}
          className={`flex-1 py-3.5 px-4 text-xs font-bold text-center whitespace-nowrap border-b-2 flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            activeTab === 'xml' 
              ? 'border-blue-600 text-blue-600 bg-white font-extrabold' 
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
          }`}
        >
          <Code className="w-4 h-4" />
          Theme XML Code
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('instructions')}
          className={`flex-1 py-3.5 px-4 text-xs font-bold text-center whitespace-nowrap border-b-2 flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            activeTab === 'instructions' 
              ? 'border-blue-600 text-blue-600 bg-white font-extrabold' 
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Install Steps
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('monetag')}
          className={`flex-1 py-3.5 px-4 text-xs font-bold text-center whitespace-nowrap border-b-2 flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            activeTab === 'monetag' 
              ? 'border-blue-600 text-blue-600 bg-white font-extrabold' 
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          Monetag Ads
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('classes')}
          className={`flex-1 py-3.5 px-4 text-xs font-bold text-center whitespace-nowrap border-b-2 flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            activeTab === 'classes' 
              ? 'border-blue-600 text-blue-600 bg-white font-extrabold' 
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Post CSS
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('templates')}
          className={`flex-1 py-3.5 px-4 text-xs font-bold text-center whitespace-nowrap border-b-2 flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            activeTab === 'templates' 
              ? 'border-blue-600 text-blue-600 bg-white font-extrabold' 
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
          }`}
        >
          <CopyCheck className="w-4 h-4" />
          Templates
        </button>
      </div>

      {/* Tab Panels Contents */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30 min-h-[400px]">
        
        {/* TAB 1: Generated XML and Download Action */}
        {activeTab === 'xml' && (
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#EFF6FF] border border-blue-100 p-5 rounded-2xl shadow-sm">
              <div>
                <h4 className="font-display font-bold text-[#0B1220] text-sm flex items-center gap-1.5">
                  <span className="text-xl">🚀</span> Your Custom Blogger Theme XML is Ready!
                </h4>
                <p className="text-xs text-slate-500 mt-1">This is a fully compliant Blogspot XML document containing safety CSS configuration &amp; widget containers.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => triggerCopy('theme-xml', generatedXml)}
                  className="bg-[#0B1220] font-bold text-xs text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md hover:bg-slate-800 cursor-pointer transition-all active:scale-98"
                >
                  {copiedStates['theme-xml'] ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      COPIED XML!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy XML Code
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadXml}
                  className="bg-blue-600 font-bold text-xs text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20 hover:bg-blue-700 cursor-pointer transition-all active:scale-98"
                >
                  <Download className="w-4 h-4" />
                  Download XML File
                </button>
              </div>
            </div>

            {/* Syntax preview box code display */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-medium">
                <span>safeclick-tech-theme.xml</span>
                <span>{generatedXml.split('\n').length} lines</span>
              </div>
              <div className="bg-[#0B1220] rounded-2xl p-4 overflow-x-auto max-h-[380px] font-mono text-xs text-emerald-400 border border-slate-800 shadow-inner scrollbar-thin">
                <pre>{generatedXml}</pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Guide Instructions on Installing Custom XML code */}
        {activeTab === 'instructions' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200/80 pb-3">
              <h4 className="text-sm font-display font-bold text-[#0B1220]">How to Install on Blogger / Blogspot Dashboard</h4>
              <p className="text-xs text-slate-500 mt-0.5">Follow these 5 simple steps to overwrite your standard layout with this polished scheme.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/10">1</div>
                <h5 className="font-bold text-xs mt-3.5 text-[#0B1220]">Copy The XML</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">Go to "Theme XML Code" tab and tap "Copy XML Code", or download files directly.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/10">2</div>
                <h5 className="font-bold text-xs mt-3.5 text-[#0B1220]">Blogger</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">Log in to your <strong>Blogger.com</strong> account, select your blog and navigate to the <strong>"Theme"</strong> section.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/10">3</div>
                <h5 className="font-bold text-xs mt-3.5 text-[#0B1220]">Edit HTML</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">Tap the dropdown arrow next to Customize button and click <strong>"Edit HTML"</strong>.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/10">4</div>
                <h5 className="font-bold text-xs mt-3.5 text-[#0B1220]">Replace Code</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">Select ALL existing codes inside, delete them completely, and paste this XML theme template.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-500/10">✓</div>
                <h5 className="font-bold text-xs mt-3.5 text-[#0B1220]">Save &amp; Active</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">Press the floating Diskette/Save icon inside top right. Refresh your blog page to see the new layout!</p>
              </div>

            </div>

            <div className="bg-emerald-50/80 border border-emerald-100 text-emerald-900 p-5 rounded-2xl text-xs space-y-2.5 shadow-sm">
              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                <span className="text-base">🏷️</span> Important: Set Up Your Post Labels / Categories
              </p>
              <p className="leading-relaxed text-slate-600">To make sure the website's custom headers, menu links, and color sections dynamically organize automatically, write the matching label values precisely in your posts' "Labels" section inside the Blogger editor:</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <code className="bg-white border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-lg font-bold">Scam Alerts</code>
                <code className="bg-white border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-lg font-bold">AI Tools</code>
                <code className="bg-white border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-lg font-bold">Tech Updates</code>
                <code className="bg-white border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-lg font-bold">Safety Guides</code>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Monetag integration directives */}
        {activeTab === 'monetag' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200/80 pb-3">
              <h4 className="text-sm font-display font-bold text-[#0B1220]">Monetag Ad-Tech Integration guidelines</h4>
              <p className="text-slate-500 text-xs mt-0.5">Earn high revenue securely by serving standard warnings alongside premium Monetag direct links.</p>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed">
              We have explicitly built premium compatibility styles to support <strong>Monetag Direct Links</strong> inside Blogger posts safely. Monetag is fantastic for online safety blogs since search engine users are highly intent on resolving critical warnings.
            </p>

            <div className="space-y-4">
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-slate-50 p-4 border-b border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B1220]">How to use <code>.safe-cta</code> for Monetag inside posts:</span>
                  <span className="text-[10px] text-slate-400 font-mono">Paste inside Blogger HTML mode</span>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When editing a Blogger post, switch your text controller view from "Compose" to <strong>"HTML view"</strong> inside the top-left toolbar, then paste:
                  </p>
                  
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => triggerCopy('monetag-cta', `<a class="safe-cta" href="YOUR_MONETAG_DIRECT_LINK" target="_blank">Download Safety Audit Toolkit</a>`)}
                      className="absolute right-2 top-2 bg-white hover:bg-slate-100 border border-slate-200 p-2 rounded-xl cursor-pointer transition-colors"
                    >
                      {copiedStates['monetag-cta'] ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <code className="block bg-[#0B1220] text-emerald-400 p-3.5 pr-12 rounded-xl text-xs font-mono overflow-x-auto">
                      {`<a class="safe-cta" href="YOUR_MONETAG_DIRECT_LINK" target="_blank">Download Safety Audit Toolkit</a>`}
                    </code>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-normal">
                    Replace <code>YOUR_MONETAG_DIRECT_LINK</code> with the Direct Link URL copied from your Monetag console dashboard. This class handles the spacing and button shapes automatically.
                  </p>
                </div>
              </div>

              <div className="bg-rose-50/80 border border-rose-100 p-5 rounded-2xl text-xs space-y-2 text-rose-900 shadow-sm">
                <p className="font-bold text-rose-950 flex items-center gap-1.5">
                  <span className="text-base">⚠️</span> Monetag Compliance Safety Check
                </p>
                <p className="leading-relaxed text-rose-800">Keep your redirects honest. Label your buttons transparently as "Verification resources" or "Check Online Threat Database". Misleading users into downloading fake codecs or tools in an educational context breaks compliance policies and devalues user trust.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Special CSS styles for blogging content rendering */}
        {activeTab === 'classes' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200/80 pb-3">
              <h4 className="text-sm font-display font-bold text-[#0B1220]">Special Blogger Post HTML Classes</h4>
              <p className="text-slate-500 text-xs mt-0.5">Use these beautifully pre-styled CSS classes in HTML view to make your scam articles look highly credible.</p>
            </div>

            <div className="space-y-4">
              
              {/* Box 1: Warning Highlight */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-slate-200 bg-white p-5 rounded-2xl items-start shadow-sm">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#0B1220]">🚨 1. Warning Box HTML</span>
                    <button 
                      type="button"
                      onClick={() => triggerCopy('css-warning', `<div class="warning-box">\n  <strong>⚠️ URGENT SCAM WARNING:</strong> Never write OTP numbers into links.\n</div>`)}
                      className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      {copiedStates['css-warning'] ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />} Copy HTML
                    </button>
                  </div>
                  <code className="block bg-[#0B1220] text-emerald-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
                    {`<div class="warning-box">
  <strong>⚠️ WARNING:</strong> Text details here.
</div>`}
                  </code>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-2 font-mono">Theme Visual Render:</span>
                  <div className="bg-red-50 border-y-2 border-l-[5px] border-red-500 rounded-xl p-4 text-xs">
                    <strong>⚠️ WARNING:</strong> Text details here.
                  </div>
                </div>
              </div>

              {/* Box 2: Info Highlight */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-slate-200 bg-white p-5 rounded-2xl items-start shadow-sm">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#0B1220]">🛡️ 2. Information Box HTML</span>
                    <button 
                      type="button" 
                      onClick={() => triggerCopy('css-info', `<div class="info-box">\n  <strong>🔒 SAFETY TIP:</strong> Save banking bookmarks securely inside browser options.\n</div>`)}
                      className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      {copiedStates['css-info'] ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />} Copy HTML
                    </button>
                  </div>
                  <code className="block bg-[#0B1220] text-emerald-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
                    {`<div class="info-box">
  <strong>🔒 SAFETY:</strong> Your helpful tips.
</div>`}
                  </code>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-2 font-mono">Theme Visual Render:</span>
                  <div className="rounded-xl p-4 text-xs border border-blue-100" style={{ backgroundColor: customizer.colors.lightBlue, borderLeft: `5px solid ${customizer.colors.blue}` }}>
                    <strong>🔒 SAFETY:</strong> Your helpful tips.
                  </div>
                </div>
              </div>

              {/* Box 3: Checklist highlight */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-slate-200 bg-white p-5 rounded-2xl items-start shadow-sm">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#0B1220]">✓ 3. Safety Checklist Box HTML</span>
                    <button 
                      type="button" 
                      onClick={() => triggerCopy('css-check', `<div class="checklist-box">\n  <ul>\n    <li>Check URL extension domain</li>\n    <li>Keep passwords hidden</li>\n  </ul>\n</div>`)}
                      className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      {copiedStates['css-check'] ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />} Copy HTML
                    </button>
                  </div>
                  <code className="block bg-[#0B1220] text-emerald-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
                    {`<div class="checklist-box">
  <ul>
    <li>List element one</li>
    <li>List element two</li>
  </ul>
</div>`}
                  </code>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-2 font-mono">Theme Visual Render:</span>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-1.5">
                    <div className="flex items-center gap-1.5 text-blue-600 font-bold">✓ <span className="text-slate-700 font-normal">List element one</span></div>
                    <div className="flex items-center gap-1.5 text-blue-600 font-bold">✓ <span className="text-slate-700 font-normal">List element two</span></div>
                  </div>
                </div>
              </div>

              {/* Box 4: Source details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-slate-200 bg-white p-5 rounded-2xl items-start shadow-sm">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#0B1220]">📝 4. Source Note Box HTML</span>
                    <button 
                      type="button" 
                      onClick={() => triggerCopy('css-source', `<div class="source-note">Source: Cybersecurity Alert Bureau.</div>`)}
                      className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      {copiedStates['css-source'] ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />} Copy HTML
                    </button>
                  </div>
                  <code className="block bg-[#0B1220] text-emerald-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
                    {`<div class="source-note">
  Source details.
</div>`}
                  </code>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-2 font-mono">Theme Visual Render:</span>
                  <div className="text-[11px] text-slate-400 italic pt-3 border-t border-slate-200">
                    Source details.
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: Blogger actual article writing content templates */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200/80 pb-3">
              <h4 className="text-sm font-display font-bold text-[#0B1220]">Blogger Article Templates (Direct Copy)</h4>
              <p className="text-slate-500 text-xs mt-0.5">Copy-paste these structures directly into your Blogger "HTML view" tab to write complete blog articles in seconds.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              
              {/* Template 1 */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow">
                <div className="bg-[#0B1220] px-5 py-4 text-white flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5"><span className="text-base">🚨</span> Scam Alert Post Content Template</span>
                  <button 
                    type="button"
                    onClick={() => triggerCopy('tpl-scam', `<h3>What Happened?</h3>\n<p>Reports show scammers circulating urgent texts targeting accounts.</p>\n<div class="warning-box">\n  <strong>⚠️ URGENT RED FLAG:</strong> Official bank branches will never text login codes.\n</div>\n<h3>How this Scam Works</h3>\n<p>The victim lands on fake link elements demanding details.</p>\n<div class="checklist-box">\n  <ul>\n    <li>Urgent warnings about restricted balances</li>\n    <li>URLs pointing to non-bank sub-domains</li>\n  </ul>\n</div>\n<a class="safe-cta" href="#">Download Full Scam Guide</a>\n<div class="source-note">Source: SafeClick Cyber Awareness Hub.</div>`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedStates['tpl-scam'] ? 'COPIED!' : 'Copy Template HTML'}
                  </button>
                </div>
                <div className="p-4 bg-slate-50 text-[11px] font-mono whitespace-pre-wrap text-slate-700 max-h-[170px] overflow-y-auto border-t border-slate-100 scrollbar-thin">
{`<h3>What Happened?</h3>
<p>Reports show scammers circulating urgent texts targeting accounts.</p>

<div class="warning-box">
  <strong>⚠️ URGENT RED FLAG:</strong> Official bank branches will never text login codes.
</div>

<h3>How this Scam Works</h3>
<p>The victim lands on fake link elements demanding details.</p>

<div class="checklist-box">
  <ul>
    <li>Urgent warnings about restricted balances</li>
    <li>URLs pointing to non-bank sub-domains</li>
  </ul>
</div>

<a class="safe-cta" href="#">Download Full Scam Guide</a>
<div class="source-note">Source: SafeClick Cyber Awareness Hub.</div>`}
                </div>
              </div>

              {/* Template 2 */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow">
                <div className="bg-[#0B1220] px-5 py-4 text-white flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5"><span className="text-base">🤖</span> AI Tool Safety Content Template</span>
                  <button 
                    type="button"
                    onClick={() => triggerCopy('tpl-ai', `<h3>What is this AI Tool?</h3>\n<p>A new generative model has launched publicly today.</p>\n<div class="info-box">\n  <strong>💡 PRIVACY TIP:</strong> Turn off standard history logs internal to settings.\n</div>\n<h3>Main features &amp; Safety check</h3>\n<p>Test tools accurately before uploading corporate client spreadsheets.</p>\n<div class="checklist-box">\n  <ul>\n    <li>Training opt-out check toggle active</li>\n    <li>GDPR compliance certifications checked</li>\n  </ul>\n</div>\n<a class="safe-cta" href="#">Explore Safe AI Directory</a>`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedStates['tpl-ai'] ? 'COPIED!' : 'Copy Template HTML'}
                  </button>
                </div>
                <div className="p-4 bg-slate-50 text-[11px] font-mono whitespace-pre-wrap text-slate-700 max-h-[170px] overflow-y-auto border-t border-slate-100 scrollbar-thin">
{`<h3>What is this AI Tool?</h3>
<p>A new generative model has launched publicly today.</p>

<div class="info-box">
  <strong>💡 PRIVACY TIP:</strong> Turn off standard history logs internal to settings.
</div>

<h3>Main features & Safety check</h3>
<p>Test tools accurately before uploading corporate client spreadsheets.</p>

<div class="checklist-box">
  <ul>
    <li>Training opt-out check toggle active</li>
    <li>GDPR compliance certifications checked</li>
  </ul>
</div>

<a class="safe-cta" href="#">Explore Safe AI Directory</a>`}
                </div>
              </div>

              {/* Template 3 */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow">
                <div className="bg-[#0B1220] px-5 py-4 text-white flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5"><span className="text-base">💻</span> Privacy Upgrade Content Template</span>
                  <button 
                    type="button"
                    onClick={() => triggerCopy('tpl-tech', `<h3>What Changed?</h3>\n<p>A new privacy setting is being rolled out globally to protect account logs.</p>\n<h3>Why It Matters</h3>\n<p>Leaving default features active invites tracking files.</p>\n<div class="warning-box">\n  <strong>⚠️ IMPORTANT:</strong> Update software to patch active leaks immediately.\n</div>\n<a class="safe-cta" href="#">Check Security Updates Now</a>`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedStates['tpl-tech'] ? 'COPIED!' : 'Copy Template HTML'}
                  </button>
                </div>
                <div className="p-4 bg-slate-50 text-[11px] font-mono whitespace-pre-wrap text-slate-700 max-h-[170px] overflow-y-auto border-t border-slate-100 scrollbar-thin">
{`<h3>What Changed?</h3>
<p>A new privacy setting is being rolled out globally to protect account logs.</p>

<h3>Why It Matters</h3>
<p>Leaving default features active invites tracking files.</p>

<div class="warning-box">
  <strong>⚠️ IMPORTANT:</strong> Update software to patch active leaks immediately.
</div>

<a class="safe-cta" href="#">Check Security Updates Now</a>`}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
