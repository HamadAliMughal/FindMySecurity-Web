import type { Metadata } from "next";
import Navbar from "@/sections/Navbar";
import "./globals.css"; // Ensure you import global styles
import Footer from "@/sections/Footer";

export const metadata: Metadata = {
  title: "My App",
  description: "Welcome to my Next.js app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="">
        {/* Top Navigation */}
        <Navbar />

        {/* Page Content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-black text-white text-center py-3">
          <Footer/>
          © {new Date().getFullYear()} My App
        </footer>
      </body>
    </html>
  );
}
