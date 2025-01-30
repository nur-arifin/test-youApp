import InterestInput from './interest-form';
import { getUser } from '../auth/03-actions';

export default async function Page() {
  const user = await getUser();
  return (
    <div className="mt-36 flex w-full flex-col">
      <div className="pl-4 text-left">
        <p className="font-interest py-2 text-sm">
          Tell everyone about yourself
        </p>
        <h1 className="text-xl font-bold text-white">What interest you?</h1>
      </div>
      <div className="mt-6">
        <InterestInput user={user?.data} />
      </div>
    </div>
  );
}
