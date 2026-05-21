import { CustomizerState } from './types';

export function generateBloggerXml(state: CustomizerState): string {
  const { brandName, tagline, colors, aboutText } = state;

  return `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultmessages='true' b:layoutsVersion='3' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta charset='utf-8'/>
  <meta content='width=device-width, initial-scale=1, shrink-to-fit=no' name='viewport'/>
  <title><data:view.title.escaped/></title>

  <!-- Blogger Essential Header Elements -->
  <b:include data='blog' name='all-head-content'/>

  <!-- SEO and Open Graph Custom Tags -->
  <b:if cond='data:view.description'>
    <meta expr:content='data:view.description' name='description'/>
    <meta expr:content='data:view.description' property='og:description'/>
  <b:else/>
    <meta content='${tagline}' name='description'/>
    <meta content='${tagline}' property='og:description'/>
  </b:if>
  
  <meta expr:content='data:view.title' property='og:title'/>
  <meta expr:content='data:view.url' property='og:url'/>
  <meta content='website' property='og:type'/>
  <meta expr:content='data:blog.title' property='og:site_name'/>
  
  <b:if cond='data:view.featuredImage'>
    <meta expr:content='data:view.featuredImage' property='og:image'/>
  </b:if>

  <!-- Google Fonts Connection -->
  <link href='https://fonts.googleapis.com' rel='preconnect'/>
  <link crossorigin='anonymous' href='https://fonts.gstatic.com' rel='preconnect'/>
  <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;family=JetBrains+Mono:wght@400;500;700&amp;display=swap' rel='stylesheet'/>

  <!-- Theme Core Variables & CSS -->
  <b:skin><![CDATA[
    /* 
      SafeClick Tech Blogger Theme CSS
      Generated with Custom Colors config
    */
    :root {
      --color-navy: ${colors.navy};
      --color-blue: ${colors.blue};
      --color-light-blue: ${colors.lightBlue};
      --color-warn-red: ${colors.warningRed};
      --color-warn-orange: ${colors.warningOrange};
      --color-text-dark: ${colors.textDark};
      --color-text-gray: ${colors.textGray};
      --color-background: ${colors.background};
      --color-white: ${colors.white};

      --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    /* Blogger Layout Settings (Layout Mode Only) */
    body#layout {
      font-family: var(--font-sans);
      background: #ffffff;
      padding: 20px;
    }
    body#layout .section {
      margin-bottom: 25px;
      border: 2px dashed #e2e8f0;
      padding: 15px;
      background: #f8fafc;
    }

    /* Core Styles Reset & Layout */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--color-background);
      color: var(--color-text-dark);
      font-family: var(--font-sans);
      font-size: 16px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    a {
      color: var(--color-blue);
      text-decoration: none;
      transition: all 0.2s ease;
    }

    a:hover {
      opacity: 0.9;
    }

    /* Utility Container */
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* Header & Sticky Navigation */
    .header-wrapper {
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: rgba(11, 18, 32, 0.95);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }
    .logo-link {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #ffffff;
      font-weight: 700;
      font-size: 1.35rem;
      letter-spacing: -0.025em;
    }
    .logo-icon {
      color: var(--color-blue);
      display: flex;
      align-items: center;
    }
    .nav-menu {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .nav-link {
      color: #cbd5e1;
      font-size: 0.95rem;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-link:hover, .nav-link.active {
      color: var(--color-blue);
    }
    .search-trigger-box {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 9999px;
      padding: 4px 12px;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .search-input {
      background: none;
      border: none;
      color: #ffffff;
      font-size: 0.85rem;
      outline: none;
      width: 120px;
      margin-right: 6px;
    }
    .search-btn {
      background: none;
      border: none;
      color: #cbd5e1;
      cursor: pointer;
    }

    /* Mobile Navigation Drawer Trigger */
    .hamburger-btn {
      display: none;
      background: none;
      border: none;
      color: #ffffff;
      font-size: 1.5rem;
      cursor: pointer;
    }

    /* Hero Section */
    .hero-section {
      background: radial-gradient(circle at 10% 20%, rgb(15, 23, 42) 0%, var(--color-navy) 90.1%);
      color: #ffffff;
      padding: 5rem 0;
      text-align: center;
      border-bottom: 3px solid var(--color-blue);
    }
    .hero-title {
      font-size: 2.75rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 1.25rem;
    }
    .hero-subtitle {
      font-size: 1.15rem;
      color: #94a3b8;
      max-width: 650px;
      margin: 0 auto 2.5rem auto;
      line-height: 1.6;
    }
    .hero-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      transition: all 0.2s ease;
      cursor: pointer;
      border: none;
    }
    .btn-primary {
      background-color: var(--color-blue);
      color: white;
    }
    .btn-primary:hover {
      background-color: #1d4ed8;
      transform: translateY(-1px);
    }
    .btn-secondary {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .btn-secondary:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    /* Grid Layout: Sidebar and Main Content */
    .blog-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
      margin-top: 3rem;
      margin-bottom: 4rem;
    }
    @media (min-width: 992px) {
      .blog-layout {
        grid-template-columns: 2.2fr 1fr;
      }
    }

    /* Category Cards Section */
    .categories-section {
      padding: 4rem 0 0 0;
      background: white;
      border-bottom: 1px solid #e2e8f0;
    }
    .section-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 2rem;
      color: var(--color-navy);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .cat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }
    .cat-card {
      background: var(--color-background);
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .cat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
      border-color: var(--color-blue);
    }
    .cat-icon-wrapper {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      background: var(--color-light-blue);
      color: var(--color-blue);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      font-size: 1.25rem;
    }
    .cat-card.alert .cat-icon-wrapper {
      background: #fee2e2;
      color: var(--color-warn-red);
    }
    .cat-card.tools .cat-icon-wrapper {
      background: #ffedd5;
      color: var(--color-warn-orange);
    }
    .cat-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-navy);
      margin-bottom: 0.5rem;
    }
    .cat-desc {
      font-size: 0.875rem;
      color: var(--color-text-gray);
      margin-bottom: 1.25rem;
    }

    /* Post Cards and Grid */
    .view-info-header {
      background: var(--color-light-blue);
      padding: 1.25rem;
      border-left: 4px solid var(--color-blue);
      border-radius: 0 8px 8px 0;
      font-weight: 500;
      margin-bottom: 2rem;
    }
    .posts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
    }
    .post-card {
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: all 0.25s ease;
    }
    .post-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px -5px rgba(0,0,0,0.08);
      border-color: #cbd5e1;
    }
    .post-thumb-link {
      display: block;
      height: 180px;
      overflow: hidden;
      background-color: var(--color-navy);
      position: relative;
    }
    .post-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
    .post-card:hover .post-thumb {
      transform: scale(1.03);
    }
    .post-meta-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background-color: var(--color-navy);
      color: #ffffff;
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 9999px;
      letter-spacing: 0.025em;
    }
    .post-meta-badge.alert { background-color: var(--color-warn-red); }
    .post-meta-badge.tools { background-color: var(--color-blue); }
    .post-meta-badge.guides { background-color: #0d9488; }
    .post-meta-badge.updates { background-color: var(--color-warn-orange); }

    .post-card-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .meta-date {
      font-size: 0.8rem;
      color: var(--color-text-gray);
      margin-bottom: 0.5rem;
      font-family: var(--font-mono);
    }
    .post-title-link {
      color: var(--color-navy);
    }
    .post-title-link:hover {
      color: var(--color-blue);
    }
    .feed-title {
      font-size: 1.25rem;
      line-height: 1.4;
      font-weight: 700;
      margin-bottom: 0.75rem;
      height: 2.8em;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .feed-snippet {
      font-size: 0.9rem;
      color: var(--color-text-gray);
      margin-bottom: 1.25rem;
      height: 4.5em;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      line-height: 1.5;
    }
    .feed-btn-row {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #f1f5f9;
      padding-top: 1rem;
    }
    .auth-meta {
      font-size: 0.85rem;
      color: var(--color-text-gray);
      font-weight: 500;
    }
    .read-more-link {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-blue);
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    /* Featured Post Box Layout (Single Wide) */
    .featured-box {
      background: white;
      border-radius: 16px;
      border: 1px solid #e1e8f0;
      overflow: hidden;
      box-shadow: 0 4px 15px -3px rgba(0,0,0,0.05);
      margin-bottom: 3rem;
      display: grid;
      grid-template-columns: 1fr;
    }
    @media (min-width: 768px) {
      .featured-box {
        grid-template-columns: 1.2fr 1fr;
      }
    }
    .feat-img-container {
      background-color: var(--color-navy);
      height: 300px;
    }
    @media (min-width: 768px) {
      .feat-img-container {
        height: 100%;
      }
    }
    .feat-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .feat-details {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .feat-tag {
      background: #f1f5f9;
      color: var(--color-navy);
      align-self: flex-start;
      margin-bottom: 1rem;
    }

    /* Safety Checklist Box */
    .checklist-section {
      background: var(--color-navy);
      color: white;
      padding: 4rem 0;
      border-radius: 16px;
      margin-bottom: 3rem;
    }
    .check-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      margin-top: 2rem;
    }
    @media (min-width: 768px) {
      .check-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    .check-col {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .check-list-custom {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .check-item {
      display: flex;
      gap: 12px;
      background: rgba(255,255,255,0.05);
      padding: 1rem;
      border-radius: 8px;
      border-left: 3px solid var(--color-blue);
    }
    .check-item-icon {
      color: var(--color-blue);
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    /* Individual Blog Post Page Layout Styling & Classes */
    .article-wrap {
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
      padding: 2.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .article-header {
      margin-bottom: 1.5rem;
    }
    .article-meta-row {
      display: flex;
      gap: 1.5rem;
      color: var(--color-text-gray);
      font-size: 0.9rem;
      margin-bottom: 1.25rem;
      font-family: var(--font-mono);
    }
    .article-title {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--color-navy);
      line-height: 1.3;
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }
    .article-body {
      color: #1f2937;
      line-height: 1.75;
      font-size: 1.05rem;
    }
    /* Typography support for article body content injection */
    .article-body p {
      margin-bottom: 1.5rem;
    }
    .article-body h3, .article-body h4 {
      color: var(--color-navy);
      margin: 2rem 0 1rem 0;
      font-weight: 700;
    }
    .article-body h3 { font-size: 1.5rem; }
    .article-body h4 { font-size: 1.25rem; }
    .article-body code {
      font-family: var(--font-mono);
      background: #f1f5f9;
      color: #b91c1c;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
    }
    .article-body ul, .article-body ol {
      margin-bottom: 1.5rem;
      padding-left: 1.5rem;
    }
    .article-body li {
      margin-bottom: 0.5rem;
    }

    /* POST STYLES COMPATIBILITY MANDATED BY USER */
    .warning-box {
      background-color: #fef2f2;
      border: 1.5px solid var(--color-warn-red);
      border-left: 5px solid var(--color-warn-red);
      border-radius: 8px;
      padding: 1.25rem;
      margin: 1.5rem 0;
      color: var(--color-text-dark);
      font-size: 0.95rem;
    }
    .info-box {
      background-color: var(--color-light-blue);
      border: 1.5px solid var(--color-blue);
      border-left: 5px solid var(--color-blue);
      border-radius: 8px;
      padding: 1.25rem;
      margin: 1.5rem 0;
      color: var(--color-text-dark);
      font-size: 0.95rem;
    }
    .checklist-box {
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 1.25rem 1.25rem 1.25rem 1rem;
      margin: 1.5rem 0;
    }
    .checklist-box ul {
      list-style-type: none !important;
      padding-left: 0.25rem !important;
      margin-bottom: 0 !important;
    }
    .checklist-box li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.75rem;
      font-size: 0.95rem;
    }
    .checklist-box li:last-child {
      margin-bottom: 0;
    }
    .checklist-box li::before {
      content: "✓";
      position: absolute;
      left: 0;
      top: 1px;
      color: var(--color-blue);
      font-weight: 800;
      font-size: 1rem;
    }
    .source-note {
      font-size: 0.8rem;
      color: var(--color-text-gray);
      font-style: italic;
      border-top: 1px solid #e2e8f0;
      padding-top: 0.75rem;
      margin-top: 2rem;
      font-family: var(--font-mono);
    }
    .safe-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-blue);
      color: #ffffff !important;
      font-weight: 600;
      font-size: 0.95rem;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      margin: 1rem 0;
      border: none;
      box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
    }
    .safe-cta:hover {
      background-color: #1d4ed8;
      box-shadow: 0 6px 10px -1px rgba(37, 99, 235, 0.3);
      color: #ffffff !important;
    }

    /* Blogger Sidebar Styling */
    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 2.25rem;
    }
    .widget-box {
      background: white;
      border-radius: 14px;
      border: 1px solid #e2e8f0;
      padding: 1.5rem;
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.02);
    }
    .widget-box h2 {
      font-size: 1.1rem;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-bottom: 1.25rem;
      color: var(--color-navy);
      border-left: 3px solid var(--color-blue);
      padding-left: 10px;
    }

    /* Popular Posts Widget overrides */
    .popular-posts ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .popular-posts li {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .item-thumbnail {
      width: 60px;
      height: 60px;
      border-radius: 6px;
      object-fit: cover;
      flex-shrink: 0;
    }
    .item-title-link {
      font-size: 0.9rem;
      font-weight: 600;
      line-height: 1.3;
      color: var(--color-navy);
    }
    .item-title-link:hover {
      color: var(--color-blue);
    }

    /* Labels / Tag Cloud Widget overrides */
    .label-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .label-cloud-link {
      background: var(--color-light-blue);
      color: var(--color-blue);
      padding: 0.4rem 0.8rem;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 500;
    }
    .label-cloud-link:hover {
      background-color: var(--color-blue);
      color: white;
    }

    /* Archive Widget override */
    .archive-list {
      list-style: none;
    }
    .archive-list-item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f1f5f9;
      padding: 0.5rem 0;
      font-size: 0.9rem;
    }
    .archive-list-item:last-child {
      border: none;
    }

    /* Pagination controls styles */
    .pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e2e8f0;
    }
    .pag-btn {
      color: var(--color-navy);
      font-weight: 600;
      font-size: 0.9rem;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    /* Footer styling */
    .footer {
      background-color: var(--color-navy);
      color: #94a3b8;
      font-size: 0.9rem;
      padding: 4rem 0 2rem 0;
      border-top: 5px solid var(--color-blue);
    }
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 2.5rem;
      margin-bottom: 3rem;
    }
    .footer-col h3 {
      color: white;
      font-size: 1.1rem;
      margin-bottom: 1.25rem;
      font-weight: 700;
    }
    .footer-text {
      line-height: 1.5;
    }
    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .footer-links li a {
      color: #cbd5e1;
    }
    .footer-links li a:hover {
      color: var(--color-blue);
    }
    .footer-disclaimer {
      font-size: 0.8rem;
      line-height: 1.6;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1.5rem;
      margin-top: 1.5rem;
    }
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    @media (min-width: 768px) {
      .footer-bottom {
        flex-direction: row;
      }
    }
    .copyright {
      font-size: 0.85rem;
    }
    .social-links {
      display: flex;
      gap: 1.25rem;
    }
    .social-link {
      background: rgba(255,255,255,0.05);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: color-white;
      transition: background 0.2s;
    }
    .social-link:hover {
      background: var(--color-blue);
    }

    /* Mobile Responsive hamburger and navigation menu override rules */
    @media (max-width: 768px) {
      .nav-menu {
        display: none; /* In real blogger, simple toggle js triggers active classes */
      }
      .hamburger-btn {
        display: block;
      }
      .hero-title {
        font-size: 1.95rem;
      }
      .article-wrap {
        padding: 1.5rem;
      }
      .article-title {
        font-size: 1.75rem;
      }
    }
  ]]></b:skin>

  <!-- External Script Dependencies (Optional, like FontAwesome or custom JS toggle selectors) -->
  <script src='https://code.jquery.com/jquery-3.6.4.min.js' type='text/javascript'/>
  
  <!-- Navigation Toggle JS -->
  <script type='text/javascript'>
    //<![CDATA[
    $(document).ready(function() {
      $('.hamburger-btn').on('click', function() {
        $('.nav-menu-mobile').slideToggle();
      });
    });
    //]]>
  </script>
</head>
<body>

  <!-- Web Layout Wrapper -->
  <div class='theme-wrapper'>

    <!-- Global Header Section -->
    <header class='header-wrapper'>
      <div class='container header-container'>
        <a class='logo-link' expr:href='data:blog.homepageUrl'>
          <span class='logo-icon'>
            <!-- Styled Inline Shield Icon -->
            <svg height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5'/></svg>
          </span>
          <span class='logo-text'>${brandName}</span>
        </a>

        <!-- Desktop Navlinks -->
        <nav class='nav-menu'>
          <a class='nav-link' expr:href='data:blog.homepageUrl'>Home</a>
          <a class='nav-link' href='/search/label/Scam%20Alerts'>Scam Alerts</a>
          <a class='nav-link' href='/search/label/AI%20Tools'>AI Tools</a>
          <a class='nav-link' href='/search/label/Tech%20Updates'>Tech Updates</a>
          <a class='nav-link' href='/search/label/Safety%20Guides'>Safety Guides</a>
          
          <!-- Interactive Search Trigger -->
          <div class='search-trigger-box'>
            <form action='/search' method='get'>
              <input class='search-input' name='q' placeholder='Search guides...' type='text'/>
              <button class='search-btn' type='submit'>
                <svg fill='none' height='16' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='16'><circle cx='11' cy='11' r='8'/><line x1='21' x2='16.65' y1='21' y2='16.65'/></svg>
              </button>
            </form>
          </div>
        </nav>

        <!-- Mobile Drawer Link Button -->
        <button class='hamburger-btn' type='button'>
          <svg fill='none' height='24' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='24'><line x1='3' x2='21' y1='12' y2='12'/><line x1='3' x2='21' y1='6' y2='6'/><line x1='3' x2='21' y1='18' y2='18'/></svg>
        </button>
      </div>
      
      <!-- Mobile Pull Out Navigation -->
      <div class='nav-menu-mobile' style='display: none; background: rgb(15, 23, 42); padding: 1.5rem; border-bottom: 2px solid var(--color-blue);'>
        <div style='display: flex; flex-direction: column; gap:1.25rem;'>
          <a class='nav-link' expr:href='data:blog.homepageUrl' style='display: block;'>Home</a>
          <a class='nav-link' href='/search/label/Scam%20Alerts' style='display: block;'>Scam Alerts</a>
          <a class='nav-link' href='/search/label/AI%20Tools' style='display: block;'>AI Tools</a>
          <a class='nav-link' href='/search/label/Tech%20Updates' style='display: block;'>Tech Updates</a>
          <a class='nav-link' href='/search/label/Safety%20Guides' style='display: block;'>Safety Guides</a>
          
          <form action='/search' method='get' style='margin-top: 0.5rem;'>
            <div class='search-trigger-box' style='justify-content: space-between;'>
              <input class='search-input' name='q' placeholder='Search...' style='width: 100%' type='text'/>
              <button class='search-btn' type='submit'>➔</button>
            </div>
          </form>
        </div>
      </div>
    </header>

    <!-- Blogger System Hero Element (Visible on Homepage Index Only) -->
    <b:if cond='data:view.isHomepage'>
      <section class='hero-section'>
        <div class='container'>
          <h1 class='hero-title'>Stay Safe Before You Click</h1>
          <p class='hero-subtitle'>${tagline}</p>
          <div class='hero-actions'>
            <a class='btn btn-primary' href='/search/label/Scam%20Alerts'>
              Latest Scam Alerts
            </a>
            <a class='btn btn-secondary' href='/search/label/AI%20Tools'>
              Explore AI Tools
            </a>
          </div>
        </div>
      </section>
    </b:if>

    <!-- Category Quick Filters Cards Section (Home Page Only) -->
    <b:if cond='data:view.isHomepage'>
      <section class='categories-section'>
        <div class='container'>
          <h2 class='section-title'>
            <svg fill='none' height='22' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='22'><rect height='7' rx='1' width='7' x='3' y='3'/><rect height='7' rx='1' width='7' x='14' y='3'/><rect height='7' rx='1' width='7' x='14' y='14'/><rect height='7' rx='1' width='7' x='3' y='14'/></svg>
            Explore Tech Safety Categories
          </h2>
          <div class='cat-grid'>
            <!-- Category Alert -->
            <div class='cat-card alert'>
              <div>
                <div class='cat-icon-wrapper'>🚨</div>
                <h3 class='cat-title'>Scam Alerts</h3>
                <p class='cat-desc'>New scam alerts, WhatsApp fake notifications, phishing, and fake link warnings analyzed immediately.</p>
              </div>
              <a class='btn btn-primary' href='/search/label/Scam%20Alerts' style='font-size: 0.8rem; padding: 0.5rem 1rem;'>View Cyber Threats</a>
            </div>

            <!-- Category Tools -->
            <div class='cat-card tools'>
              <div>
                <div class='cat-icon-wrapper'>🛡️</div>
                <h3 class='cat-title'>AI Tools</h3>
                <p class='cat-desc'>Discover safe AI platforms, automation shortcuts, and data privacy guides step by step.</p>
              </div>
              <a class='btn btn-primary' href='/search/label/AI%20Tools' style='font-size: 0.8rem; padding: 0.5rem 1rem;'>Explore AI tools</a>
            </div>

            <!-- Category Guides -->
            <div class='cat-card'>
              <div>
                <div class='cat-icon-wrapper'>🔑</div>
                <h3 class='cat-title'>Safety Guides</h3>
                <p class='cat-desc'>Actionable checklist guides to protecting accounts, securing routers, and shielding identity documents.</p>
              </div>
              <a class='btn btn-primary' href='/search/label/Safety%20Guides' style='font-size: 0.8rem; padding: 0.5rem 1rem;'>View Guides</a>
            </div>

            <!-- Category Updates -->
            <div class='cat-card tools' style='border-color: rgba(249, 115, 22, 0.4);'>
              <div>
                <div class='cat-icon-wrapper'>💻</div>
                <h3 class='cat-title'>Tech Updates</h3>
                <p class='cat-desc'>Essential updates regarding web browsers, operating system patches, and data leakage reports.</p>
              </div>
              <a class='btn btn-primary' href='/search/label/Tech%20Updates' style='font-size: 0.8rem; padding: 0.5rem 1rem;'>Read Updates</a>
            </div>
          </div>
        </div>
      </section>
    </b:if>

    <!-- Main Content Area Grid -->
    <main class='container'>
      <div class='blog-layout'>

        <!-- Content Block (Left Component) -->
        <article class='main-content-flow'>

          <!-- Blogger Page/Label Header Notification banner -->
          <b:if cond='data:view.isLabel'>
            <div class='view-info-header'>
              Showing latest security articles from category: "<strong><data:view.search.label/></strong>"
            </div>
          </b:if>
          <b:if cond='data:view.isSearch'>
            <div class='view-info-header'>
              Search results for: "<strong><data:view.search.query/></strong>"
            </div>
          </b:if>

          <!-- Core Blogger Main Posts Section Widget -->
          <b:section id='main' maxwidgets='1' showaddelement='yes'>
            <b:widget id='Blog1' locked='true' title='Blog Posts' type='Blog'>
              <b:includable id='main' var='top'>
                
                <!-- 1. Post List Feed Rendering Style -->
                <b:if cond='data:view.isMultipleItems'>
                  <div class='posts-grid'>
                    <b:loop values='data:posts' var='post'>
                      <div class='post-card'>
                        <a class='post-thumb-link' expr:href='data:post.url'>
                          <b:if cond='data:post.firstImageUrl'>
                            <img class='post-thumb' expr:alt='data:post.title' expr:src='data:post.firstImageUrl'/>
                          <b:else/>
                            <!-- Backup premium placeholder image when post contains no images inside -->
                            <div class='post-thumb' style='display: flex; align-items: center; justify-content: center; background: #0b1220; height: 100%; color: #94abcb; font-family: var(--font-mono); font-size: 0.8rem;'>SafeClick Tech Safety Photo</div>
                          </b:if>
                          
                          <!-- Dynamic tag based on Blogger Labels -->
                          <b:if cond='data:post.labels'>
                            <span class='post-meta-badge alert'>
                              <data:post.labels[0].name/>
                            </span>
                          </b:if>
                        </a>
                        
                        <div class='post-card-content'>
                          <span class='meta-date'><data:post.dateHeader/></span>
                          <h3 class='feed-title'>
                            <a class='post-title-link' expr:href='data:post.url'><data:post.title/></a>
                          </h3>
                          <p class='feed-snippet'>
                            <data:post.snippet/>
                          </p>
                          
                          <div class='feed-btn-row'>
                            <span class='auth-meta'>By <data:post.author.name/></span>
                            <a class='read-more-link' expr:href='data:post.url'>
                              Read Guide ➔
                            </a>
                          </div>
                        </div>
                      </div>
                    </b:loop>
                  </div>
                  
                  <!-- Feed Older/Newer Pagination Area -->
                  <div class='pagination'>
                    <b:if cond='data:newerPageUrl'>
                      <a class='pag-btn btn btn-secondary' expr:href='data:newerPageUrl'>
                        ⇠ Newer Guides
                      </a>
                    <b:else/>
                      <span/>
                    </b:if>
                    
                    <b:if cond='data:olderPageUrl'>
                      <a class='pag-btn btn btn-secondary' expr:href='data:olderPageUrl'>
                        Older Guides ⇢
                      </a>
                    </b:if>
                  </div>

                <!-- 2. Single Post/Article Rendering Structure -->
                <b:else/>
                  <b:loop values='data:posts' var='post'>
                    <div class='article-wrap'>
                      <div class='article-header'>
                        <!-- Labels row -->
                        <b:if cond='data:post.labels'>
                          <div style='display: flex; gap: 8px; margin-bottom: 1rem;'>
                            <b:loop values='data:post.labels' var='label'>
                              <span style='background: var(--color-light-blue); color: var(--color-blue); font-size: 0.75rem; font-weight:700; padding: 0.25rem 0.5rem; border-radius: 4px;'><data:label.name/></span>
                            </b:loop>
                          </div>
                        </b:if>
                        
                        <h1 class='article-title'><data:post.title/></h1>
                        
                        <div class='article-meta-row'>
                          <span>Date: <data:post.dateHeader/></span>
                          <span>Author: <data:post.author.name/></span>
                        </div>
                      </div>

                      <!-- Article Content Box rendering formatted blogger markup content -->
                      <div class='article-body'>
                        <data:post.body/>
                      </div>

                      <!-- Social share area -->
                      <div style='margin-top: 3rem; border-top: 1px solid #e1e8f0; padding-top: 2rem;'>
                        <h4 style='font-size: 1rem; color: var(--color-navy); margin-bottom: 0.75rem;'>Share this tech safety guide:</h4>
                        <div style='display: flex; gap: 8px;'>
                          <a expr:href='&quot;https://www.facebook.com/sharer/sharer.php?u=&quot; + data:post.url' style='background: #1877f2; color: white; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.85rem; font-weight:600;' target='_blank'>Facebook</a>
                          <a expr:href='&quot;https://twitter.com/intent/tweet?text=&quot; + data:post.title + &quot;&amp;url=&quot; + data:post.url' style='background: #1da1f2; color: white; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.85rem; font-weight:600;' target='_blank'>Twitter / X</a>
                          <a expr:href='&quot;https://api.whatsapp.com/send?text=&quot; + data:post.title + &quot; &quot; + data:post.url' style='background: #25d366; color: white; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.85rem; font-weight:600;' target='_blank'>WhatsApp</a>
                        </div>
                      </div>

                      <!-- Related Posts list helper by label (Uses Blogger original setup if available) -->
                      <div style='margin-top: 3rem; background: var(--color-background); border-radius: 12px; padding: 1.5rem; border: 1px solid #cbd5e1;'>
                        <h4 style='font-size: 1.15rem; color: var(--color-navy); margin-bottom: 0.5rem;'>🔒 Protect Your Circle</h4>
                        <p style='font-size: 0.9rem; color: var(--color-text-gray);'>Don't let scammers steal clean cash from your loved ones. Forward this security alerts page directly via text. Remember: <strong>Never share verification codes, passwords, or files.</strong></p>
                      </div>

                      <!-- Disqus / Standard Comment Form container -->
                      <b:if cond='data:post.allowComments'>
                        <div style='margin-top: 3rem;'>
                          <h3 style='font-size: 1.35rem; color: var(--color-navy); margin-bottom: 1.5rem;'>Viewer Discussion &amp; Feedback</h3>
                          <b:include data='post' name='comment_picker'/>
                        </div>
                      </b:if>
                    </div>
                  </b:loop>
                </b:if>
                
              </b:includable>
            </b:widget>
          </b:section>
        </article>

        <!-- Right Sidebar Widgets Section -->
        <aside class='sidebar-flow'>
          <div class='sidebar'>

            <!-- 1. Profile / About SafeClick widget -->
            <div class='widget-box'>
              <h2>About SafeClick Tech</h2>
              <p style='color: var(--color-text-gray); font-size: 0.9rem; line-height: 1.55;'>
                ${aboutText}
              </p>
              <div style='margin-top: 1rem;'>
                <a class='btn btn-primary' href='/search/label/Safety%20Guides' style='font-size: 0.8rem; padding: 0.4rem 0.8rem; width: 100%;'>Read Safe Checklists</a>
              </div>
            </div>

            <!-- 2. Blogger PopularPosts Widget Insertion Zone -->
            <b:section id='sidebar-widgets' maxwidgets='6' showaddelement='yes'>
              <b:widget id='PopularPosts1' locked='false' title='Popular Tips' type='PopularPosts'>
                <b:includable id='main'>
                  <div class='widget-box popular-posts'>
                    <h2><data:title/></h2>
                    <ul>
                      <b:loop values='data:posts' var='post'>
                        <li>
                          <b:if cond='data:post.thumbnail'>
                            <img class='item-thumbnail' expr:src='data:post.thumbnail'/>
                          </b:if>
                          <div>
                            <a class='item-title-link' expr:href='data:post.url'><data:post.title/></a>
                          </div>
                        </li>
                      </b:loop>
                    </ul>
                  </div>
                </b:includable>
              </b:widget>

              <!-- 3. Blogger Labels Category cloud -->
              <b:widget id='Label1' locked='false' title='Safety Categories' type='Label'>
                <b:includable id='main'>
                  <div class='widget-box'>
                    <h2><data:title/></h2>
                    <div class='label-cloud'>
                      <b:loop values='data:results' var='label'>
                        <a class='label-cloud-link' expr:href='data:label.url'>
                          <data:label.name/> (<data:label.count/>)
                        </a>
                      </b:loop>
                    </div>
                  </div>
                </b:includable>
              </b:widget>

              <!-- 4. Security Checkpoint Sidebar Card -->
              <b:widget id='HTML1' locked='false' title='Pre-Click Checklist' type='HTML'>
                <b:includable id='main'>
                  <div class='widget-box' style='background-color: var(--color-navy); color: white;'>
                    <h2 style='color: white; border-color: var(--color-blue);'><data:title/></h2>
                    <ul style='list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 0.85rem;'>
                      <li style='display: flex; gap: 8px;'>✔️ Link verified with official domain directory?</li>
                      <li style='display: flex; gap: 8px;'>✔️ Avoided typing OTP to external forms?</li>
                      <li style='display: flex; gap: 8px;'>✔️ Ignored urgent warning messages warning of immediate fines?</li>
                      <li style='display: flex; gap: 8px;'>✔️ Shared this warning card with your family group?</li>
                    </ul>
                  </div>
                </b:includable>
              </b:widget>

              <!-- 5. Blogger Web BlogArchive dropdown list -->
              <b:widget id='BlogArchive1' locked='false' title='Monthly Archives' type='BlogArchive'>
                <b:includable id='main'>
                  <div class='widget-box'>
                    <h2><data:title/></h2>
                    <div class='archive-list'>
                      <b:loop values='data:data' var='i'>
                        <div class='archive-list-item'>
                          <a expr:href='data:i.url'><data:i.name/></a>
                          <span style='color: var(--color-text-gray); font-weight:500;'><data:i.count/></span>
                        </div>
                      </b:loop>
                    </div>
                  </div>
                </b:includable>
              </b:widget>
            </b:section>

          </div>
        </aside>

      </div>
    </main>

    <!-- Pre-Click Warning Checklists Strip Area (Homepage Only) -->
    <b:if cond='data:view.isHomepage'>
      <div class='container' style='margin-bottom: 4rem;'>
        <section class='checklist-section'>
          <div class='container'>
            <div class='check-grid'>
              <div class='check-col' style='text-align: left; padding-right: 1.5rem;'>
                <span style='color: var(--color-blue); font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 0.5rem;'>Quick Safety Check</span>
                <h2 style='font-size: 2rem; font-weight: 800; margin-bottom: 1rem;'>Before You Click, Check This</h2>
                <p style='color: #94a3b8; font-size: 1rem;'>Most cybersecurity hacks rely on raw speed. Attackers want you to press link elements before thinking. Pausing for just 60 seconds completely dismantles their phish attacks.</p>
              </div>
              <div class='check-col'>
                <ul class='check-list-custom'>
                  <li class='check-item'>
                    <span class='check-item-icon'>🛡️</span>
                    <div><strong>Is the link from an official domain?</strong> Scammers use fake variants (e.g. <code>official-bank-support.xyz</code> instead of <code>officialbank.com</code>).</div>
                  </li>
                  <li class='check-item'>
                    <span class='check-item-icon'>🔑</span>
                    <div><strong>Does it ask for passwords, OTP PINs, or card info?</strong> Legitimate services never request secret auth credentials via web links.</div>
                  </li>
                  <li class='check-item'>
                    <span class='check-item-icon'>⏱️</span>
                    <div><strong>Is the message creating pressure or fear?</strong> Panic is artificial. Threats of lockouts or arrests are psychological tricks.</div>
                  </li>
                  <li class='check-item'>
                    <span class='check-item-icon'>💰</span>
                    <div><strong>Does the offer sound too good to be true?</strong> Free vouchers, mystery gifts, or unexpected tax refunds are classic baits.</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </b:if>

    <!-- Global Footer -->
    <footer class='footer'>
      <div class='container'>
        <div class='footer-grid'>
          <!-- Brand Column -->
          <div class='footer-col'>
            <a class='logo-link' expr:href='data:blog.homepageUrl' style='margin-bottom: 1rem; display: inline-flex;'>
              <span class='logo-icon'>
                <svg height='22' viewBox='0 0 24 24' width='22' xmlns='http://www.w3.org/2000/svg'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5'/></svg>
              </span>
              <span class='logo-text'>${brandName}</span>
            </a>
            <p class='footer-text' style='font-size: 0.85rem; margin-top: 0.5rem;'>
              Spreading web security awareness, fake message warnings, AI workflow shortcuts, and simple mobile survival checklists for daily browsing.
            </p>
          </div>

          <!-- Quick Navigation Links -->
          <div class='footer-col'>
            <h3>Quick Links</h3>
            <ul class='footer-links'>
              <li><a expr:href='data:blog.homepageUrl'>Homepage</a></li>
              <li><a href='/search/label/Scam%20Alerts'>New Scam Warnings</a></li>
              <li><a href='/search/label/AI%20Tools'>Safe AI Directory</a></li>
              <li><a href='/search/label/Safety%20Guides'>Security Handbooks</a></li>
            </ul>
          </div>

          <!-- Blogger Categories Tags list -->
          <div class='footer-col'>
            <h3>Resources</h3>
            <ul class='footer-links'>
              <li><a href='/search/label/Tech%20Updates'>Browser Tech Updates</a></li>
              <li><a href='#how-to-install'>Developer Theme Settings</a></li>
              <li><a href='https://t.me/safeclick_alerts_placeholder'>Telegram Channels</a></li>
            </ul>
          </div>

          <!-- Monetag Safe-CTA button helper guide -->
          <div class='footer-col'>
            <h3>Partner Links</h3>
            <p style='font-size: 0.85rem; line-height: 1.5; margin-bottom: 1rem;'>
              Support our safety research by checking our official recommended resource list. All redirect buttons are secured by SafeClick validators.
            </p>
            <a class='safe-cta' href='#resources' style='margin: 0; padding: 0.5rem 1rem; font-size: 0.8rem; width: 100%; text-align: center;'>View Partner Links</a>
          </div>
        </div>

        <div class='footer-disclaimer'>
          <p><strong>Disclaimer:</strong> SafeClick Tech shares independent online security tips and platform overviews for general awareness and education. Always verify sensitive accounts through physical bank branches or official customer support lines. Never reveal OTP codes, credential secrets, or signature images to claims over texts, WhatsApp channels, or emails.</p>
        </div>

        <div class='footer-bottom'>
          <p class='copyright'>&amp;copy; 2026 SafeClick Tech • Powered by Blogger Widgets</p>
          <div class='social-links'>
            <a class='social-link' href='#facebook_link'>F</a>
            <a class='social-link' href='#twitter_link'>T</a>
            <a class='social-link' href='#youtube_link'>Y</a>
            <a class='social-link' href='#telegram_link'>TG</a>
          </div>
        </div>
      </div>
    </footer>

  </div>

</body>
</html>
`;
}
