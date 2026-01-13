'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import type { BrandPageProps } from '../types';
import './arcadia.css';
import { arcadiaImages } from './config';

type VerifyState = 'idle' | 'loading' | 'success' | 'error';

interface VerificationResult {
  valid: boolean;
  message: string;
  serial?: string;
  alreadyVerified?: boolean;
}

/**
 * Arcadia Verification Page
 * 
 * Mobile-first landing page for product verification with:
 * - Hero section with logo
 * - Product section with product renders
 * - Verification form (input + verify button)
 * - Success/Error modals
 * - Small footer
 */
export function ArcadiaHomePage({ siteConfig, previewClientId }: BrandPageProps) {
  const [code, setCode] = useState('');
  const [verifyState, setVerifyState] = useState<VerifyState>('idle');
  const [message, setMessage] = useState('');
  const [serial, setSerial] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const { client, branding } = siteConfig;
  // Dark theme - override branding colors for dark aesthetic
  const buttonColor = branding?.button_color || '#6366f1'; // Indigo accent
  const buttonTextColor = '#ffffff';

  // Use "Arcadia" as display name (override database "LUCID" if present)
  const displayName = 'Arcadia';
  const companyName = client.company_name === 'LUCID' ? displayName : (client.company_name || displayName);

  // Get logo URL - prioritize database, then Cloudflare CDN (skip placeholder URLs)
  const rawLogoUrl = branding?.large_logo_url || client.logo_url;
  const isPlaceholderUrl = (url: string) => url.includes('your-cloudflare-cdn.com') || url.includes('placeholder');
  
  let logoUrl: string | null = null;
  if (rawLogoUrl && rawLogoUrl.startsWith('http') && !isPlaceholderUrl(rawLogoUrl)) {
    logoUrl = rawLogoUrl;
  } else if (arcadiaImages.logo && !isPlaceholderUrl(arcadiaImages.logo)) {
    logoUrl = arcadiaImages.logo;
  }

  // Flavors image
  const flavorsImage = arcadiaImages.flavors && !isPlaceholderUrl(arcadiaImages.flavors) 
    ? arcadiaImages.flavors 
    : null;
  
  // Flavor renders for carousel
  const flavorRenders = arcadiaImages.flavorRenders || [];
  
  // Product images - filter out placeholder URLs (legacy, may not be used)
  const productImages = arcadiaImages.products.filter(url => !isPlaceholderUrl(url));

  // Small logo for success modal
  const smallLogoUrl = arcadiaImages.logoSmall && !isPlaceholderUrl(arcadiaImages.logoSmall)
    ? arcadiaImages.logoSmall
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      setVerifyState('error');
      setMessage('Please enter a verification code.');
      setModalOpen(true);
      return;
    }

    setVerifyState('loading');
    setMessage('Verifying your product...');
    setModalOpen(true);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          clientId: previewClientId || undefined,
        }),
      });
      const data: VerificationResult = await response.json();

      if (data.valid) {
        setVerifyState('success');
        setMessage(data.message || 'Authentic product');
        setSerial(data.serial || code.trim().toUpperCase());
      } else {
        setVerifyState('error');
        setMessage(data.message || 'Code not found. This product may not be authentic.');
      }
    } catch {
      setVerifyState('error');
      setMessage('An error occurred while verifying. Please try again.');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    if (verifyState === 'success') {
      setCode(''); // Clear code on success
    }
    setVerifyState('idle');
  };


  return (
    <main 
      className="arcadia-wrapper" 
      style={{ 
        backgroundColor: '#0a0a0a', 
        color: '#ffffff',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Gradient Blobs Background */}
      <div 
        className="arcadia-blob-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <div className="arcadia-blob arcadia-blob-1"></div>
        <div className="arcadia-blob arcadia-blob-2"></div>
        <div className="arcadia-blob arcadia-blob-3"></div>
      </div>

      {/* Main Content */}
      <div 
        className="arcadia-content min-h-screen flex flex-col" 
        style={{ 
          color: '#ffffff',
          position: 'relative',
          zIndex: 1
        }}
      >
      {/* Hero Section */}
      <section className="w-full px-4 pt-8 pb-2 md:pt-12 pb-4" style={{ color: '#ffffff' }}>
        <div className="max-w-md mx-auto text-center">
          {logoUrl && (
            <div className="mb-6 md:mb-8">
              <Image
                src={logoUrl}
                alt={companyName}
                width={900}
                height={450}
                className="w-full max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto h-auto"
                priority
                unoptimized={logoUrl?.endsWith('.gif')}
              />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3" style={{ color: '#ffffff' }}>
            Verify Your Product
          </h1>
        </div>
      </section>

      {/* Verification Form Section */}
      <section className="w-full px-4 pt-2 pb-6 md:pt-4 md:py-8">
        <div className="max-w-md mx-auto">
          <p className="text-base md:text-lg text-center mb-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Enter code to confirm authenticity
          </p>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative mb-4">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="X X X X X X"
                className="w-full h-14 md:h-16 px-5 pr-32 md:pr-36 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-white/60 outline-none text-base md:text-lg border-2 border-white/20 focus:border-white/40 focus:bg-white/15 transition-all text-center"
                style={{ borderRadius: '30px', letterSpacing: '0.3em' }}
                required
                disabled={verifyState === 'loading'}
              />
              <button
                type="submit"
                disabled={verifyState === 'loading'}
                className="arcadia-verify-button h-10 md:h-12 px-6 md:px-8 rounded-full font-semibold text-sm md:text-base uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: buttonColor,
                  color: buttonTextColor,
                  borderRadius: '30px',
                  position: 'absolute',
                  right: '0.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                {verifyState === 'loading' ? '...' : 'Verify'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Product Section */}
      <section className="w-full px-4 py-6 md:py-8 flex-1" style={{ color: '#ffffff' }}>
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          {flavorsImage && (
            <div className="mb-2 md:mb-3 text-center w-full">
              <Image
                src={flavorsImage}
                alt="Flavors"
                width={300}
                height={100}
                className="w-full max-w-xs md:max-w-sm mx-auto h-auto"
                priority
              />
            </div>
          )}

          {/* Infinite Flavor Carousel */}
          {flavorRenders.length > 0 && (
            <div className="arcadia-infinite-carousel w-full">
              <div className="arcadia-carousel-track">
                {/* First set of images */}
                {flavorRenders.map((img, idx) => (
                  <div key={`first-${idx}`} className="arcadia-carousel-item">
                    <Image
                      src={img}
                      alt={`Flavor ${idx + 1}`}
                      width={220}
                      height={330}
                      className="w-full h-auto"
                      sizes="(max-width: 640px) 180px, (max-width: 1024px) 200px, 220px"
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {flavorRenders.map((img, idx) => (
                  <div key={`second-${idx}`} className="arcadia-carousel-item">
                    <Image
                      src={img}
                      alt={`Flavor ${idx + 1}`}
                      width={220}
                      height={330}
                      className="w-full h-auto"
                      sizes="(max-width: 640px) 180px, (max-width: 1024px) 200px, 220px"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

        {/* Footer */}
        <footer className="w-full px-4 py-6 md:py-8 border-t border-white/10 mt-auto">
          <div className="max-w-md mx-auto text-center">
            <p className="text-sm md:text-base text-white/60">
              © {new Date().getFullYear()} {companyName}. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* Verification Result Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={verifyState !== 'loading' ? closeModal : undefined}
        >
          <div
            className="bg-gray-900/95 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-sm w-full text-center shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {verifyState === 'loading' ? (
              <>
                <div className="animate-spin w-16 h-16 border-4 border-gray-700 border-t-indigo-500 rounded-full mx-auto mb-4" />
                <p className="text-white text-base md:text-lg">{message}</p>
              </>
            ) : verifyState === 'success' ? (
              <>
                {/* Success Icon */}
                <div className="mb-4">
                  <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                {smallLogoUrl && (
                  <div className="mb-4">
                    <Image
                      src={smallLogoUrl}
                      alt={companyName}
                      width={120}
                      height={120}
                      className="mx-auto"
                    />
                  </div>
                )}
                <h3 className="text-2xl md:text-3xl font-bold text-green-400 mb-3">
                  Authentic {companyName} Product
                </h3>
                {serial && (
                  <p className="text-white/70 text-sm md:text-base">
                    Code: {serial}
                  </p>
                )}
                <button
                  onClick={closeModal}
                  className="mt-6 w-full py-3 rounded-full font-semibold text-white transition-all hover:scale-105 shadow-lg"
                  style={{
                    backgroundColor: buttonColor,
                    color: buttonTextColor,
                  }}
                >
                  Verify Another Product
                </button>
              </>
            ) : (
              <>
                {/* Error Icon */}
                <div className="mb-4">
                  <div className="w-20 h-20 mx-auto bg-red-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-red-400 mb-3">
                  Not Authentic
                </h3>
                <p className="text-white/80 text-sm md:text-base mb-4 px-2">
                  Code not found or already used.
                </p>
                <p className="text-white/60 text-sm mb-2">
                  Please check your code and try again.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-4 w-full py-3 rounded-full font-semibold text-white transition-all hover:scale-105 shadow-lg"
                  style={{
                    backgroundColor: buttonColor,
                    color: buttonTextColor,
                  }}
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
