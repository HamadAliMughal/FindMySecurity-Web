import type { Metadata } from "next";
import Navbar from "@/sections/Navbar";
import "./globals.css"; // Ensure you import global styles

export const metadata: Metadata = {
  title: "My App",
  description: "Welcome to my Next.js app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-100 text-black">
        {/* Top Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow flex justify-center items-center p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-black text-white text-center py-3">
          © {new Date().getFullYear()} My App
        </footer>
      </body>
    </html>
  );
}
