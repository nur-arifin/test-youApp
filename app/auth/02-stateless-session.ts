import 'server-only';

import type { SessionPayload } from '@/app/auth/definitions';
import { decodeJwt, jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secret = new TextEncoder().encode(process.env.SECRET);
const decodeJWT: (token: string) => any = (token: string) => {
  try {
    // Decode the token without verifying
    const userId = decodeJwt(token);
    return userId;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1hr')
    .sign(secret);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, secret, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(token: string | undefined = '') {
  if (!token) {
    throw new Error('Token is required to create a session');
  }

  const decodedToken = await decodeJWT(token);
  if (!decodedToken || !decodedToken.id) {
    throw new Error('No user ID found in the token');
  }

  const userId = decodedToken.id;
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  try {
    const session = await encrypt({ token, userId, expiresAt });

    cookies().set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });

    redirect('/profile');
  } catch (error) {
    console.error('Failed to create session:', error);
    throw new Error('Failed to encrypt session');
  }
}

export async function verifySession() {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);
  
  if (!session?.userId) {
    redirect('/login');
  }

  return { isAuth: true, userId: String(session.userId) , token: String(session.token) };
}

export async function updateSession() {
  const session = cookies().get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export function deleteSession() {
  cookies().delete('session');
  redirect('/login');
}
