import React from "react";
import type { Metadata } from "next";
import Navbar from "@/sections/Navbar";
import "./page-globals.css"; // Ensure you import global styles
import Footer from "@/sections/Footer";

export const metadata: Metadata = {
  title: "FindMySecurity",
  description: "Welcome to my Next.js app",
};

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
     <html lang="en">
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
};

export default PageLayout;
