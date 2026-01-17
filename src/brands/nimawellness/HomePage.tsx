'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { BrandPageProps } from '../types';
import { nimaColors, nimaImages, nimaContact } from './config';
import './nimawellness.css';

// Treatment data for the Popular Treatments tabbed section
const popularTreatments = {
  hormoneTherapy: {
    label: 'Hormone Replacement Therapy',
    slides: [
      {
        image: '/images/nimawellness/therpy.png',
        title: 'Hormone Replacement Therapy',
        items: [
          'Testosterone Replacement Therapy (TRT) for men',
          'Bioidentical Hormone Replacement Therapy (BHRT) for women',
          'Thyroid Optimization',
          'Growth Hormone / Peptide Protocols (as clinically appropriate)',
          'Comprehensive Metabolic + Hormone Lab Testing',
        ],
        cta: { text: 'Start TRT/HRT', link: 'https://beist.myaestheticrecord.com/online-booking' },
        learnMore: '/mendurance',
      },
    ],
  },
  treatmentByAge: {
    label: 'Treatment By Age',
    slides: [
      {
        image: '/images/nimawellness/vitality.png',
        title: 'Stay Snatched',
        ageLabel: '30s',
        subtitle: 'Most Popular Treatments:',
        items: [
          'EZ Gel PRF Injections (natural, regenerative volume + collagen support)',
          'PRP Microneedling + Salmon DNA (PDRN) Boost',
          'PDRN Microneedling / PDRN Injections',
          'Neurotoxin Injections: Botox® | Daxxify® | Dysport®',
          'Facial Fillers: Juvederm® | RHA® (incl. Redensity)',
          'Lip Filler + Lip Flip',
        ],
        cta: { text: 'Schedule Now', link: 'https://beist.myaestheticrecord.com/online-booking' },
        learnMore: '/empowher',
      },
      {
        image: '/images/nimawellness/brownhair.png',
        title: 'Inner Balance, Outer Radiance',
        ageLabel: '40s',
        subtitle: 'Most Popular Treatments:',
        items: [
          'Hormone Replacement Therapy (HRT) / BioTE® Pellets',
          'Medical Weight Loss Injections (Semaglutide + Tirzepatide)',
          'Peptide Therapy → GHK-Cu, TB-500, KPV, BPC-157 protocols',
          'Neurotoxin Injections → Botox® / Daxxify® / Dysport®',
          'Dermal Fillers + Regenerative Options',
          'Body Sculpting & Contouring → Emsculpt NEO® + CryoSkin®',
          'NAD+ IV Infusions',
        ],
        cta: { text: 'Schedule Now', link: 'https://beist.myaestheticrecord.com/online-booking' },
        learnMore: '/empowher',
      },
      {
        image: '/images/nimawellness/radiate-resonate.png',
        title: 'Vitality Renewed & Radiance Restored',
        ageLabel: '50s',
        subtitle: 'Most Popular Treatments:',
        items: [
          'Hormone Optimization / HRT: BioTE® Pellets + bioidentical hormone therapy',
          'Peptide Therapy: GHK-Cu | BPC-157 | KPV | Semax | Dihexa',
          'RF Microneedling Skin Tightening: Morpheus8® | Pixel8®',
          'Laser Skin Resurfacing: Fractional CO2 | Erbium (Er:YAG)',
          'RF Tightening & Contouring: FaceTite® | BodyTite®',
          'Physician-Led Medical Weight Loss',
          'Weight Loss Injections (GLP-1 / GIP)',
          'Facial Fillers: Juvederm® | RHA®',
        ],
        cta: { text: 'Schedule Now', link: 'https://beist.myaestheticrecord.com/online-booking' },
        learnMore: '/empowher',
      },
      {
        image: '/images/nimawellness/pic-elderly_female.png',
        title: 'Timeless Health & Wellness',
        ageLabel: '60s',
        subtitle: 'Most Popular Treatments:',
        items: [
          'Hormone Optimization / HRT: BioTE® Bioidentical Pellets',
          'Medical Weight Loss (Physician-Led)',
          'Weight Loss Injections (GLP-1 / GIP): Ozempic® | Zepbound® | Mounjaro®',
          'NAD+ IV Infusions',
          'Laser Rejuvenation: PiQo4® Laser',
          'RF Microneedling: Morpheus8® | Pixel8®',
          'Laser Skin Resurfacing',
          'Neurotoxin Injections & Dermal Fillers',
          'Biostimulator Collagen Support: Radiesse®',
          'Regenerative Aesthetics: EZ Gel PRF | PRP Treatments',
        ],
        cta: { text: 'Schedule Now', link: 'https://beist.myaestheticrecord.com/online-booking' },
        learnMore: '/empowher',
      },
    ],
  },
  erectileDysfunction: {
    label: 'Erectile Dysfunction Treatments',
    slides: [
      {
        image: '/images/nimawellness/RHA-Collection.jpg',
        title: 'Erectile Dysfunction Treatments',
        subtitle: "Orange County's Most Advanced ED Solutions | Comprehensive Male Enhancement",
        items: [
          'Testosterone Replacement Therapy (TRT)',
          'TRT, hGH, GHB Injections (physician-led dosing + monitoring)',
          'bioTE® Testosterone Pellets (select candidates)',
          'Acoustic Shockwave Therapy / Acoustic Wave Therapy (ED-focused protocols)',
          'Shockwave Therapy (GAINSWave® Treatment)',
          'PRP P-Shot® Treatments (as clinically appropriate)',
          'Sermorelin Injections (growth-hormone support peptide and Botox®)',
          'Peptide Therapy peak performance, faster recovery times, and optimal health & wellness support of BPC-157, Thymosin Alpha-1 (TA-1), CJC-1295 + Ipamorelin, Kisspeptin-10, Semax + Dihexa, GHK-Cu,',
          'NAD+ (subcutaneous injectable or IV options)',
        ],
        cta: { text: 'Restore Performance', link: 'https://beist.myaestheticrecord.com/online-booking' },
        learnMore: '/mendurance',
      },
    ],
  },
  antiAging: {
    label: 'Anti-Aging',
    slides: [
      {
        image: '/images/nimawellness/anti_aging_img1.png',
        title: 'Anti-Aging & Regenerative Aesthetics (Non-Surgical)',
        subtitle: 'Turn Back Time in Newport Beach, Irvine & Orange County',
        items: [
          'Advanced Wrinkle Relaxers (Neurotoxin): Botox® | Daxxify® | Dysport®',
          'Dermal Fillers (Facial Balancing + Contour): Juvederm® | RHA®',
          'Biostimulators (Collagen Building): Radiesse® + Hyperdiluted Radiesse®',
          'Regenerative Injections: EZ Gel PRF | PRP Treatments',
          'PDRN / "Salmon DNA" Microneedling',
          'PRF / PRP Injections',
          'PRP Joint Injections',
          'PRP MicroNeedling',
          'PRP Hair Restoration',
        ],
        cta: { text: 'Schedule Now', link: 'https://beist.myaestheticrecord.com/online-booking' },
        learnMore: '/neurotoxins',
      },
      {
        image: '/images/nimawellness/anti_aging_img2.svg',
        title: 'Laser Skin Resurfacing & Skin Tightening',
        subtitle: 'Newport Beach + Irvine | Orange County',
        items: [
          'Laser Skin Resurfacing: Fractional CO2 Laser | Erbium (Er:YAG)',
          'RF Microneedling Skin Tightening: Morpheus8® | Pixel8®',
          'Pico Laser Rejuvenation: PiQo4® Laser',
          'Minimally Invasive Tightening & Contouring: FaceTite® | BodyTite®',
        ],
        cta: { text: 'Schedule Now', link: 'https://beist.myaestheticrecord.com/online-booking' },
        learnMore: '/neurotoxins',
      },
      {
        image: '/images/nimawellness/anti_aging_img3.png',
        title: 'Peptide Therapy & NAD+ IV',
        subtitle: 'Newport Beach & Irvine',
        items: [
          'BPC-157 (recovery + repair support)',
          'Thymosin Alpha-1 (TA-1) (immune support)',
          'CJC-1295 + Ipamorelin (recovery + performance support)',
          'GHK-Cu (skin quality + collagen support)',
          'Semax + Dihexa (focus + clarity support)',
          'Kisspeptin-10 (as clinically appropriate)',
          'NAD+ (injectable option)',
          'IV Hydration Therapy',
          'NAD+ IV Infusions',
        ],
        cta: { text: 'Schedule Now', link: 'https://beist.myaestheticrecord.com/online-booking' },
        learnMore: '/neurotoxins',
      },
    ],
  },
  bodySculpting: {
    label: 'Body Sculpting',
    slides: [
      {
        image: '/images/nimawellness/Body_Sculpting_img.jpg',
        title: 'Body Sculpting & Contouring (Newport Beach & Irvine)',
        subtitle: "Orange County's Premier Non-Surgical Body Transformation Center",
        description: 'Non-invasive body contouring for fat reduction, cellulite smoothing, skin tightening, and muscle toning.',
        items: [
          'Cryolipolysis (Fat Freezing) + EMS Body Sculpting: CryoSkin® | CryoTone® | CryoSculpt® | CryoSlim® + EMS (non-invasive fat freezing, cellulite smoothing, skin tightening, muscle toning)',
          'Muscle Building + Fat Reduction: Emsculpt NEO® (FDA-cleared) - Simultaneous muscle building and fat reduction for abs, glutes, arms, thighs',
          'Non-Invasive Fat Reduction: Ultrasonic Cavitation (fat disruption for stubborn areas, contour refinement)',
          'Radiofrequency Skin Tightening: TriPollar® Radio Frequency (skin tightening, collagen stimulation, body firming)',
          'Lymphatic Drainage + Smoothing: EndoSpheres® Therapy (lymphatic drainage, cellulite appearance reduction, recovery support)',
          'Body Shaping & Contouring: Wood Therapy (Maderotherapy) - Manual contouring, smoothing, circulation support',
          'Recovery + Skin Support: LED Red Light Therapy (recovery enhancement, skin quality support, inflammation support)',
        ],
        cta: { text: 'Transform Body', link: 'https://beist.myaestheticrecord.com/online-booking' },
      },
    ],
  },
  medicalWeightLoss: {
    label: 'Medical Weight Loss',
    slides: [
      {
        image: '/images/nimawellness/Weight_Loss_img.jpg',
        title: 'Medical Weight Loss Programs & Treatments (Newport Beach & Irvine | Orange County)',
        subtitle: 'Physician-led medical weight loss with GLP-1 and GLP-1/GIP medications, comprehensive labs, and customized optimization.',
        items: [
          'Semaglutide Weight Loss (GLP-1): Ozempic®/Wegovy®-style protocols for appetite control + fat loss',
          'Tirzepatide Weight Loss (GLP-1/GIP): Mounjaro®/Zepbound®-style programs for enhanced results',
          'Comprehensive Hormone + Metabolic Labs: insulin resistance markers, hormones, thyroid, metabolic panels',
          'Body Composition Analysis: track fat loss vs. lean muscle over time',
          'Metabolic Optimization: customized nutrition, lifestyle coaching, customized medical-grade NutraCeutical supplements',
          'Lymphatic Drainage Support: EndoSpheres® to reduce fluid retention + support results',
          'Physician-Grade NutraCeuticals: medical-grade supplements specifically tailored to your labs and goals',
        ],
        cta: { text: 'Lose Weight Now', link: 'https://beist.myaestheticrecord.com/online-booking' },
      },
    ],
  },
  sexualHealth: {
    label: 'Sexual Health',
    slides: [
      {
        image: '/images/nimawellness/p-shot.png',
        title: 'P-Shot™',
        subtitle: "The Priapus Shot - Men's Sexual Enhancement",
        items: [
          'Enhanced Performance: Stronger, longer-lasting erections',
          'Increased Size: Both length and girth improvement',
          'Better Sensation: Heightened pleasure and sensitivity',
          'Erectile Dysfunction: Natural treatment for ED',
          "Peyronie's Disease: Reduce curvature and discomfort",
          'Quick Recovery: Resume activity within 24-48 hours',
          'Natural Results: Uses your own platelets (PRP)',
        ],
        perfectFor: {
          label: 'Perfect For Men Who Want:',
          text: 'Enhanced sexual performance, ED treatment, increased confidence, better relationships, and natural enhancement without surgery.',
        },
        cta: { text: 'Schedule P-Shot™', link: 'https://beist.myaestheticrecord.com/online-booking' },
        learnMore: { text: 'Learn More', link: 'https://nimawellness.com/p-shot' },
      },
      {
        image: '/images/nimawellness/o-shot.png',
        title: 'O-Shot™',
        subtitle: "The Orgasm Shot - Women's Sexual Enhancement",
        items: [
          'Enhanced Orgasms: Stronger, more frequent climax',
          'Increased Arousal: Heightened sexual response',
          'Better Lubrication: Natural moisture restoration',
          'Tighter Sensation: Improved vaginal tone',
          'Urinary Incontinence: Reduce stress incontinence',
          'Pain Reduction: Less discomfort during intimacy',
          'Confidence Boost: Renewed sexual confidence',
        ],
        perfectFor: {
          label: 'Perfect For Women Who Want:',
          text: 'Enhanced sexual pleasure, treatment for sexual dysfunction, increased confidence, better intimate relationships, and natural enhancement.',
        },
        cta: { text: 'Schedule O-Shot™', link: 'https://beist.myaestheticrecord.com/online-booking' },
        learnMore: { text: 'Learn More', link: 'https://nimawellness.com/o-shot' },
      },
    ],
  },
};

