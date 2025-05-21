import Link from 'next/link';
export default function Home() {
  return (
    <div className='border-2 border-black h-screen flex flex-col items-center justify-center'>
      <Link href="/login" className="bg-blue-500 text-white py-2 px-4 rounded transition">
        Login
      </Link>
    </div>
  );
}
