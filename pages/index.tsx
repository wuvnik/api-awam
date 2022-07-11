import { Search } from '@mui/icons-material';
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
      pathname: '/list',
      query: { keyword: searchTerm },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary/400">
      {/* <LogoSecondary width={281} height={138} /> */}
      <div className="flex text-5xl md:text-8xl borderrounded-2xlz italic cursor-default">
        <div className="font-thin bg-blacktext-white bordershadow">API</div>
        {/* <div className="font-extralight">API-</div> */}
        <div className="font-bold bg-whitetext-black opacity-70">AWAM</div>
      </div>
      <div className="md:w-[762px] pt-8 flex items-center border-b border-primary/900 ">
        <input
          type="text"
          className="appearance-none focus:ring-0 focus:outline-none bg-transparent w-full h-14 placeholder-neutral/400"
          placeholder="Search for public API"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <button type="submit" className="cursor-pointer" onClick={handleSubmit}>
          {/* <SearchIcon /> */}
          <Search />
          {/* Search */}
        </button>
      </div>
    </div>
  );
};

export default Home;
