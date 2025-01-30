import { RegisterForm } from '@/app/(public)/register/form';
export default function Page() {
  return (
    <div className="flex flex-col px-4 w-full md:w-1/3">
      <div className="text-left">
        <h1 className="text-3xl text-white font-bold">Register</h1>
      </div>
      <div className="mt-6">
        <RegisterForm />
      </div>
      <div className="mt-6 text-white text-center text-sm">
         have an account?{' '}
         <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Login here
                    </a>
      </div>
    </div>
  );
}
