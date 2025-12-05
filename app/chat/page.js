"use client";

import { useEffect, useRef, useState } from "react";
import "./chat.css";
import { faqItems } from "./faqData";

const greetings = [
  "Hey, I'm your CCU Smart Assistant. What can I do for you today?",
  "What would you like to explore about CCU today?",
  "Need help with dorms, classes, or visas? Ask me anything.",
  "Tell me what you’re looking for, I’ll handle the rest.",
];

async function callAssistantApi(message) {
  const res = await fetch("http://100.77.15.121:3000/api/ai/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: message }), 
  });
  if (!res.ok) {
    throw new Error(`API Request Failed: ${res.status}`);
  }

  const data = await res.json();
  return data.answer; 
}

export default function ChatPage() {
  const [greeting, setGreeting] = useState(greetings[0]);
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    setGreeting(randomGreeting);
  }, []);

  async function handleSend(sourceText, options) {
    const isFAQ = options?.isFAQ || false;
    const text = (sourceText ?? inputValue).trim();
    if (!text || isSending) return;

    const userMessage = {
      id: Date.now().toString() + "-user",
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    if (!hasStarted) setHasStarted(true);

    if (isFAQ) {
      const faqItem = faqItems.find((item) => item.question === text);
      if (faqItem && faqItem.answer) {
        const faqMessage = {
          id: Date.now().toString() + "-faq",
          role: "assistant",
          content: faqItem.answer,
        };
        setMessages((prev) => [...prev, faqMessage]);
      }
      return;
    }

    setIsSending(true);
    try {
      const reply = await callAssistantApi(text);
      const assistantMessage = {
        id: Date.now().toString() + "-assistant",
        role: "assistant",
        content: reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now().toString() + "-error",
        role: "assistant",
        content: "Sorry, something went wrong while contacting the assistant.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSend();
  }

  function handleFAQClick(item) {
    handleSend(item.question, { isFAQ: true });
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-page">
      {!hasStarted && (
        <main className="chat-hero-wrapper">
          <section className="chat-hero-inner">
            <div className="chat-ball">
              <div className="chat-eyes">
                <span />
                <span />
              </div>
            </div>

            <div className="chat-hero-text">
              <p className="chat-hero-tag">CCU SMART ASSISTANT</p>
              <h1 className="chat-hero-title">{greeting}</h1>
            </div>

            <div className="chat-faq-list">
              {faqItems.map((item) => (
                <button
                  key={item.question}
                  onClick={() => handleFAQClick(item)}
                  className="chat-faq-pill"
                >
                  {item.question}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="chat-hero-input-row">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tell me what you need help with..."
                className="chat-input-field"
              />
              <button
                type="submit"
                disabled={isSending}
                className="chat-send-button"
              >
                Send
              </button>
            </form>
          </section>
        </main>
      )}

      {hasStarted && (
        <main className="chat-main-wrapper">
          <section className="chat-main-inner">
            <div className="chat-messages">
              {messages.length === 0 && (
                <div className="chat-messages-empty">
                  Start by asking anything about CCU life, services or campus.
                </div>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.role === "user"
                      ? "chat-message-row chat-message-row-user"
                      : "chat-message-row chat-message-row-assistant"
                  }
                >
                  <div
                    className={
                      m.role === "user"
                        ? "chat-bubble chat-bubble-user"
                        : "chat-bubble chat-bubble-assistant"
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="chat-bottom-input-row">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question here..."
                className="chat-input-field"
              />
              <button
                type="submit"
                disabled={isSending}
                className="chat-send-button"
              >
                Send
              </button>
            </form>
          </section>
        </main>
      )}
    </div>
  );
}
