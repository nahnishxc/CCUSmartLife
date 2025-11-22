import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section footer-inner">
        <div className="footer-left">
          <span className="footer-brand">CCU International Helper</span>
          <span className="footer-year">© 2025</span>
        </div>
        <div className="footer-right">
          <Link href="#" className="footer-link">
            Privacy
          </Link>
          <Link href="#" className="footer-link">
            Terms
          </Link>
          <span className="footer-link">Designed by CCU MIS & FLL</span>
        </div>
      </div>
    </footer>
  );
}
