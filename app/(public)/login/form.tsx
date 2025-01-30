'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '@/app/auth/01-auth';
import { useFormState, useFormStatus } from 'react-dom';
import { useState } from 'react';
import { PasswordInput } from '@/components/ui/password-input';

export function LoginForm() {
  const [state, action] = useFormState(login, undefined);
  const [emailOrUsername, setemailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        <div>
          <Input
            className="input-color h-12 border-0 text-white ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            id="emailOrUsername"
            name="emailOrUsername"
            value={emailOrUsername}
            onChange={(e) => setemailOrUsername(e.target.value)}
            placeholder="Enter Email"
            type="text"
          />
          {state?.errors?.emailOrUsername && (
            <p className="text-sm text-red-500">{state.errors.emailOrUsername}</p>
          )}
        </div>
        <div className="mt-4">
          <PasswordInput
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          {state?.errors?.password && (
            <div className="text-sm text-red-500">
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <LoginButton />
      </div>
    </form>
  );
}

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      type="submit"
      className="btn-hover btn-inactive mt-4 h-12 w-full text-lg"
    >
      {pending ? 'Submitting...' : 'Login'}
    </Button>
  );
}
