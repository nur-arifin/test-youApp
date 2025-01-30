
import { getUser } from '@/app/auth/03-actions';
import AboutForm from './about-form';

const UpdateAbout = async () => {
  const user = await getUser();
  return (
    <div className="container-color my-5 max-w-full overflow-hidden rounded-lg shadow-lg">
      <div className="flex flex-row justify-between px-4 py-4">
        <p className="text-md text-white">About</p>
      </div>

      <div className="tex-sm mb-5 w-full px-4 text-left text-sm font-thin text-white">
       <AboutForm user={user?.data}/>
      </div>
    </div>
  );
};

export default UpdateAbout;
