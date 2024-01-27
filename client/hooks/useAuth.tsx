// useAuth.tsx
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const tokenNew = localStorage.getItem('token') ?? '';
    setToken(tokenNew);

    if (!tokenNew) {
      router.replace('/');
    }
  }, []);

  return token;
};