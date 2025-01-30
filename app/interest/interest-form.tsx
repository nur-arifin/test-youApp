'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { submitInterestForm } from './interest-action';

interface InterestInputProps {
  user: {
    interests?: string[];
  };
}

const InterestForm = ({ user }: InterestInputProps) => {
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [inputValue, setInputValue] = useState('');
  const [state, action] = useFormState(submitInterestForm, undefined);
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement> | undefined,
  ) => {
    if (!e) return;
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      setInterests((prevInterests) => [...prevInterests, inputValue.trim()]);
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && interests.length) {
      const newInterests = [...interests];
      newInterests.pop();
      setInterests(newInterests);
    }
  };

  const handleDelete = (index: number) => {
    if (index < 0 || index >= interests.length) return;
    const newInterests = interests.filter((_, i) => i !== index);
    setInterests(newInterests);
  };

  return (
    <div>
      <form action={action}>
        <div className="relative mx-2 my-2 rounded-lg bg-[rgba(217,_217,_217,_0.06)]">
          <div className="flex flex-wrap">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="mx-2 mb-2 mr-1 mt-2 flex items-center rounded-md bg-[rgba(255,_255,_255,_0.1)] px-2 py-1 text-sm text-white"
              >
                <span>{interest}</span>
                <button
                  onClick={() => handleDelete(index)}
                  className="ml-2 text-white"
                >
                  &times;
                </button>
              </div>
            ))}
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="size-14 h-12 flex-1 rounded-lg border-0 bg-transparent text-xs text-white ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="add a interest and enter"
              style={{ minHeight: '50px', padding: '8px' }}
            />
            <Input type="hidden" name="interests" value={interests} />
          </div>
        </div>
        {state?.errors?.interests && (
          <p className="px-2 text-sm text-red-500">{state.errors.interests}</p>
        )}
        <Button
          className="mx-2 rounded-lg bg-[rgba(255,_255,_255,_0.1)] text-xs text-white"
          type="submit"
        >
          Update&Save
        </Button>
      </form>
    </div>
  );
};

export default InterestForm;
