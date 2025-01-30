import 'server-only';
import { cache } from 'react';
import { verifySession } from '@/app/auth/02-stateless-session';
import { AboutFormSchema, FormState, interestsFormSchema } from './definitions';
import { Inter } from 'next/font/google';

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/getProfile`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${session?.token}`,
        },
      },
    );

    const user = await response.json();
    return user;
  } catch (error) {
    console.log('Failed to fetch user');
    return null;
  }
});

export async function updateAbout(formData: FormData): Promise<FormState> {
  const session = await verifySession();
  if (!session) {
    return { message: 'Session not found. Please log in again.' };
  }

  // 1. Validate form fields
  const validatedFields = AboutFormSchema.safeParse({
    name: formData.get('name'),
    birthday: formData.get('birthday'),
    height: formData.get('height'),
    weight: formData.get('weight'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/updateProfile`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${session.token}`,
        },
        body: JSON.stringify({
          name: validatedFields.data.name,
          birthday: validatedFields.data.birthday?.toString(),
          height: parseInt(validatedFields.data?.height),
          weight: parseInt(validatedFields.data?.weight),
        }),
      },
    );

    const data = await response.json();

    if (!data?.ok) {
      return {
        message: data.message,
      };
    }
  } catch (error) {
    console.error('Failed to update profile:', error);
    return { message: 'Failed to update profile.' };
  }
}

export async function updateInterest(formData: FormData): Promise<FormState> {
  const session = await verifySession();
  if (!session) {
    return { message: 'Session not found. Please log in again.' };
  }
  const data = formData.get('interests');
  if (data === null || data === undefined) {
    return { message: 'Interests cannot be empty.' };
  }

  // 1. Validate form fields
  const validatedFields = interestsFormSchema.safeParse({
    interests: formData.get('interests'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const interests = validatedFields.data.interests?.toString().split(',') ?? [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/updateProfile`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${session.token}`,
        },
        body: JSON.stringify({ interests }),
      },
    );

    const data = await response.json();

    if (!data?.ok) {
      return {
        message: data.message,
      };
    }
  } catch (error) {
    console.error('Failed to update interest:', error);
    return { message: 'Failed to update interest.' };
  }
}