// Luxury Health & Wellness cards
const luxuryTreatments = [
  {
    image: '/images/nimawellness/Luxury_img1.jpg',
    title: 'Smooth, Plump & Glow Up!',
    description: 'Physician-guided injectables in Newport Beach & Irvine-Botox®/Daxxify®, fillers, and EZ Gel PRF.',
  },
  {
    image: '/images/nimawellness/Weight-Loss.png',
    title: 'Medical Weight Loss',
    description: 'Physician-led GLP-1/GIP programs in Newport Beach & Irvine for appetite control, metabolic support, and sustainable fat loss.',
  },
  {
    image: '/images/nimawellness/Luxury_img3.jpg',
    title: 'Integrative Concierge Medicine',
    description: 'Root-cause care in Newport Beach & Irvine-advanced labs + personalized wellness optimization.',
  },
  {
    image: '/images/nimawellness/Luxury_img4.png',
    title: 'Laser Skin Resurfacing',
    description: 'Advanced resurfacing in Newport Beach & Irvine-CO2/Erbium, PiQo4®, and RF microneedling (Morpheus8® | Pixel8®) for smoother, brighter, tighter skin.',
  },
  {
    image: '/images/nimawellness/treat-image5.jpg',
    title: 'Sexual Health & Wellness',
    subtitle: 'ED Treatment + Hormone Therapy (TRT/HRT) | Orange County',
    description: 'Comprehensive sexual wellness programs including erectile dysfunction treatment, testosterone & hormone optimization, and growth-hormone optimization.',
  },
  {
    image: '/images/nimawellness/Luxury_img5.jpg',
    title: 'Body Sculpting & Contouring',
    subtitle: 'Non-Surgical Fat Reduction + Skin Tightening | Orange County',
    description: 'Emsculpt NEO®, CryoSkin®, Ultrasonic Cavitation, RF tightening, EndoSpheres®-personalized body transformation.',
  },
];

