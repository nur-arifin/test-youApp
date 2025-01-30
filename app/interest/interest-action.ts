'use server';
import { redirect } from 'next/navigation';
import { updateInterest } from '../auth/03-actions';
import { FormState } from '../auth/definitions';

export async function submitInterestForm(
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const interests = formData.get('interests');
  if (interests === null || interests === undefined) {
    return { message: 'Interests cannot be empty.' };
  }

  const response = await updateInterest(formData);
  if (response?.errors) {
    return { errors: response.errors };
  }
  console.log(response?.message);
  redirect('/profile');
}
