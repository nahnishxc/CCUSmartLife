// import "./globals.css";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import SmoothScrolling from "./components/SmoothScrolling";
// import ScrollToTop from "./components/ScrollToTop";
// import MainNav from "./components/MainNav";
// import ChatWidget from "./components/ChatWidget";

// export const metadata = {
//   title: "CCU SmartLife",
//   description: "AI helper for CCU international students",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-gray-50 font-sans relative">
//         <Navbar />
//         <SmoothScrolling>
//           <main className="w-full max-w-[1440px] mx-auto px-6 pt-32 pb-20">
//             <MainNav />
//             <div className="w-full min-h-[500px] flex flex-col">{children}</div>
//           </main>

//         </SmoothScrolling>
//         <Footer />
//         <ScrollToTop />
//         <ChatWidget />
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScrolling from "./components/SmoothScrolling";
import ScrollToTop from "./components/ScrollToTop";
import MainNav from "./components/MainNav";
import ChatWidget from "./components/ChatWidget";

export const metadata = {
  title: "CCU SmartLife",
  description: "AI helper for CCU international students",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* 這裡改了！換成淡米色背景 + 柔和點狀網格 */}
      <body className="min-h-screen font-sans relative bg-[#fbf8f1] bg-[radial-gradient(rgba(15,118,110,0.11)_1px,transparent_1px)] bg-[size:22px_22px]">
        <Navbar />
        <SmoothScrolling>
          <main className="w-full max-w-[1440px] mx-auto px-6 pt-32 pb-20">
            <MainNav />
            <div className="w-full min-h-[500px] flex flex-col">{children}</div>
          </main>
        </SmoothScrolling>
        <Footer />
        <ScrollToTop />
        <ChatWidget />
      </body>
    </html>
  );
}