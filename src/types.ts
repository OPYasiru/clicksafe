export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  category: 'Scam Alerts' | 'AI Tools' | 'Tech Updates' | 'Safety Guides';
  snippet: string;
  content: string; // HTML or Markdown formatted content
  thumbnailUrl?: string;
  isFeatured?: boolean;
}

export interface ThemeColors {
  navy: string;
  blue: string;
  lightBlue: string;
  warningRed: string;
  warningOrange: string;
  textDark: string;
  textGray: string;
  background: string;
  white: string;
}

export interface CustomizerState {
  brandName: string;
  tagline: string;
  colors: ThemeColors;
  includeSidebarAbout: boolean;
  aboutText: string;
}
