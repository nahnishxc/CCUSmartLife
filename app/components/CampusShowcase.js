import Image from 'next/image';
import Link from 'next/link';

export default function CampusShowcase() {
  return (
    <section className="campus-showcase-section">
      <div className="section showcase-inner">

        <div className="showcase-block">
          <div className="showcase-image-wrapper">
            <Image
              src="/images/homepage/ccu-campus.jpg"
              alt="CCU Campus Overview"
              fill
              className="showcase-image"
            />
          </div>
          <div className="showcase-text">
            <h3 className="showcase-title">Explore CCU Campus</h3>
            <p className="showcase-description">
              Learn about CCU’s campus environment, facilities, landmarks, and student life in one place.
            </p>
            <Link href="/campus" className="showcase-link">
              Explore more →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
