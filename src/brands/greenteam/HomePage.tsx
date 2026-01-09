'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { BrandPageProps } from '../types';
import './greenteam.css';

/**
 * Green Team Homepage
 *
 * Cannabis vape brand with:
 * - Age gate (21+)
 * - Video hero section
 * - Product showcase
 * - Feature highlights
 * - Verification section
 */
export function GreenTeamHomePage({ previewClientId }: BrandPageProps) {
  const [showAgeGate, setShowAgeGate] = useState(true);
  const [code, setCode] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState<'loading' | 'success' | 'error'>('loading');
  const [modalMessage, setModalMessage] = useState('');

  const logoUrl = 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/7d8bfb0e-69e7-4330-780a-6a2504ef8b00/public';
  const productImageUrl = 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/a28e9673-e802-4947-d509-82f5eb30b000/public';
  const videoUrl = 'https://customer-19w1a8y0iapg9msz.cloudflarestream.com/914eb6e41c06c047cc9cd3aacb846129/iframe?muted=true&loop=true&autoplay=true&controls=false';

  // Check if user already verified age
  useEffect(() => {
    const ageVerified = localStorage.getItem('greenteam-age-verified');
    if (ageVerified === 'true') {
      setShowAgeGate(false);
    }
  }, []);

  const handleAgeYes = () => {
    localStorage.setItem('greenteam-age-verified', 'true');
    setShowAgeGate(false);
  };

  const handleAgeNo = () => {
    window.location.href = 'https://google.com';
  };

  const handleVerify = async () => {
    if (!code.trim()) {
      setModalState('error');
      setModalMessage('Please enter a verification code.');
      setModalOpen(true);
      return;
    }

    setModalState('loading');
    setModalMessage('Please wait while we verify your code.');
    setModalOpen(true);

    try {
      const verifyUrl = previewClientId
        ? `/api/verify?code=${encodeURIComponent(code.toUpperCase())}&clientId=${previewClientId}`
        : `/api/verify?code=${encodeURIComponent(code.toUpperCase())}`;

      const response = await fetch(verifyUrl);
      const data = await response.json();

      if (data.valid) {
        setModalState('success');
        setModalMessage(data.message || 'Genuine Green Team Product');
      } else {
        setModalState('error');
        setModalMessage(data.message || 'Code not found. This product may not be authentic.');
      }
    } catch {
      setModalState('error');
      setModalMessage('An error occurred while verifying. Please try again.');
    }
  };

  return (
    <div className="greenteam-wrapper">
      {/* Age Gate */}
      {showAgeGate && (
        <div className="greenteam-age-gate">
          <div className="greenteam-age-gate-content">
            <div className="greenteam-age-gate-gradient" />
            <Image
              src={logoUrl}
              alt="Green Team"
              width={64}
              height={64}
              className="h-16 w-auto mx-auto mb-6"
            />
            <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">AGE VERIFICATION</h2>
            <p className="text-gray-300 mb-8 text-lg">
              You Must be at Least 21+ to Enter.<br />
              <span className="text-green-400 font-bold">Are you at least 21?</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleAgeYes}
                className="bg-green-600 hover:bg-green-500 text-black px-8 py-3 rounded-md font-bold tracking-widest text-lg shadow-lg"
              >
                YES
              </button>
              <button
                onClick={handleAgeNo}
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-md font-bold tracking-widest text-lg border border-gray-600"
              >
                NO
              </button>
            </div>
            <p className="mt-6 text-xs text-gray-500">
              By clicking &quot;Yes&quot;, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="greenteam-nav">
        <div className="greenteam-nav-content">
          <Image
            src={logoUrl}
            alt="Green Team Logo"
            width={64}
            height={64}
            className="greenteam-nav-logo w-auto hover:opacity-80 transition rounded"
          />
          <div className="greenteam-nav-links">
            <button className="greenteam-nav-link text-white">Home</button>
            <button className="greenteam-nav-link text-white">Products</button>
            <button className="greenteam-nav-link text-white">Media</button>
            <a href="#verify">
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-medium shadow-lg border border-green-400 tracking-widest">
                Verify
              </button>
            </a>
          </div>
        </div>
      </nav>

      {/* Video Hero Section */}
      <section className="greenteam-video-container bg-black">
        <iframe
          src={videoUrl}
          className="w-full h-full"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
        <div className="greenteam-video-gradient" />
        <div className="greenteam-scroll-indicator pointer-events-none">
          <span className="text-green-400 tracking-widest text-lg mb-2">SCROLL DOWN</span>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Hero Content Section */}
      <section className="greenteam-hero greenteam-liquid-gradient">
        <div className="greenteam-hero-content">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Product Image */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="greenteam-product-animator">
                <Image
                  src={productImageUrl}
                  alt="Liquid Diamonds Device"
                  width={360}
                  height={500}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Hero Text */}
            <div className="lg:w-1/2 text-center lg:text-left px-4">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white text-outline leading-tight mb-4">
                <span className="block">LIQUID DIAMONDS</span>
                <span className="block text-green-300">DEVICE</span>
              </h1>
              <p className="mt-3 text-gray-100 text-base sm:text-lg md:text-xl font-light max-w-xl">
                Rooted in nature, refined for your perfect high.
              </p>
              <div className="mt-8">
                <button className="greenteam-verify-btn">
                  VIEW FLAVORS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-green-400 font-semibold tracking-wide uppercase">Why Green Team?</h2>
            <p className="mt-2 text-3xl sm:text-4xl text-white font-bold">
              PREMIUM QUALITY. UNMATCHED FLAVOR.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="greenteam-feature-card">
              <div className="text-blue-400 text-5xl mb-4">💎</div>
              <h3 className="text-2xl font-bold mb-2">Liquid Diamonds</h3>
              <p className="text-gray-400">Purest extraction process for maximum potency.</p>
            </div>
            <div className="greenteam-feature-card">
              <div className="text-green-400 text-5xl mb-4">🌿</div>
              <h3 className="text-2xl font-bold mb-2">Top Shelf Strains</h3>
              <p className="text-gray-400">Curated selection of Indica, Sativa, and Hybrids.</p>
            </div>
            <div className="greenteam-feature-card">
              <div className="text-yellow-400 text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold mb-2">Authentic</h3>
              <p className="text-gray-400">Verify your product instantly with our secure system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Verify Section */}
      <section id="verify" className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-16">
        <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-700">
          <div className="text-center">
            <div className="text-green-500 text-5xl sm:text-6xl mb-4">✓</div>
            <h2 className="mt-4 text-2xl sm:text-3xl text-white font-bold">PRODUCT VERIFICATION</h2>
            <p className="mt-2 text-sm text-gray-400">
              Scratch off the label on the back of your box to reveal your authentication code.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <p className="text-xs text-gray-500 mb-2 text-center">Secured and powered by TruLock™ Technology</p>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full px-3 py-4 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-center tracking-widest text-xl uppercase"
                placeholder="XXXXXX"
              />
            </div>
            <button
              onClick={handleVerify}
              className="w-full py-3 px-4 text-black bg-green-400 hover:bg-green-500 rounded-md font-bold text-lg tracking-widest"
            >
              VERIFY NOW
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-center border-t border-gray-800">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Green Team. All rights reserved.
        </p>
      </footer>

      {/* Verification Modal */}
      {modalOpen && (
        <div
          className="greenteam-verify-modal"
          onClick={() => setModalOpen(false)}
        >
          <div
            className={`greenteam-verify-modal-content ${modalState === 'success' ? 'success' : modalState === 'error' ? 'error' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={logoUrl}
              alt="Green Team"
              width={64}
              height={64}
              className="h-16 w-auto mb-6"
            />

            {modalState === 'loading' && (
              <>
                <div className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center text-4xl animate-spin">
                  ↻
                </div>
                <h3 className="text-2xl font-bold uppercase mb-4">Verifying...</h3>
                <p className="text-gray-300 text-sm">{modalMessage}</p>
              </>
            )}

            {modalState === 'success' && (
              <>
                <div className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center text-4xl bg-green-500/10 text-green-500 border-2 border-green-500">
                  ✓
                </div>
                <h3 className="text-2xl font-bold uppercase mb-4 text-green-500">
                  Authentic Product
                </h3>
                <p className="text-gray-300 text-sm">{modalMessage}</p>
              </>
            )}

            {modalState === 'error' && (
              <>
                <div className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center text-4xl bg-red-500/10 text-red-500 border-2 border-red-500">
                  ✗
                </div>
                <h3 className="text-2xl font-bold uppercase mb-4 text-red-500">
                  Verification Failed
                </h3>
                <p className="text-gray-300 text-sm">{modalMessage}</p>
              </>
            )}

            <button
              onClick={() => setModalOpen(false)}
              className="mt-6 w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md font-bold"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
