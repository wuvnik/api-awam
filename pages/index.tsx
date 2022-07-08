import type { NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';
import { useRouter } from 'next/router';
import { SetStateAction, useState } from 'react';
// import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
    router.push({
      pathname: '/institutions',
      query: { keyword: searchTerm },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary/400">
      {/* <LogoSecondary width={281} height={138} /> */}
      <div className="md:w-[762px] pt-8 flex items-center border-b border-primary/900 ">
        <input
          type="text"
          className="appearance-none focus:ring-0 focus:outline-none bg-transparent w-full h-14 placeholder-neutral/400"
          placeholder="Search by researcher name, papers, university, or keyword"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <button type="submit" className="cursor-pointer" onClick={handleSubmit}>
          {/* <SearchIcon /> */}Search
        </button>
      </div>
    </div>
  );
};

export default Home;
