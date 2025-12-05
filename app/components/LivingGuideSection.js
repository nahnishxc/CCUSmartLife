'use client'

import Link from 'next/link'
import Lottie from 'lottie-react'

import eatingAnimation from '../lottie/eating.json'
import transportAnimation from '../lottie/transport.json'
import entertainmentAnimation from '../lottie/entertainment.json'
import housingAnimation from '../lottie/housing.json'
import financeAnimation from '../lottie/education.json'
import medicalAnimation from '../lottie/medical.json'

const items = [
  {
    key: 'eating',
    title: 'Restaurant',
    description: 'Search your faborite food around CCU.',
    href: '/eating',
    animation: eatingAnimation,
  }, 
  {
    key: 'transport',
    title: 'Transport',
    description: 'Buses, trains, scooters, and how to get to and from campus.',
    href: '/transportation',
    animation: transportAnimation,
  },
  {
    key: 'entertainment',
    title: 'Entertainment',
    description: 'Popular attractions and entertainment.',
    href: '/booking',
    animation: entertainmentAnimation,
  },
  {
    key: 'housing',
    title: 'Housing & Rental',
    description: 'Find off-campus housing, contracts, and rental tips around CCU.',
    href: '/housing',
    animation: housingAnimation,
  },
  {
    key: 'finance',
    title: 'Financial Services',
    description: 'Banks, ATMs, currency exchange, and essential financial guidance.',
    href: '/finance',
    animation: financeAnimation,  
  },
  {
    key: 'medical',
    title: 'Medical Services',
    description: 'Clinics, hospitals, and the CCU Health Center for emergencies and care.',
    href: '/medical',
    animation: medicalAnimation,  
  },
]

export function HomeLivingIcons() {
  return (
    <div className="home-icons-grid">
      {items.map((item) => (
        <Link href={item.href} key={item.key} className="home-icon-card">
          <div className="home-icon-lottie">
            <Lottie
              animationData={item.animation}
              loop={true}
              autoplay={true}
            />
          </div>
          <h3 className="home-icon-title">{item.title}</h3>
        </Link>
      ))}
    </div>
  )
}

export default function LivingGuideSection() {
  return (
    <section className="living-section">
      <div className="section living-inner">
        <div className="living-header">
          <h2 className="living-title">CCU Living Guide</h2>
          <p className="living-subtitle">
            Practical entrances for housing, transport, student services, and facility booking.
          </p>
          <p className="living-description">
            Use these shortcuts to quickly find the information you need for daily life at CCU.
          </p>
        </div>

        <div className="living-grid">
          {items.map((item) => (
            <Link href={item.href} key={item.key} className="living-card">
              <div className="living-icon">
                <Lottie
                  animationData={item.animation}
                  loop={true}
                  autoplay={true}
                />
              </div>
              <div className="living-card-text">
                <h3 className="living-card-title">{item.title}</h3>
                <p className="living-card-description">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
