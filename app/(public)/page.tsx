import Link from 'next/link';

export default function Page() {
  return (
    <div className="container  grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
      <div className="space-y-3">
        <h1 className="text-4xl text-white font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Welcome to our Platform
        </h1>
      </div>
      <div className="flex flex-col justify-center gap-2 min-[400px]:flex-row">
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
          href="/register"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
