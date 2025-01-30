import { LoginForm } from './form';

export default function Page() {
  return (
    <div className="flex flex-col px-4 w-full md:w-1/2 lg:w-1/3">
     <div className="text-left">
        <h1 className="text-3xl text-white font-bold">Login</h1>
      </div>
      <div className="mt-6">
        <LoginForm />
      </div>
      <div className="mt-4 text-white text-center text-sm">
        Don&apos;t have an account?{' '}
        <a className="underline" href="/register">
          Register
        </a>
      </div>
    </div>
  );
}
