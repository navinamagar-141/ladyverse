import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/organisms/Navbar";

export const metadata: Metadata = {
  title: "LadyVerse | Premium Women's Marketplace",
  description: "Luxury finds, curated vendors, and essentials.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FAF7F2]">
        <Navbar />
        {/* pt-28 = 64px navbar + 48px category bar */}
        <main className="min-h-screen pt-[144px] bg-[#FAF7F2]">
  {children}
</main>
      </body>
    </html>
  );
}