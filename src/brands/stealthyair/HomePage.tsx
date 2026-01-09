'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { BrandPageProps } from '../types';
import './stealthyair.css';

// Product flavors from the original site
const flavors = [
  { name: 'Blueberry', image: 'Blueberry.png' },
  { name: 'Jet Fuel OG', image: 'Jet_Fuel_OG.png' },
  { name: 'Granddaddy', image: 'Grandaddy.png' },
  { name: 'Orange', image: 'orange.png' },
  { name: 'Peach Ringz', image: 'Peach_Ringz.png' },
  { name: 'Pineapple Express', image: 'Pineapple_Express.png' },
  { name: 'Rainbow Cake', image: 'Rainbow_Cake.png' },
  { name: 'Strawberry Mango', image: 'Strawberry_Mango.png' },
  { name: 'Tropical Delight', image: 'Tropical_Delight.png' },
  { name: 'Wild Cherry Runtz', image: 'Wild_Cherry_Runtz.png' },
];

// Tech features
const techFeatures = [
  {
    title: 'Advanced Ceramic Heating',
    lines: ['Heats evenly for rich, flavorful vapor', 'No burnt taste, no overheating'],
    icon: '🔥',
  },
  {
    title: 'Patented Smoke-Filtration Technology',
    lines: ['Exhale directly into integrated filter', 'Eliminate all visible smoke'],
    icon: '💨',
  },
  {
    title: 'Leak-Proof & Mess-Free Design',
    lines: ['No spills, no sticky residue', 'Perfect for travel & daily use'],
    icon: '✓',
  },
  {
    title: 'Smart Battery System',
    lines: ['Long-lasting power for all-day vaping', 'USB-C fast charging for convenience'],
    icon: '🔋',
  },
];

/**
 * Stealthy Air Homepage
 *
 * Smokeless vape brand with:
 * - Video hero
 * - Product showcase
 * - Tech features
 * - Clean verification
 */
