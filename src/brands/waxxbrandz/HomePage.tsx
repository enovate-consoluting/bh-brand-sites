'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { BrandPageProps } from '../types';
import './waxxbrandz.css';

// Product lines
const products = [
  {
    name: 'Live Resin',
    image: '/images/waxxbrandz/product-img1.png',
    status: 'Coming Soon!',
  },
  {
    name: 'Live Diamonds',
    image: '/images/waxxbrandz/product-img2.png',
    status: '',
  },
  {
    name: 'Pre Rolls',
    image: '/images/waxxbrandz/product-img3.png',
    status: '',
  },
];

/**
 * Waxx Brandz Homepage
 *
 * Cannabis concentrates brand with:
 * - Video banner
 * - Mission statement
 * - Product showcase
 * - "From Farm to Device" story
 */
export function WaxxBrandzHomePage({ previewClientId }: BrandPageProps) {
  const [code, setCode] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState<'success' | 'error'>('success');
  const [modalMessage, setModalMessage] = useState('');

  const logoUrl = '/images/waxxbrandz/logo.png';
  const videoUrl = 'https://customer-19w1a8y0iapg9msz.cloudflarestream.com/c852ea5023167585809a6d3d1959627b/iframe?muted=true&preload=true&loop=true&autoplay=true&controls=false';

  const handleVerify = async () => {
    if (!code.trim()) {
      setModalState('error');
      setModalMessage('Please enter a verification code.');
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
        setModalMessage('Your Waxx product is authentic!');
      } else {
        setModalState('error');
        setModalMessage(data.message || 'Code not found. Please try again.');
      }
    } catch {
      setModalState('error');
      setModalMessage('An error occurred. Please try again.');
    }
    setModalOpen(true);
  };

  return (
    <div className="waxx-wrapper">
      {/* Video Banner */}
      <section className="waxx-banner">
        <video autoPlay playsInline loop muted>
          <source src="/images/waxxbrandz/banner-video.mp4" type="video/mp4" />
        </video>
        <div className="waxx-banner-content">
          <Image
            src={logoUrl}
            alt="Waxx Brandz"
            width={200}
            height={200}
            className="waxx-logo"
          />
        </div>
      </section>

      {/* Mission Statement */}
      <section className="waxx-section waxx-section-light">
        <div className="waxx-container">
          <div className="waxx-section-info">
            <Image
              src="/images/waxxbrandz/Waxx-still.png"
              alt="Waxx"
              width={150}
              height={150}
              className="mx-auto mb-6"
            />
            <h2>Mission Statement</h2>
            <p>
              Waxx Barz products are developed with both the connoisseur and the everyday consumer in mind.
              At the start of product development, the biggest question that needed to be answered was,
              &quot;Would we smoke this?&quot; and the rest was history... We are proud to bring to you our 3 signature lines.
              Waxx not only celebrates the culture but focuses on catering to the everyday cannabis consumer.
              Our products are single-sourced and manufactured inhouse. Here at Waxx, we demand the utmost quality
              when it comes to bringing our cannabis products to the market. As a consumer of our products,
              we want to welcome you to our FAMILY and emerge you into the Waxx way of Life!
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="waxx-section waxx-section-light" style={{ paddingTop: 0 }}>
        <div className="waxx-container">
          <div className="waxx-section-info">
            <h2>Featured Products</h2>
          </div>
          <div className="waxx-product-grid">
            {products.map((product) => (
              <div key={product.name} className="waxx-product-item">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={250}
                  className="waxx-product-image"
                />
                <div className="waxx-product-info">
                  <h5>{product.name}</h5>
                  <button className="waxx-btn">Take a peek</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From Farm to Device */}
      <section className="waxx-section waxx-section-light">
        <div className="waxx-container">
          <div className="waxx-device-section">
            <div className="waxx-device-info">
              <Image
                src="/images/waxxbrandz/Waxx-still.png"
                alt="Waxx"
                width={100}
                height={100}
                className="mb-4"
              />
              <h2>From Farm to Device</h2>
              <p>
                Our Flavorful Premium Concentrates are extracted from strain specific fresh frozen cannabis
                that carry the freshest natural aromas and taste. The Waxx Way consists of flash freezing
                and preserving our beautiful buds that we harvest at peak season to ensure we put the &quot;LIVE&quot;
                in our Live Diamonds and Live Resin signature lines. We then extract our buds at subzero
                temperatures reaching -90 C. From this process we yield the tastiest terpene rich profiles
                which provide a long-lasting full spectrum experience packed into our signature Waxx Barz.
              </p>
              <ul>
                <li>Strain Specific Live Resin</li>
                <li>Extracted From Fresh Frozen Flower</li>
                <li>Preserves Natural Flavors, Aromas, And Essential Terpene Profiles</li>
                <li>Buds Are Extracted In The Most Live State</li>
              </ul>
            </div>
            <div className="waxx-device-video">
              <iframe
                src={videoUrl}
                loading="lazy"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Join Newsletter */}
      <section className="waxx-join-section">
        <div className="waxx-container">
          <h2>Waxx News</h2>
          <p>Become a part of the family and stay up-to-date with the Waxx Team!</p>
          <button className="waxx-btn">Join Now</button>
        </div>
      </section>

      {/* Verify Section */}
      <section className="waxx-verify-section">
        <div className="waxx-verify-content">
          <h2>Verify Your Product</h2>
          <p>Enter your authentication code to verify your Waxx product is genuine.</p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="XXXXXX"
            className="waxx-verify-input"
          />
          <button onClick={handleVerify} className="waxx-verify-btn">
            VERIFY NOW
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="waxx-footer">
        <p>&copy; {new Date().getFullYear()} Waxx Barz. All rights reserved.</p>
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div className="waxx-modal" onClick={() => setModalOpen(false)}>
          <div className="waxx-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className={`waxx-modal-icon ${modalState}`}>
              {modalState === 'success' ? '✓' : '✗'}
            </div>
            <h3 className={`waxx-modal-title ${modalState}`}>
              {modalState === 'success' ? 'Authentic Product' : 'Verification Failed'}
            </h3>
            <p className="waxx-modal-message">{modalMessage}</p>
            <button onClick={() => setModalOpen(false)} className="waxx-modal-btn">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
