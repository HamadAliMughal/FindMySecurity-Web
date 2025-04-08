import type { Metadata } from "next";
import Navbar from "@/sections/home/Navbar";
import "./globals.css"; // Ensure you import global styles
import Footer from "@/sections/home/Footer";

export const metadata: Metadata = {
  title: "FindMySecurity",
  description: "Welcome to my Next.js app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="font-sans">
      <body>
        {/* Top Navigation */}
        <Navbar />

        {/* Page Content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-black text-white text-center py-3">
          <Footer/>
          © {new Date().getFullYear()} Find My Security
        </footer>
      </body>
    </html>
  );
}
