import "./globals.css";
import Navbar from "./components/Navbar";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export const metadata = {
  title: "CCU International Helper",
  description: "AI helper for CCU international students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="main-with-navbar">{children}</main>
      </body>
    </html>
  );
}
