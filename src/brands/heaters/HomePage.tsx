'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { BrandPageProps } from '../types';
import './heaters.css';

// Flavor data from the original site
const flavors = [
  {
    name: 'Tres Leches Berry',
    type: 'sativa',
    notes: 'Horchata | Berry Cake',
    image: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/064bf54e-f666-4f41-c244-843c7e05fa00/public',
    hardware: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/1874e8cc-b6af-4c5b-7c3a-3cdc703f0400/public',
  },
  {
    name: 'Paradise Sour',
    type: 'sativa',
    notes: 'Coconut Dream | Sour Pineapple',
    image: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/1ec3ebdf-b914-4690-a5ba-50ad57b91400/public',
    hardware: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/f63bf0b0-2e91-44dc-9205-5ea2cb3eda00/public',
  },
  {
    name: 'Strawberry Rosé Freeze',
    type: 'sativa',
    notes: 'Pink Rosé | Slushy',
    image: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/3c1fc800-bb16-42db-e3ee-c68a63ae8000/public',
    hardware: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/ed5e3d52-bf6f-4e37-ee40-fceaa05b7d00/public',
  },
  {
    name: 'Midnight Cherry',
    type: 'hybrid',
    notes: 'Black Cherry | Gelato Punch',
    image: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/12701eb0-629e-4fcb-c2f7-03a2f5ed1300/public',
    hardware: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/01592f21-a9b8-4f5e-6040-09ba8eeb1600/public',
  },
  {
    name: 'Gummy Gas',
    type: 'hybrid',
    notes: 'Rainbow Belts | Gushers',
    image: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/5691e70a-da58-475d-5d79-f1dce8a7cb00/public',
    hardware: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/57bf6927-4f26-4fd0-d2e9-3a7350652800/public',
  },
  {
    name: 'Double Fizz Berry',
    type: 'hybrid',
    notes: 'Grape Soda | Fresa',
    image: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/791e8ef6-ea51-467c-cf2c-c0ca7f753800/public',
    hardware: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/bbfd63a4-7ecf-42da-fb52-6eb8f7776600/public',
  },
  {
    name: 'Cotton Candy Swirl',
    type: 'indica',
    notes: 'Frosted Bubblegum | Whipped Cream',
    image: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/b6dcfb9c-3d8a-4c16-8e16-53f052382f00/public',
    hardware: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/c00df1f9-7979-4c68-4ccb-7d5d58812400/public',
  },
  {
    name: 'Gogurt Burst',
    type: 'indica',
    notes: 'Froyo | Strawnana',
    image: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/1c51b950-1415-4605-7497-a78327895a00/public',
    hardware: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/41be598c-ab0d-495c-9e15-fe07eea50d00/public',
  },
  {
    name: 'Tropical Zkittles',
    type: 'indica',
    notes: 'Zapaya | Fruit Punch',
    image: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/e88aaf83-2003-401c-cfdf-8f60010fb200/public',
    hardware: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/4ece7bf6-7bd8-4ba9-69cd-18a805e7bb00/public',
  },
  {
    name: 'Frosted Mallow',
    type: 'indica',
    notes: 'Oreo Sorbet | Marshmallow',
    image: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/7854458c-70c1-41a8-b6dd-ed81b81c4e00/public',
    hardware: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/bb10d4c7-0c0b-467b-7973-81f6ee15f700/public',
  },
];

const trustBadges = [
  {
    icon: '/images/heaters/lab_icon.jpg',
    title: 'Lab Tested',
    description: 'Ensuring highest purity and potency.',
  },
  {
    icon: '/images/heaters/shield_icon.jpg',
    title: 'No Heavy Metals',
    description: 'Clean extraction processes for consumer safety.',
  },
  {
    icon: '/images/heaters/leaf_icon.jpg',
    title: 'No Pesticides',
    description: '100% pure organic concentrates.',
  },
];

