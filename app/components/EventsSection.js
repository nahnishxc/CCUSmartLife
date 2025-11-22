'use client';

import Link from 'next/link';

const events = [
  {
    id: 1,
    title: 'Welcome Orientation',
    role: 'For all new international students',
    description:
      'Campus tour, introduction to CCU services, and a chance to meet other students.',
    date: '2025-09-05',
  },
  {
    id: 2,
    title: 'Culture Night',
    role: 'Open to all CCU students',
    description:
      'An evening of performances, food, and culture sharing between local and international students.',
    date: '2025-10-10',
  },
  {
    id: 3,
    title: 'Language Exchange Meetup',
    role: 'Weekly language exchange',
    description:
      'Practice Chinese, English, and other languages in small groups with local and international buddies.',
    date: 'Every Wednesday',
  },
  {
    id: 4,
    title: 'Sports & Games Day',
    role: 'Mixed teams of local and international students',
    description:
      'Join friendly competitions and outdoor games to connect beyond the classroom.',
    date: '2025-09-20',
  },
];

export default function EventsSection() {
  return (
    <section id="guides" className="events-section">
      <div className="section-wide events-inner">
        <div className="events-header">
          <h2 className="events-title">Events & Activities</h2>
          <p className="events-subtitle">
            Join activities and enjoy your campus life!
          </p>
        </div>

        <div className="events-scroll-wrapper">
          <div className="events-cards-row">
            {events.map((event) => (
              <Link
                href={`/events/${event.id}`}
                key={event.id}
                className="event-card"
              >
                <div className="event-card-header">3
                  <h3 className="event-card-title">{event.title}</h3>
                  <p className="event-card-role">{event.role}</p>
                </div>
                <p className="event-card-description">{event.description}</p>
                <p className="event-card-date">{event.date}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="events-footer">
          <Link href="/events" className="events-more-btn">
            View all events
          </Link>
        </div>
      </div>
    </section>
  );
}