import { BiEditAlt } from 'react-icons/bi';
import { getUser } from '../auth/03-actions';
import Link from 'next/link';

const About = async () => {
  const user = await getUser();
  return (
    <div className="container-color my-5 max-w-full overflow-hidden rounded-lg shadow-lg">
      <div className="flex flex-row justify-between px-4 py-4">
        <p className="text-md text-white">About</p>
        <Link href="/profile/update">
          <BiEditAlt color="white" size={20} />
        </Link>
      </div>

      <div className="tex-sm mb-5 w-full pl-4 text-left text-sm font-thin text-white">
        {user?.data.birthday || user?.data.horoscope || user?.data.height || user?.data.weight ? (
          <div className="mx-auto max-w-md">
            <div className="rounded-lg p-6 shadow-md">
              <div className="grid grid-cols-2 gap-4">
                <div>Birthday</div>
                <div className="text-sm  font-semibold">
                  : {user?.data.birthday}
                </div>

                <div>Horoscope</div>
                <div className="text-sm  font-semibold">
                  : {user?.data.horoscope}
                </div>

                <div>Zodiac</div>
                <div className="text-sm  font-semibold">
                  : {user?.data.zodiac}
                </div>

                <div>Height</div>
                <div className="text-sm  font-semibold">
                  : {user?.data.height} Cm
                </div>

                <div>Weight</div>
                <div className="text-sm font-semibold">
                  : {user?.data.weight} Kg
                </div>
              </div>
            </div>
          </div>
        ) : (
          'Add in your your to help others know you better'
        )}
      </div>
    </div>
  );
};

export default About;
