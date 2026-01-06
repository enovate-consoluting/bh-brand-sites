'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface VerifyFormProps {
  primaryColor?: string;
  textColor?: string;
}

export function VerifyForm({ primaryColor = '#000000', textColor = '#ffffff' }: VerifyFormProps) {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      router.push(`/verify?code=${encodeURIComponent(code.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-4">
        <label htmlFor="verification-code" className="text-lg font-medium">
          Enter Verification Code
        </label>
        <input
          id="verification-code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your product code"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 text-gray-900"
          style={{
            '--tw-ring-color': primaryColor,
          } as React.CSSProperties}
          required
        />
        <button
          type="submit"
          className="w-full py-3 px-6 rounded-lg font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: primaryColor, color: textColor }}
        >
          Verify Product
        </button>
      </div>
    </form>
  );
}
