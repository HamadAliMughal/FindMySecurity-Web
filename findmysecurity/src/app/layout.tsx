import type { Metadata } from "next";
import Navbar from "@/sections/home/Navbar";
import "./globals.css";
import Footer from "@/sections/home/Footer";
// ✅ Import the Toaster
import ToastProvider from "@/sections/components/ToastProvider/ToastProvider";

export const metadata: Metadata = {
  title: "FindMySecurity",
  description: "Trusted ecosystem for security providers, businesses, and training providers",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {/* Global Toast Container */}
       

        {/* Top Navigation */}
        <ToastProvider />
        <Navbar />
        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-black text-white text-center py-3">
          <Footer />
          {/* © {new Date().getFullYear()} Find My Security */}
        </footer>
      </body>
    </html>
  );
}
