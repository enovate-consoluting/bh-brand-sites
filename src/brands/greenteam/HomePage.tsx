'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { BrandPageProps } from '../types';
import './greenteam.css';

// Product data - All 20 flavors from legacy site
const products = [
  {
    name: "Cherry Pie",
    type: "Indica",
    color: "bg-red-900",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/a28e9673-e802-4947-d509-82f5eb30b000/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/d85b765b-3ba6-4ac5-b901-9e09780ac600/public",
    description: "A classic strain known for its sweet and sour cherry aroma. Cherry Pie delivers a euphoric, relaxing high that melts away stress without putting you to sleep immediately.",
    effects: ["Relaxed", "Euphoric", "Happy"]
  },
  {
    name: "Pineapple Passion",
    type: "Hybrid",
    color: "bg-yellow-600",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/5c1b4671-6740-42c8-c802-2c68d5668500/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/807a4533-ad6d-4bf2-544f-8eb43382da00/public",
    description: "Exploding with tropical pineapple flavors, this hybrid offers a balanced high that stimulates creativity while keeping your body at ease.",
    effects: ["Uplifted", "Creative", "Tropical"]
  },
  {
    name: "Frozen Grapes",
    type: "Indica",
    color: "bg-purple-700",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/a7f40c8c-9d8c-4a07-ad1f-3a76a4ef5200/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/9d8fcc0f-9104-43c1-b357-9c7e72ee2100/public",
    description: "Like a cold grape soda on a hot day. This Indica hits with deep berry notes and an icy exhale, perfect for winding down at night.",
    effects: ["Sleepy", "Calm", "Berry"]
  },
  {
    name: "Blueberry Muffin",
    type: "Indica",
    color: "bg-blue-800",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/44213e9b-8c7f-469b-d0de-869858772400/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/b12e5a8b-6b90-4e83-0a4f-149855c2e400/public",
    description: "True to its name, this strain tastes like fresh baked goods. A comforting Indica that provides a heavy body sensation and peace of mind.",
    effects: ["Relaxed", "Hungry", "Comfort"]
  },
  {
    name: "Monopoly Runtz",
    type: "Hybrid",
    color: "bg-gray-700",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/111234e4-10b0-4beb-2cc2-c5ea70fcd900/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/4785aa70-25fa-4977-4966-cae5069f5100/public",
    description: "A top-shelf hybrid with a gassy, candy-like aroma. It offers a luxurious, balanced high that hits both head and body equally.",
    effects: ["Balanced", "Talkative", "Sweet"]
  },
  {
    name: "Apple Ice Pop",
    type: "Hybrid",
    color: "bg-green-600",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/31f4e71d-3844-412b-424f-b4bbf518a000/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/00ee971e-f6bf-49e9-f7e3-4bb0856df000/public",
    description: "Crisp green apple flavors with a cool, refreshing finish. This hybrid is great for social gatherings or daytime adventures.",
    effects: ["Energetic", "Social", "Crisp"]
  },
  {
    name: "Dragon Fruit Freeze",
    type: "Hybrid",
    color: "bg-pink-600",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/0fd91f10-2c76-4d99-8993-551fd11c5700/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/edbfa8fd-2367-4dc2-eb7b-00a577f00a00/public",
    description: "Exotic and icy, this strain blends sweet dragon fruit with a menthol kick. A unique hybrid experience for those seeking something different.",
    effects: ["Exotic", "Cool", "Focused"]
  },
  {
    name: "Strawberry Cheesecake",
    type: "Indica",
    color: "bg-red-500",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/e6a53c38-f534-40a1-ec1e-b0f33dd41a00/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/b69c709f-11eb-4271-2f42-c85a354f6500/public",
    description: "Rich, creamy, and sweet. Strawberry Cheesecake is a dessert-like Indica that settles heavily in the limbs for total relaxation.",
    effects: ["Sleepy", "Sweet", "Heavy"]
  },
  {
    name: "Blue Razz",
    type: "Hybrid",
    color: "bg-blue-600",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/1fa64c62-1af6-4443-96cf-7cf6224cc700/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/64bee9f4-ae3c-4707-4d2b-883e14155300/public",
    description: "Nostalgic blue raspberry candy flavors. This hybrid provides a fun, buzzy head high that eventually tapers into relaxation.",
    effects: ["Buzzy", "Nostalgic", "Fun"]
  },
  {
    name: "Cotton Candy Rush",
    type: "Indica",
    color: "bg-pink-400",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/698bd2f4-f219-437e-c5bc-e6d0408be800/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/49ec030c-08fb-48c1-ea44-dcbdd0891000/public",
    description: "Sugary sweet and fluffy clouds of vapor. This Indica hits quickly with a rush of euphoria followed by a long-lasting couch lock.",
    effects: ["Euphoric", "Sugary", "Couch-Lock"]
  },
  {
    name: "Lychee Jelly",
    type: "Indica",
    color: "bg-pink-700",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/44c1a4f2-405f-478f-d916-3a74b52a0f00/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/7947a643-4af7-4239-1170-4f0b39776800/public",
    description: "Floral and sweet with a hint of rose. Lychee Jelly is a sophisticated Indica that calms the nerves and delights the palate.",
    effects: ["Calm", "Floral", "Smooth"]
  },
  {
    name: "Mango Peach Fusion",
    type: "Indica",
    color: "bg-orange-500",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/9da9b333-9713-4e48-cce0-2f87000e1500/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/1c2c91d4-02fc-4d7f-7278-3ed1c0752000/public",
    description: "A juicy blend of ripe mangos and soft peaches. This Indica brings a warm, fuzzy body high perfect for movie nights.",
    effects: ["Juicy", "Warm", "Relaxed"]
  },
  {
    name: "Tropical Breeze",
    type: "Indica",
    color: "bg-orange-400",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/a98b89e0-3ffe-4af8-0095-00ce29926700/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/91ed57a8-368a-4165-dc24-797b625e5e00/public",
    description: "A vacation in a vape. Tropical Breeze combines island fruits for a sweet, relaxing escape from the daily grind.",
    effects: ["Escapism", "Fruity", "Chill"]
  },
  {
    name: "Vanilla Swirl",
    type: "Hybrid",
    color: "bg-yellow-200",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/76357221-4f36-45c1-39ed-bc2c42199c00/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/02a9f686-6c5a-4e31-7ea0-313e521b1e00/public",
    description: "Smooth, creamy vanilla with earthy undertones. A balanced Hybrid that pairs perfectly with your morning coffee or evening dessert.",
    effects: ["Creamy", "Balanced", "Smooth"]
  },
  {
    name: "Rainbow Drops",
    type: "Hybrid",
    color: "bg-indigo-500",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/67052e60-f2f4-4561-4699-4c19b9ef8400/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/d7bd7f44-c7cd-433f-2cc3-735137664d00/public",
    description: "Taste the rainbow with zesty, mixed fruit flavors. This Hybrid is known for sparking creativity and lifting spirits.",
    effects: ["Zesty", "Creative", "Happy"]
  },
  {
    name: "Island Time",
    type: "Sativa",
    color: "bg-teal-500",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/da4d10f8-9954-4afc-69cf-3224402bbe00/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/47e18fe4-107e-4f4e-88b9-f860da25d000/public",
    description: "Coconut, pineapple, and citrus notes define this Sativa. It gives you an energetic boost to get things done.",
    effects: ["Energetic", "Focused", "Citrus"]
  },
  {
    name: "Guava Lava",
    type: "Indica",
    color: "bg-red-400",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/81a159e8-606a-4139-9c99-871719598100/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/14a7917c-42b0-4c28-fd11-bece76ad9e00/public",
    description: "Erupting with sweet guava flavor. This Indica is powerful and sedating, best saved for late-night sessions.",
    effects: ["Sedating", "Sweet", "Powerful"]
  },
  {
    name: "Watermelon Bubblegum",
    type: "Hybrid",
    color: "bg-green-400",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/9412bfe7-00e1-4a40-3fe9-f225b9b89900/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/8b0d8914-e24f-43b4-97b2-561a9c178100/public",
    description: "Juicy watermelon meets sugary bubblegum. A fun, uplifting hybrid that brings out your inner child.",
    effects: ["Uplifting", "Sweet", "Playful"]
  },
  {
    name: "Strawberry Kiwi",
    type: "Sativa",
    color: "bg-lime-500",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/937c7d23-2e94-47a6-6061-7a6697c3f500/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/6c0a6121-7340-4529-9b13-0d9d5a893000/public",
    description: "The classic fruit pairing in Sativa form. Tart kiwi and sweet strawberry combine for an invigorating, cerebral high.",
    effects: ["Cerebral", "Tart", "Active"]
  },
  {
    name: "Honeydew Melon",
    type: "Sativa",
    color: "bg-green-300",
    image: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/2f414d2c-75a3-437a-acdf-7ce49df40900/public",
    deviceImage: "https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/13a9fca6-76a5-412a-337e-90f548078f00/public",
    description: "Light, refreshing, and subtly sweet. This Sativa offers a clean head high that's perfect for staying productive.",
    effects: ["Clean", "Refreshing", "Light"]
  }
];

