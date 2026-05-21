import { Post } from './types';

export const INITIAL_MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Fake Bank SMS Scam: How to Stay Safe and Protect Your Money',
    slug: 'fake-bank-sms-scam',
    date: 'May 20, 2026',
    author: 'SafeClick Team',
    category: 'Scam Alerts',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    isFeatured: true,
    snippet: 'Received a text warning about a blocked bank account? Do not click that link! Learn the signs of this widespread SMS scam and how to safeguard your funds.',
    content: `
      <p>A new, highly sophisticated SMS phishing (smishing) campaign is targeting thousands of mobile users, claiming that their bank account has been locked or restricted due to suspicious login attempts. The attackers use urgency to force victims into clicking hazardous links.</p>

      <div class="warning-box">
        <strong>⚠️ CRITICAL ALERT:</strong> Official banks will NEVER send you a text message with a direct link to re-verify your account, recover passwords, or unlock credit cards. Any link claiming to resolve an urgent problem on your account is a fake landing page designed to steal your credentials.
      </div>

      <h3>How this scam works</h3>
      <p>Scammers use spoofing software to send text messages that appear in the exact same chat history thread as legitimate messages from your bank. This makes the scam incredibly convincing.</p>
      
      <p>The message typically reads: <em>"Dear Customer, we detected an unauthorized login to your online portal. Action required! Please verify immediately at: https://secure-bank-login-alert.net/portal"</em>.</p>

      <p>Once you click the link, you are taken to a cloned banking site that looks 100% identical to your real bank. Any details you enter—username, password, pins, or OTP received—are immediately recorded by scammers, who use them to drain your accounts within minutes.</p>

      <h3>Warning signs to watch for</h3>
      <div class="checklist-box">
        <ul>
          <li><strong>Suspicious URL Structures:</strong> Look closely at the domain. Real banks use official, short domains (e.g., <code>yourbank.com</code>), not hyphenated, long, or strange extensions (e.g., <code>.net/login-alert</code>, <code>.xyz</code>).</li>
          <li><strong>Creating Extreme Pressure:</strong> Any message demanding action in "2 minutes" or warning that your card "will be cancelled by end of day" is a psychological trick.</li>
          <li><strong>Requests for Secrets:</strong> Prompts asking for your full pin, card security digits, or OTP received on your mobile.</li>
        </ul>
      </div>

      <h3>How to store and stay safe</h3>
      <p>If you receive one of these messages, here is the exact steps you should follow immediately to keep your account safe:</p>
      <ol>
        <li><strong>Do NOT click the link:</strong> Even clicking can sometimes trigger malicious scripts or confirm to scammers that your number is active.</li>
        <li><strong>Call your Bank Directly:</strong> Always dial the official customer care number printed printed on the back of your physical debit/credit card. Never rely on phone numbers given in the text message.</li>
        <li><strong>Enable Multi-Factor Authentication:</strong> While scammers try to steal OTPs, having 2FA active or using secure authentication apps is still your first line of defense.</li>
      </ol>

      <div class="info-box">
        <strong>🔒 SAFETY PRO TIP:</strong> Bookmark your online banking site on your web browser. Only access your account via the bookmarked official link or your bank's verified mobile application.
      </div>

      <a class="safe-cta" href="#checklist">Read Full Safety Checklist</a>

      <div class="source-note">Source: Cyber Security Awareness & Federal Banking Commission Security Update, May 2026.</div>
    `
  },
  {
    id: '2',
    title: 'New Hidden AI Privacy Settings You Should Change Right Now',
    slug: 'ai-privacy-settings-check',
    date: 'May 18, 2026',
    author: 'Elena Vance',
    category: 'AI Tools',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800',
    snippet: 'Popular AI chat applications automatically train their models on your personal conversations and uploaded docs. Here is a step-by-step guide to disabling this training in ChatGPT, Claude, and Gemini.',
    content: `
      <p>As chatbot usage spikes globally across student and workspace environments, AI firms have activated background telemetry and model training parameters. By default, your chat history, proprietary files, source code formulas, and intimate ideas are utilized as free training data. This presents a massive data privacy risk if left default.</p>

      <h3>What changed?</h3>
      <p>AI service terms have been updated. If you represent an enterprise handling sensitive patient reports, client blueprints, or financial calculations, uploading that data to default public tiers feeds the public neural models. If a competitor prompts the AI with similar parameters, fragments of your proprietary logs could be generated as outputs.</p>

      <div class="info-box">
        <strong>💡 TECH ALERT:</strong> Large LLM operators have added settings to "turn off history training", but these settings are often obscured inside nested submenus. Turning these switches off keeps your chats private without breaking the daily usage limits.
      </div>

      <h3>How to deactivate model training step-by-step</h3>
       
      <h4>1. In OpenAI (ChatGPT):</h4>
      <p>Go to your user Profile avatar → <strong>Settings</strong> → <strong>Data Controls</strong>. Deactive the toggle labeled <strong>Chat History & Training</strong>. Alternatively, you can use a "Temporary Chat" which bypasses records entirely.</p>

      <h4>2. In Claude (Anthropic):</h4>
      <p>Open <strong>Settings</strong> inside your dashboard, locate the menu for <strong>Data & Model Training</strong>. Ensure that "Opt-out of model training" is checked. (Enterprise workspaces have training disabled by default, but double-checking is safe).</p>

      <h4>3. In Google Gemini:</h4>
      <p>Access your Gemini sidebar, choose <strong>Gemini Apps Activity</strong>. Turn off the master switch to halt standard conversation backups to the primary cloud server.</p>

      <div class="warning-box">
        <strong>⚠️ IMPORTANT LIMITATION:</strong> Even when training is turned off, AI providers will typically store your logs on their system servers for 30 days to review for abuse before deletion. Never submit passwords or highly confidential personal API keys to any LLM interface.
      </div>

      <a class="safe-cta" href="#safe-ai">Find More Safe AI Practices</a>

      <div class="source-note">Always verify settings directly in the official platforms as layout updates occur frequently.</div>
    `
  },
  {
    id: '3',
    title: 'Urgent WhatsApp Scam Warning: The "Hi Mum/Hi Dad" Verification Code Trap',
    slug: 'whatsapp-verification-scam',
    date: 'May 15, 2026',
    author: 'SafeClick Team',
    category: 'Scam Alerts',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    snippet: 'Scammers are stealing WhatsApp accounts through family spoofing messages. Learn how the verification code trick works and key recovery steps.',
    content: `
      <p>WhatsApp remains a major playground for social engineering. Scammers are reaching out with a simple premise: pretending to be a child who dropped their phone, using a new temporary number, and asking for visual confirmation click or 6-digit verification code help.</p>

      <div class="warning-box">
        <strong>⚠️ RED ALERT:</strong> If a family member texts you from an unknown number claiming they broke their phone, do not transmit money or confirmation codes. Always call your relative on their known original number first.
      </div>

      <h3>How this scam works</h3>
      <p>The victim is contacted by a phone number they do not recognize. The text starts with a friendly: <em>"Hi Mum, I dropped my phone in the sink so I am using this temporary number. Can you save it please?"</em></p>
      
      <p>Shortly after the victim replies, the scammer claims: <em>"By the way, I am setting up my bank app/WhatsApp on this phone but my card is blocked. I entered your phone number to receive a verification pin. Can you forward the 6-digit code that just came to your phone?"</em></p>

      <p>In reality, the code that arrived is the victim's own WhatsApp registration PIN. By sharing this code, the victim instantly locks themselves out of their WhatsApp, which the scammers immediately use to text more family members for emergency loan funds.</p>

      <h3>Safety checklist to prevent takeover</h3>
      <div class="checklist-box">
        <ul>
          <li><strong>Never share any login pin or OTP with anyone:</strong> No matter how close the relationship appears.</li>
          <li><strong>Verify identity:</strong> Ask a specific question that only your actual child or relative would know the answer to.</li>
          <li><strong>Lock your SIM PIN:</strong> Add extra security to your device carriers to prevent physical hijackings.</li>
        </ul>
      </div>

      <a class="safe-cta" href="https://t.me/safeclick_alerts_placeholder">Join Our Telegram Scam Alerts Channel</a>

      <div class="source-note">Source: Cybersecurity Alliance Mobile Threat Bulletin, May 2026.</div>
    `
  },
  {
    id: '4',
    title: 'The Ultimate Guide to Securing Your Home Wi-Fi Network), Privacy Protection',
    slug: 'securing-home-wifi-guide',
    date: 'May 10, 2026',
    author: 'Marcus Cole',
    category: 'Safety Guides',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    snippet: 'Is your home router still using DEFAULT configurations? Your entire smart home might be open to local sniffing. Read these 5 quick router adjustments to stay safe.',
    content: `
      <p>Your Wi-Fi network serves as the digital front door to your home. Any computer, thermostat, security camera, or smart TV connected to it shares a common interface. If your router setup remains untouched from initial delivery, third-parties in your local radius can intercept unencrypted data packets.</p>

      <div class="info-box">
        <strong>🔑 SAFETY FOCUS:</strong> Securing your local router is free, requires only 10 minutes of active time, and eliminates 99% of neighborhood cyber threats.
      </div>

      <h3>5 Actionable Steps to Secure Your Router Already</h3>
      
      <h4>1. Change the Default Admin Credentials:</h4>
      <p>Almost all routers ship with default admin combinations like <code>admin/admin</code> or <code>admin/password</code>. Scammers can find these in database directories. Navigate to 192.168.1.1 or 192.168.0.1, locate "System Management", and choose an exclusive passkey.</p>

      <h4>2. Enable WPA3 or WPA2 Personal Encryption Check:</h4>
      <p>Modern routers offer standard WPA3 encryption. If yours only has WPA, upgrade instantly. Never leave passwords formatted as unsecured public networks.</p>

      <h4>3. Disable WPS (Wi-Fi Protected Setup):</h4>
      <p>The physical WPS button sounds wonderful but contains historical pin vulnerabilities. Scammers can brute force a static 8-digit WPS PIN in a couple of hours. Disable "WPS PIN setup" in your wireless advanced settings tab.</p>

      <h4>4. Set Up a Guest Network for Smart Devices:</h4>
      <p>Smart plugs, generic cameras, and older lightbulbs have weak security firmware. If hackers exploit a camera on your main network, they can probe your home backup laptops. Place smart devices on a separate VLAN or Guest Network.</p>

      <div class="checklist-box">
        <ul>
          <li>Admin login password updated</li>
          <li>WPA3 encryption toggled on</li>
          <li>WPS PIN disabled safely</li>
          <li>Dual networks (Main vs Guest Separated)</li>
        </ul>
      </div>

      <br/>
      <a class="safe-cta" href="#guides">Download More Home Security Handbooks</a>

      <div class="source-note">Verified by SafeClick Cybersecurity Researchers. Always update firmware to block newly detected zero-day threats.</div>
    `
  },
  {
    id: '5',
    title: 'Google Chrome Zero-Day Threat Detected: Update Your Browsers Immediately',
    slug: 'chrome-zeroday-update',
    date: 'May 05, 2026',
    author: 'SafeClick Team',
    category: 'Tech Updates',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    snippet: 'Google released emergency patches for active Chrome exploits currently being targeted by cybercriminals around the globe. Learn how to verify and update your software.',
    content: `
      <p>Google has published a mandatory security patches to address highly sensitive memory faults inside the Chrome V8 JavaScript compiler engine. This vulnerability is cited as "being actively exploited in the wild" by nation-grade threat networks.</p>

      <div class="warning-box">
        <strong>🚨 MANDATORY SPEED:</strong> Restart and check your Google Chrome, Microsoft Edge, and Brave browsers to install standard build updates. This prevents arbitrary script execution upon landing on poisoned web portals.
      </div>

      <h3>Why it matters</h3>
      <p>A "Zero-Day" means security researchers detected hackers utilizing this system exploit before a software remedy was written. By using malicious ads or hacked landing sites, threat actors can download active malware payloads directly into your machine without requiring permissions or executable clicks.</p>

      <h3>How to verify your current security version</h3>
      <p>Follow these quick instructions to force-trigger the background updater:</p>
      <ol>
        <li>Click the three dots/vertical list in your Google Chrome navbar (Top Right).</li>
        <li>Hover over <strong>Help</strong> and click <strong>About Google Chrome</strong>.</li>
        <li>Chrome will instantly ping the central server and start downloading the latest security releases.</li>
        <li>Once finished, click <strong>Relaunch</strong> to apply protection immediately.</li>
      </ol>

      <div class="info-box">
        <strong>⚡ AUTOMATIC UPDATE RULE:</strong> Always keep "Enable background auto-updates" enabled inside your desktop settings. This keeps browser modules safe as soon as Google publishes critical keys.
      </div>

      <a class="safe-cta" href="#updates">Scan All Tech News Feeds</a>

      <div class="source-note">Official bulletin reference: CVE-2026-6211. Google Chrome Technical Security Team.</div>
    `
  }
];