export function StealthyAirHomePage({ previewClientId }: BrandPageProps) {
  const [code, setCode] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState<'success' | 'error'>('success');
  const [modalMessage, setModalMessage] = useState('');

  const logoUrl = '/images/stealthyair/stealthyLogo.svg';
  const videoUrl = 'https://customer-19w1a8y0iapg9msz.cloudflarestream.com/22e890afd808c258d7451fc77caea479/iframe?muted=true&loop=true&autoplay=true&controls=true';

  const handleVerify = async () => {
    if (!code.trim()) {
      setModalState('error');
      setModalMessage('Please enter a code.');
      setModalOpen(true);
      return;
    }

    try {
      const verifyUrl = previewClientId
        ? `/api/verify?code=${encodeURIComponent(code.toUpperCase())}&clientId=${previewClientId}`
        : `/api/verify?code=${encodeURIComponent(code.toUpperCase())}`;

      const response = await fetch(verifyUrl);
      const data = await response.json();

      if (data.valid) {
        setModalState('success');
        setModalMessage('Product Verified Successfully');
      } else {
        setModalState('error');
        setModalMessage(data.message || 'Verification failed. Please try again.');
      }
    } catch {
      setModalState('error');
      setModalMessage('An error occurred. Please try again.');
    }
    setModalOpen(true);
  };

  return (
    <div className="stealthy-wrapper">
      {/* Video Hero */}
      <section className="w-full bg-black">
        <div className="stealthy-video-container">
          <iframe
            src={videoUrl}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Hero Video"
          />
        </div>
      </section>

      {/* Hero Content */}
      <section className="stealthy-hero">
        <div className="stealthy-hero-content">
          <div className="space-y-2.5">
            <h1 className="stealthy-hero-title">
              <span>Discretion</span>
              <span>Meets Innovation</span>
            </h1>
            <div className="stealthy-hero-subtitle">
              <span>Vaping Redefined.</span>
              <span>Experience Elevated.</span>
            </div>
            <p className="text-base lg:text-lg text-gray-600 max-w-lg">
              Stealthy Air is designed for those who want total discretion without sacrificing quality.
              Powered by advanced filtration technology and premium cannabis extracts, every draw is smooth,
              controlled, and engineered to eliminate all visible smoke through the built-in filter.
            </p>
            <div className="stealthy-hero-subtitle pt-4">
              <span>You&apos;re welcome.</span>
              <span>Smoke away.</span>
            </div>
          </div>

          <ul className="stealthy-feature-list">
            <li className="stealthy-feature-item">
              <div className="stealthy-feature-icon">✓</div>
              <span>Eco-Friendly</span>
            </li>
            <li className="stealthy-feature-item">
              <div className="stealthy-feature-icon">✓</div>
              <span>Ultra-Discreet</span>
            </li>
            <li className="stealthy-feature-item">
              <div className="stealthy-feature-icon">✓</div>
              <span>Patented Smokeless Technology</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-6xl font-bold text-gray-200 self-end">S</div>
          <Image
            src="/images/stealthyair/Bundle.png"
            alt="Stealthy Air Bundle"
            width={600}
            height={400}
            className="w-full max-w-2xl h-auto"
          />
        </div>
      </section>

      {/* Flavors Section */}
      <section className="stealthy-slider-section">
        <h2 className="stealthy-slider-title">Explore Our Flavors</h2>
        <div className="stealthy-slider-grid">
          {flavors.map((flavor) => (
            <div key={flavor.name} className="stealthy-product-card">
              <Image
                src={`/images/stealthyair/${flavor.image}`}
                alt={flavor.name}
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Tech Section */}
      <section className="stealthy-tech-section">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-4xl font-medium mb-2">The Tech Behind</h2>
          <div className="text-3xl lg:text-5xl font-bold">STEALTHY</div>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 font-medium">
            Stealthy is more than a sleek all-in-one vape—it&apos;s engineered with cutting-edge filtration technology that
            eliminates all visible smoke for maximum discretion.
          </p>
        </div>

        <div className="stealthy-tech-grid">
          {techFeatures.map((feature) => (
            <div key={feature.title} className="stealthy-tech-card">
              <div className="stealthy-tech-card-icon">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <div className="stealthy-tech-card-content">
                <h3 className="stealthy-tech-card-title">{feature.title}</h3>
                <div className="stealthy-tech-card-desc">
                  {feature.lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verify Section */}
      <section className="stealthy-verify-section">
        <div className="stealthy-verify-content">
          <h2 className="stealthy-verify-title">
            <span>Verify Your</span>
            <span className="font-bold">STEALTHY</span>
          </h2>

          <div className="stealthy-verify-input-container">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Verify Your Product..."
              className="stealthy-verify-input"
            />
            <button onClick={handleVerify} className="stealthy-verify-btn">
              Verify Now
            </button>
          </div>

          <Image
            src="/images/stealthyair/threeDevices.png"
            alt="Stealthy Devices"
            width={800}
            height={400}
            className="w-full max-w-3xl h-auto object-contain"
            style={{ transform: 'scale(1.1)' }}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="stealthy-footer">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Stealthy Air. All rights reserved.
        </p>
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div className="stealthy-modal">
          <div className="stealthy-modal-content">
            <button onClick={() => setModalOpen(false)} className="stealthy-modal-close">
              &times;
            </button>
            <div className="font-medium">
              {modalState === 'success' ? (
                <>
                  <div className="stealthy-modal-icon text-green-500 text-6xl">✓</div>
                  <h2 className="stealthy-modal-title success">Verified</h2>
                  <p className="text-gray-600">{modalMessage}</p>
                </>
              ) : (
                <>
                  <div className="stealthy-modal-icon text-red-500 text-6xl">✗</div>
                  <h5 className="stealthy-modal-title error">{modalMessage}</h5>
                </>
              )}
              <button onClick={() => setModalOpen(false)} className="stealthy-modal-ok">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
