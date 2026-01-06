'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface VerifyFormProps {
  buttonColor?: string;
  buttonTextColor?: string;
}

export function VerifyForm({
  buttonColor = '#000000',
  buttonTextColor = '#ffffff'
}: VerifyFormProps) {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      router.push(`/verify?code=${encodeURIComponent(code.trim())}`);
    }
  };

  return (
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
          className="absolute right-2 top-1/2 -translate-y-1/2 h-9 px-6 rounded-full font-medium text-sm uppercase transition-opacity hover:opacity-90"
          style={{
            backgroundColor: buttonColor,
            color: buttonTextColor,
            borderRadius: '30px'
          }}
        >
          Verify
        </button>
      </div>
    </form>
  );
}
