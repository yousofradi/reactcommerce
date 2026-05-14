import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الرئيسية | المتجر",
  description: "أدوات مكتبية، ألعاب، اكسسوارات وأكثر. شحن لجميع المحافظات.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* We use global.css for Tajawal font import to match original style.css */}
      </head>
      <body className="has-bottom-nav page-wrapper">
        <header className="store-header">
          <div className="container">
            <button className="header-icon hamburger-btn">☰</button>
            <Link href="/" className="store-logo-link">
              <span className="store-logo">StoreLogo</span>
              {/* <img src="" alt="Logo" className="store-logo-img" style={{opacity:0, transition: 'opacity 0.2s'}} /> */}
            </Link>

            <div className="header-icons">
              <button className="header-icon search-icon-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              <button className="nav-item header-icon-btn relative" id="header-cart-link">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span className="mobile-nav-badge" id="cart-count" style={{ display: 'none' }}>0</span>
              </button>
            </div>
          </div>
        </header>

        <main className="page-content">
          {children}
        </main>

        <footer className="store-footer">
          <nav className="footer-nav">
            <Link href="/">الرئيسية</Link>
            <Link href="/products">المتجر</Link>
            <a href="https://wa.me/" target="_blank" rel="noreferrer">تواصل معنا</a>
          </nav>
          <div className="footer-bottom-bar">© 2025 . جميع الحقوق محفوظة.</div>
        </footer>

        {/* Bottom Mobile Nav */}
        <nav className="mobile-bottom-nav">
          <div className="nav-items">
            <Link href="/" className="nav-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>الرئيسية</span>
            </Link>
            <Link href="/products" className="nav-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>متجر</span>
            </Link>
            <button className="nav-item relative" id="mobile-cart-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span>السلة</span>
              <span className="mobile-nav-badge" id="mobile-cart-count" style={{ display: 'none' }}>0</span>
            </button>
            <a href="#" target="_blank" className="nav-item" id="nav-wa-link" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
              </svg>
              <span>واتساب</span>
            </a>
            <a href="#" target="_blank" className="nav-item" id="nav-tg-link" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
              </svg>
              <span>تليجرام</span>
            </a>
          </div>
        </nav>
      </body>
    </html>
  );
}
