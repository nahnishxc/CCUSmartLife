import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScrolling from "./components/SmoothScrolling";

export const metadata = {
  title: "CCU SmartLife",
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
        <SmoothScrolling>
          <main className="pt-20">{children}</main>
        </SmoothScrolling>
        <Footer></Footer>
      </body>
    </html>
  );
}