export function HeatersHomePage({ previewClientId }: BrandPageProps) {
  const [code, setCode] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState<'loading' | 'success' | 'error'>('loading');
  const [modalMessage, setModalMessage] = useState('');
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const logoUrl = 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/60e6ca91-975d-4d18-b69b-da4dff871500/public';

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
        setModalMessage(data.message || 'Genuine Heaters Product');
      } else {
        setModalState('error');
        setModalMessage(data.message || 'Code not found. This product is not valid.');
      }
    } catch {
      setModalState('error');
      setModalMessage('An error occurred while verifying the code. Please try again.');
    }
  };

  const handleCardClick = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <div className="bg-[#0a0a0a] text-white font-['Inter',sans-serif] overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 py-16 overflow-hidden"
        style={{
          background: 'linear-gradient(106deg, rgba(155,55,42,1) 0%, rgba(191,58,21,1) 24%, rgba(204,207,76,1) 55%, rgba(207,139,45,1) 91%)',
        }}
      >
        {/* Logo */}
        <div className="relative z-20 mb-8">
          <Image
            src={logoUrl}
            alt="Heater's Logo"
            width={585}
            height={400}
            className="heaters-logo w-full max-w-[400px] md:max-w-[585px] h-auto drop-shadow-2xl"
            priority
          />
        </div>

        {/* Verify Section */}
        <div className="w-full max-w-[450px] z-20">
          <label className="block text-black/70 font-extrabold text-sm tracking-[2px] mb-4">
            ENTER VERIFICATION CODE
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="XXXXXX"
              className="w-full bg-black/90 border border-white/30 rounded-xl py-5 px-6 pr-28 text-white font-bold text-lg tracking-[5px] text-center uppercase"
            />
            <button
              onClick={handleVerify}
              className="absolute right-2 top-2 bottom-2 bg-[#8b0000] text-white font-extrabold text-sm uppercase px-5 rounded-lg hover:bg-[#a00000] transition-colors"
            >
              VERIFY
            </button>
          </div>
        </div>

        {/* Explore Anchor */}
        <a href="#flavors" className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
          <span className="text-black/50 text-xs font-extrabold tracking-[2px]">EXPLORE FLAVORS</span>
          <div className="heaters-chevron" />
        </a>
      </section>

      {/* Flavor Menu Section */}
      <section id="flavors" className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-center text-5xl md:text-7xl mb-16 md:mb-24 text-white font-bold">
            THE FLAVOR MENU
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
            {flavors.map((flavor, index) => (
              <div
                key={flavor.name}
                className={`heaters-flavor-card ${activeCard === index ? 'active' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                {/* Image Container */}
                <div className="heaters-card-image-container">
                  <Image
                    src={flavor.image}
                    alt={flavor.name}
                    width={280}
                    height={280}
                    className="heaters-flavor-img"
                  />
                  <Image
                    src={flavor.hardware}
                    alt={`${flavor.name} Device`}
                    width={250}
                    height={250}
                    className="heaters-hardware-ghost"
                  />
                </div>

                {/* Tag */}
                <span className={`heaters-tag ${flavor.type}`}>
                  {flavor.type}
                </span>

                {/* Name & Notes */}
                <h3 className="heaters-flavor-name">{flavor.name}</h3>
                <p className="heaters-flavor-notes">{flavor.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-20 px-4 bg-black border-t border-[#111]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {trustBadges.map((badge) => (
            <div key={badge.title} className="flex flex-col items-center">
              <div className="w-8 h-8 mb-4">
                <Image
                  src={badge.icon}
                  alt={badge.title}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold mb-2">{badge.title}</h3>
              <p className="text-[#999] text-sm">{badge.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-black border-t border-[#111] text-center">
        <p className="text-[#d4af37] text-sm font-bold">
          &copy; {new Date().getFullYear()} Heater&apos;s Official.
        </p>
      </footer>

      {/* Verification Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-[#111] border border-[#333] p-8 md:p-12 rounded-3xl w-full max-w-[450px] text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-[#555] text-3xl hover:text-white"
            >
              &times;
            </button>

            <Image
              src={logoUrl}
              alt="Heater's Logo"
              width={150}
              height={100}
              className="mx-auto mb-8 w-[150px] h-auto"
            />

            {modalState === 'loading' && (
              <>
                <div className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center text-4xl heaters-spinner">
                  &#x27F3;
                </div>
                <h2 className="text-xl font-extrabold uppercase mb-4">Verifying...</h2>
                <p className="text-[#888] text-sm">{modalMessage}</p>
              </>
            )}

            {modalState === 'success' && (
              <>
                <div className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center text-4xl bg-[#2ecc71]/10 text-[#2ecc71] border-2 border-[#2ecc71]">
                  &#x2713;
                </div>
                <h2 className="text-xl font-extrabold uppercase mb-4 text-[#2ecc71]">
                  Authentic Heaters Product
                </h2>
                <p className="text-[#888] text-sm">{modalMessage}</p>
              </>
            )}

            {modalState === 'error' && (
              <>
                <div className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center text-4xl bg-[#e74c3c]/10 text-[#e74c3c] border-2 border-[#e74c3c]">
                  &#x2717;
                </div>
                <h2 className="text-xl font-extrabold uppercase mb-4 text-[#e74c3c]">
                  Verification Failed
                </h2>
                <p className="text-[#888] text-sm">{modalMessage}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
