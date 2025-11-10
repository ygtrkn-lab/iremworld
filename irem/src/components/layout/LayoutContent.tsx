"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { SearchProvider } from "@/contexts/SearchContext";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isAdminPage = pathname?.startsWith("/iw-management");

  // Login sayfasında header ve footer'ı tamamen gizle
  if (isLoginPage || isAdminPage) {
    return <div className="w-full h-full">{children}</div>;
  }

  const isHomePage = pathname === "/";

  return (
    <SearchProvider>
      <Navbar />
      <main className={`flex-grow ${!isHomePage ? 'pt-20 lg:pt-16' : ''}`}>
        {children}
      </main>
      <Footer />
    </SearchProvider>
  );
}
