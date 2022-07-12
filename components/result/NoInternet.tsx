import Link from 'next/link';

const NoInternet = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-5xl font-bold mb-2">No Internet</div>
      <Link href="/">
        <p className="text-base cursor-pointer underline">Back to home</p>
      </Link>
    </div>
  );
};

export default NoInternet;
