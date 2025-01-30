'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { register } from '@/app/auth/01-auth';
import { useFormState, useFormStatus } from 'react-dom';
import { useState } from 'react';
import { PasswordInput } from '@/components/ui/password-input';

export function RegisterForm() {
  const [state, action] = useFormState(register, undefined);
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  return (
    <form action={action}>
      <div className="flex flex-col gap-4">
        <div>
          <Input
            className="input-color ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 text-white"
            id="email"
            name="email"
            placeholder="Enter Email"
          />
        </div>
        {state?.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}
        <div>
          <Input
            className="input-color ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 text-white"
            id="username"
            name="username"
            placeholder="Enter Username"
          />
        </div>
        {state?.errors?.username && (
          <p className="text-sm text-red-500">{state.errors.username}</p>
        )}
         <div>
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
        <div>
         <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          {state?.errors?.confirmPassword && (
            <div className="text-sm text-red-500">
              <p>Password must:</p>
              <ul>
                {state.errors.confirmPassword.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <RegisterButton />
      </div>
    </form>
  );
}

export function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      type="submit"
      className="btn-hover btn-inactive mt-4 h-12 w-full text-lg"
    >
      {pending ? 'Submitting...' : 'Register'}
    </Button>
  );
}
