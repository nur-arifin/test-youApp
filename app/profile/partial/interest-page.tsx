import Link from 'next/link';
import React from 'react';
import { BiEditAlt } from 'react-icons/bi';

interface InterestPageProps {
  user: {
    interests?: string[];
  };
}

const InterestPage = ({ user }: InterestPageProps) => {
  return (
    <div className="container-color mb-5 max-w-full overflow-hidden rounded-md shadow-lg">
      <div className="flex flex-row justify-between px-4 py-4">
        <p className="text-md text-white">Interest</p>
        <Link href="/interest">
          <BiEditAlt color="white" size={20} />
        </Link>
      </div>
      <div className="mb-5 w-full pl-4 text-left text-xs text-white md:text-sm">
        {!user?.interests
          ? 'Add in your interest to find a better match'
          : user.interests.map((interest, index) => (
              <span
                key={index}
                className="label-interest mb-2 mr-2 inline-block rounded-full px-4 py-2 text-sm font-semibold"
              >
                {interest}
              </span>
            ))}
      </div>
    </div>
  );
};

export default InterestPage;
