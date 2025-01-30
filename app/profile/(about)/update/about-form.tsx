'use client';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useFormState } from 'react-dom';
import { submitAboutForm } from './about-actions';
import { useState } from 'react';
interface AboutFormProps {
  user: {
    name?: string;
    birthday?: string;
    height?: number;
    weight?: number;
  };
}

const AboutForm = ({ user }: AboutFormProps) => {
  const [state, action] = useFormState(submitAboutForm, undefined);
  const [name, setName] = useState(user?.name || '');
  const [birthday, setBirthday] = useState(user?.birthday || '');
  const [height, setHeight] = useState(user?.height || '');
  const [weight, setWeight] = useState(user?.weight || '');

  return (
    <div>
      <form className="flex flex-col space-y-4" action={action}>
        <div className='flex justify-end mb-6'><Button className='max-w-fit font-interest' type="submit">update & save</Button></div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <label className="img-color flex cursor-pointer flex-col items-center rounded-2xl px-4 py-2 text-white shadow-lg">
              <span>
                <PlusIcon className="h-12 w-10" />
              </span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
          <label className="w-1/3 text-left">Add Image</label>
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/3 text-left">Display name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="flex-1 rounded-md font-semibold border-[1px] border-[rgba(255,255,255,0.22)] border-[solid] 
            bg-[rgba(217,_217,_217,_0.06)] p-2 text-right"
          />
        </div>
        {state?.errors?.name && (
            <p className="text-sm text-red-500">{state.errors.name}</p>
          )}
        <div className="flex items-center space-x-4">
          <label className="w-1/3 text-left">Birthday:</label>
          <input
            type="date"
            name='birthday'
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="flex-1 font-semibold rounded-md border-[1px] border-[rgba(255,255,255,0.22)] 
            border-[solid] bg-[rgba(217,_217,_217,_0.06)] p-2 text-right"
          />
        </div>
        {state?.errors?.birthday && (
            <p className="text-sm text-red-500">{state.errors.birthday}</p>
          )}
        <div className="flex items-center space-x-4">
          <label className="w-1/3 text-left">Height:</label>
          <input
            type="text"
            name='height'
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Add height"
            className="flex-1 rounded-md font-semibold border-[1px] border-[rgba(255,255,255,0.22)] border-[solid] bg-[rgba(217,_217,_217,_0.06)] p-2 text-right"
          />
        </div>
        {state?.errors?.height && (
            <p className="text-sm text-red-500">{state.errors.height}</p>
          )}
        <div className="flex items-center space-x-4">
          <label className="w-1/3 text-left">weight:</label>
          <input
            type="text"
            name='weight'
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Add weight"
            className="flex-grow rounded-md font-semibold border-[1px] border-[rgba(255,255,255,0.22)] border-[solid] bg-[rgba(217,_217,_217,_0.06)] p-2 text-right"
          />
        </div>
        {state?.errors?.weight && (
            <p className="text-sm text-red-500">{state.errors.weight}</p>
          )}
      </form>
    </div>
  );
};

export default AboutForm;
