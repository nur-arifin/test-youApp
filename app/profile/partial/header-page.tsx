import Image from "next/image";
import { TbZodiacVirgo } from "react-icons/tb";

interface HeaderPageProps {
  user: {
    username: string;
    name: string;
    horoscope: string;
    zodiac: string;
  };
}

const HeaderPage = ({ user }: HeaderPageProps) => {
  return (
    <div>
      <div className="gradient-img relative h-60 w-full overflow-hidden rounded-md md:h-80 lg:h-96">
        <Image fill className="object-cover" src="/bg.jpg" alt="Image"/>
        <div className="absolute bottom-0 left-0 bg-opacity-50 p-4 text-white">
          <h2 className="text-lg font-bold">{user?.username}</h2>
          <p className="text-sm">{user?.name}</p>
          <span className="label-user mx-1 mt-2 inline-block rounded-full px-4 py-2 text-xs text-white">
            {user?.horoscope}
          </span>
          <span className="label-user mx-1 mt-2 inline-block rounded-full px-4 py-2 text-xs text-white">
            <div className="flex flex-row">
            <TbZodiacVirgo size={14}/> {!user?.zodiac ? 'Virgo' : user?.zodiac}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderPage;