// Video testimonials
const testimonials = [
  { name: 'Daniel', video: '/video/nimawellness/BiotecRep.mp4', poster: '/images/nimawellness/thumbnails/mike.png' },
  { name: 'Diane', video: '/video/nimawellness/Mom.mp4', poster: '/images/nimawellness/thumbnails/Diane.png' },
  { name: 'Memo', video: '/video/nimawellness/Memo.mp4', poster: '/images/nimawellness/thumbnails/memo.png' },
  { name: 'Deborah', video: '/video/nimawellness/Deb.mp4', poster: '/images/nimawellness/thumbnails/Deb.png' },
];

// Marquee slider images
const marqueeImages = Array.from({ length: 19 }, (_, i) => `/images/nimawellness/slider_img_${i + 1}.png`);

// Quiz questions
const menQuestions = [
  'Do you feel tired or lack energy during the day?',
  'Have you noticed decreased muscle mass or strength?',
  'Do you experience mood swings or irritability?',
  'Have you noticed a decrease in your sex drive?',
  'Do you have difficulty concentrating or focusing?',
  'Have you gained weight, especially around the midsection?',
  'Do you experience poor sleep or insomnia?',
  'Have you noticed hair loss or thinning?',
  'Do you feel less motivated than you used to?',
  'Have you experienced erectile dysfunction?',
];

const womenQuestions = [
  'Do you experience hot flashes or night sweats?',
  'Have you noticed changes in your menstrual cycle?',
  'Do you feel tired or lack energy during the day?',
  'Have you experienced mood swings or anxiety?',
  'Do you have difficulty sleeping through the night?',
  'Have you noticed weight gain, especially around the midsection?',
  'Do you experience vaginal dryness or discomfort?',
  'Have you noticed decreased sex drive?',
  'Do you have brain fog or difficulty concentrating?',
  'Have you noticed changes in your skin or hair?',
];

/**
 * NIMA Wellness Homepage - Full Production Version
 * Rebuilt from GitHub source: https://github.com/enovate-consoluting/nima
 */
