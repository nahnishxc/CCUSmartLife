"use client";
import Link from "next/link";

export default function Hero() {
  const handleScrollClick = (event) => {
    event.preventDefault();
    const target = document.getElementById("guides");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <h1 className="hero-title">CCU SmartLife</h1>
        <p className="hero-subtitle">
          An AI-powered guide to help international students live and study at
          National Chung Cheng University.
        </p>
        <Link href="/chat">
          <button className="hero-button">
            chat with AI
          </button>
        </Link>
      </div>

      <button className="hero-scroll" onClick={handleScrollClick}>
        ↓ scroll
      </button>
    </section>
  );
}
