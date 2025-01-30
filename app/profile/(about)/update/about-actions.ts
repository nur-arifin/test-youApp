'use server';
import { redirect } from 'next/navigation';
import { updateAbout } from '@/app/auth/03-actions';
import { FormState } from '@/app/auth/definitions';

export async function submitAboutForm(
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const response = await updateAbout(formData);
  if (response?.errors) {
    return { errors: response.errors };
  }
  console.log(response?.message);
  redirect('/profile');
}
