import { z } from 'zod';

export const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'Name must be at least 4 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' }).trim(),
  confirmPassword: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' }).trim()
}).superRefine((val, ctx) => {
  if (val.password !== val.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Password is not the same as confirm password',
      path: ['confirmPassword'],
    })
  }
})

// Regex for a valid email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex for alphabetic characters
const alphabetRegex = /^[A-Za-z]+$/;

// Create a Zod schema
export const LoginFormSchema = z.object({
  emailOrUsername: z.string()
  .min(4, { message: 'Name must be at least 4 characters long.' })
  .optional()
  .refine(
    (value) => {
      // Allow undefined or empty string
      if (value === undefined || value === '') return true;
      // Check if the value is a valid email or contains only alphabetic characters
      return emailRegex.test(value) || alphabetRegex.test(value);
    },
    {
      message: 'Must be a valid email or contain only alphabetic characters',
    },
  ),
  password: z.string().min(1, { message: 'Password field must not be empty.' }),
});

export const AboutFormSchema = z.object({
  name: z.string().min(1, { message: 'Name field must not be empty.' }),
  birthday: z.string().min(1, { message: 'Birthday field must not be empty.' }),
  height: z.string().min(1, { message: 'Height field must not be empty.' }),
  weight: z.string().min(1, { message: 'Weight field must not be empty.' }),
});

export const interestsFormSchema = z.object({
  interests: z.string().min(1, { message: 'Interests field must not be empty.' }),
});

export type FormState =
  | {
      errors?: {
        emailOrUsername?: string[];
        username?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        name?: string[],
        birthday?: string[],
        height?: string[],
        weight?: string[],
        interests?: string[]
      };
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  token: string;
  userId: string | number;
  expiresAt: Date;
};