// Media videos data
const mediaVideos = [
  {
    id: "79b6ec09e08fd21c8032efa2fe50ab9a",
    title: "Green Team v1",
    subtitle: "Official Brand Video"
  },
  {
    id: "e3d600aef544023afbcd3b2092af1a14",
    title: "Green Team v2",
    subtitle: "Lifestyle & Vibe"
  },
  {
    id: "7ae9bff4c9b9477c8b3b3877387f094e",
    title: "Green Team New Drop",
    subtitle: "Latest Device Showcase"
  }
];

type ProductType = typeof products[0];
type FilterType = 'all' | 'Indica' | 'Sativa' | 'Hybrid';

/**
 * Green Team Homepage
 *
 * Cannabis vape brand with:
 * - Age gate (21+)
 * - Video hero section with animated product loop
 * - Products section with filter and modal
 * - Media gallery
 * - Social links footer
 * - Full mobile support
 */
export function GreenTeamHomePage({ previewClientId }: BrandPageProps) {
  const [showAgeGate, setShowAgeGate] = useState(true);
  const [activeSection, setActiveSection] = useState<'home' | 'products' | 'media' | 'verify'>('home');
  const [productFilter, setProductFilter] = useState<FilterType>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const [isFlavorFading, setIsFlavorFading] = useState(false);

  // Verification state
  const [code, setCode] = useState('');
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [verifyState, setVerifyState] = useState<'loading' | 'success' | 'error'>('loading');
  const [verifyMessage, setVerifyMessage] = useState('');

  const logoUrl = 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/7d8bfb0e-69e7-4330-780a-6a2504ef8b00/public';
  const videoUrl = 'https://customer-19w1a8y0iapg9msz.cloudflarestream.com/914eb6e41c06c047cc9cd3aacb846129/iframe?muted=true&loop=true&autoplay=true&controls=false&poster=https%3A%2F%2Fcustomer-19w1a8y0iapg9msz.cloudflarestream.com%2F914eb6e41c06c047cc9cd3aacb846129%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600';

  // Check if user already verified age
  useEffect(() => {
    const ageVerified = localStorage.getItem('greenteam-age-verified');
    if (ageVerified === 'true') {
      setShowAgeGate(false);
    }
  }, []);

  // Animated flavor loop with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setIsFlavorFading(true);

      // After fade out completes, change image and fade in
      setTimeout(() => {
        setCurrentFlavorIndex((prev) => (prev + 1) % products.length);
        setIsFlavorFading(false);
      }, 700);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAgeYes = () => {
    localStorage.setItem('greenteam-age-verified', 'true');
    setShowAgeGate(false);
  };

  const handleAgeNo = () => {
    window.location.href = 'https://google.com';
  };

  const navigateTo = useCallback((section: 'home' | 'products' | 'media' | 'verify') => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const handleVerify = async () => {
    if (!code.trim()) {
      setVerifyState('error');
      setVerifyMessage('Please enter a verification code.');
      setVerifyModalOpen(true);
      return;
    }

    setVerifyState('loading');
    setVerifyMessage('Please wait while we verify your code.');
    setVerifyModalOpen(true);

    try {
      const verifyUrl = previewClientId
        ? `/api/verify?code=${encodeURIComponent(code.toUpperCase())}&clientId=${previewClientId}`
        : `/api/verify?code=${encodeURIComponent(code.toUpperCase())}`;

      const response = await fetch(verifyUrl);
      const data = await response.json();

      if (data.valid) {
        setVerifyState('success');
        setVerifyMessage(data.message || 'Authentic Green Team Product');
      } else {
        setVerifyState('error');
        setVerifyMessage(data.message || 'Please Re-Try, code is not found or has been used already');
      }
    } catch {
      setVerifyState('error');
      setVerifyMessage('An error occurred while verifying. Please try again.');
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Indica': return 'bg-purple-600';
      case 'Sativa': return 'bg-red-500';
      case 'Hybrid': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getEffectPillColor = (type: string) => {
    switch (type) {
      case 'Indica': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'Sativa': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Hybrid': return 'bg-blue-100 text-blue-800 border border-blue-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProducts = productFilter === 'all'
    ? products
    : products.filter(p => p.type === productFilter);

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
          {/* Logo - centered on mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none">
            <button onClick={() => navigateTo('home')}>
              <Image
                src={logoUrl}
                alt="Green Team Logo"
                width={48}
                height={48}
                className="h-10 md:h-12 w-auto hover:opacity-80 transition rounded"
              />
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="greenteam-nav-links">
            <button onClick={() => navigateTo('home')} className="greenteam-nav-link text-white brand-font">Home</button>
            <button onClick={() => navigateTo('products')} className="greenteam-nav-link text-white brand-font">Products</button>
            <button onClick={() => navigateTo('media')} className="greenteam-nav-link text-white brand-font">Media</button>
            <button
              onClick={() => navigateTo('verify')}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-medium shadow-lg border border-green-400 tracking-widest brand-font"
            >
              Verify
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="greenteam-mobile-menu-btn absolute right-4"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => navigateTo('home')} className="block w-full text-left px-3 py-4 text-xl font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md tracking-wider brand-font">HOME</button>
              <button onClick={() => navigateTo('products')} className="block w-full text-left px-3 py-4 text-xl font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md tracking-wider brand-font">PRODUCTS</button>
              <button onClick={() => navigateTo('media')} className="block w-full text-left px-3 py-4 text-xl font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md tracking-wider brand-font">MEDIA</button>
              <button onClick={() => navigateTo('verify')} className="block w-full text-left px-3 py-4 text-xl font-medium text-green-400 hover:bg-gray-700 hover:text-green-300 rounded-md tracking-wider brand-font">VERIFY</button>
            </div>
          </div>
        )}
      </nav>

      {/* HOME SECTION */}
      {activeSection === 'home' && (
        <main className="flex-grow">
          {/* Video Hero Section */}
          <div className="w-full relative h-[calc(100vh-5rem)] flex items-center justify-center bg-black overflow-hidden">
            <div className="greenteam-video-container">
              <iframe
                src={videoUrl}
                style={{ border: 'none' }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="greenteam-video-gradient" />
            <div className="greenteam-scroll-indicator pointer-events-none">
              <span className="brand-font text-green-400 tracking-widest text-lg mb-2 text-outline">SCROLL DOWN</span>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          {/* Hero Content Section - Liquid Diamonds */}
          <section className="relative overflow-hidden min-h-[80vh] flex items-center greenteam-liquid-gradient">
            <div className="max-w-7xl mx-auto w-full relative h-full flex flex-col lg:block items-center justify-center pt-8 pb-16 lg:py-0">

              {/* Animated Product Image - Right side on desktop */}
              <div className="order-1 lg:order-none lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center z-10 mb-8 lg:mb-0">
                <div
                  className={`w-[300px] h-[400px] lg:w-[360px] lg:h-[500px] bg-transparent rounded-3xl flex flex-col items-center justify-center transition-all duration-700 ease-in-out transform rotate-3 relative overflow-hidden ${
                    isFlavorFading ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                  }`}
                >
                  <div className="w-full h-full absolute inset-0 flex items-center justify-center p-4">
                    <Image
                      src={products[currentFlavorIndex].image}
                      alt={products[currentFlavorIndex].name}
                      width={360}
                      height={500}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Text - Left side */}
              <div className="order-2 lg:order-none relative z-20 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
                  <div className="text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl tracking-tight text-white brand-font text-outline leading-tight mb-4">
                      <span className="block">LIQUID DIAMONDS</span>
                      <span className="block text-green-300">DEVICE</span>
                    </h1>
                    <p className="mt-3 text-sm text-gray-300 sm:mt-5 sm:text-base sm:max-w-xl sm:mx-auto md:mt-5 md:text-lg lg:mx-0 font-extralight px-4 lg:px-0">
                      Rooted in nature, refined for your perfect high.
                    </p>
                    <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow">
                        <button
                          onClick={() => navigateTo('products')}
                          className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-black bg-green-400 hover:bg-green-500 brand-font tracking-widest transform transition hover:scale-105"
                        >
                          VIEW FLAVORS
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skewed white overlay effect */}
            <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-white opacity-5 transform -skew-x-12 translate-x-16 pointer-events-none" />
          </section>

          {/* Features Section */}
          <section className="py-16 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-green-400 font-semibold tracking-wide uppercase brand-font">Why Green Team?</h2>
                <p className="mt-2 text-3xl sm:text-4xl text-white brand-font">
                  PREMIUM QUALITY. UNMATCHED FLAVOR.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="greenteam-feature-card">
                  <div className="text-blue-400 text-5xl mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 2L2 8L12 22L22 8L18 2H6ZM12 17.92L5.5 9H18.5L12 17.92ZM6.88 4H17.12L19.42 7H4.58L6.88 4Z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 brand-font">Liquid Diamonds</h3>
                  <p className="text-gray-400">Purest extraction process for maximum potency.</p>
                </div>
                <div className="greenteam-feature-card">
                  <div className="text-green-400 text-5xl mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 brand-font">Top Shelf Strains</h3>
                  <p className="text-gray-400">Curated selection of Indica, Sativa, and Hybrids.</p>
                </div>
                <div className="greenteam-feature-card">
                  <div className="text-yellow-400 text-5xl mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.3V15.8C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 brand-font">Authentic</h3>
                  <p className="text-gray-400">Verify your product instantly with our secure system.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* PRODUCTS SECTION */}
      {activeSection === 'products' && (
        <main className="flex-grow bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl text-gray-900 mb-4 brand-font">FLAVOR COLLECTION</h2>
              <p className="text-lg sm:text-xl text-gray-600 font-medium">
                Discover our lineup of Indicas, Sativas, and Hybrids.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
              <button
                onClick={() => setProductFilter('all')}
                className={`px-8 py-2 rounded-full font-bold transition shadow-sm min-w-[120px] ${
                  productFilter === 'all'
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-black hover:bg-gray-200 border border-gray-200'
                }`}
              >
                ALL
              </button>
              <div className="flex gap-3 flex-wrap justify-center">
                <button
                  onClick={() => setProductFilter('Indica')}
                  className={`px-6 py-2 rounded-full font-bold transition shadow-sm ${
                    productFilter === 'Indica'
                      ? 'bg-purple-700 text-white'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  INDICA
                </button>
                <button
                  onClick={() => setProductFilter('Sativa')}
                  className={`px-6 py-2 rounded-full font-bold transition shadow-sm ${
                    productFilter === 'Sativa'
                      ? 'bg-red-600 text-white'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  SATIVA
                </button>
                <button
                  onClick={() => setProductFilter('Hybrid')}
                  className={`px-6 py-2 rounded-full font-bold transition shadow-sm ${
                    productFilter === 'Hybrid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  HYBRID
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
                >
                  <div className="h-64 relative overflow-hidden bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110 pt-2 md:pt-8 px-4 pb-0 md:pb-4"
                    />
                  </div>
                  <div className="pb-4 md:pb-5 pt-0 md:pt-2 text-center bg-white flex flex-col items-center justify-center">
                    <span className={`${getBadgeColor(product.type)} text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-sm`}>
                      {product.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* MEDIA SECTION */}
      {activeSection === 'media' && (
        <main className="flex-grow bg-gray-100 py-16 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl text-gray-900 mb-4 brand-font">MEDIA GALLERY</h2>
              <p className="text-lg sm:text-xl text-gray-600 font-medium">
                Experience the Green Team lifestyle.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mediaVideos.map((video) => (
                <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
                  <div style={{ position: 'relative', paddingTop: '177.77%' }}>
                    <iframe
                      src={`https://customer-19w1a8y0iapg9msz.cloudflarestream.com/${video.id}/iframe?poster=https%3A%2F%2Fcustomer-19w1a8y0iapg9msz.cloudflarestream.com%2F${video.id}%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600`}
                      loading="lazy"
                      style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 brand-font uppercase">{video.title}</h3>
                    <p className="text-gray-500 text-sm mt-2">{video.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* VERIFY SECTION */}
      {activeSection === 'verify' && (
        <main className="flex-grow min-h-screen flex items-center justify-center bg-gray-900 px-4 py-16">
          <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-700">
            <div className="text-center">
              <div className="text-green-500 text-5xl sm:text-6xl mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                </svg>
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl text-white font-bold brand-font">PRODUCT VERIFICATION</h2>
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
                className="w-full py-3 px-4 text-black bg-green-400 hover:bg-green-500 rounded-md font-bold text-lg tracking-widest brand-font"
              >
                VERIFY NOW
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo - Left */}
          <div className="flex justify-center md:justify-start w-full md:w-1/3 order-1">
            <Image
              src={logoUrl}
              alt="Green Team Logo"
              width={48}
              height={48}
              className="h-10 sm:h-12 w-auto opacity-80 hover:opacity-100 transition rounded"
            />
          </div>

          {/* Social Icons - Center */}
          <div className="flex space-x-6 justify-center w-full md:w-1/3 order-2">
            <a
              href="https://www.instagram.com/greenteam__apl?igsh=NTc4MTIwNjQ2YQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://t.me/+anwPCyGcoGhkNjVh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a
              href="https://dympt.org/greenteamorganics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
              </svg>
            </a>
          </div>

          {/* Copyright - Right */}
          <div className="text-center md:text-right w-full md:w-1/3 order-3">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} Green Team. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-opacity duration-300"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-2xl w-full p-2 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Product Image */}
              <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-4 rounded-xl relative">
                <div className={`absolute w-32 h-32 rounded-full blur-3xl opacity-50 ${getBadgeColor(selectedProduct.type).replace('bg-', 'bg-')}`} />
                <Image
                  src={selectedProduct.deviceImage}
                  alt={selectedProduct.name}
                  width={320}
                  height={400}
                  className="relative z-10 w-auto h-80 md:h-auto md:max-h-full object-contain drop-shadow-2xl hover:scale-105 transition duration-500 rounded-2xl"
                />
              </div>

              {/* Product Info */}
              <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center text-center md:text-left">
                <h3 className="text-2xl md:text-4xl text-gray-900 brand-font uppercase mb-2 md:mb-6 leading-none">
                  {selectedProduct.name}
                </h3>

                <div className="mb-4 md:mb-8">
                  <span className={`${getBadgeColor(selectedProduct.type)} px-4 md:px-6 py-1 md:py-2 rounded-full text-white text-sm md:text-lg font-bold uppercase shadow-md inline-block`}>
                    {selectedProduct.type}
                  </span>
                </div>

                {/* Effects */}
                <div className="flex flex-wrap gap-2 mb-2 justify-center md:justify-start">
                  {selectedProduct.effects.map((effect, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getEffectPillColor(selectedProduct.type)}`}
                    >
                      {effect}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 text-sm mb-8 leading-relaxed hidden md:block">
                  {selectedProduct.description}
                </p>

                {/* Social Links in Modal */}
                <div className="flex space-x-8 justify-center md:justify-start mt-2 items-center border-t border-gray-200 pt-4 md:pt-6">
                  <a
                    href="https://www.instagram.com/greenteam__apl?igsh=NTc4MTIwNjQ2YQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-pink-600 transition transform hover:scale-110"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://t.me/+anwPCyGcoGhkNjVh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transition transform hover:scale-110"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </a>
                  <a
                    href="https://dympt.org/greenteamorganics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-600 transition transform hover:scale-110"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {verifyModalOpen && (
        <div
          className="greenteam-verify-modal"
          onClick={() => setVerifyModalOpen(false)}
        >
          <div
            className={`greenteam-verify-modal-content ${verifyState === 'success' ? 'success' : verifyState === 'error' ? 'error' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={logoUrl}
              alt="Green Team"
              width={64}
              height={64}
              className="h-16 w-auto mb-6"
            />

            {verifyState === 'loading' && (
              <>
                <div className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center text-4xl animate-spin text-green-400">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold uppercase mb-4 brand-font">Verifying...</h3>
                <p className="text-gray-300 text-sm">{verifyMessage}</p>
              </>
            )}

            {verifyState === 'success' && (
              <>
                <div className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center text-4xl bg-green-500/10 text-green-500 border-2 border-green-500">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold uppercase mb-4 text-green-500 brand-font">
                  VERIFIED
                </h3>
                <p className="text-gray-300 text-sm">{verifyMessage}</p>
              </>
            )}

            {verifyState === 'error' && (
              <>
                <div className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center text-4xl bg-red-500/10 text-red-500 border-2 border-red-500">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold uppercase mb-4 text-red-500 brand-font">
                  VERIFICATION FAILED
                </h3>
                <p className="text-gray-300 text-sm">{verifyMessage}</p>
              </>
            )}

            <div className="w-full flex flex-col gap-3 mt-6">
              {verifyState === 'error' && (
                <button
                  onClick={() => {
                    setVerifyModalOpen(false);
                    setCode('');
                  }}
                  className="w-full py-3 px-4 bg-white hover:bg-gray-200 text-black rounded-md font-bold brand-font tracking-widest"
                >
                  RETRY
                </button>
              )}
              <button
                onClick={() => setVerifyModalOpen(false)}
                className={`w-full py-3 px-4 rounded-md font-bold brand-font tracking-widest ${
                  verifyState === 'success'
                    ? 'bg-green-600 hover:bg-green-500 text-black'
                    : 'border border-gray-600 hover:bg-gray-800 text-gray-400'
                }`}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
