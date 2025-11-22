import Link from 'next/link';

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="section contact-inner">
        <div className="contact-left">
          <h2 className="contact-title">Get in touch with CCU OIA</h2>
          <p className="contact-subtitle">
            If you have questions about life at CCU or international student affairs, leave your contact information and we will get back to you.
          </p>

          <div className="contact-info-block">
            <h3 className="contact-info-title">Office of International Affairs</h3>
            <p className="contact-info-item">
              Email: <Link href="mailto:oia@example.ccu.edu.tw">oia@example.ccu.edu.tw</Link>
            </p>
            <p className="contact-info-item">Phone: +886-5-123-4567</p>
            <p className="contact-info-item">
              Address: No. 168, University Rd., Minxiong Township, Chiayi County, Taiwan
            </p>
          </div>
        </div>

        <div className="contact-right">
          <form className="contact-form">
            <div className="contact-field">
              <label htmlFor="contact-name" className="contact-label">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className="contact-input"
                placeholder="Your name"
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-email" className="contact-label">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="contact-input"
                placeholder="your@email.com"
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message" className="contact-label">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                className="contact-textarea"
                placeholder="Tell us how we can help."
              />
            </div>

            <button type="submit" className="contact-submit">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
