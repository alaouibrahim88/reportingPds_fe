'use server';

import { cookies } from 'next/headers';

export async function setCookieValue(
  key: string,
  value: string,
  options?: {
    maxAge?: number;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
  },
) {
  const cookieStore = cookies();

  cookieStore.set(key, value, {
    maxAge: options?.maxAge || 60 * 60 * 24 * 30, // 30 days by default
    path: options?.path || '/',
    secure: options?.secure !== undefined ? options.secure : process.env.NODE_ENV === 'production',
    httpOnly: options?.httpOnly !== undefined ? options.httpOnly : true,
  });

  return { success: true };
}

export async function getCookieValue(key: string) {
  const cookieStore = cookies();
  const value = cookieStore.get(key);

  return value?.value || null;
}

export async function deleteCookieValue(key: string) {
  const cookieStore = cookies();
  cookieStore.delete(key);

  return { success: true };
}
