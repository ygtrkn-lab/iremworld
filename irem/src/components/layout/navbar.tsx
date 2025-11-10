"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useSearch } from "@/contexts/SearchContext";

const menuItems = {
  ilanlar: {
    name: "İlanlar",
    items: [
      { name: "Kiralık İlanlar", href: "/for-rent" },
      { name: "Satılık İlanlar", href: "/for-sale" },
    ]
  },
  hizmetler: {
    name: "Hizmetler",
    items: [
      { name: "Emlak Pazarlaması", href: "/real-estate-marketing" },
      { name: "Yatırım Fırsatları", href: "/investment-opportunities" },
    ]
  },
  isOrtaklari: {
    name: "İş Ortaklarımız",
    items: [
      { name: "Emlak Ofisleri ve Projeler", href: "/real-estate-partners" },
      { name: "Teknoloji Danışmanlarımız", href: "/technology-partners" },
      { name: "Mühendislik Danışmanlarımız", href: "/engineering-partners" },
      { name: "Hukuk İşleri Danışmanlarımız", href: "/law-partners" },
    ]
  },
  haberler: {
    name: "Haberler",
    items: [
      { name: "Bizden Haberler", href: "/news-from-us" },
      { name: "Ortaklarımızdan Haberler", href: "/news-from-partners" },
    ]
  }
};

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isMobileSearchOpen } = useSearch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/iw-management');
  const isPropertyDetailPage = pathname.startsWith('/property/') || pathname.startsWith('/kiralik/') || pathname.startsWith('/satilik/');

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false);
    window.location.href = href;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isMobileSearchOpen
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        } ${
          isAdminPage
            ? "bg-slate-900/95 backdrop-blur-md shadow-soft"
            : isPropertyDetailPage
            ? "bg-slate-900/95 backdrop-blur-md shadow-soft"
            : isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-soft"
            : pathname === "/"
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md shadow-soft"
        }`}
      >
        <div className="container">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-center h-20 relative">
            {/* Mobile Logo - Centered and Larger */}
            <Link 
              href="/" 
              className="absolute left-1/2 transform -translate-x-1/2 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div 
                className="w-40 h-40 sm:w-44 sm:h-44 bg-[url('/images/kurumsal-logo/iremworld-logo.png')] bg-contain bg-no-repeat bg-center"
                role="img"
                aria-label="IREMWORLD Logo"
              />
            </Link>

            {/* Mobile Menu Button - Positioned on the right */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="absolute right-0 w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 hover:bg-black/5"
              aria-label={isMobileMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
            >
              <div className="flex flex-col items-center justify-center w-6 h-6">
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    isAdminPage ? "bg-white" : isPropertyDetailPage ? "bg-white" : !isScrolled && pathname === "/" ? "bg-white" : "bg-gray-900"
                  } ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 mt-1.5 transition-all duration-300 ${
                    isAdminPage ? "bg-white" : isPropertyDetailPage ? "bg-white" : !isScrolled && pathname === "/" ? "bg-white" : "bg-gray-900"
                  } ${isMobileMenuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 mt-1.5 transition-all duration-300 ${
                    isAdminPage ? "bg-white" : isPropertyDetailPage ? "bg-white" : !isScrolled && pathname === "/" ? "bg-white" : "bg-gray-900"
                  } ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                />
              </div>
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between h-20">
            {/* Desktop Logo */}
            <Link 
              href="/" 
              className="relative flex items-center hover-lift group"
            >
              <div 
                className={`w-72 h-72 transition-all duration-300 ${
                  isScrolled ? 'w-64 h-64' : 'w-72 h-72'
                } bg-[url('/images/kurumsal-logo/iremworld-logo.png')] bg-contain bg-no-repeat bg-center relative z-10`}
                role="img"
                aria-label="IREMWORLD Logo"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center justify-center space-x-1">
              <button
                onClick={() => handleNavigation("/")}
                className={`
                  relative px-4 py-2 text-sm font-medium transition-colors duration-300
                  ${isActive("/")
                    ? "text-primary-500"
                    : `${isAdminPage ? "text-white" : isPropertyDetailPage ? "text-white" : !isScrolled && pathname === "/" ? "text-white" : "text-gray-700"} hover:text-primary-500`
                  }
                `}
              >
                Ana Sayfa
              </button>

              <button
                onClick={() => handleNavigation("/projects")}
                className={`
                  relative px-4 py-2 text-sm font-medium transition-colors duration-300
                  ${isActive("/projects")
                    ? "text-primary-500"
                    : `${isAdminPage ? "text-white" : isPropertyDetailPage ? "text-white" : !isScrolled && pathname === "/" ? "text-white" : "text-gray-700"} hover:text-primary-500`
                  }
                `}
              >
                Projeler
              </button>

              {/* Desktop Dropdown Menus */}
              {Object.entries(menuItems).map(([key, menu]) => (
                <div
                  key={key}
                  className="relative group"
                >
                  <div className="flex items-center px-4 py-6 -my-4">
                    <button
                      className={`
                        relative text-sm font-medium transition-colors duration-300 flex items-center
                        ${isAdminPage ? "text-white" : isPropertyDetailPage ? "text-white" : !isScrolled && pathname === "/" ? "text-white" : "text-gray-700"} 
                        group-hover:text-primary-500
                      `}
                    >
                      {menu.name}
                      <svg
                        className={`ml-1 w-4 h-4 transition-transform group-hover:rotate-180`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Desktop Dropdown Content */}
                  <div className="absolute top-full left-0 w-64 bg-gray-900 rounded-xl shadow-lg py-2 border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 z-50">
                    {menu.items.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleNavigation(item.href)}
                        className={`
                          block w-full text-left px-4 py-2 text-sm transition-colors duration-300
                          ${isActive(item.href)
                            ? "text-primary-400 bg-primary-900/30"
                            : "text-gray-300 hover:text-primary-400 hover:bg-primary-900/20"
                          }
                        `}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={() => handleNavigation("/contact")}
                className={`
                  relative px-4 py-2 text-sm font-medium transition-colors duration-300
                  ${isActive("/contact")
                    ? "text-primary-500"
                    : `${isAdminPage ? "text-white" : isPropertyDetailPage ? "text-white" : !isScrolled && pathname === "/" ? "text-white" : "text-gray-700"} hover:text-primary-500`
                  }
                `}
              >
                İletişim
              </button>
            </div>

            {/* Desktop CTA */}
            <div className="flex items-center justify-center space-x-6">
              {/* Contact Phone */}
              <div className="flex items-center justify-center space-x-2">
                <svg className={`w-4 h-4 ${isAdminPage ? "text-white" : isPropertyDetailPage ? "text-white" : !isScrolled && pathname === "/" ? "text-white" : "text-gray-700"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 10.928c-.652.35-.852 1.17-.43 1.768C6.98 14.528 9.472 17.02 11.304 18.27c.598.422 1.418.222 1.768-.43l1.541-4.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href="tel:+902167554738" 
                  className={`text-sm font-medium transition-colors duration-300 hover:text-primary-500 ${isAdminPage ? "text-white" : isPropertyDetailPage ? "text-white" : !isScrolled && pathname === "/" ? "text-white" : "text-gray-700"}`}
                >
                  +90 216 755 4738
                </a>
              </div>

              {/* Language Selector */}
              <div className="relative group">
                <button className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-primary-500 ${isAdminPage ? "text-white" : isPropertyDetailPage ? "text-white" : !isScrolled && pathname === "/" ? "text-white" : "text-gray-700"}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span>TR</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Language Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-lg py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 z-50">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-500">
                    🇹🇷 Türkçe
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-500">
                    🇺🇸 English
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-500">
                    🇩🇪 Deutsch
                  </button>
                </div>
              </div>

              {/* User Menu or Login */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-900/10 transition-colors"
                  >
                    {user?.avatar && (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className={`text-sm font-medium ${isAdminPage ? "text-white" : isPropertyDetailPage ? "text-white" : !isScrolled && pathname === "/" ? "text-white" : "text-gray-700"}`}>
                      {user?.name}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''} ${isAdminPage ? "text-white" : isPropertyDetailPage ? "text-white" : !isScrolled && pathname === "/" ? "text-white" : "text-gray-700"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Desktop User Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                      </div>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          handleNavigation("/iw-management");
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                      >
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Yönetim Paneli
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Çıkış Yap
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                null
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`
          lg:hidden fixed top-0 bottom-0 right-0 w-[280px] max-w-[85vw] bg-white z-[100]
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Menü</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Menüyü Kapat"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="overflow-y-auto h-[calc(100%-64px)] py-4">
          <div className="space-y-4">
            <button
              onClick={() => handleNavigation("/")}
              className={`
                w-full text-left px-4 py-3 text-base font-medium transition-colors duration-300
                ${isActive("/")
                  ? "text-primary-500 bg-primary-50"
                  : "text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                }
              `}
            >
              Ana Sayfa
            </button>

            <button
              onClick={() => handleNavigation("/projects")}
              className={`
                w-full text-left px-4 py-3 text-base font-medium transition-colors duration-300
                ${isActive("/projects")
                  ? "text-primary-500 bg-primary-50"
                  : "text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                }
              `}
            >
              Projeler
            </button>

            {/* Mobile Menu Sections */}
            {Object.entries(menuItems).map(([key, menu]) => (
              <div key={key} className="border-t border-gray-100 pt-4">
                <button
                  onClick={() => setExpandedSection(expandedSection === key ? null : key)}
                  className="w-full px-4 py-3 flex items-center justify-between text-base font-medium text-gray-900"
                >
                  {menu.name}
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${expandedSection === key ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === key && (
                  <div className="mt-2 space-y-1 bg-gray-50">
                    {menu.items.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleNavigation(item.href)}
                        className={`
                          w-full text-left px-8 py-3 text-base transition-colors duration-300
                          ${isActive(item.href)
                            ? "text-primary-500 bg-primary-100"
                            : "text-gray-700 hover:text-primary-500 hover:bg-gray-100"
                          }
                        `}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="border-t border-gray-100 pt-4">
              <button
                onClick={() => handleNavigation("/contact")}
                className={`
                  w-full text-left px-4 py-3 text-base font-medium transition-colors duration-300
                  ${isActive("/contact")
                    ? "text-primary-500 bg-primary-50"
                    : "text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                  }
                `}
              >
                İletişim
              </button>
            </div>

            {/* Mobile Menu Contact and Language */}
            <div className="border-t border-gray-100 pt-4">
              {/* Contact Phone */}
              <a 
                href="tel:+905551234567"
                className="flex items-center px-4 py-3 text-base text-gray-700 hover:text-primary-500 hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 10.928c-.652.35-.852 1.17-.43 1.768C6.98 14.528 9.472 17.02 11.304 18.27c.598.422 1.418.222 1.768-.43l1.541-4.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +90 555 123 45 67
              </a>

              {/* Language Selector */}
              <div className="px-4 py-3">
                <div className="flex flex-col space-y-2">
                  <button className="flex items-center text-base text-gray-700 hover:text-primary-500 hover:bg-gray-50 px-3 py-2 rounded-lg">
                    🇹🇷 Türkçe
                  </button>
                  <button className="flex items-center text-base text-gray-700 hover:text-primary-500 hover:bg-gray-50 px-3 py-2 rounded-lg">
                    🇺🇸 English
                  </button>
                  <button className="flex items-center text-base text-gray-700 hover:text-primary-500 hover:bg-gray-50 px-3 py-2 rounded-lg">
                    🇩🇪 Deutsch
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Footer */}
            {isAuthenticated && (
              <div className="border-t border-gray-100 pt-4 px-4">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      {user?.avatar && (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleNavigation("/iw-management")}
                    className="w-full px-4 py-3 flex items-center text-gray-700 hover:text-primary-500 hover:bg-gray-50 rounded-lg"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Yönetim Paneli
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 flex items-center text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Çıkış Yap
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
