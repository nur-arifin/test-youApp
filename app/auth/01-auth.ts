'use server';

import {
  FormState,
  LoginFormSchema,
  RegisterFormSchema,
} from '@/app/auth/definitions';
import { createSession, deleteSession } from '@/app/auth/02-stateless-session';
import { redirect } from 'next/navigation';

export async function register(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = RegisterFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: validatedFields.data.username,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    }),
  });

  const data = await response.json();

  if (data.message !== 'User has been created successfully') {
     return {
       message: data.message,
     };
    }
 
  redirect('/login');
}

export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  const errorMessage = { message: 'Invalid login credentials.' };

  try {
    // 1. Validate form fields
    const validatedFields = LoginFormSchema.safeParse({ 
      emailOrUsername: formData.get('emailOrUsername'),
      password: formData.get('password'),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: validatedFields.data.emailOrUsername,
          username: validatedFields.data.emailOrUsername,
          password: validatedFields.data.password,
        }),
      }
    );

    if (!response.ok) {
      return errorMessage;
    }

    const result = await response.json();
    if (!result.access_token) {
      return errorMessage;
    }

    // TODO: Create The Session For Authenticated User.
    const session = await createSession(
      result.access_token,
    );
  } catch (error) {
    console.error('Failed to login', error);
    return errorMessage;
  }
}

export async function logout() {
  deleteSession();
}