export function NimaHomePage({ siteConfig, previewClientId }: BrandPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTreatmentTab, setActiveTreatmentTab] = useState<keyof typeof popularTreatments>('hormoneTherapy');
  const [quizMode, setQuizMode] = useState<'idle' | 'men' | 'women'>('idle');
  const [quizQuestion, setQuizQuestion] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track scroll position for scroll-to-top button and header background
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const delta = 5;

    const handleScroll = () => {
      const st = window.scrollY;

      // Scroll-to-top button visibility
      setShowScrollTop(st > 300);

      // Sticky header at 100px (matches production)
      setIsScrolled(st >= 100);

      // Hide/show header on scroll direction (matches production)
      if (Math.abs(lastScrollTop.current - st) > delta) {
        if (st > lastScrollTop.current && st > 100) {
          // Scrolling down - hide header
          setHeaderHidden(true);
        } else {
          // Scrolling up - show header
          setHeaderHidden(false);
        }
        lastScrollTop.current = st;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show membership modal on first visit (cookie-based)
  useEffect(() => {
    const modalShown = document.cookie.includes('nimaModalShown=true');
    if (!modalShown) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setShowMembershipModal(true);
        // Set cookie to expire in 1 day
        document.cookie = 'nimaModalShown=true; max-age=86400; path=/';
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const { client, branding } = siteConfig;
  const buttonColor = branding?.button_color || nimaColors.primary;
  const logoUrl = branding?.large_logo_url || client.logo_url || nimaImages.logo;

  // Quiz functions
  const startQuiz = (gender: 'men' | 'women') => {
    setQuizMode(gender);
    setQuizQuestion(0);
    setYesCount(0);
    setQuizComplete(false);
  };

  const answerQuiz = (answer: 'yes' | 'no') => {
    if (answer === 'yes') setYesCount(prev => prev + 1);
    const questions = quizMode === 'men' ? menQuestions : womenQuestions;
    if (quizQuestion < questions.length - 1) {
      setQuizQuestion(prev => prev + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const goBackQuiz = () => {
    if (quizQuestion > 0) {
      setQuizQuestion(prev => prev - 1);
    } else {
      setQuizMode('idle');
    }
  };

  const getQuizResult = () => {
    if (yesCount >= 7) return 'Your symptoms suggest significant hormonal imbalance. We strongly recommend scheduling a consultation.';
    if (yesCount >= 4) return 'Your symptoms indicate moderate hormonal changes. A consultation could help identify the best treatment options.';
    return 'Your symptoms suggest minor hormonal changes. Consider a wellness consultation to optimize your health.';
  };

  // Treatment carousel navigation - TRUE infinite loop implementation
  // Clone last slide at beginning, clone first slide at end
  // Layout: [clone of last] [slide 0] [slide 1] ... [slide n-1] [clone of first]
  // Visual index 0 = actual index 1, so we start at index 1
  const currentTreatment = popularTreatments[activeTreatmentTab];
  const totalSlides = currentTreatment.slides.length;
  const slideIndexRef = useRef(1); // Track position without causing re-renders
  const [, forceUpdate] = useState(0); // Force re-render when needed
  const sliderRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);

  // Build extended slides array: [last clone] + [all slides] + [first clone]
  // For single-slide tabs, don't add clones - just show the one slide
  const extendedSlides = totalSlides === 1
    ? currentTreatment.slides
    : [
        currentTreatment.slides[totalSlides - 1], // Clone of last slide at position 0
        ...currentTreatment.slides,                // Real slides at positions 1 to totalSlides
        currentTreatment.slides[0]                 // Clone of first slide at position totalSlides + 1
      ];

  const goToSlide = (index: number, animate: boolean = true) => {
    const slider = sliderRef.current;
    if (!slider || isJumping.current) return;

    slideIndexRef.current = index;

    if (animate) {
      slider.style.transition = 'transform 1s ease-in-out';
    } else {
      slider.style.transition = 'none';
    }
    slider.style.transform = `translateX(-${index * 100}%)`;
  };

  const nextSlide = () => {
    if (isJumping.current) return;
    goToSlide(slideIndexRef.current + 1, true);
  };

  const prevSlide = () => {
    if (isJumping.current) return;
    goToSlide(slideIndexRef.current - 1, true);
  };

  // Handle seamless loop - instant jump when reaching cloned slides
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      // Only handle transform transitions on the slider itself
      if (e.target !== slider || e.propertyName !== 'transform') return;

      const currentIndex = slideIndexRef.current;

      // Reached the clone of first slide at the end - jump to real first slide
      if (currentIndex >= totalSlides + 1) {
        isJumping.current = true;
        // Use requestAnimationFrame to ensure we're in a clean frame
        requestAnimationFrame(() => {
          slider.style.transition = 'none';
          slideIndexRef.current = 1;
          slider.style.transform = `translateX(-100%)`;
          // Force reflow before next frame
          void slider.offsetHeight;
          // Wait for next frame to re-enable
          requestAnimationFrame(() => {
            isJumping.current = false;
          });
        });
      }
      // Reached the clone of last slide at the beginning - jump to real last slide
      else if (currentIndex <= 0) {
        isJumping.current = true;
        requestAnimationFrame(() => {
          slider.style.transition = 'none';
          slideIndexRef.current = totalSlides;
          slider.style.transform = `translateX(-${totalSlides * 100}%)`;
          void slider.offsetHeight;
          requestAnimationFrame(() => {
            isJumping.current = false;
          });
        });
      }
    };

    slider.addEventListener('transitionend', handleTransitionEnd);
    return () => slider.removeEventListener('transitionend', handleTransitionEnd);
  }, [totalSlides]);

  // Autoplay for treatment carousel (matches production: 2000ms delay, loop: true)
  useEffect(() => {
    if (totalSlides <= 1) return; // Don't autoplay if only 1 slide

    const autoplayInterval = setInterval(() => {
      if (!isJumping.current) {
        goToSlide(slideIndexRef.current + 1, true);
      }
    }, 2000);

    return () => clearInterval(autoplayInterval);
  }, [activeTreatmentTab, totalSlides]);

  // Reset slide when changing tabs
  const handleTabChange = (tab: keyof typeof popularTreatments) => {
    setActiveTreatmentTab(tab);
    // Reset to first real slide
    // For single-slide tabs: index 0, translateX(0)
    // For multi-slide tabs: index 1 (after clone), translateX(-100%)
    const newTotalSlides = popularTreatments[tab].slides.length;
    const isSingleSlide = newTotalSlides === 1;
    slideIndexRef.current = isSingleSlide ? 0 : 1;
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'none';
      sliderRef.current.style.transform = isSingleSlide ? 'translateX(0)' : 'translateX(-100%)';
    }
  };

  // Testimonial navigation
  const nextTestimonial = () => setTestimonialIndex(prev => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="nima-homepage font-poppins">
      {/* ===== HEADER ===== */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white' : ''
        } ${headerHidden ? '-translate-y-full' : 'translate-y-0'}`}
        style={isScrolled ? { boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' } : {}}
      >
        {/* Top Bar */}
        <div className="bg-[#0098f5]/50 py-[7px] hidden md:block">
          <div className="container mx-auto px-4">
            <ul className="flex justify-end gap-8">
              <li><Link href="/financing" className="text-white text-sm capitalize">Financing Options</Link></li>
              <li><Link href="/about" className="text-white text-sm capitalize">Start Your Consultation</Link></li>
            </ul>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className={`transition-all duration-300 ${isScrolled ? 'py-[5px]' : 'py-5'}`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex-shrink-0">
                <Image src={nimaImages.logo} alt="NIMA" width={120} height={50} className="h-auto min-w-[120px]" />
              </Link>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-10">
                <Link href="/about" className={`font-medium text-base transition-colors ${isScrolled ? 'text-[#101010] hover:text-[#0098f5]' : 'text-white hover:text-[#0098f5]'}`}>Meet the Team</Link>
                <Link href="/contact" className={`font-medium text-base transition-colors ${isScrolled ? 'text-[#101010] hover:text-[#0098f5]' : 'text-white hover:text-[#0098f5]'}`}>Contact Us</Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2"
              >
                <span className={`w-6 h-0.5 transition-colors ${isScrolled ? 'bg-[#101010]' : 'bg-white'}`}></span>
                <span className={`w-6 h-0.5 transition-colors ${isScrolled ? 'bg-[#101010]' : 'bg-white'}`}></span>
                <span className={`w-6 h-0.5 transition-colors ${isScrolled ? 'bg-[#101010]' : 'bg-white'}`}></span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-[60] lg:hidden">
          <div className="p-6">
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-4 right-4 text-white text-3xl">&times;</button>
            <nav className="mt-16 space-y-4">
              <Link href="/about" className="block text-white text-lg py-2" onClick={() => setMobileMenuOpen(false)}>Meet the Team</Link>
              <Link href="/financing" className="block text-white text-lg py-2" onClick={() => setMobileMenuOpen(false)}>Financing Options</Link>
              <Link href="/contact" className="block text-white text-lg py-2" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
              <Link href="/empowher" className="block text-white text-lg py-2" onClick={() => setMobileMenuOpen(false)}>Anti-Aging</Link>
              <Link href="/mendurance" className="block text-white text-lg py-2" onClick={() => setMobileMenuOpen(false)}>Men&apos;s Health</Link>
              <Link href="/mendurance" className="block text-white text-lg py-2" onClick={() => setMobileMenuOpen(false)}>Weight Loss</Link>
              <Link href="/empowher" className="block text-white text-lg py-2" onClick={() => setMobileMenuOpen(false)}>Body Contour</Link>
            </nav>
          </div>
        </div>
      )}

      <main className="overflow-hidden">
        {/* ===== HERO SECTION ===== */}
        <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-5">
          {/* Video Background */}
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              src="https://customer-19w1a8y0iapg9msz.cloudflarestream.com/aa66c1a1403d1ae2c458968981b3fde8/iframe?muted=true&autoplay=true&loop=true&controls=false"
              className="absolute inset-0 w-full h-full border-0 scale-150"
              style={{ pointerEvents: 'none' }}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 z-[1]"></div>

          {/* Banner Content */}
          <div className="relative z-[2] text-center text-white">
            <h1 className="text-[#0098f5] text-2xl md:text-4xl lg:text-5xl font-semibold mb-4">
              Orange County&apos;s #1 Hormone &amp; Wellness Authority
            </h1>
            <h6 className="uppercase tracking-[5px] font-normal mb-4 text-sm md:text-base">
              1000+ Lives Transformed Monthly with MenDurance™ TRT &amp; EmpowHer™ HRT Programs Transform Your Life in 30 Days
            </h6>

            {/* App Store Buttons */}
            <div className="flex gap-5 justify-center mt-8">
              <a href="https://play.google.com/store/apps/details?id=com.app.nima" target="_blank" rel="noopener noreferrer">
                <Image src="/images/nimawellness/PlayStore.png" alt="Play Store" width={150} height={45} />
              </a>
              <a href="https://apps.apple.com/in/app/nima-newport/id6745820609" target="_blank" rel="noopener noreferrer">
                <Image src="/images/nimawellness/AppleIcon.png" alt="App Store" width={150} height={45} />
              </a>
            </div>
          </div>
        </section>

        {/* ===== MARQUEE SLIDER ===== */}
        <section className="py-4 overflow-hidden">
          <div className="flex animate-marquee">
            {[...marqueeImages, ...marqueeImages].map((img, i) => (
              <div key={i} className="flex-shrink-0 px-4">
                <Image src={img} alt={`Partner ${i + 1}`} width={100} height={60} className="h-12 w-auto object-contain" />
              </div>
            ))}
          </div>
        </section>

        {/* ===== SIGNATURE PROGRAMS ===== */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                Signature <span className="text-[#0098f5]">Programs</span> Dominating <span className="text-[#0098f5]">Wellness in Orange County</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* MenDurance Card */}
              <div className="nima-infoCard">
                <Image
                  src="/images/nimawellness/shutterstock_2104624709.jpg"
                  alt="MenDurance"
                  fill
                  className="nima-infoCardImg"
                />
                <div className="nima-infoCardContentInfo">
                  <div className="nima-infoCardContent">
                    <div className="nima-contentBox">
                      <h6>MenDurance™</h6>
                      <ul>
                        <li>Tailored & Comprehensive Programs</li>
                        <li>Advanced Hormone Balancing</li>
                        <li>Erectile Dysfunction Solutions</li>
                        <li>Peptide Therapy</li>
                        <li>Testosterone Replacement Therapy</li>
                      </ul>
                      <a href="https://beist.myaestheticrecord.com/online-booking" className="nima-btn-primary mt-3 text-sm">Book Now</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* EmpowHer Card */}
              <div className="nima-infoCard">
                <Image
                  src="/images/nimawellness/IMG_1523.jpg"
                  alt="EmpowHer"
                  fill
                  className="nima-infoCardImg"
                />
                <div className="nima-infoCardContentInfo">
                  <div className="nima-infoCardContent">
                    <div className="nima-contentBox">
                      <h6>EmpowHer™</h6>
                      <ul>
                        <li>Combining shockwave</li>
                        <li>Complete hormone balancing</li>
                        <li>Peptides</li>
                        <li>Weight loss and advanced regenerative medicine</li>
                        <li>Vitality and longevity</li>
                      </ul>
                      <a href="https://beist.myaestheticrecord.com/online-booking" className="nima-btn-primary mt-3 text-sm">Book Now</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sexual Health Card */}
              <div className="nima-infoCard">
                <Image
                  src="/images/nimawellness/SEXUAL_index1.png"
                  alt="Sexual Health"
                  fill
                  className="nima-infoCardImg"
                />
                <div className="nima-infoCardContentInfo">
                  <div className="nima-infoCardContent">
                    <div className="nima-contentBox">
                      <h6>Sexual Health & Regenerative Solutions</h6>
                      <ul>
                        <li>Erectile Dysfunction</li>
                        <li>Shockwave Therapy</li>
                        <li>Concierge Integrative Medicine</li>
                        <li>PRP Joint Injections</li>
                        <li>Advanced Peptide Therapy</li>
                      </ul>
                      <a href="https://beist.myaestheticrecord.com/online-booking" className="nima-btn-primary mt-3 text-sm">Book Now</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== HORMONE QUIZ SECTION ===== */}
        <section className="nima-quiz-section overflow-hidden">
          <div className="container-fluid p-0">
            {quizMode === 'idle' ? (
              <div className="grid lg:grid-cols-2">
                {/* Men Section */}
                <div className="nima-quiz-container group" onClick={() => startQuiz('men')}>
                  <Image
                    src="/images/nimawellness/mens.jpg"
                    alt="Men"
                    fill
                    className="nima-quiz-img"
                  />
                  <div className="nima-quiz-text">
                    <h2 className="text-white text-3xl md:text-4xl font-semibold mb-6">Men</h2>
                    <button className="nima-btn-primary">
                      Take Hormone Quiz For Men
                    </button>
                  </div>
                </div>

                {/* Women Section */}
                <div className="nima-quiz-container group" onClick={() => startQuiz('women')}>
                  <Image
                    src="/images/nimawellness/women.jpg"
                    alt="Women"
                    fill
                    className="nima-quiz-img"
                  />
                  <div className="nima-quiz-text">
                    <h2 className="text-white text-3xl md:text-4xl font-semibold mb-6">Women</h2>
                    <button className="nima-btn-primary">
                      Take Hormone Quiz For Women
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 px-4 max-w-2xl mx-auto text-center min-h-[550px] flex flex-col justify-center">
                {!quizComplete ? (
                  <>
                    <div className="flex justify-between items-center mb-8 border-b border-[#ddd] pb-4">
                      <button onClick={goBackQuiz} className="flex items-center text-[#0098f5] hover:underline">
                        <span className="mr-2">←</span> Back
                      </button>
                      <div className="text-xs text-[#0098f5]">{quizQuestion + 1} / {quizMode === 'men' ? menQuestions.length : womenQuestions.length}</div>
                    </div>
                    <div className="text-xl md:text-2xl font-medium mb-8">
                      {quizMode === 'men' ? menQuestions[quizQuestion] : womenQuestions[quizQuestion]}
                    </div>
                    <div className="flex gap-4 justify-center mt-5">
                      <button onClick={() => answerQuiz('yes')} className="nima-btn-primary">Yes</button>
                      <button onClick={() => answerQuiz('no')} className="nima-btn-primary">No</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-semibold mb-4">Quiz Complete!</h3>
                    <p className="text-lg mb-6">{getQuizResult()}</p>
                    <a href="https://beist.myaestheticrecord.com/online-booking" className="nima-btn-primary mx-auto">Book Now</a>
                    <button onClick={() => setQuizMode('idle')} className="block mx-auto mt-4 text-[#0098f5] hover:underline">Take Another Quiz</button>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ===== ABOUT SECTION ===== */}
        <section className="py-[70px] px-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left side - heading */}
              <div className="text-right">
                <h2 className="text-2xl md:text-[2rem] font-bold mb-4">About Newport Integrative <span className="text-[#0098f5]">Medicine &amp; Aesthetics</span></h2>
                <div className="nima-divider nima-divider-right">Our Mission</div>
                <h6 className="text-xl font-medium text-[#444]">Located in Irvine, Newport Beach &amp; serving <br className="hidden lg:block" />Greater Orange County</h6>
              </div>
              {/* Right side - description box */}
              <div className="nima-about-description">
                <p>At Newport Integrative Medicine &amp; Aesthetics (NIMA), We Don&apos;t Just Change How You Look - We Change How You LIVE</p>
                <p>Our Mission: Help 1000+ Newport Beach, Irvine, and Orange County residents monthly regain their confidence, explosive energy, and youthful glow through cutting-edge, non-surgical treatments.</p>
                <p>Whether you need body sculpting, medical weight loss, hormone optimization, or anti-aging solutions - we guarantee real, lasting transformations using Orange County&apos;s most advanced technology that 98% of our clients rave about.</p>
                <p className="flex items-start gap-2 !mb-0">
                  <svg width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="flex-shrink-0 mt-1">
                    <path fillRule="evenodd" d="M10 17a6 6 0 100-12 6 6 0 000 12zm0 1a7 7 0 100-14 7 7 0 000 14z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 6.5a.5.5 0 01.5.5v4a.5.5 0 01-.053.224l-1.5 3a.5.5 0 11-.894-.448L9.5 10.882V7a.5.5 0 01.5-.5z" clipRule="evenodd" />
                    <path d="M2.86 7.387A2.5 2.5 0 116.387 3.86 8.035 8.035 0 002.86 7.387zM13.613 3.86a2.5 2.5 0 113.527 3.527 8.035 8.035 0 00-3.527-3.527z" />
                    <path fillRule="evenodd" d="M13.646 16.146a.5.5 0 01.708 0l1 1a.5.5 0 01-.708.708l-1-1a.5.5 0 010-.708zm-7.292 0a.5.5 0 00-.708 0l-1 1a.5.5 0 00.708.708l1-1a.5.5 0 000-.708zM7.5 2.5A.5.5 0 018 2h4a.5.5 0 010 1H8a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                    <path d="M9 3h2v2H9V3z" />
                  </svg>
                  <strong>Limited consultation spots available - join the transformation today. <a href="https://beist.myaestheticrecord.com/online-booking" className="text-[#0098f5] hover:underline">Book Now</a></strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== POPULAR TREATMENTS (TABBED CAROUSEL) ===== */}
        <section className="py-16 px-4 lg:px-8 bg-[#f2f2f2]">
          <div className="container mx-auto">
            <div className="border-b border-[#ddd] mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold pb-4">Our Most <span className="text-[#0098f5]">Popular</span> Treatments</h2>
            </div>

            {/* Wrapper - Vertical tabs on left, content on right (desktop) */}
            <div className="nima-treatment-wrapper">
              {/* Tab Navigation - Vertical on desktop */}
              <nav className="nima-treatment-nav">
                {Object.entries(popularTreatments).map(([key, { label }]) => (
                  <button
                    key={key}
                    onClick={() => handleTabChange(key as keyof typeof popularTreatments)}
                    className={`nima-treatment-nav-btn ${activeTreatmentTab === key ? 'active' : ''}`}
                  >
                    {label}
                  </button>
                ))}
              </nav>

              {/* Treatment Content Area */}
              <div className="nima-treatment-content overflow-hidden relative">
                {/* Carousel Navigation Arrows - positioned on left/right of carousel */}
                {totalSlides > 1 && (
                  <div className="nima-slider-arrows">
                    <button onClick={prevSlide} className="nima-slider-arrow">&lt;</button>
                    <button onClick={nextSlide} className="nima-slider-arrow">&gt;</button>
                  </div>
                )}

                <div
                  ref={sliderRef}
                  className="nima-slider-track"
                  style={{
                    display: 'flex',
                    // For single slide: no offset. For multiple: start at index 1 (after the clone)
                    transform: totalSlides === 1 ? 'translateX(0)' : 'translateX(-100%)'
                  }}
                >
                  {/* Render extended slides: [last clone] + [all slides] + [first clone] */}
                  {extendedSlides.map((slide, index) => (
                    <div key={index} className="nima-treatment-slide" style={{ minWidth: '100%', flexShrink: 0 }}>
                      {/* Image Thumbnail */}
                      <div className="nima-slide-thumb">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover"
                        />
                        {'ageLabel' in slide && (
                          <div className="nima-age-label">
                            {(slide as { ageLabel: string }).ageLabel}
                          </div>
                        )}
                      </div>

                      {/* Content Info */}
                      <div className="nima-slide-info">
                        <div className="nima-secHead">
                          <h4>{slide.title}</h4>
                          {'subtitle' in slide && slide.subtitle && (
                            <h6>{slide.subtitle}</h6>
                          )}
                        </div>
                        {'description' in slide && (
                          <p className="text-[#444] mb-4 text-sm">{(slide as { description: string }).description}</p>
                        )}
                        <ul>
                          {slide.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                        {'perfectFor' in slide && (
                          <div className="nima-perfect-for">
                            <strong>{(slide as { perfectFor: { label: string; text: string } }).perfectFor.label}</strong>
                            <p>{(slide as { perfectFor: { label: string; text: string } }).perfectFor.text}</p>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-3 pb-4">
                          <a
                            href={slide.cta.link}
                            className="nima-btn-primary"
                          >
                            {slide.cta.text}
                          </a>
                          {'learnMore' in slide && (() => {
                            const lm = (slide as unknown as { learnMore: string | { link: string; text: string } }).learnMore;
                            const href = typeof lm === 'string' ? lm : lm.link;
                            const text = typeof lm === 'string' ? 'Learn More' : lm.text;
                            return (
                              <a href={href} className="nima-btn-secondary">
                                {text}
                              </a>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STUDIO DIFFERENCE SECTION ===== */}
        <section className="relative py-16 px-4 bg-gray-900">
          {/* Gradient Background (video removed to prevent memory issues) */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="container mx-auto relative z-10">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 text-white">
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">Newport Integrative Medicine <br /><span className="text-[#0098f5]">&amp; Aesthetics</span></h2>
                <p className="italic text-gray-300 mb-4">Revolutionizing Orange County Medical Aesthetics Through Integrative Medicine</p>
                <p className="text-gray-300">Orange County&apos;s most advanced integrative medical spa, serving Newport Beach, Irvine, and surrounding areas. NIMA redefines aesthetic medicine by combining functional medicine, regenerative protocols, and cutting-edge technology. We don&apos;t treat symptoms-we take a complete &quot;screenshot of your insides&quot; to create completely customized treatments that transform you from within.</p>
              </div>

              {/* Pillar Cards */}
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-white">
                  <div className="text-[#0098f5] text-2xl mb-2">🏪</div>
                  <h5 className="font-semibold mb-2">Personalized Medical Expertise</h5>
                  <p className="text-sm text-gray-300">Your symptoms tell a story-we&apos;re expert translators. NIMA&apos;s Newport Beach and Irvine medical professionals customize every treatment based on your individual biology, health profile, and aesthetic goals.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-white">
                <div className="text-[#0098f5] text-2xl mb-2">✨</div>
                <h5 className="font-semibold mb-2">Revolutionary Integrative Approach</h5>
                <p className="text-sm text-gray-300">NIMA is shattering Orange County&apos;s traditional aesthetic mold by pioneering functional medicine integration with advanced medical aesthetics.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-white">
                <div className="text-[#0098f5] text-2xl mb-2">🚀</div>
                <h5 className="font-semibold mb-2">Advanced Medical Technology</h5>
                <p className="text-sm text-gray-300">Leading Newport Beach, Irvine, and Orange County in medical innovation. NIMA combines FDA-approved technologies with proprietary integrative protocols.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-white">
                <div className="text-[#0098f5] text-2xl mb-2">🧰</div>
                <h5 className="font-semibold mb-2">Comprehensive Medical Wellness</h5>
                <p className="text-sm text-gray-300">Beauty is a byproduct of optimal health. Beyond traditional aesthetics, NIMA&apos;s integrative approach promotes total well-being.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== LUXURY HEALTH & WELLNESS ===== */}
        <section className="py-16 px-4 bg-[#f2f2f2]">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold">Luxury <span className="text-[#0098f5]">Health &amp; Wellness</span></h2>
              <div className="w-16 h-1 bg-[#0098f5] mx-auto mt-2"></div>
              <p className="text-gray-500 mt-2">Treatments</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {luxuryTreatments.map((treatment, i) => (
                <div key={i} className="group relative h-[270px] rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform">
                  <Image src={treatment.image} alt={treatment.title} fill className="object-cover group-hover:brightness-50 transition-all" />
                  <div className="absolute inset-[5%] rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                      <h4 className="text-lg font-semibold mb-2">{treatment.title}</h4>
                      {treatment.subtitle && <p className="text-sm text-gray-600 mb-2">{treatment.subtitle}</p>}
                      <p className="text-sm text-gray-700">{treatment.description}</p>
                      <a href="https://beist.myaestheticrecord.com/online-booking" target="_blank" rel="noopener noreferrer" className="mt-3 px-4 py-2 bg-[#0098f5] text-white text-xs rounded hover:bg-[#0088e0] transition-colors">Book Now</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FINANCING SECTION ===== */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Flexible Financing Options</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Get the treatments you want now and pay over time with our flexible financing options.</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <Image src="/images/nimawellness/cherry.svg" alt="Cherry" width={120} height={60} className="h-12 w-auto" />
              <Image src="/images/nimawellness/carecredit.jpg" alt="CareCredit" width={120} height={60} className="h-12 w-auto" />
              <span className="text-2xl font-bold text-[#0098f5]">affirm</span>
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="py-16 px-4 bg-[#f2f2f2]">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">Happy <span className="text-[#0098f5]">Clients</span></h2>
                <div className="w-16 h-1 bg-[#0098f5] mb-4"></div>
                <p className="text-gray-500 mb-4">Testimonials</p>
                <p className="text-gray-600 mb-6">Our customers are at the heart of everything we do, and we are proud to have received numerous positive testimonials from satisfied users of our products.</p>
                <div className="hidden lg:flex gap-4">
                  <button onClick={prevTestimonial} className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-[#0098f5] hover:text-[#0098f5] transition-colors flex items-center justify-center">←</button>
                  <button onClick={nextTestimonial} className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-[#0098f5] hover:text-[#0098f5] transition-colors flex items-center justify-center">→</button>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="relative aspect-video">
                    <video
                      src={testimonials[testimonialIndex].video}
                      poster={testimonials[testimonialIndex].poster}
                      controls
                      preload="none"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <h6 className="font-semibold">{testimonials[testimonialIndex].name}</h6>
                    <div className="flex text-yellow-400">★★★★★</div>
                  </div>
                </div>
                <div className="flex lg:hidden justify-center gap-4 mt-4">
                  <button onClick={prevTestimonial} className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-[#0098f5] hover:text-[#0098f5] transition-colors flex items-center justify-center">←</button>
                  <button onClick={nextTestimonial} className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-[#0098f5] hover:text-[#0098f5] transition-colors flex items-center justify-center">→</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== VIP PROGRAM ===== */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Why Join the NIMA Family VIP Program?</h2>
                <h3 className="text-xl text-gray-600 mb-6">Exclusive Perks Await Every VIP Member:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#0098f5]">•</span>
                    <span><strong>VIP-Only Events -</strong> Get early access to our most exclusive gatherings and experiences.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0098f5]">•</span>
                    <span><strong>Special Welcome Gift -</strong> Receive a unique gift to celebrate your VIP membership.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0098f5]">•</span>
                    <span><strong>Monthly Member Deals -</strong> Unlock new, VIP-only discounts every month.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0098f5]">•</span>
                    <span><strong>Ongoing Savings -</strong> Enjoy discounted rates on services all year long.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0098f5]">•</span>
                    <span><strong>Wellness Wallet -</strong> Set aside funds for future treatments to invest in your self-care.</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <h4 className="text-lg font-medium mb-4">Download our app for more information</h4>
                  <div className="flex gap-4">
                    <a href="https://play.google.com/store/apps/details?id=com.app.nima" target="_blank" rel="noopener noreferrer">
                      <Image src="/images/nimawellness/PlayStore.png" alt="Play Store" width={150} height={45} />
                    </a>
                    <a href="https://apps.apple.com/in/app/nima-newport/id6745820609" target="_blank" rel="noopener noreferrer">
                      <Image src="/images/nimawellness/AppleIcon.png" alt="App Store" width={150} height={45} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <Image src="/images/nimawellness/homephonescreen1.png" alt="NIMA App" width={300} height={600} className="max-w-[60%] h-auto" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="relative py-12 px-6 bg-[#f2f2f2]">
        <div className="absolute inset-0 bg-center bg-cover bg-no-repeat -z-[1]" style={{ backgroundImage: `url('${nimaImages.bgMenuWhite}')` }}></div>

        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <p className="text-lg mb-6">Nima offers a comprehensive suite of advanced aesthetic and wellness treatments, tailored to enhance your health, beauty, and confidence in a holistic and personalized manner.</p>
              <div className="flex gap-3">
                <a href="#" className="w-12"><Image src={nimaImages.instagram} alt="Instagram" width={48} height={48} /></a>
                <a href="#" className="w-12"><Image src={nimaImages.twitter} alt="Twitter" width={48} height={48} /></a>
                <a href="#" className="w-12"><Image src={nimaImages.facebook} alt="Facebook" width={48} height={48} /></a>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-xl font-semibold mb-4">Important Links</p>
                <ul className="space-y-2">
                  <li><Link href="/" className="hover:text-[#0098f5]">Home</Link></li>
                  <li><Link href="#" className="hover:text-[#0098f5]">Security</Link></li>
                  <li><Link href="#" className="hover:text-[#0098f5]">Features</Link></li>
                  <li><Link href="#" className="hover:text-[#0098f5]">Support</Link></li>
                  <li><Link href="#" className="hover:text-[#0098f5]">How It Works</Link></li>
                  <li><Link href="/about" className="hover:text-[#0098f5]">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-[#0098f5]">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-lg mb-2">{nimaContact.address}</p>
                <a href={`tel:${nimaContact.phone.replace(/[^0-9]/g, '')}`} className="text-lg hover:text-[#0098f5]">{nimaContact.phone}</a>
                <div className="mt-6">
                  <Image src="/images/nimawellness/logoGrad.png" alt="NIMA" width={150} height={60} className="w-36 lg:w-56" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 mt-8 pt-6 flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2025 NIMA.com, All Rights Reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm hover:text-[#0098f5]">Privacy Policy</Link>
              <Link href="#" className="text-sm hover:text-[#0098f5]">Terms of Use</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== FLOATING BUTTONS (side by side) ===== */}
      <div className="fixed bottom-7 right-6 z-[99998] flex items-center gap-3">
        {/* Scroll to Top Button - Appears on scroll */}
        <button
          onClick={scrollToTop}
          className={`w-12 h-12 rounded-full bg-white text-[#0098f5] shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 ${
            showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          aria-label="Scroll to top"
          style={{ boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        {/* Book Now Button */}
        <a
          href="https://beist.myaestheticrecord.com/online-booking"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 bg-[#0098f5] text-white text-xs font-medium uppercase rounded-full shadow-lg hover:bg-[#0088e0] hover:scale-105 transition-all"
          style={{ boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)' }}
        >
          Book Now
        </a>

        {/* Chat Button - Re:amaze placeholder */}
        <button
          onClick={() => window.open('https://nimawellness.reamaze.com/', '_blank')}
          className="w-14 h-14 rounded-full bg-[#0098f5] text-white shadow-lg flex items-center justify-center hover:bg-[#0088e0] hover:scale-105 transition-all"
          style={{ boxShadow: '0 5px 20px rgba(0, 152, 245, 0.4)' }}
          aria-label="Chat with us"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>

      {/* ===== MEMBERSHIP MODAL (shows on first visit) ===== */}
      {showMembershipModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMembershipModal(false)}
          />

          {/* Modal Content - gradient from teal #00c6c0 to dark blue #004e7c */}
          <div className="relative rounded-2xl overflow-hidden max-w-5xl w-full mx-auto shadow-2xl animate-fadeIn" style={{ background: 'linear-gradient(to bottom, #00c6c0, #004e7c)' }}>
            {/* Close Button */}
            <button
              onClick={() => setShowMembershipModal(false)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full border border-white/50 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all"
              style={{ filter: 'invert(1) grayscale(100%) brightness(200%)' }}
            >
              ✕
            </button>

            <div className="flex items-center justify-between">
              {/* Left Image - Woman (33% width) */}
              <div className="hidden md:block w-[33%] relative">
                <Image
                  src="/images/nimawellness/right.png"
                  alt="Model"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Center Content */}
              <div className="flex-1 text-center py-8 px-4">
                <h3 className="text-white text-2xl md:text-3xl font-semibold mb-3" style={{ fontFamily: '"JetBrains Mono", monospace' }}>NOW OFFERING</h3>
                <h2 className="text-white text-5xl md:text-7xl font-bold mb-4 leading-tight" style={{ fontFamily: '"Montserrat", sans-serif' }}>
                  Rewards &amp;<br />Memberships
                </h2>
                <h3 className="text-white text-xl md:text-2xl italic font-semibold mb-3" style={{ fontFamily: '"JetBrains Mono", monospace' }}>Join the Elite</h3>
                <h4 className="text-white text-3xl md:text-4xl font-semibold mb-8 tracking-wide">Your VIP Benefits Start Now</h4>

                <div className="inline-block bg-[#00c6b4] text-black font-semibold text-lg px-8 py-4 rounded-full mb-6">
                  Download Our App
                </div>

                <div className="flex gap-6 justify-center">
                  <a href="https://play.google.com/store/apps/details?id=com.app.nima" target="_blank" rel="noopener noreferrer">
                    <Image src="/images/nimawellness/PlayStore.png" alt="Play Store" width={160} height={48} />
                  </a>
                  <a href="https://apps.apple.com/in/app/nima-newport/id6745820609" target="_blank" rel="noopener noreferrer">
                    <Image src="/images/nimawellness/AppleIcon.png" alt="App Store" width={160} height={48} />
                  </a>
                </div>
              </div>

              {/* Right Image - Phone (23% width with padding) */}
              <div className="hidden md:block w-[23%] pr-10">
                <Image
                  src="/images/nimawellness/left.png"
                  alt="Phone App"
                  width={300}
                  height={500}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NimaHomePage;
