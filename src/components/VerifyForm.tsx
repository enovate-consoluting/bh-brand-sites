'use client';

import { useState } from 'react';
import Image from 'next/image';

interface VerifyFormProps {
  buttonColor?: string;
  buttonTextColor?: string;
  /** If set, uses this client ID for verification */
  previewClientId?: string;
  /** Success icon path */
  successIcon?: string;
  /** Failed icon path */
  failedIcon?: string;
  /** Logo URL to show in success state */
  logoUrl?: string;
  /** Company name for alt text */
  companyName?: string;
}

type VerifyState = 'idle' | 'loading' | 'success' | 'error';

export function VerifyForm({
  buttonColor = '#000000',
  buttonTextColor = '#ffffff',
  previewClientId,
  successIcon = '/images/default/verify_success.svg',
  failedIcon = '/images/default/verify_failed.svg',
  logoUrl,
  companyName = 'Brand',
}: VerifyFormProps) {
  const [code, setCode] = useState('');
  const [verifyState, setVerifyState] = useState<VerifyState>('idle');
  const [message, setMessage] = useState('');
  const [serial, setSerial] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

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
      // Use POST for security - prevents URL sharing of codes
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
      const data = await response.json();

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
    setVerifyState('idle');
    if (verifyState === 'success') {
      setCode(''); // Clear code on success
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="ENTER PRODUCT CODE"
            className="w-full h-14 px-5 pr-32 rounded-full bg-white text-gray-700 outline-none text-sm md:text-base"
            style={{ borderRadius: '30px' }}
            required
          />
          <button
            type="submit"
            disabled={verifyState === 'loading'}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-9 px-6 rounded-full font-medium text-sm uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{
              backgroundColor: buttonColor,
              color: buttonTextColor,
              borderRadius: '30px'
            }}
          >
            {verifyState === 'loading' ? '...' : 'Verify'}
          </button>
        </div>
      </form>

      {/* Verification Result Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            {verifyState === 'loading' ? (
              <>
                <div className="animate-spin w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full mx-auto mb-4" />
                <p className="text-gray-700">{message}</p>
              </>
            ) : verifyState === 'success' ? (
              <>
                <div className="mb-4">
                  <Image
                    src={successIcon}
                    alt="Verified"
                    width={85}
                    height={85}
                    className="mx-auto"
                  />
                </div>
                <h5 className="text-black text-lg font-medium mb-4">
                  Authentic Product
                </h5>
                {logoUrl && (
                  <div className="mb-4">
                    <Image
                      src={logoUrl}
                      alt={companyName}
                      width={122}
                      height={122}
                      className="mx-auto rounded-2xl"
                      unoptimized={logoUrl.endsWith('.gif')}
                    />
                  </div>
                )}
                <p className="text-black text-lg font-medium">
                  Serial# {serial}
                </p>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <Image
                    src={failedIcon}
                    alt="Failed"
                    width={80}
                    height={80}
                    className="mx-auto"
                  />
                </div>
                <h5 className="text-black text-lg font-medium mb-4">
                  Verification Failed
                </h5>
                <p className="text-gray-700 text-sm mb-4">
                  {message}
                </p>
              </>
            )}

            {verifyState !== 'loading' && (
              <button
                onClick={closeModal}
                className="mt-6 text-gray-600 hover:text-gray-800 text-sm underline"
              >
                {verifyState === 'success' ? 'Verify another product' : 'Try again'}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
