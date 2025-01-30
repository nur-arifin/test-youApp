import { getUser } from '../auth/03-actions';
import HeaderPage from './partial/header-page';
import InterestPage from './partial/interest-page';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = await getUser();
  return (
    <div>
      <main className="m-5 gap-4">
        <HeaderPage user={user?.data} />
        {children}
        <InterestPage user={user?.data} />
      </main>
    </div>
  );
}